import React from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from '../styles';
import { useApp } from '../store/AppProvider';
import { AppHeader } from '../components/AppHeader';

export function AdminScreen() {
  const {
    currentUid,
    currentBalance,
    baseUrlInput,
    setBaseUrlInput,
    topupAmount,
    setTopupAmount,
    postTransaction,
    socketConnected,
    socketUrl,
    socketError,
  } = useApp();

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader />

      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={[styles.card, styles.glass, styles.neonIndigo]}>
            <Text style={styles.sectionTitle}>Canteen Admin</Text>
            <Text style={styles.meta}>Load balance & configure backend connection</Text>

            <View style={styles.kvRow}>
              <View style={styles.kvBox}>
                <Text style={styles.kvLabel}>Student Card UID</Text>
                <Text style={styles.kvValueMono} numberOfLines={1}>
                  {currentUid}
                </Text>
              </View>
              <View style={styles.kvBox}>
                <Text style={styles.kvLabel}>Current Balance</Text>
                <Text style={styles.kvValueIndigo}>{currentBalance} RWF</Text>
              </View>
            </View>

            <Text style={styles.label}>Backend Server URL</Text>
            <TextInput
              value={baseUrlInput}
              onChangeText={setBaseUrlInput}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="http://192.168.43.10:5001"
              style={[styles.input, styles.inputDark]}
            />

            <Text style={styles.label}>Top-up Amount (RWF)</Text>
            <TextInput
              value={topupAmount}
              onChangeText={setTopupAmount}
              keyboardType="number-pad"
              placeholder="e.g. 5000"
              style={[styles.input, styles.inputDark]}
            />
            <TouchableOpacity
              style={[styles.button, styles.buttonIndigoStrong]}
              onPress={() => postTransaction('/topup', topupAmount)}
            >
              <Text style={styles.buttonText}>Add Balance</Text>
            </TouchableOpacity>

            <Text style={styles.footerMeta}>
              Connection: {socketConnected ? 'Online' : 'Offline'}
            </Text>
            {!socketConnected ? (
              <Text style={styles.footerMeta}>
                Server: {socketUrl}
                {socketError ? ` | Error: ${socketError}` : ''}
              </Text>
            ) : null}
            <Text style={styles.footerMeta}>
              Tip: When using mobile phone → use your computer's local network IP (e.g. 192.168.x.x)
            </Text>
          </View>
        </ScrollView>
      </View>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}