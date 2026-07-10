import pandas as pd
import random

random.seed(42)

cities = {
    "Ahmedabad": 4500,
    "Surat": 4200,
    "Vadodara": 3900,
    "Rajkot": 3500,
    "Mumbai": 12000,
    "Pune": 8500,
    "Bangalore": 9500,
    "Hyderabad": 8200,
    "Delhi": 10000,
    "Jaipur": 4800,
}

property_types = [
    "Apartment",
    "House",
    "Villa",
    "Commercial",
]

furnishing = [
    "Unfurnished",
    "Semi Furnished",
    "Fully Furnished",
]

rows = []

for _ in range(10000):

    city = random.choice(list(cities.keys()))

    property_type = random.choice(property_types)

    bedrooms = random.randint(1, 5)

    bathrooms = random.randint(1, 4)

    area = random.randint(500, 5000)

    age = random.randint(0, 25)

    parking = random.randint(0, 3)

    furnished = random.choice(furnishing)

    base_rate = cities[city]

    type_multiplier = {
        "Apartment": 1.0,
        "House": 1.2,
        "Villa": 1.6,
        "Commercial": 1.8,
    }[property_type]

    furnishing_bonus = {
        "Unfurnished": 0,
        "Semi Furnished": 400000,
        "Fully Furnished": 900000,
    }[furnished]

    age_penalty = age * 25000

    parking_bonus = parking * 150000

    bedroom_bonus = bedrooms * 250000

    bathroom_bonus = bathrooms * 100000

    noise = random.randint(-300000, 300000)

    price = (
        area * base_rate * type_multiplier
        + furnishing_bonus
        + parking_bonus
        + bedroom_bonus
        + bathroom_bonus
        - age_penalty
        + noise
    )

    rows.append(
        {
            "city": city,
            "propertyType": property_type,
            "bedrooms": bedrooms,
            "bathrooms": bathrooms,
            "area": area,
            "age": age,
            "parking": parking,
            "furnished": furnished,
            "price": int(price),
        }
    )

df = pd.DataFrame(rows)

df.to_csv("data/properties.csv", index=False)

print("Dataset generated successfully!")
print(df.head())
print(f"\nTotal Rows: {len(df)}")