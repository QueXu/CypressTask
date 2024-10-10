# CypressTask

## Requirements:
-Node.js (12.x or newer)
-npm

## Installation:
1. Clone the repository:
   git clone https://github.com/QueXu/CypressTask.git
2. Navigate to the project directoryЖ
   cd CypressTask
3. Install dependencies:
   npm install

## Running Tests
To run the tests, use one of the following commands:

  To run in GUI mode:
  npx cypress open

  To run in headless mode:
  npx cypress run

## Project Structure
cypress/: Main folder for tests, including:
  
     fixtures/: Files with data for testing.
  
     integration/: Main test files.
  
     support/: Helper commands and setup.
  
     cypress.json: Cypress configuration file.

## Writing New Tests
To write new tests, simply add a new file in the integration folder and follow existing examples for the structure of the tests. 
Use Cypress commands to interact with page elements.
