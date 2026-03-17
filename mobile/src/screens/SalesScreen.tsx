import React, { useMemo } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from '../styles';
import { useApp } from '../store/AppProvider';
import { AppHeader } from '../components/AppHeader';

export function SalesScreen() {
  const {
    products,
    selectedProductId,
    setSelectedProductId,
    qtyInput,
    setQtyInput,
    qty,
    selectedProduct,
    totalCost,
    adjustQty,
    clearCart,
    confirmPayment,
    currentUid,
    currentBalance,
  } = useApp();

  const { width: windowWidth } = useWindowDimensions();
  const salesIsWide = windowWidth >= 980;
  const cartSidebarWidth = 340;
  const salesAvailableWidth = useMemo(() => {
    if (!salesIsWide) return windowWidth;
    return Math.max(320, windowWidth - cartSidebarWidth - 12);
  }, [salesIsWide, windowWidth]);

  const salesColumns = useMemo(() => {
    if (salesAvailableWidth >= 980) return 4;
    if (windowWidth >= 640) return 3;
    return 2;
  }, [salesAvailableWidth, windowWidth]);

  const salesProductCardWidth = useMemo(() => {
    const horizontalSafe = 16 * 2;
    const cardPadding = 12 * 2;
    const gap = 12;
    const maxWidth = Math.max(320, salesAvailableWidth);
    const available = maxWidth - horizontalSafe - cardPadding - gap * (salesColumns - 1);
    return Math.floor(available / salesColumns);
  }, [salesAvailableWidth, salesColumns]);

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader />

      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={[styles.card, styles.glass, styles.neonCyan]}>
            <View style={styles.rowBetween}>
              <Text style={styles.sectionTitle}>Canteen Sales</Text>
              <View style={styles.totalBox}>
                <Text style={styles.totalLabel}>TO PAY</Text>
                <Text style={styles.totalValue}>{totalCost} RWF</Text>
              </View>
            </View>

            <View style={styles.kvRow}>
              <View style={styles.kvBox}>
                <Text style={styles.kvLabel}>Student Card</Text>
                <Text style={styles.kvValueMono} numberOfLines={1}>
                  {currentUid}
                </Text>
              </View>
              <View style={styles.kvBox}>
                <Text style={styles.kvLabel}>Balance Left</Text>
                <Text style={styles.kvValueIndigo}>{currentBalance} RWF</Text>
              </View>
            </View>

            <View style={salesIsWide ? styles.salesWideRow : null}>
              <View style={salesIsWide ? styles.salesWideLeft : null}>
                <View style={styles.productGrid}>
                  {products.map((item) => {
                    const selected = item.id === selectedProductId;
                    return (
                      <TouchableOpacity
                        key={String(item.id)}
                        style={[
                          styles.productCard,
                          styles.glassLite,
                          styles.productCardGrid,
                          { width: salesProductCardWidth },
                          selected ? styles.productCardSelected : null,
                        ]}
                        onPress={() => setSelectedProductId(item.id)}
                      >
                        <Image source={{ uri: item.img }} style={styles.productImage} resizeMode="cover" />
                        <Text style={styles.productName} numberOfLines={1}>
                          {item.name}
                        </Text>
                        <Text style={styles.productMeta}>{item.cat}</Text>
                        <Text style={styles.productPrice}>{item.price.toLocaleString()} RWF</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              <View style={salesIsWide ? styles.salesWideRight : null}>
                <View style={styles.cartBox}>
                  <View style={styles.cartHeader}>
                    <View style={styles.flex}>
                      <Text style={styles.kvLabel}>CURRENT ORDER</Text>
                      <Text style={styles.cartTitle} numberOfLines={1}>
                        {selectedProduct ? selectedProduct.name : 'Tap an item to start'}
                      </Text>
                      <Text style={styles.cartMeta}>
                        Unit price: {selectedProduct ? selectedProduct.price.toLocaleString() : 0} RWF
                      </Text>
                    </View>

                    <View style={styles.totalBox}>
                      <Text style={styles.totalLabel}>TOTAL</Text>
                      <Text style={styles.totalValue}>{totalCost} RWF</Text>
                    </View>
                  </View>

                  <View style={styles.cartLineItems}>
                    {selectedProduct ? (
                      <View style={styles.cartItemRow}>
                        <Image
                          source={{ uri: selectedProduct.img }}
                          style={styles.cartItemImage}
                          resizeMode="cover"
                        />
                        <View style={styles.flex}>
                          <Text style={styles.cartItemName} numberOfLines={1}>
                            {selectedProduct.name}
                          </Text>
                          <Text style={styles.cartItemMeta}>
                            {qty} × {selectedProduct.price.toLocaleString()} RWF
                          </Text>
                        </View>
                        <Text style={styles.cartItemSubtotal}>{totalCost.toLocaleString()} RWF</Text>
                      </View>
                    ) : (
                      <Text style={styles.meta}>Select something from the menu above</Text>
                    )}
                  </View>

                  <View style={styles.cartControls}>
                    <View style={styles.cartControlCol}>
                      <Text style={styles.kvLabel}>QUANTITY</Text>
                      <View style={styles.qtyRow}>
                        <TouchableOpacity
                          style={[styles.qtyButton, styles.qtyButtonLeft]}
                          onPress={() => adjustQty(-1)}
                        >
                          <Text style={styles.qtyButtonText}>-</Text>
                        </TouchableOpacity>
                        <TextInput
                          value={qtyInput}
                          onChangeText={setQtyInput}
                          keyboardType="number-pad"
                          placeholder="1"
                          style={[styles.input, styles.inputDark, styles.inputCenter, styles.qtyInput]}
                        />
                        <TouchableOpacity
                          style={[styles.qtyButton, styles.qtyButtonRight]}
                          onPress={() => adjustQty(1)}
                        >
                          <Text style={styles.qtyButtonText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={styles.cartControlCol}>
                      <Text style={styles.kvLabel}>CARD</Text>
                      <Text style={styles.kvValueMono} numberOfLines={1}>
                        {currentUid}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.cartActions}>
                    <TouchableOpacity style={[styles.button, styles.buttonGhost]} onPress={clearCart}>
                      <Text style={styles.buttonGhostText}>Clear Order</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonCyan, styles.cartPayButton]}
                      onPress={confirmPayment}
                    >
                      <Text style={styles.buttonTextDark}>Pay Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <StatusBar style="light" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}