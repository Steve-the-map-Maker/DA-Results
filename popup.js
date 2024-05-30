 // Add click event listener for the layer
 map.on('click', 'multnomah-layer', (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ['multnomah-layer']
    });

    if (!features.length) {
      return;
    }

    const feature = features[0];

    // Create the pop-up
    const popup = new maplibregl.Popup({ offset: [0, -15] })
      .setLngLat(e.lngLat)
      .setHTML(`
      
        <strong>Precinct</strong><br>
        Percentage: ${feature.properties.Precinct}<br>
        <strong>Mike Schmidt</strong><br>
        Votes: ${feature.properties.Mike_Schmidt_Votes}<br><br>
        <strong>Nathan Vasquez</strong><br>
        Percentage: ${feature.properties.Nathan_Vasquez_Percentage}<br>
        Votes: ${feature.properties.Nathan_Vasquez_Votes}<br><br>
        <strong>Write-In</strong><br>
        Percentage: ${feature.properties.Write_In_Percentage}<br>
        Votes: ${feature.properties.Write_In_Votes}
      `)
      .addTo(map);
  });




// Add event listener to the button
document.getElementById('show-portland').addEventListener('click', () => {
    if (!showingPortland) {
      // Filter GeoJSON data to include only features in the City of Portland
      const portlandData = {
        ...originalGeojsonData,
        features: originalGeojsonData.features.filter(feature => feature.properties.CITY === 'Portland')
      };
  
      // Update the GeoJSON source with the filtered data
      map.getSource('multnomah').setData(portlandData);
      document.getElementById('show-portland').textContent = 'Show Full Map';
    } else {
      // Reset to the original GeoJSON data
      map.getSource('multnomah').setData(originalGeojsonData);
      document.getElementById('show-portland').textContent = 'Show Only Portland';
    }
  
    // Toggle the state
    showingPortland = !showingPortland;
  });