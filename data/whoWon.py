import geopandas as gpd

# Load the GeoJSON file
geojson_file_path = 'data/MultnomahCounty2024_normalized.geojson'
geo_data = gpd.read_file(geojson_file_path)

# Aggregate the votes for each candidate for the entire county
total_mike_schmidt_votes = geo_data['Mike_Schmidt_Votes'].sum()
total_nathan_vasquez_votes = geo_data['Nathan_Vasquez_Votes'].sum()
total_write_in_votes = geo_data['Write_In_Votes'].sum()

# Print the results for verification
print(f"Total votes in Multnomah County:\n"
      f"Mike Schmidt: {total_mike_schmidt_votes}\n"
      f"Nathan Vasquez: {total_nathan_vasquez_votes}\n"
      f"Write-In: {total_write_in_votes}\n")

# Determine the winner
candidates_votes = {
    'Mike Schmidt': total_mike_schmidt_votes,
    'Nathan Vasquez': total_nathan_vasquez_votes,
    'Write-In': total_write_in_votes
}

winner = max(candidates_votes, key=candidates_votes.get)
print(f"The winner in Multnomah County is: {winner} by {total_nathan_vasquez_votes - total_mike_schmidt_votes}")