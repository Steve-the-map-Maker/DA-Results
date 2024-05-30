import pandas as pd
import geopandas as gpd

# Load the CSV file
csv_file_path = 'data/election_results.csv'
election_data = pd.read_csv(csv_file_path)

# Convert the Precinct column to string in the election data
election_data['Precinct'] = election_data['Precinct'].astype(str)

# Load the GeoJSON file
geojson_file_path = 'data/MultnomahCounty2024_transformed.geojson'
geo_data = gpd.read_file(geojson_file_path)

# Convert the Precinct column to string in the geo data
geo_data['Precinct'] = geo_data['Precinct'].astype(str)

# Merge the GeoDataFrame with the DataFrame
merged_data = geo_data.merge(election_data, on='Precinct')

# Save the merged GeoDataFrame to a new GeoJSON file
output_file_path = 'data/MultnomahCounty2024_merged.geojson'
merged_data.to_file(output_file_path, driver='GeoJSON')

print(f"Merged GeoJSON file saved to: {output_file_path}")