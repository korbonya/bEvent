import * as React from 'react';
import { WebView } from 'react-native-webview';

export default function WebView() {
  return (
    <WebView 
      source={{ uri: 'https://expo.dev' }}
    />
  );
}
