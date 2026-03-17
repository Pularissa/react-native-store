import { Platform, StatusBar as RNStatusBar, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0a0a0a', // deep black
  },
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: 'rgba(17, 17, 17, 0.65)',
    borderBottomColor: 'rgba(229, 231, 235, 0.08)',
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingTop: Platform.OS === 'android' ? (RNStatusBar.currentHeight ?? 0) + 10 : 10,
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    gap: 2,
  },
  headerTitle: {
    color: '#f3f4f6', // very light silver-gray
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  headerAccent: {
    color: '#d1d5db', // silver
    fontStyle: 'italic',
  },
  headerNode: {
    color: 'rgba(156, 163, 175, 0.80)', // cool gray
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  headerNodeAccent: {
    color: '#e5e7eb',
    fontWeight: '700',
  },
  headerStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(31, 31, 31, 0.60)',
    borderColor: 'rgba(229, 231, 235, 0.12)',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
  
  },
  statusDotOffline: {
    backgroundColor: '#ef4444',
  },
  statusDotOnline: {
    backgroundColor: '#10b981', // emerald green – clean & professional
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  statusTextOffline: {
    color: '#ef4444',
  },
  statusTextOnline: {
    color: '#d1d5db',
  },
  container: {
    padding: 16,
    gap: 12,
    paddingBottom: 24,
  },
  salesWideRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  salesWideLeft: {
    flex: 1,
  },
  salesWideRight: {
    width: 340,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  rowBetween: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flex: {
    flex: 1,
  },
  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    gap: 8,
  },
  glass: {
    backgroundColor: 'rgba(17, 17, 17, 0.70)',
    borderColor: 'rgba(229, 231, 235, 0.10)',
  },
  glassLite: {
    backgroundColor: 'rgba(229, 231, 235, 0.04)',
  },
  neonIndigo: { // renamed & recolored → silver border
    borderColor: 'rgba(209, 213, 219, 0.35)', // silver
  },
  neonCyan: { // renamed & recolored
    borderColor: 'rgba(229, 231, 235, 0.30)', // light silver
  },
  sectionTitle: {
    color: '#f3f4f6',
    fontSize: 18,
    fontWeight: '800',
  },
  label: {
    color: '#9ca3af',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  meta: {
    color: '#9ca3af',
    fontSize: 12,
  },
  input: {
    backgroundColor: 'rgba(31, 31, 31, 0.55)',
    borderColor: 'rgba(229, 231, 235, 0.10)',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#f3f4f6',
  },
  inputDark: {
    backgroundColor: 'rgba(31, 31, 31, 0.55)',
  },
  inputCenter: {
    textAlign: 'center',
    fontWeight: '800',
  },
  button: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonIndigo: { // repurposed to silver
    backgroundColor: '#6b7280', // gray-500
  },
  buttonText: {
    color: '#f3f4f6',
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  totalBox: {
    alignItems: 'flex-end',
  },
  totalLabel: {
    color: '#9ca3af',
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  totalValue: {
    color: '#e5e7eb', // bright silver
    fontSize: 20,
    fontWeight: '900',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    rowGap: 12,
    columnGap: 12,
  },
  productCard: {
    borderColor: 'rgba(229, 231, 235, 0.10)',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    gap: 4,
    marginBottom: 12,
  },
  productCardGrid: {
    flexGrow: 0,
    flexShrink: 0,
    marginBottom: 0,
  },
  productCardSelected: {
    borderColor: '#d1d5db', // silver highlight
    backgroundColor: 'rgba(209, 213, 219, 0.08)',
  },
  productImage: {
    width: '100%',
    height: 72,
    borderRadius: 10,
    marginBottom: 6,
    borderColor: 'rgba(229, 231, 235, 0.10)',
    borderWidth: 1,
    backgroundColor: 'rgba(31, 31, 31, 0.40)',
  },
  productName: {
    color: '#f3f4f6',
    fontSize: 13,
    fontWeight: '700',
  },
  productMeta: {
    color: '#9ca3af',
    fontSize: 12,
  },
  productPrice: {
    color: '#e5e7eb',
    fontSize: 12,
    fontWeight: '700',
  },
  kvRow: {
    flexDirection: 'row',
    gap: 12,
  },
  kvBox: {
    flex: 1,
    backgroundColor: 'rgba(31, 31, 31, 0.45)',
    borderColor: 'rgba(229, 231, 235, 0.10)',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    gap: 6,
  },
  kvLabel: {
    color: 'rgba(156, 163, 175, 0.90)',
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    fontWeight: '800',
  },
  kvValueMono: {
    color: '#e5e7eb',
    fontSize: 14,
    fontWeight: '700',
  },
  kvValueIndigo: { // repurposed to silver
    color: '#d1d5db',
    fontSize: 16,
    fontWeight: '900',
  },
  cartBox: {
    backgroundColor: 'rgba(31, 31, 31, 0.40)',
    borderColor: 'rgba(229, 231, 235, 0.10)',
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    gap: 12,
  },
  cartHeader: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  cartTitle: {
    color: '#f3f4f6',
    fontSize: 14,
    fontWeight: '800',
  },
  cartMeta: {
    color: 'rgba(156, 163, 175, 0.90)',
    fontSize: 12,
  },
  cartLineItems: {
    gap: 10,
  },
  cartItemRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    padding: 10,
    borderRadius: 14,
    borderColor: 'rgba(229, 231, 235, 0.10)',
    borderWidth: 1,
    backgroundColor: 'rgba(229, 231, 235, 0.05)',
  },
  cartItemImage: {
    width: 44,
    height: 44,
    borderRadius: 10,
    borderColor: 'rgba(229, 231, 235, 0.10)',
    borderWidth: 1,
    backgroundColor: 'rgba(31, 31, 31, 0.40)',
  },
  cartItemName: {
    color: '#f3f4f6',
    fontSize: 12,
    fontWeight: '800',
  },
  cartItemMeta: {
    color: 'rgba(156, 163, 175, 0.90)',
    fontSize: 11,
  },
  cartItemSubtotal: {
    color: '#e5e7eb',
    fontSize: 12,
    fontWeight: '900',
  },
  cartControls: {
    flexDirection: 'row',
    gap: 12,
  },
  cartControlCol: {
    flex: 1,
    gap: 8,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyInput: {
    flex: 1,
  },
  qtyButton: {
    width: 38,
    height: 42,
    borderRadius: 12,
    borderColor: 'rgba(229, 231, 235, 0.14)',
    borderWidth: 1,
    backgroundColor: 'rgba(31, 31, 31, 0.60)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyButtonLeft: {
    borderColor: 'rgba(209, 213, 219, 0.30)',
  },
  qtyButtonRight: {
    borderColor: 'rgba(229, 231, 235, 0.30)',
  },
  qtyButtonText: {
    color: '#f3f4f6',
    fontSize: 18,
    fontWeight: '900',
  },
  cartActions: {
    flexDirection: 'row',
    gap: 12,
  },
  buttonGhost: {
    backgroundColor: 'transparent',
    borderColor: 'rgba(229, 231, 235, 0.16)',
    borderWidth: 1,
    flex: 0.5,
  },
  buttonGhostText: {
    color: '#d1d5db',
    fontWeight: '900',
    letterSpacing: 1.0,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  buttonCyan: { // repurposed to silver
    backgroundColor: '#9ca3af', // gray-400
  },
  buttonTextDark: {
    color: '#0a0a0a',
    fontWeight: '900',
    letterSpacing: 1.0,
    textTransform: 'uppercase',
    fontSize: 12,
  },
  cartPayButton: {
    flex: 1,
  },
  buttonIndigoStrong: { // repurposed
    backgroundColor: '#6b7280',
  },
  ledgerScreen: {
    flex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(31, 31, 31, 0.55)',
    borderRadius: 12,
    borderColor: 'rgba(229, 231, 235, 0.10)',
    borderWidth: 1,
  },
  tableHeadCell: {
    color: 'rgba(156, 163, 175, 0.90)',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderColor: 'rgba(229, 231, 235, 0.10)',
    borderWidth: 1,
    backgroundColor: 'rgba(229, 231, 235, 0.05)',
    marginTop: 8,
  },
  tableCell: {
    color: '#d1d5db',
    fontSize: 11,
  },
  colTime: {
    width: 70,
  },
  colType: {
    width: 74,
  },
  colUid: {
    flex: 1,
  },
  colAmount: {
    width: 80,
    textAlign: 'right',
  },
  colStatus: {
    width: 72,
    textAlign: 'right',
  },
  typeTopup: {
    color: '#10b981', // emerald
    fontWeight: '900',
  },
  typePayment: {
    color: '#f59e0b', // amber (good contrast on black)
    fontWeight: '900',
  },
  ledgerList: {
    marginTop: 8,
  },
  footerMeta: {
    color: 'rgba(156, 163, 175, 0.80)',
    fontSize: 11,
  },
});