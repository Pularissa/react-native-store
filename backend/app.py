from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import paho.mqtt.client as mqtt
import json
from datetime import datetime
import os
import socket

app = Flask(__name__, template_folder='templates')
app.config['SECRET_KEY'] = 'cyber_secret_key_99'
# SQLite Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///livora.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading')

# --- DATABASE MODELS ---
class UserCard(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.String(50), unique=True, nullable=False)
    balance = db.Column(db.Integer, default=0)
    last_seen = db.Column(db.DateTime, default=datetime.utcnow)

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    type = db.Column(db.String(20)) # 'TOPUP' or 'PAYMENT'
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

# Create the database and tables
with app.app_context():
    db.create_all()

# --- CONFIGURATION ---
TEAM_ID = "dining"
MQTT_BROKER = "broker.benax.rw"
TOPIC_STATUS = f"rfid/{TEAM_ID}/card/status"
TOPIC_PAY = f"rfid/{TEAM_ID}/card/pay"
TOPIC_TOPUP = f"rfid/{TEAM_ID}/card/topup"

PRODUCTS = [
    {
        "id": 1,
        "name": "Gourmet Burger",
        "price": 15000,
        "img": "https://images.unsplash.com/photo-1568901349378-8c945497d2c4?w=200",
        "cat": "Main Course",
    },
    {
        "id": 2,
        "name": "Caesar Salad",
        "price": 8500,
        "img": "https://images.unsplash.com/photo-1556710738-b6a63e27c4df?w=200",
        "cat": "Salads",
    },
    {
        "id": 3,
        "name": "Grilled Salmon",
        "price": 22000,
        "img": "https://images.unsplash.com/photo-1467003900918-753b3deb2d6b?w=200",
        "cat": "Main Course",
    },
    {
        "id": 4,
        "name": "Margherita Pizza",
        "price": 18000,
        "img": "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=200",
        "cat": "Pizza",
    },
    {
        "id": 5,
        "name": "Chocolate Lava Cake",
        "price": 6500,
        "img": "https://images.unsplash.com/photo-1578984821391-5cf7cc8b8b8c?w=200",
        "cat": "Desserts",
    },
    {
        "id": 6,
        "name": "Fresh Orange Juice",
        "price": 4500,
        "img": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=200",
        "cat": "Beverages",
    },
    {
        "id": 7,
        "name": "Sushi Platter",
        "price": 28000,
        "img": "https://images.unsplash.com/photo-1579580139259-6e2b9b781b88?w=200",
        "cat": "Japanese",
    },
    {
        "id": 8,
        "name": "Iced Cappuccino",
        "price": 5500,
        "img": "https://images.unsplash.com/photo-1497515114629-f71d768fd14c?w=200",
        "cat": "Beverages",
    },
    {
        "id": 9,
        "name": "Pasta Carbonara",
        "price": 16500,
        "img": "https://images.unsplash.com/photo-1602881946181-15c78c89631e?w=200",
        "cat": "Main Course",
    },
    {
        "id": 10,
        "name": "Tiramisu",
        "price": 7500,
        "img": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=200",
        "cat": "Desserts",
    },
    {
        "id": 11,
        "name": "Green Smoothie",
        "price": 5500,
        "img": "https://images.unsplash.com/photo-1583833847500-f4c5b1c68364?w=200",
        "cat": "Beverages",
    },
    {
        "id": 12,
        "name": "Chicken Wings",
        "price": 12000,
        "img": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200",
        "cat": "Appetizers",
    },
]

# --- MQTT LOGIC ---
def on_connect(client, userdata, flags, rc):
    print(f"[*] MQTT Connected to: {MQTT_BROKER}")
    client.subscribe(TOPIC_STATUS)

def on_message(client, userdata, msg):
    with app.app_context():
        try:
            payload = json.loads(msg.payload.decode())
            uid = str(payload.get('uid')).upper().strip()
            
            if uid:
                # implement "Safe Wallet Update" - Check if card exists, if not, create it
                card = UserCard.query.filter_by(uid=uid).first()
                if not card:
                    card = UserCard(uid=uid, balance=0)
                    db.session.add(card)
                
                card.last_seen = datetime.utcnow()
                db.session.commit()
                
                socketio.emit('update_ui', {
                    "uid": uid,
                    "balance": card.balance,
                    "type": "SCAN",
                    "time": datetime.now().strftime("%H:%M:%S")
                })
        except Exception as e:
            print(f"[!] MQTT Error: {e}")

