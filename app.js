const apiUrl = 'https://api.data.gov.sg/v1/environment/psi';

async function fetchPSIData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const readings = data.items[0].readings;
    const tableBody = document.querySelector('#psi-table tbody');

    tableBody.innerHTML = ''; // 清空旧数据

    for (const key in readings) {
      if (readings.hasOwnProperty(key)) {
        const row = document.createElement('tr');
        const cell1 = document.createElement('td');
        cell1.textContent = key;
        const cell2 = document.createElement('td');
        cell2.textContent = readings[key];
        row.appendChild(cell1);
        row.appendChild(cell2);
        tableBody.appendChild(row);
      }
    }
  } catch (error) {
    console.error('Error fetching PSI data:', error);
    const tableBody = document.querySelector('#psi-table tbody');
    tableBody.innerHTML = `<tr><td colspan="2">Error loading data.</td></tr>`;
  }
}

window.onload = fetchPSIData;
