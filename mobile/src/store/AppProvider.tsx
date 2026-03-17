import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { io, Socket } from 'socket.io-client';

export type LedgerItem = {
  id: string;
  uid: string;
  balance: number;
  amount?: number;
  type: string;
  time: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  img: string;
  cat: string;
};

type UpdateUiEvent = {
  uid?: string;
  balance?: number;
  amount?: number;
  type?: string;
  time?: string;
};

type AppContextValue = {
  baseUrlInput: string;
  baseUrl: string;
  setBaseUrlInput: (v: string) => void;
  socketUrl: string;
  socketConnected: boolean;
  socketError: string;
  currentUid: string;
  currentBalance: number;
  ledger: LedgerItem[];
  products: Product[];
  selectedProductId: number | null;
  setSelectedProductId: (id: number | null) => void;
  qtyInput: string;
  setQtyInput: (v: string) => void;
  qty: number;
  selectedProduct: Product | null;
  totalCost: number;
  clearCart: () => void;
  adjustQty: (delta: number) => void;
  postTransaction: (endpoint: '/topup' | '/pay', amountStr: string) => Promise<void>;
  confirmPayment: () => Promise<void>;
  topupAmount: string;
  setTopupAmount: (v: string) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

function normalizeBaseUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  return `http://${trimmed}`;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [baseUrlInput, setBaseUrlInput] = useState('http://10.11.73.111:5001');
  const baseUrl = useMemo(() => normalizeBaseUrl(baseUrlInput), [baseUrlInput]);
  const socketUrl = baseUrl;

  const fallbackProducts: Product[] = useMemo(
    () => [
      {
        id: 1,
        name: 'Mandazi (3 pcs)',
        price: 1000,
        img: 'https://images.unsplash.com/photo-1555126634-50f05c2f4e8d?w=400&auto=format&fit=crop',
        cat: 'Snacks',
      },
      {
        id: 2,
        name: 'Chapati (1 pc)',
        price: 500,
        img: 'https://images.unsplash.com/photo-1565299624946-baccd3051819?w=400&auto=format&fit=crop',
        cat: 'Snacks',
      },
      {
        id: 3,
        name: 'Rolex (chapati + eggs)',
        price: 2000,
        img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&auto=format&fit=crop',
        cat: 'Popular',
      },
      {
        id: 4,
        name: 'Chips Mayonnaise',
        price: 2500,
        img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&auto=format&fit=crop',
        cat: 'Fries',
      },
      {
        id: 5,
        name: 'Sambusa (2 pcs)',
        price: 1500,
        img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&auto=format&fit=crop',
        cat: 'Snacks',
      },
      {
        id: 6,
        name: 'Coca-Cola (500ml)',
        price: 1000,
        img: 'https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?w=400&auto=format&fit=crop',
        cat: 'Drinks',
      },
      {
        id: 7,
        name: 'Fanta (500ml)',
        price: 1000,
        img: 'https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?w=400&auto=format&fit=crop',
        cat: 'Drinks',
      },
      {
        id: 8,
        name: 'Mandazi + Tea combo',
        price: 1800,
        img: 'https://images.unsplash.com/photo-1555126634-50f05c2f4e8d?w=400&auto=format&fit=crop',
        cat: 'Breakfast',
      },
      {
        id: 9,
        name: 'Boiled Eggs (2 pcs)',
        price: 800,
        img: 'https://images.unsplash.com/photo-1592968518158-4ddc9a435895?w=400&auto=format&fit=crop',
        cat: 'Protein',
      },
      {
        id: 10,
        name: 'Bread + Spread',
        price: 1500,
        img: 'https://images.unsplash.com/photo-1559054663-e8d23213f55c?w=400&auto=format&fit=crop',
        cat: 'Breakfast',
      },
      {
        id: 11,
        name: 'Puff Puff (4 pcs)',
        price: 1200,
        img: 'https://images.unsplash.com/photo-1555126634-50f05c2f4e8d?w=400&auto=format&fit=crop',
        cat: 'Snacks',
      },
      {
        id: 12,
        name: 'Soda + Mandazi combo',
        price: 1800,
        img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&auto=format&fit=crop',
        cat: 'Combos',
      },
    ],
    [],
  );

  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [ledger, setLedger] = useState<LedgerItem[]>([]);

  const [socketConnected, setSocketConnected] = useState(false);
  const [socketError, setSocketError] = useState('');
  const socketRef = useRef<Socket | null>(null);

  const [currentUid, setCurrentUid] = useState('--- --- ---');
  const [currentBalance, setCurrentBalance] = useState<number>(0);

  const currentUidRef = useRef(currentUid);
  const currentBalanceRef = useRef(currentBalance);

  const [topupAmount, setTopupAmount] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [qtyInput, setQtyInput] = useState('1');

  const qty = useMemo(() => {
    const n = Number.parseInt(qtyInput, 10);
    if (!Number.isFinite(n) || n <= 0) return 0;
    return n;
  }, [qtyInput]);

  const selectedProduct = useMemo(
    () => products.find((p) => p.id === selectedProductId) ?? null,
    [products, selectedProductId],
  );

  const totalCost = useMemo(() => {
    if (!selectedProduct) return 0;
    return selectedProduct.price * qty;
  }, [qty, selectedProduct]);

  useEffect(() => {
    currentUidRef.current = currentUid;
  }, [currentUid]);

  useEffect(() => {
    currentBalanceRef.current = currentBalance;
  }, [currentBalance]);

  useEffect(() => {
    setProducts(fallbackProducts);
  }, [fallbackProducts]);

  useEffect(() => {
    if (!baseUrl) return;

    let cancelled = false;

    async function loadProducts() {
      try {
        const res = await fetch(`${baseUrl}/products`);
        const json = await res.json();
        const items = Array.isArray(json?.products) ? (json.products as Product[]) : [];
        if (!cancelled && items.length > 0) {
          setProducts(items);
        }
      } catch {
        // silent fail - use fallback
      }
    }

    async function loadTransactions() {
      try {
        const res = await fetch(`${baseUrl}/transactions?limit=50`);
        const json = await res.json();
        const rows = Array.isArray(json?.transactions) ? json.transactions : [];
        if (cancelled) return;

        const mapped: LedgerItem[] = rows
          .map((t: any): LedgerItem => {
            const ts = typeof t?.timestamp === 'string' ? t.timestamp : '';
            const time = ts ? new Date(ts).toLocaleTimeString() : new Date().toLocaleTimeString();
            const type = String(t?.type ?? 'UNKNOWN');
            const uid = String(t?.uid ?? '').toUpperCase().trim();
            const amount = typeof t?.amount === 'number' ? t.amount : Number(t?.amount ?? NaN);
            return {
              id: `db-${t?.id ?? Math.random().toString(36).slice(2)}`,
              uid,
              balance: 0,
              amount: Number.isFinite(amount) ? amount : undefined,
              type,
              time,
            };
          })
          .filter((x: { uid: null | undefined; }) => x.uid !== undefined && x.uid !== null);

        setLedger(mapped);
      } catch {
        // silent fail
      }
    }

    loadProducts();
    loadTransactions();

    return () => {
      cancelled = true;
    };
  }, [baseUrl]);

  useEffect(() => {
    if (!baseUrl) return;

    const socket = io(baseUrl, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
      timeout: 8000,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 800,
    });

    socketRef.current = socket;

    const onConnect = () => {
      setSocketConnected(true);
      setSocketError('');
    };

    const onDisconnect = () => setSocketConnected(false);

    const onConnectError = (err: any) => {
      const message =
        err?.message?.toString() ||
        (typeof err === 'string' ? err : 'Unable to connect to socket.');
      setSocketError(message);
      setSocketConnected(false);
    };

    const onUpdateUi = (data: UpdateUiEvent) => {
      const uid = String(data.uid ?? '').toUpperCase().trim();
      if (uid) setCurrentUid(uid);

      if (typeof data.balance === 'number' && Number.isFinite(data.balance)) {
        setCurrentBalance(data.balance);
      }

      const eventType = String(data.type ?? 'UNKNOWN');
      if (eventType !== 'TOP-UP' && eventType !== 'PAYMENT') return;

      const item: LedgerItem = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        uid: uid || currentUidRef.current,
        balance: typeof data.balance === 'number' ? data.balance : currentBalanceRef.current,
        amount: typeof data.amount === 'number' ? data.amount : undefined,
        type: eventType,
        time: data.time ?? new Date().toLocaleTimeString(),
      };

      setLedger((prev) => [item, ...prev].slice(0, 50));
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connect_error', onConnectError);
    socket.on('reconnect_error', onConnectError);
    socket.on('update_ui', onUpdateUi);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onConnectError);
      socket.off('reconnect_error', onConnectError);
      socket.off('update_ui', onUpdateUi);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [baseUrl]);

  async function postTransaction(endpoint: '/topup' | '/pay', amountStr: string) {
    const uid = currentUid;
    const amount = Number.parseInt(amountStr, 10);

    if (!baseUrl) {
      Alert.alert('Error', 'Set a valid backend URL first.');
      return;
    }

    if (!uid || uid === '--- --- ---') {
      Alert.alert('Error', 'Scan a student card first (wait for card detection).');
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      Alert.alert('Error', 'Enter a valid amount.');
      return;
    }

    try {
      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, amount }),
      });

      const json = await res.json();
      if (!res.ok) {
        Alert.alert('Error', json?.error ?? `HTTP ${res.status}`);
        return;
      }

      Alert.alert('Success', `New balance: ${json?.new_balance ?? '?'} RWF`);
    } catch (e: any) {
      Alert.alert('Network error', e?.message ?? 'Request failed');
    }
  }

  async function confirmPayment() {
    if (!selectedProduct) {
      Alert.alert('Error', 'Select a product first.');
      return;
    }
    if (!qty || qty <= 0) {
      Alert.alert('Error', 'Enter a valid quantity.');
      return;
    }
    await postTransaction('/pay', String(totalCost));
  }

  function clearCart() {
    setSelectedProductId(null);
    setQtyInput('1');
  }

  function adjustQty(delta: number) {
    const current = Number.parseInt(qtyInput, 10);
    const safeCurrent = Number.isFinite(current) && current > 0 ? current : 1;
    const next = Math.max(1, safeCurrent + delta);
    setQtyInput(String(next));
  }

  const value: AppContextValue = {
    baseUrlInput,
    baseUrl,
    setBaseUrlInput,
    socketUrl,
    socketConnected,
    socketError,
    currentUid,
    currentBalance,
    ledger,
    products,
    selectedProductId,
    setSelectedProductId,
    qtyInput,
    setQtyInput,
    qty,
    selectedProduct,
    totalCost,
    clearCart,
    adjustQty,
    postTransaction,
    confirmPayment,
    topupAmount,
    setTopupAmount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}