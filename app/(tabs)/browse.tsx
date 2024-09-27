import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import { ThemedView } from '@/components/ThemedView';

export default function BrowseScreen() {
  return (
    <ThemedView style={styles.container}>
      <WebView 
        source={{ uri: 'https://www.apple.com' }}
        style={styles.webview}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
