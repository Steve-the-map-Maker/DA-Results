function TotalChart(chartsBottomContainer, totalResults) {
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
  
    const totalChart = new Chart(totalCtx, {
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
            color: '#e0e0e0'
          }
        }
      }
    });
  
    // Store the created chart instance
    existingCharts.push(totalChart);
  }