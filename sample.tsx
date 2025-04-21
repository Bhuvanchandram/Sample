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
}

.top-row {
  height: 60px; // Set a fixed height for the header row (adjust as needed)
  flex-shrink: 0; // Prevent the top row from shrinking
  // flex-basis and flex-grow are not needed when height is fixed in a column flex container
}

.bottom-row {
  flex: 1; // Allow the bottom row to grow and occupy the remaining height
}

.col {
  display: flex;
  // Columns are always flex containers
  flex-direction: column; // Ensure content within columns stacks vertically on small screens
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
  // Ensure text aligns nicely within the fixed header height
  display: flex;
  align-items: center; // Vertically center the text
  // overflow: hidden; // Optional: Hide overflowing text if it exceeds the container height
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
    // Default flex properties for columns in a row on wider screens
    flex-basis: 0; // Reset flex-basis
    flex-grow: 1; // Allow columns to grow based on flex-grow value
  }

  // Specific width distribution for the TOP row columns
  .top-row {
    .col-25 { // Logo column
      flex-basis: 25%;
      flex-grow: 0; // Prevent growing beyond 25%
      width: 25%; // Explicit width for clarity
    }
    .col-75 { // Text column
      flex-basis: 75%;
      flex-grow: 0; // Prevent growing beyond 75%
      width: 75%; // Explicit width for clarity
      // overflow: hidden; // Optional: Hide overflowing text if it exceeds the container height
    }
  }


  // Specific width distribution for the BOTTOM row columns
  .bottom-row {
    .button-column { // First column of bottom row
      flex-basis: 10%;
      flex-grow: 0; // Prevent growing beyond 10%
      width: 10%; // Explicit width for clarity
    }
    .table-column { // Middle column of bottom row
      flex-basis: 80%;
      flex-grow: 0; // Prevent growing beyond 80%
      width: 80%; // Explicit width for clarity
    }
    .empty-column { // Last column of bottom row
      flex-basis: 10%;
      flex-grow: 0; // Prevent growing beyond 10%
      width: 10%; // Explicit width for clarity
    }
  }


  .button-column {
     flex-direction: column; // Explicitly keep buttons vertical
     justify-content: space-evenly; // Keep vertical spacing
      .action-button {
        margin-right: 0; // Ensure no horizontal margin
      }
  }
   .text-container {
      align-items: center; // Vertically center text when in a row
   }
}
