
import React from 'react';
import './LayoutComponent.scss';

interface LayoutComponentProps {
  // You can define props here if needed
}

const LayoutComponent: React.FC<LayoutComponentProps> = () => {

  const handleButtonClick = (buttonValue: string) => {
    console.log(`Button clicked with value: ${buttonValue}`);
    // Replace with your actual onClick logic
    alert(`You clicked: ${buttonValue}`);
  };

  // Hardcoded button values
  const buttonValues: string[] = [
    'Button 1',
    'Button 2',
    'Button 3',
    'Button 4',
    'Button 5',
    'Button 6',
  ];

  return (
    <div className="container">
      <div className="row top-row">
        <div className="col col-25 logo-container">
          {/* Replace with your logo image */}
          <img src="placeholder-logo.png" alt="Logo" className="logo-image" />
        </div>
        <div className="col col-75 text-container">
          {/* Hardcoded text */}
          <p>
            This is the hardcoded text that occupies 75% of the top row.
            It can be a longer description or any other information you need to display here.
          </p>
        </div>
      </div>
      <div className="row bottom-row">
        <div className="col col-25 button-column">
          {buttonValues.map((value) => (
            <button
              key={value}
              className="action-button"
              onClick={() => handleButtonClick(value)}
            >
              {value}
            </button>
          ))}
        </div>
        <div className="col col-50 table-column">
          {/* Insert your table component or HTML here */}
          <h3>Table Section</h3>
          <p>This is where your table content will go.</p>
          {/* Example Table Placeholder */}
          <table>
            <thead>
              <tr>
                <th>Header 1</th>
                <th>Header 2</th>
              {/* Add more headers as needed */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Data 1</td>
                <td>Data 2</td>
              {/* Add more data rows as needed */}
              </tr>
              <tr>
                <td>Data 3</td>
                <td>Data 4</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col col-25 empty-column">
          {/* This column is intentionally left empty for now */}
          <h3>Empty Section</h3>
          <p>Content for this section can be added later.</p>
        </div>
      </div>
    </div>
  );
};

export default LayoutComponent;


.container {
  display: flex;
  flex-direction: column;
  height: 100vh; // Example: make container take full viewport height
  // The background color for the outermost div should be applied here or to its parent in your app
  // background-color: #abcdef; // Example: Apply your desired background color here
}

.row {
  display: flex;
  width: 100%;

  &.top-row {
    flex: 0 0 25%; // Top row occupies 25% of container height
  }

  &.bottom-row {
    flex: 1; // Bottom row occupies the remaining height
  }
}

.col {
  display: flex;
  // Columns are always flex containers
  flex-direction: column; // Ensure content within columns stacks vertically
  padding: 10px; // Add some padding
  background-color: transparent; // Ensure transparent background for all columns
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color removed for transparency
}

.logo-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; // Ensures the image fits without stretching
}

.text-container {
  // background-color removed for transparency
}

.button-column {
  // background-color removed for transparency
  display: flex;
  flex-direction: column; // Keep buttons stacked vertically
  justify-content: space-evenly; // Evenly space buttons vertically

  .action-button {
    margin-bottom: 10px; // Add some space between buttons
    padding: 10px;
    cursor: pointer;
    background-color: #ffffff; // Example: button background, change as needed
    border: 1px solid #ccc; // Example: button border
  }
}

.table-column {
  // background-color removed for transparency
  // Add styling for your table here
  table {
    width: 100%;
    border-collapse: collapse;
    th, td {
      border: 1px solid #000;
      padding: 8px;
      text-align: left;
    }
  }
}

.empty-column {
  // background-color removed for transparency
}

// Responsiveness using Media Queries
@media (min-width: 768px) { // Apply these styles for screens wider than 768px
  .row {
    flex-direction: row; // Arrange columns in a row
  }

  .col {
    // flex-direction remains column for content within the grid cell

    &.col-25 {
      flex-basis: 25%;
      flex: 1; // Allow flexing to distribute space
    }

    &.col-75 {
      flex-basis: 75%;
      flex: 3; // Allow flexing to distribute space (proportionally 3 times col-25)
    }

    &.col-50 {
      flex-basis: 50%;
      flex: 2; // Allow flexing to distribute space (proportionally 2 times col-25)
    }
  }

  .button-column {
     flex-direction: column; // Explicitly keep buttons vertical
     justify-content: space-evenly; // Keep vertical spacing
      .action-button {
        margin-right: 0; // Remove any potential horizontal margin from previous example
      }
  }
}
