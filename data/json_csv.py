import json
import pandas as pd

# Step 1: Read the GeoJSON file
with open('data/MultnomahCounty2024_normalized.geojson', 'r') as file:
    geojson_data = json.load(file)

# Step 2: Extract coordinates and properties
features = geojson_data['features']

data = []
for feature in features:
    properties = feature['properties']
    geometry = feature['geometry']
    coordinates = geometry['coordinates']
    
    # Flatten the properties and add coordinates
    properties_flat = {**properties, 'coordinates': coordinates}
    data.append(properties_flat)

# Create a DataFrame
df = pd.DataFrame(data)

# Display the DataFrame to verify the data
print(df.head())

# Step 3: Write the DataFrame to a CSV file
df.to_csv('data/MultnomahCounty2024.csv', index=False)
