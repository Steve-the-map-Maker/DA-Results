map.on('load', () => {
  // Fetch GeoJSON data
  fetch('data/MultnomahCounty2024_normalized.geojson')
    .then(response => response.json())
    .then(geojsonData => {
      // console.log('Fetched GeoJSON data:', geojsonData); // Log the data

      originalGeojsonData = geojsonData; // Store original data

      // Add GeoJSON data as a new source
      map.addSource('multnomah', {
        type: 'geojson',
        data: geojsonData
      });

      // Add a new layer to visualize the GeoJSON data with a color gradient based on Nathan Vasquez Percentage
      map.addLayer({
        id: 'multnomah-layer',
        type: 'fill',
        source: 'multnomah',
        paint: {
          'fill-color': [
            'interpolate',
            ['linear'],
            ['to-number', ['slice', ['get', 'Nathan_Vasquez_Percentage'], 0, -1]],
            0, '#f2f0f7',
            10, '#dadaeb',
            20, '#bcbddc',
            30, '#9e9ac8',
            40, '#756bb1',
            50, '#54278f',
            60, '#3f007d',
            70, '#2d004b',
            80, '#1a0033',
            90, '#0a0017',
            100, '#000000'
          ],
          'fill-opacity': [
            'interpolate',
            ['linear'],
            ['get', 'Normalized_Votes'],
            0, 0.1,
            1, 0.8
          ]
        }
      });

      // Define districts and their respective colors
      const districts = [
        "Multnomah Co Commissioner District 1",
        "Multnomah Co Commissioner District 2",
        "Multnomah Co Commissioner District 3",
        "Multnomah Co Commissioner District 4"
      ];

      const colors = [
        '#FF6F61', // Light Coral
        '#3CB371', // Medium Sea Green
        '#6495ED', // Cornflower Blue
        '#DAA520'  // Medium Orchid
      ];

      districts.forEach((district, index) => {
        map.addLayer({
          id: `outline-${index}`,
          type: 'line',
          source: 'multnomah',
          filter: ['==', ['get', 'Mult_Comm'], district],
          paint: {
            'line-color': colors[index], // Use the color corresponding to the district
            'line-width': 3 // Adjust the thickness of the outline here
          }
        });
      });

      // Change the cursor to a pointer when the mouse is over the multnomah-layer
      map.on('mouseenter', 'multnomah-layer', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to default when it leaves
      map.on('mouseleave', 'multnomah-layer', () => {
        map.getCanvas().style.cursor = '';
      });
    })
    .catch(error => {
      console.error('Error fetching GeoJSON data:', error);
    });
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