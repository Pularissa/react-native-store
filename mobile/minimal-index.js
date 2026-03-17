import React from 'react';
import { AppRegistry, View, Text, StyleSheet } from 'react-native';

const App = () => (
  <View style={styles.container}>
    <Text style={styles.text}>FoodHUB Payment</Text>
    <Text style={styles.subtext}>App is working! - Updated</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  text: {
    color: '#FFD700',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtext: {
    color: '#ffffff',
    fontSize: 16,
  },
});

AppRegistry.registerComponent('main', () => App);

export default App;
