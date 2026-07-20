from mistralai import Mistral
import os
from dotenv import load_dotenv

load_dotenv()

client = Mistral(api_key=os.getenv("MISTRAL_API_KEY"))

def explain_transaction(txn: dict):
    prompt = f"""
You are a Senior Fraud Investigator.

Analyze this transaction:

Transaction ID: {txn.get('transaction_id')}
Amount: {txn.get('amount')}
Country: {txn.get('country')}
Device: {txn.get('device_type')}
Hour: {txn.get('hour')}

Give a SHORT professional explanation (3-5 lines) covering:
1. Why it may be suspicious
2. Possible fraud pattern
3. Recommended action

Keep it concise and enterprise-style.
"""

    try:
        response = client.chat.complete(
            model="mistral-small-latest",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        return response.choices[0].message.content

    except Exception as e:
        return f"AI explanation unavailable: {str(e)}"