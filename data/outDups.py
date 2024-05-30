import geopandas as gpd

# Load the GeoJSON file
geojson_file_path = 'data/MultnomahCounty2024_normalized.geojson'
geo_data = gpd.read_file(geojson_file_path)

# Step 1: Inspect column names (for verification)
print("Column names in the dataset:")
print(geo_data.columns)

# Step 2: Check for any duplicated entries
duplicates = geo_data[geo_data.duplicated(subset=['Precinct'], keep=False)]
print("\nDuplicated entries (if any):")
print(duplicates.head(10))

# Step 3: Remove duplicate entries based on 'Precinct' field
unique_geo_data = geo_data.drop_duplicates(subset=['Precinct'])

# Step 4: Save the cleaned data to a new GeoJSON file
cleaned_geojson_file_path = 'data/MultnomahCounty2024_cleaned.geojson'
unique_geo_data.to_file(cleaned_geojson_file_path, driver='GeoJSON')

print(f"\nCleaned GeoJSON file saved to: {cleaned_geojson_file_path}")