mqtt_client = mqtt.Client()
mqtt_client.on_connect = on_connect
mqtt_client.on_message = on_message
mqtt_client.connect(MQTT_BROKER, 1883, 60)
mqtt_client.loop_start()

# --- ROUTES ---

def _get_base_url():
    # Prefer forwarded headers (when behind proxy) else fall back to request host URL.
    proto = request.headers.get('X-Forwarded-Proto', request.scheme)
    host = request.headers.get('X-Forwarded-Host', request.host)
    return f"{proto}://{host}".rstrip('/')

@app.route('/')
def index():
    return render_template('dashboard.html', api_base_url=_get_base_url())

@app.route('/config', methods=['GET'])
def config():
    base_url = _get_base_url()
    return jsonify({
        "api_base_url": base_url,
        "socket_url": base_url,
    })

@app.route('/products', methods=['GET'])
def products():
    return jsonify({"products": PRODUCTS})

@app.route('/transactions', methods=['GET'])
def transactions():
    limit = request.args.get('limit', default=50, type=int)
    limit = max(1, min(limit, 200))

    txns = Transaction.query.order_by(Transaction.timestamp.desc()).limit(limit).all()
    payload = []
    for t in txns:
        payload.append({
            "id": t.id,
            "uid": t.uid,
            "amount": t.amount,
            "type": t.type,
            "timestamp": t.timestamp.isoformat() if t.timestamp else None,
        })
    return jsonify({"transactions": payload})

@app.route('/pay', methods=['POST'])
def pay():
    data = request.json
    uid = str(data.get('uid')).upper().strip()
    amount = int(data.get('amount', 0))

    card = UserCard.query.filter_by(uid=uid).first()
    if not card:
        return jsonify({"error": "Card not registered"}), 404

    # Safe Wallet Update Logic
    if card.balance >= amount:
        card.balance -= amount
        
        # Log Transaction
        txn = Transaction(uid=uid, amount=amount, type="PAYMENT")
        db.session.add(txn)
        db.session.commit()
        
        # Update ESP8266 & Web UI
        mqtt_client.publish(TOPIC_PAY, json.dumps({"uid": uid, "new_balance": card.balance}))
        
        res_data = {"uid": uid, "balance": card.balance, "amount": amount, "type": "PAYMENT", "time": datetime.now().strftime("%H:%M:%S")}
        socketio.emit('update_ui', res_data)
        
        return jsonify({"status": "success", "new_balance": card.balance}), 200
    
    return jsonify({"error": "Insufficient Funds"}), 400

@app.route('/topup', methods=['POST'])
def topup():
    data = request.json
    uid = str(data.get('uid')).upper().strip()
    amount = int(data.get('amount', 0))

    if not uid or uid == "--- --- ---":
        return jsonify({"error": "Scan card first"}), 400

    card = UserCard.query.filter_by(uid=uid).first()
    if not card:
        card = UserCard(uid=uid, balance=0)
        db.session.add(card)
    
    card.balance += amount
    
    # Log Transaction
    txn = Transaction(uid=uid, amount=amount, type="TOP-UP")
    db.session.add(txn)
    db.session.commit()
    
    mqtt_client.publish(TOPIC_TOPUP, json.dumps({"uid": uid, "new_balance": card.balance}))
    
    res_data = {"uid": uid, "balance": card.balance, "amount": amount, "type": "TOP-UP", "time": datetime.now().strftime("%H:%M:%S")}
    socketio.emit('update_ui', res_data)
    
    return jsonify({"status": "success", "new_balance": card.balance}), 200

if __name__ == '__main__':
    host = os.environ.get('HOST', '0.0.0.0')
    port = int(os.environ.get('PORT', '5001'))

    print(f"[*] Frontend URL: http://127.0.0.1:{port}/")
    try:
        lan_ip = None

        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        try:
            s.connect(('8.8.8.8', 80))
            lan_ip = s.getsockname()[0]
        finally:
            s.close()

        if lan_ip and lan_ip != '127.0.0.1':
            print(f"[*] Frontend URL (Mobile/LAN): http://{lan_ip}:{port}/")
    except Exception:
        pass

    socketio.run(app, host=host, port=port, debug=True)