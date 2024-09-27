import React, { useState, useRef } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import WebView from 'react-native-webview';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function BrowseScreen() {
  const [url, setUrl] = useState('https://www.apple.com');
  const [currentUrl, setCurrentUrl] = useState('https://www.apple.com');
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const webViewRef = useRef(null);

  const handleSubmit = () => {
    if (url) {
      setCurrentUrl(url.startsWith('http') ? url : `https://${url}`);
    }
  };

  const handleScroll = (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const percentage = Math.floor((contentOffset.y / (contentSize.height - layoutMeasurement.height)) * 100);
    setScrollPercentage(percentage);
  };

  const injectedJavaScript = `
    window.ReactNativeWebView.postMessage(JSON.stringify({
      scrollTop: document.documentElement.scrollTop,
      scrollHeight: document.documentElement.scrollHeight,
      clientHeight: document.documentElement.clientHeight
    }));
    true;
  `;

  const onMessage = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = JSON.parse(event.nativeEvent.data);
    const percentage = Math.floor((scrollTop / (scrollHeight - clientHeight)) * 100);
    setScrollPercentage(percentage);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.urlBar}>
        <TextInput
          style={styles.urlInput}
          value={url}
          onChangeText={setUrl}
          placeholder="Enter URL"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
        />
        <TouchableOpacity style={styles.goButton} onPress={handleSubmit}>
          <ThemedText>Go</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <View style={styles.webviewContainer}>
        <WebView 
          ref={webViewRef}
          source={{ uri: currentUrl }}
          style={styles.webview}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          injectedJavaScript={injectedJavaScript}
          onMessage={onMessage}
        />
        <View style={styles.overlay}>
          <ThemedText style={styles.overlayText}>{scrollPercentage}%</ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  urlBar: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  urlInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  goButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  webviewContainer: {
    flex: 1,
    position: 'relative',
  },
  webview: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 5,
  },
  overlayText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
