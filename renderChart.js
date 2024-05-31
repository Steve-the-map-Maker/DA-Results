function renderCharts(districtResults, totalResults) {
    const chartsLeftContainer = document.getElementById('charts-left');
    const chartsBottomContainer = document.getElementById('charts-bottom');
    const districtNames = Object.keys(districtResults);

    // Define district colors
    const districtColors = {
        "Multnomah Co Commissioner District 1": "#ff4500", // OrangeRed
        "Multnomah Co Commissioner District 2": "#32cd32", // LimeGreen
        "Multnomah Co Commissioner District 3": "#1e90ff", // DodgerBlue
        "Multnomah Co Commissioner District 4": "#ffd700"  // Gold
    };

    // Render charts for each district
    districtNames.forEach((district, index) => {
        const chartId = `chart-${index + 1}`;
        const chartDiv = document.createElement('div');
        chartDiv.classList.add('chart-container');
        chartDiv.innerHTML = `<canvas id="${chartId}"></canvas>`;
        
        // Positioning: Districts 1 and 2 on the left, Districts 3, 4, and Total at the bottom
        if (district === "Multnomah Co Commissioner District 1" || district === "Multnomah Co Commissioner District 2") {
            chartsLeftContainer.appendChild(chartDiv);
        } else {
            chartsBottomContainer.appendChild(chartDiv);
        }

        console.log(`Chart container created and appended to DOM for ${district}.`);

        const ctx = document.getElementById(chartId).getContext('2d');
        console.log(`Creating chart for ${district} with the following data:`, {
            labels: ['Mike Schmidt', 'Nathan Vasquez', 'Write-In'],
            datasets: [{
                data: [
                    districtResults[district].Mike_Schmidt_Votes,
                    districtResults[district].Nathan_Vasquez_Votes,
                    districtResults[district].Write_In_Votes
                ],
                backgroundColor: [
                    districtColors[district], // District color for Mike Schmidt
                    '#9370DB', // Medium Purple for Nathan Vasquez
                    '#2F4F4F'  // Dark Slate Gray for Write-In
                ]
            }]
        });

        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Mike Schmidt', 'Nathan Vasquez', 'Write-In'],
                datasets: [{
                    data: [
                        districtResults[district].Mike_Schmidt_Votes,
                        districtResults[district].Nathan_Vasquez_Votes,
                        districtResults[district].Write_In_Votes
                    ],
                    backgroundColor: [
                        districtColors[district], // District color for Mike Schmidt
                        '#9370DB', // Medium Purple for Nathan Vasquez
                        '#2F4F4F'  // Dark Slate Gray for Write-In
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#e0e0e0' // Legend color for dark mode
                        }
                    },
                    title: {
                        display: true,
                        text: district,
                        color: '#e0e0e0' // Title color for dark mode
                    }
                }
            }
        });
    });

    // Render total results chart
    const totalChartId = `chart-total`;
    const totalChartDiv = document.createElement('div');
    totalChartDiv.classList.add('chart-container');
    totalChartDiv.innerHTML = `<canvas id="${totalChartId}"></canvas>`;
    chartsBottomContainer.appendChild(totalChartDiv);

    console.log('Chart container created and appended to DOM for Total Results.');

    const totalCtx = document.getElementById(totalChartId).getContext('2d');
    console.log('Creating chart for Total Results with the following data:', {
        labels: ['Mike Schmidt', 'Nathan Vasquez', 'Write-In'],
        datasets: [{
            data: [
                totalResults.Mike_Schmidt_Votes,
                totalResults.Nathan_Vasquez_Votes,
                totalResults.Write_In_Votes
            ],
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe']
        }]
    });

    new Chart(totalCtx, {
        type: 'pie',
        data: {
            labels: ['Mike Schmidt', 'Nathan Vasquez', 'Write-In'],
            datasets: [{
                data: [
                    totalResults.Mike_Schmidt_Votes,
                    totalResults.Nathan_Vasquez_Votes,
                    totalResults.Write_In_Votes
                ],
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#e0e0e0' // Legend color for dark mode
                    }
                },
                title: {
                    display: true,
                    text: 'Total Results',
                    color: '#e0e0e0' // Title color for dark mode
                }
            }
        }
    });
}
