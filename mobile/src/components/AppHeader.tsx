import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles';
import { useApp } from '../store/AppProvider';

export function AppHeader() {
  const { socketConnected } = useApp();

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Text style={styles.headerTitle}>
          Canteen<Text style={styles.headerAccent}>Pay</Text>
        </Text>
        <Text style={styles.headerNode}>
          Canteen: <Text style={styles.headerNodeAccent}>Kigali Campus</Text>
        </Text>
      </View>

      <View style={styles.headerStatus}>
        <View
          style={[
            styles.statusDot,
            socketConnected ? styles.statusDotOnline : styles.statusDotOffline,
          ]}
        />
        <Text
          style={[
            styles.statusText,
            socketConnected ? styles.statusTextOnline : styles.statusTextOffline,
          ]}
        >
          {socketConnected ? 'System Live' : 'Offline'}
        </Text>
      </View>
    </View>
  );
}