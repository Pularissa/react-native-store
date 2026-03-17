import React from 'react';
import { Tabs } from 'expo-router';
import { AppProvider } from '../src/store/AppProvider';

export default function RootLayout() {
  return (
    <AppProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            borderTopColor: 'rgba(255, 215, 0, 0.2)',
            borderTopWidth: 2,
          },
          tabBarActiveTintColor: '#FFD700',
          tabBarInactiveTintColor: 'rgba(148,163,184,0.85)',
          tabBarLabelStyle: {
            fontWeight: '800',
            letterSpacing: 0.8,
            textTransform: 'uppercase',
            fontSize: 12,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            href: null,
            tabBarStyle: { display: 'none' },
          }}
        />
        <Tabs.Screen name="agent" options={{ title: 'Agent' }} />
        <Tabs.Screen name="sales" options={{ title: 'Sales' }} />
        <Tabs.Screen name="admin" options={{ title: 'Admin' }} />
      </Tabs>
    </AppProvider>
  );
}
