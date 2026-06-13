from fastapi import WebSocket
from typing import List
import asyncio
import json
from app.scrapers.markets import get_all_indices, get_all_stocks

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        print(f"Client connected. Total: {len(self.active_connections)}")

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
        print(f"Client disconnected. Total: {len(self.active_connections)}")

    async def broadcast(self, data: dict):
        disconnected = []
        for connection in self.active_connections:
            try:
                await connection.send_text(json.dumps(data))
            except Exception:
                disconnected.append(connection)
        for conn in disconnected:
            self.active_connections.remove(conn)

manager = ConnectionManager()

async def price_broadcaster():
    while True:
        if manager.active_connections:
            try:
                data = {
                    "type": "price_update",
                    "indices": get_all_indices(),
                    "stocks": get_all_stocks(),
                }
                await manager.broadcast(data)
                print(f"Broadcasted to {len(manager.active_connections)} clients")
            except Exception as e:
                print(f"Broadcast error: {e}")
        await asyncio.sleep(10)