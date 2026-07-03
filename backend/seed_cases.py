from faker import Faker
from app.database.database import SessionLocal
from app.models.case_model import Case
import random
from datetime import datetime, timedelta
import app.models

fake = Faker()
db = SessionLocal()

statuses = [
    "Submitted",
    "InProduction",
    "QualityCheck",
    "Shipped",
    "Delivered"
]

for i in range(5000):
    case = Case(
        doctor_id=10,
        patient_name=fake.name(),
        patient_phone=fake.phone_number()[:15],
        age=random.randint(18, 80),
        gender=random.choice(["Male", "Female"]),
        status=random.choice(statuses),
        preview_status=random.choice([
            "pending",
            "approved",
            "preview rejected"
        ]),
        delivery_deadline=datetime.now().date()
            + timedelta(days=random.randint(-10, 30))
    )

    db.add(case)

db.commit()
db.close()

print("5000 cases inserted")