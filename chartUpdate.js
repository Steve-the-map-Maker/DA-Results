let originalGeojsonData;
let showingPortland = false;
let existingCharts = [];

function filterPortlandData(geojsonData) {
  return {
    ...geojsonData,
    features: geojsonData.features.filter(feature => feature.properties.CITY === "Portland")
  };
}

function updateCharts(geojsonData) {
  const districtResults = {
    "Multnomah Co Commissioner District 1": { Mike_Schmidt_Votes: 0, Nathan_Vasquez_Votes: 0, Write_In_Votes: 0 },
    "Multnomah Co Commissioner District 2": { Mike_Schmidt_Votes: 0, Nathan_Vasquez_Votes: 0, Write_In_Votes: 0 },
    "Multnomah Co Commissioner District 3": { Mike_Schmidt_Votes: 0, Nathan_Vasquez_Votes: 0, Write_In_Votes: 0 },
    "Multnomah Co Commissioner District 4": { Mike_Schmidt_Votes: 0, Nathan_Vasquez_Votes: 0, Write_In_Votes: 0 }
  };

  const totalResults = { Mike_Schmidt_Votes: 0, Nathan_Vasquez_Votes: 0, Write_In_Votes: 0 };

  geojsonData.features.forEach(feature => {
    const district = feature.properties.Mult_Comm;
    if (districtResults[district]) {
      districtResults[district].Mike_Schmidt_Votes += feature.properties.Mike_Schmidt_Votes;
      districtResults[district].Nathan_Vasquez_Votes += feature.properties.Nathan_Vasquez_Votes;
      districtResults[district].Write_In_Votes += feature.properties.Write_In_Votes;

      totalResults.Mike_Schmidt_Votes += feature.properties.Mike_Schmidt_Votes;
      totalResults.Nathan_Vasquez_Votes += feature.properties.Nathan_Vasquez_Votes;
      totalResults.Write_In_Votes += feature.properties.Write_In_Votes;
    }
  });

  renderCharts(districtResults, totalResults);
}

document.getElementById('show-portland').addEventListener('click', () => {
  showingPortland = !showingPortland;

  const filteredData = showingPortland ? filterPortlandData(originalGeojsonData) : originalGeojsonData;
  updateCharts(filteredData);
});

// Ensure to fetch the GeoJSON data and store it in originalGeojsonData
fetch('data/MultnomahCounty2024_cleaned.geojson')
  .then(response => response.json())
  .then(geojsonData => {
    originalGeojsonData = geojsonData;
    updateCharts(originalGeojsonData); // Initial render
  })
  .catch(error => {
    console.error('Error fetching GeoJSON data:', error);
  });