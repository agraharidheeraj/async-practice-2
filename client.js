const fetch = require('node-fetch');

// Function to initialize the server and get the size
async function initializeServer() {
  const initializeResponse = await fetch('http://localhost:3000/initialize');
  const { size } = await initializeResponse.json();
  return size;
}

// Function to fetch values for a specific row and column
async function fetchValues(rowIndex, colIndex, size) {
  const url = `http://localhost:3000/value?rowIndex=${rowIndex}&colIndex=${colIndex}`;
  const valuesResponse = await fetch(url);
  const values = await valuesResponse.json();
  return values;
}

// Main function to fetch and process data
async function fetchAndProcessData() {
  try {
    // Initialize the server and get the size of the array
    const size = await initializeServer();
    const array = [];

    // Iterate through rows
    for (let i = 0; i < size; i++) {
      const row = [];

      // Iterate through columns with an increment of 2
      for (let j = 0; j < size; j += 2) {
        const [value1, value2] = await Promise.all([
          fetchValues(i, j),
          fetchValues(i, j + 1),
        ]);
        row.push(value1.value, value2.value);
      }

      // Push the row to the array
      array.push(row);
    }
    console.log(array);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Call the fetchAndProcessData function to start the process
fetchAndProcessData();
