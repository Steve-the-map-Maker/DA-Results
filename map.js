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

let originalGeojsonData;
let showingPortland = false;

map.on('load', () => {
  // Fetch GeoJSON data
  fetch('data/MultnomahCounty2024_normalized.geojson')
    .then(response => response.json())
    .then(geojsonData => {
      console.log('Fetched GeoJSON data:', geojsonData); // Log the data

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
          ],
          'fill-outline-color': '#000' // Outline color (black)
        }
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

