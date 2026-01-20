// Simple script to test the API directly
const url = 'http://localhost:8080/api/scrape/hackerrank/rohanrathod54321';
console.log('Fetching:', url);

fetch(url)
  .then(res => res.json())
  .then(data => console.log('Response:', JSON.stringify(data, null, 2)))
  .catch(err => console.error('Fetch Error:', err));
