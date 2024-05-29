import json
from pyproj import Transformer

# Initialize transformer from the original coordinate system to WGS84
transformer = Transformer.from_crs("EPSG:2913", "EPSG:4326", always_xy=True)

# Load GeoJSON data
with open('data/MultnomahCounty2024.geojson', 'r') as f:
    data = json.load(f)

# Transform the coordinates
def transform_coordinates(coordinates):
    if isinstance(coordinates[0], list):
        return [transform_coordinates(coord) for coord in coordinates]
    else:
        return list(transformer.transform(coordinates[0], coordinates[1]))

for feature in data['features']:
    geometry = feature['geometry']
    geometry['coordinates'] = transform_coordinates(geometry['coordinates'])

# Save the transformed GeoJSON data
with open('data/MultnomahCounty2024_transformed.geojson', 'w') as f:
    json.dump(data, f)

print("Coordinate transformation completed successfully!")