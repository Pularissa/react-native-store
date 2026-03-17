import React from 'react';
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default function SimpleApp() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>FoodHUB</Text>
        <Text style={styles.subtitle}>Choose your role to continue</Text>
        
        <View style={styles.grid}>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Agent</Text>
            <Text style={styles.cardMeta}>Scan cards, view balance & recent transactions</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Customer</Text>
            <Text style={styles.cardMeta}>Browse products & checkout</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Admin</Text>
            <Text style={styles.cardMeta}>Top-up cards & configure backend</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>
          Tip: If you are on a phone/tablet, make sure your backend URL uses your PC LAN IP.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 1.2,
    textAlign: 'center',
  },
  subtitle: {
    color: 'rgba(148,163,184,0.9)',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
  },
  grid: {
    gap: 12,
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.6)',
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
  },
  cardMeta: {
    marginTop: 6,
    color: 'rgba(148,163,184,0.92)',
    fontSize: 12,
    lineHeight: 16,
  },
  footer: {
    color: 'rgba(148,163,184,0.75)',
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
  },
});
