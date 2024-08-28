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
  <div class="maplibre-popup">
    <strong>District: ${feature.properties.Mult_Comm}</strong><br>
    <strong>Precinct: ${feature.properties.Precinct}</strong><br><br>
    <strong>Mike Schmidt</strong><br>
    Votes: ${feature.properties.Mike_Schmidt_Votes}<br>
    Percentage: ${feature.properties.Mike_Schmidt_Percentage}<br><br>
    <strong>Nathan Vasquez</strong><br>
    Percentage: ${feature.properties.Nathan_Vasquez_Percentage}<br>
    Votes: ${feature.properties.Nathan_Vasquez_Votes}<br><br>
    <strong>Write-In</strong><br>
    Percentage: ${feature.properties.Write_In_Percentage}<br>
    Votes: ${feature.properties.Write_In_Votes}
  </div>
`)
.addTo(map);
});