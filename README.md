# CanteenPay

CanteenPay is a **smart canteen payment system** that allows students to pay for food using RFID cards.

It connects a **mobile app, backend server, and MQTT broker** for real-time communication.

---

## ⚙️ Features

* Scan student RFID cards
* View balance
* Pay for food
* Admin top-up system
* Real-time updates (MQTT + WebSockets)
* Transaction tracking

---

## 🚀 Running the Backend

When you start the backend server, you may see output like this:

```
WARNING: This is a development server. Do not use it in a production deployment.
Running on all addresses (0.0.0.0)
Running on http://127.0.0.1:5001
Running on http://10.11.73.111:5001
Press CTRL+C to quit

[*] MQTT Connected to: broker.benax.rw

DeprecationWarning: Callback API version 1 is deprecated

[*] Frontend URL: http://127.0.0.1:5001/
[*] Frontend URL (Mobile/LAN): http://10.11.73.111:5001/
```

---

## ⚠️ Important Notes

* This is a **development server (Flask)**
* Do NOT use it in production
* For production, use:

  * **Gunicorn**
  * **uWSGI**

---

## 🌐 Accessing the App

* Local (PC):

```
http://127.0.0.1:5001
```

* Mobile (same WiFi):

```
http://10.11.73.111:5001
```

👉 Use
