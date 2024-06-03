map.on('load', () => {
  fetch('data/MultnomahCounty2024_cleaned.geojson')
    .then(response => response.json())
    .then(geojsonData => {
      console.log('Fetched GeoJSON data:', geojsonData); // Log the data

      // Process the GeoJSON data to extract results for all districts
      const districtResults = {
        "Multnomah Co Commissioner District 1": { Mike_Schmidt_Votes: 0, Nathan_Vasquez_Votes: 0, Write_In_Votes: 0 },
        "Multnomah Co Commissioner District 2": { Mike_Schmidt_Votes: 0, Nathan_Vasquez_Votes: 0, Write_In_Votes: 0 },
        "Multnomah Co Commissioner District 3": { Mike_Schmidt_Votes: 0, Nathan_Vasquez_Votes: 0, Write_In_Votes: 0 },
        "Multnomah Co Commissioner District 4": { Mike_Schmidt_Votes: 0, Nathan_Vasquez_Votes: 0, Write_In_Votes: 0 }
      };

      // Initialize total results
      const totalResults = { Mike_Schmidt_Votes: 0, Nathan_Vasquez_Votes: 0, Write_In_Votes: 0 };

      geojsonData.features.forEach(feature => {
        const district = feature.properties.Mult_Comm;
        if (districtResults[district]) {
          districtResults[district].Mike_Schmidt_Votes += feature.properties.Mike_Schmidt_Votes;
          districtResults[district].Nathan_Vasquez_Votes += feature.properties.Nathan_Vasquez_Votes;
          districtResults[district].Write_In_Votes += feature.properties.Write_In_Votes;

          // Accumulate total results
          totalResults.Mike_Schmidt_Votes += feature.properties.Mike_Schmidt_Votes;
          totalResults.Nathan_Vasquez_Votes += feature.properties.Nathan_Vasquez_Votes;
          totalResults.Write_In_Votes += feature.properties.Write_In_Votes;
        }
      });

      console.log('Processed District Results:', districtResults);
      console.log('Total Results:', totalResults);

      // Render all charts including the total results chart
      renderCharts(districtResults, totalResults);

      // Add event listener to the button for charts
      document.getElementById('show-portland-charts').addEventListener('click', () => {
        if (!showingPortland) {
          // Filter GeoJSON data to include only features in the City of Portland
          const portlandData = {
            ...geojsonData,
            features: geojsonData.features.filter(feature => feature.properties.CITY === 'Portland')
          };

          // Process the filtered GeoJSON data to extract results for Portland districts
          const portlandDistrictResults = {
            "Multnomah Co Commissioner District 1": { Mike_Schmidt_Votes: 0, Nathan_Vasquez_Votes: 0, Write_In_Votes: 0 },
            "Multnomah Co Commissioner District 2": { Mike_Schmidt_Votes: 0, Nathan_Vasquez_Votes: 0, Write_In_Votes: 0 },
            "Multnomah Co Commissioner District 3": { Mike_Schmidt_Votes: 0, Nathan_Vasquez_Votes: 0, Write_In_Votes: 0 },
            "Multnomah Co Commissioner District 4": { Mike_Schmidt_Votes: 0, Nathan_Vasquez_Votes: 0, Write_In_Votes: 0 }
          };

          const portlandTotalResults = { Mike_Schmidt_Votes: 0, Nathan_Vasquez_Votes: 0, Write_In_Votes: 0 };

          portlandData.features.forEach(feature => {
            const district = feature.properties.Mult_Comm;
            if (portlandDistrictResults[district]) {
              portlandDistrictResults[district].Mike_Schmidt_Votes += feature.properties.Mike_Schmidt_Votes;
              portlandDistrictResults[district].Nathan_Vasquez_Votes += feature.properties.Nathan_Vasquez_Votes;
              portlandDistrictResults[district].Write_In_Votes += feature.properties.Write_In_Votes;

              portlandTotalResults.Mike_Schmidt_Votes += feature.properties.Mike_Schmidt_Votes;
              portlandTotalResults.Nathan_Vasquez_Votes += feature.properties.Nathan_Vasquez_Votes;
              portlandTotalResults.Write_In_Votes += feature.properties.Write_In_Votes;
            }
          });

          // Render charts with Portland data
          renderCharts(portlandDistrictResults, portlandTotalResults);
          document.getElementById('show-portland-charts').textContent = 'Show Full Chart';
        } else {
          // Reset to the original GeoJSON data for charts
          renderCharts(districtResults, totalResults);
          document.getElementById('show-portland-charts').textContent = 'Show Only Portland';
        }

        // Toggle the state
        showingPortland = !showingPortland;
      });

    })
    .catch(error => {
      console.error('Error fetching GeoJSON data:', error);
    });
});
