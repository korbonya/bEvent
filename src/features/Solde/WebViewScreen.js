import * as React from 'react';
import { WebView } from 'react-native-webview';


export default function WebViewScreen({navigation, route}) {
  const {url} = route.params
  console.log('')
  return (
    <WebView 
      source={{ uri: url }}
    />
  );
}
