# MQTT Topics – CanteenPay System

This document describes the MQTT topics used in the **CanteenPay Smart Canteen Payment System**.

---

## 🔌 MQTT Connection Status

When the backend starts, you may see:

```
[*] MQTT Connected to: broker.benax.rw
DeprecationWarning: Callback API version 1 is deprecated
```

### Meaning:

* ✅ MQTT is successfully connected
* ⚠️ The library version is old but still working

---

## 1. Card Scan Topic

**Topic**

```
canteen/card/scan
```

**Description**

Published when a student card is scanned by the RFID reader.

**Example Message**

```json
{
  "uid": "AB CD EF 12"
}
```

---

## 2. Balance Update Topic

**Topic**

```
canteen/balance/update
```

**Description**

Updates the student balance after payment or top-up.

**Example Message**

```json
{
  "uid": "AB CD EF 12",
  "balance": 4500
}
```

---

## 3. Payment Topic

**Topic**

```
canteen/payment
```

**Description**

Sent when a student pays for food.

**Example Message**

```json
{
  "uid": "AB CD EF 12",
  "amount": 2000,
  "type": "PAYMENT"
}
```

---

## 4. Top-up Topic

**Topic**

```
canteen/topup
```

**Description**

Used to add money to a student card.

**Example Message**

```json
{
  "uid": "AB CD EF 12",
  "amount": 5000,
  "type": "TOP-UP"
}
```

---

## 5. Transaction Log Topic

**Topic**

```
canteen/transactions
```

**Description**

Sends transaction updates to the system (agent screen, logs).

**Example Message**

```json
{
  "uid": "AB CD EF 12",
  "amount": 2000,
  "type": "PAYMENT",
  "time": "12:30:10"
}
```

---

## 📊 Topic Summary

| Topic                    | Purpose            |
| ------------------------ | ------------------ |
| `canteen/card/scan`      | Detect card        |
| `canteen/balance/update` | Update balance     |
| `canteen/payment`        | Process payment    |
| `canteen/topup`          | Add funds          |
| `canteen/transactions`   | Track transactions |

---

## ⚠️ Important Notes

* All messages use **JSON format**
* MQTT enables **real-time communication**
* Used between:

  * Backend server
  * Mobile app
  * RFID device

---

## 🚨 Developer Warning

```
DeprecationWarning: Callback API version 1 is deprecated
```

👉 This warning means:

* Your MQTT client is using an **old callback API**
* The system still works
* You should update it in the future

---

## 🌐 Broker Info

```
broker.benax.rw
```

Used as the central MQTT server for all communications.

---

## ✅ Summary

MQTT in this project allows:

* Instant card detection
* Fast payments
* Live balance updates
* Real-time transaction tracking

It is the **core communication system** of CanteenPay 🚀
