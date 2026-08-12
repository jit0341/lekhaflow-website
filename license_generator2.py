# license_generator.py
import json
import hashlib
import sys
from datetime import datetime, timedelta

SECRET = "LekhaFlow_Super_Secret_Key_2026"

def generate_signature(data):
    raw = f"{data.get('client_name','')}{data.get('valid_till','')}{data.get('invoice_limit',0)}{data.get('used',0)}{data.get('machine_id','')}{SECRET}"
    return hashlib.sha256(raw.encode()).hexdigest()

def create_license(client_name, company_name, plan, days, invoice_limit):
    expiry_date = (datetime.now() + timedelta(days=days)).strftime("%Y-%m-%d")
    
    data = {
        "client_name": client_name,
        "company_name": company_name,
        "valid_till": expiry_date,
        "invoice_limit": invoice_limit,
        "used": 0,
        "plan": plan,
        "machine_id": "",
        "version": "3.0"
    }
    
    data["signature"] = generate_signature(data)
    
    filename = f"license_{client_name.replace(' ', '_')}.dat"
    with open(filename, "w") as f:
        json.dump(data, f, indent=2)
    
    return filename

if __name__ == "__main__":
    # ✅ CLI Arguments से Accept करें
    if len(sys.argv) >= 4:
        client_name = sys.argv[1]
        company_name = sys.argv[2] if len(sys.argv) > 2 else ""
        plan = sys.argv[3] if len(sys.argv) > 3 else "STANDARD"
        days = int(sys.argv[4]) if len(sys.argv) > 4 else 365
        invoice_limit = int(sys.argv[5]) if len(sys.argv) > 5 else 10000
        
        filename = create_license(client_name, company_name, plan, days, invoice_limit)
        print(f"✅ License created: {filename}")
    else:
        # ✅ Interactive Mode (Original)
        print("================================================")
        print("   LEKHAFLOW ENTERPRISE - LICENSE GENERATOR     ")
        print("================================================")
        client_name = input("Client Name: ").strip()
        company_name = input("Company Name: ").strip()
        days = int(input("Days Valid (365 for Full Year): "))
        invoice_limit = int(input("Invoice Limit (e.g. 5000, 10000): "))
        
        print("\n--- Select Product Tier ---")
        print("1. LekhaFlow LITE (Excel Only)")
        print("2. LekhaFlow STANDARD (Excel + Tally)")
        print("3. LekhaFlow GOLD (Enterprise Hub + Recon)")
        choice = input("Enter choice (1/2/3): ")
        
        plan_map = {"1": "LITE", "2": "STANDARD", "3": "GOLD ENTERPRISE"}
        selected_plan = plan_map.get(choice, "STANDARD")
        
        filename = create_license(client_name, company_name, selected_plan, days, invoice_limit)
        print(f"\n✅ SUCCESS: {selected_plan} License created for {client_name}")
        print(f"📁 Filename: {filename}")
        print("👉 IMPORTANT: Rename this file to 'license.dat' before delivery.")