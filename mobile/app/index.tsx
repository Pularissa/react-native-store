import React from 'react';
import { useRouter } from 'expo-router';
import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Food<Text style={styles.titleAccent}>HUB</Text>
          </Text>
          <Text style={styles.subtitle}>Choose your role to continue</Text>
        </View>

        <View style={styles.grid}>
          <TouchableOpacity
            style={[styles.card, styles.neonCyan]}
            onPress={() => router.replace('/agent')}
            activeOpacity={0.85}
          >
            <Text style={styles.cardTitle}>Agent</Text>
            <Text style={styles.cardMeta}>Scan cards, view balance & recent transactions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.neonIndigo]}
            onPress={() => router.replace('/sales')}
            activeOpacity={0.85}
          >
            <Text style={styles.cardTitle}>Customer</Text>
            <Text style={styles.cardMeta}>Browse products & checkout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.neonRed]}
            onPress={() => router.replace('/admin')}
            activeOpacity={0.85}
          >
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
  safe: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: Platform.OS === 'android' ? 16 : 0,
    gap: 16,
    justifyContent: 'center',
  },
  header: {
    gap: 6,
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  titleAccent: {
    color: '#FFD700',
  },
  subtitle: {
    color: 'rgba(148,163,184,0.9)',
    fontSize: 13,
    fontWeight: '600',
  },
  grid: {
    gap: 12,
  },
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  neonCyan: {
    borderColor: 'rgba(255, 215, 0, 0.6)',
  },
  neonIndigo: {
    borderColor: 'rgba(255, 215, 0, 0.6)',
  },
  neonRed: {
    borderColor: 'rgba(255, 215, 0, 0.6)',
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
    marginTop: 6,
  },
});
