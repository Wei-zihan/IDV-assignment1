const apiUrl = 'https://api.data.gov.sg/v1/environment/psi';

// Function to fetch and display the PSI data
function fetchPSIData() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const readings = data.items[0].readings;
      const tableBody = document.querySelector('#psi-table tbody');
      
      // Clear any existing table rows
      tableBody.innerHTML = '';

      // Insert new rows
      for (let key in readings) {
        if (readings.hasOwnProperty(key)) {
          let row = document.createElement('tr');
          let cell1 = document.createElement('td');
          cell1.textContent = key;
          let cell2 = document.createElement('td');
          cell2.textContent = readings[key];
          row.appendChild(cell1);
          row.appendChild(cell2);
          tableBody.appendChild(row);
        }
      }
    })
    .catch(error => {
      console.error('Error fetching PSI data:', error);
    });
}

// Call the function when the page loads
window.onload = fetchPSIData;
