console.log("coming from map.js file");

const style = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "&copy; OpenStreetMap Contributors",
      maxzoom: 21,
    },
  },
  layers: [
    {
      id: "osm",
      type: "raster",
      source: "osm",
    },
  ],
};

const map = new maplibregl.Map({
  container: "map",
  style: style,
  center: [-122.604918, 45.514579], // Portland coordinates
  zoom: 10,
});

map.on('load', () => {
  // Load and parse the CSV data
  d3.csv('data/election_results.csv').then(csvData => {
    // Convert CSV data to a dictionary for quick lookup
    const csvDict = {};
    csvData.forEach(row => {
      csvDict[row.precinct_id] = row;
    });

    // Fetch GeoJSON data
    fetch('data/MultnomahCounty2024_transformed.geojson')
      .then(response => response.json())
      .then(geojsonData => {
        console.log('Fetched GeoJSON data:', geojsonData); // Log the data

        // Add GeoJSON data as a new source
        map.addSource('multnomah', {
          type: 'geojson',
          data: geojsonData
        });

        // Add a new layer to visualize the GeoJSON data
        map.addLayer({
          id: 'multnomah-layer',
          type: 'fill',
          source: 'multnomah',
          paint: {
            'fill-color': '#088', // Fill color
            'fill-opacity': 0.8,  // Fill opacity
            'fill-outline-color': '#000' // Outline color (black)
          }
        });

        // Add a popup to display CSV data
        const popup = new maplibregl.Popup({
          closeButton: false,
          closeOnClick: false
        });

        // Add event listeners for the popup
        map.on('mousemove', 'multnomah-layer', (e) => {
          map.getCanvas().style.cursor = 'pointer';

          const feature = e.features[0];
          const precinctId = feature.properties.Precinct;
          console.log(`Hovered over precinct: ${precinctId}`); // Log the precinct ID
          
          const precinctData = csvDict[precinctId];
          console.log(`Data for precinct ${precinctId}:`, precinctData); // Log the precinct data

          if (precinctData) {
            const popupContent = `
              <strong>Precinct:</strong> ${precinctId}<br>
              <strong>Votes:</strong> ${precinctData.votes}
            `;

            popup.setLngLat(e.lngLat)
                 .setHTML(popupContent)
                 .addTo(map);
          }
        });

        map.on('mouseleave', 'multnomah-layer', () => {
          map.getCanvas().style.cursor = '';
          popup.remove();
        });
      })
      .catch(error => console.error('Error loading GeoJSON data:', error));
  })
  .catch(error => console.error('Error loading CSV data:', error));
});