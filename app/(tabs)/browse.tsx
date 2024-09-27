import React, { useState, useRef } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function BrowseScreen() {
  const [url, setUrl] = useState('https://www.apple.com');
  const [currentUrl, setCurrentUrl] = useState('https://www.apple.com');
  const webViewRef = useRef(null);

  const handleSubmit = () => {
    if (url) {
      setCurrentUrl(url.startsWith('http') ? url : `https://${url}`);
    }
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
      <WebView 
        ref={webViewRef}
        source={{ uri: currentUrl }}
        style={styles.webview}
      />
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
  webview: {
    flex: 1,
  },
});
