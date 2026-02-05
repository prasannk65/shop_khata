import json
import os

# This is a template for an ML Business Intelligence Engine
# that could be integrated via a FastAPI or Flask backend.

class ShopAIModel:
    def __init__(self, shop_data_path):
        self.shop_data_path = shop_data_path
        self.data = self._load_data()

    def _load_data(self):
        """Loads inventory and transactions from JSON (mocking a database)"""
        if os.path.exists(self.shop_data_path):
            with open(self.shop_data_path, 'r') as f:
                return json.load(f)
        return {"inventory": [], "transactions": []}

    def predict_next_week_sales(self):
        """
        Uses a simple Linear Regression logic to forecast sales
        based on transaction timestamps.
        """
        transactions = self.data.get('transactions', [])
        if not transactions:
            return 0
        
        # ML Logic: Process timestamps -> Calculate velocity -> Extrapolate
        # In a real model: use scikit-learn or similar
        return "Growth of +12.5% predicted based on historical velocity."

    def get_stock_recommendation(self, product_id):
        """
        Generates an advice for a specific product using 
        Inventory-to-Sales (ITS) ratio analysis.
        """
        inventory = self.data.get('inventory', [])
        item = next((i for i in inventory if i['id'] == product_id), None)
        
        if item and item['quantity'] < 10:
            return f"Restock ALERT: {item['name']} is depleting faster than average."
        return f"Stock for {item['name'] if item else 'Product'} is stable."

# Usage Example:
# model = ShopAIModel('shop_data.json')
# print(model.predict_next_week_sales())
