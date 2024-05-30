import geopandas as gpd

# Load the GeoJSON file
geojson_file_path = 'data/MultnomahCounty2024_normalized.geojson'
geo_data = gpd.read_file(geojson_file_path)

# Step 1: Inspect column names
print("Column names in the dataset:")
print(geo_data.columns)

# Step 2: Filter the data to include only features in the City of Portland
portland_data = geo_data[geo_data['CITY'] == 'Portland']

# Step 3: Check for any duplicated entries in Portland data
duplicates_portland = portland_data[portland_data.duplicated(subset=['Precinct'], keep=False)]
print("\nDuplicated entries in Portland (if any):")
print(duplicates_portland.head(10))

# Step 4: Remove duplicate entries based on 'Precinct' field
unique_portland_data = portland_data.drop_duplicates(subset=['Precinct'])

# Step 5: Aggregate the votes for each candidate for Portland
total_mike_schmidt_votes_portland = unique_portland_data['Mike_Schmidt_Votes'].sum()
total_nathan_vasquez_votes_portland = unique_portland_data['Nathan_Vasquez_Votes'].sum()
total_write_in_votes_portland = unique_portland_data['Write_In_Votes'].sum()

# Print the results for verification after removing duplicates
print("\nTotal votes in Portland (after removing duplicates):")
print(f"Mike Schmidt: {total_mike_schmidt_votes_portland}")
print(f"Nathan Vasquez: {total_nathan_vasquez_votes_portland}")
print(f"Write-In: {total_write_in_votes_portland}")

# Determine the winner after removing duplicates
candidates_votes_portland = {
    'Mike Schmidt': total_mike_schmidt_votes_portland,
    'Nathan Vasquez': total_nathan_vasquez_votes_portland,
    'Write-In': total_write_in_votes_portland
}

winner_portland = max(candidates_votes_portland, key=candidates_votes_portland.get)
print(f"\nThe winner in Portland (after removing duplicates) is: {winner_portland} by {total_nathan_vasquez_votes_portland - total_mike_schmidt_votes_portland} votes")