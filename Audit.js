const xlsx = require('xlsx');

// Read spreadsheets
const hr_current = xlsx.readFile('hr_current.xlsx').Sheets['Sheet1'];
const it_current = xlsx.readFile('it_current.xlsx').Sheets['Sheet1'];

// Convert to JSON
const hrCurrentJSON = xlsx.utils.sheet_to_json(hr_current);
const itCurrentJSON = xlsx.utils.sheet_to_json(it_current);

// Compare data
const discrepancies = hrCurrentJSON.filter(hr => !itCurrentJSON.some(it => it.EmployeeID === hr.EmployeeID));

// Write discrepancies to new spreadsheet
const ws = xlsx.utils.json_to_sheet(discrepancies);
const wb = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(wb, ws, 'Discrepancies');
xlsx.writeFile(wb, 'discrepancies.xlsx');
