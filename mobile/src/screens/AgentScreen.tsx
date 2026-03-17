import React from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from '../styles';
import { useApp } from '../store/AppProvider';
import { AppHeader } from '../components/AppHeader';

export function AgentScreen() {
  const { currentUid, currentBalance, ledger } = useApp();

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader />

      <View style={styles.content}>
        <View style={styles.ledgerScreen}>
          <View style={[styles.card, styles.glass, styles.neonCyan]}>
            <Text style={styles.sectionTitle}>Canteen Agent</Text>

            <View style={styles.kvRow}>
              <View style={styles.kvBox}>
                <Text style={styles.kvLabel}>Current Student Card</Text>
                <Text style={styles.kvValueMono} numberOfLines={1}>
                  {currentUid}
                </Text>
              </View>
              <View style={styles.kvBox}>
                <Text style={styles.kvLabel}>Remaining Balance</Text>
                <Text style={styles.kvValueIndigo}>{currentBalance} RWF</Text>
              </View>
            </View>

            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeadCell, styles.colTime]}>TIME</Text>
              <Text style={[styles.tableHeadCell, styles.colType]}>ACTION</Text>
              <Text style={[styles.tableHeadCell, styles.colUid]}>CARD ID</Text>
              <Text style={[styles.tableHeadCell, styles.colAmount]}>AMOUNT</Text>
              <Text style={[styles.tableHeadCell, styles.colStatus]}>STATUS</Text>
            </View>

            <FlatList
              style={styles.ledgerList}
              data={ledger}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const isTopup = item.type === 'TOP-UP';
                const amountText =
                  typeof item.amount === 'number' ? `${item.amount.toLocaleString()} RWF` : '-';
                return (
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.colTime]}>{item.time}</Text>
                    <Text
                      style={[
                        styles.tableCell,
                        styles.colType,
                        isTopup ? styles.typeTopup : styles.typePayment,
                      ]}
                      numberOfLines={1}
                    >
                      {item.type === 'TOP-UP' ? 'Top-up' : 'Purchase'}
                    </Text>
                    <Text style={[styles.tableCell, styles.colUid]} numberOfLines={1}>
                      {item.uid}
                    </Text>
                    <Text style={[styles.tableCell, styles.colAmount]}>{amountText}</Text>
                    <Text style={[styles.tableCell, styles.colStatus]}>SUCCESS</Text>
                  </View>
                );
              }}
              ListEmptyComponent={
                <Text style={styles.meta}>No transactions yet — waiting for student cards...</Text>
              }
            />
          </View>
        </View>
      </View>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}