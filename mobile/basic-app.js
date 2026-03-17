import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BasicApp() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World!</Text>
      <Text style={styles.subtext}>This is a test to ensure something displays</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtext: {
    color: '#cccccc',
    fontSize: 16,
    marginTop: 10,
  },
});
