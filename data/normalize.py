import geopandas as gpd

# Load the GeoJSON file
geojson_file_path = 'data/MultnomahCounty2024_merged.geojson'
geo_data = gpd.read_file(geojson_file_path)

# Calculate the total number of votes per precinct and create a normalized value
geo_data['Total_Votes'] = (geo_data['Mike_Schmidt_Votes'] + 
                           geo_data['Nathan_Vasquez_Votes'] + 
                           geo_data['Write_In_Votes'])
max_votes = geo_data['Total_Votes'].max()
geo_data['Normalized_Votes'] = geo_data['Total_Votes'] / max_votes

# Save the updated GeoJSON file
updated_geojson_file_path = 'data/MultnomahCounty2024_normalized.geojson'
geo_data.to_file(updated_geojson_file_path, driver='GeoJSON')