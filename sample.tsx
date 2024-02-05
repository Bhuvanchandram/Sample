import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import ScatterPlot from './ScatterPlot';

// Sample data
const data = [
  { x: 1, y: 2, cohort: 'A', biasType: 'B', biasScore: 'C', headcount: 'D', manifestation: 'E' },
  // Add more data points here
];

function Index() {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipTop, setTooltipTop] = useState(0);
  const [tooltipLeft, setTooltipLeft] = useState(0);

  const showTooltip = useCallback((tooltipData) => {
    setTooltipOpen(true);
    setTooltipData(tooltipData.tooltipData);
    setTooltipTop(tooltipData.tooltipTop);
    setTooltipLeft(tooltipData.tooltipLeft);
  }, []);

  const hideTooltip = useCallback(() => {
    setTooltipOpen(false);
  }, []);

  return (
    <ScatterPlot
      width={500}
      height={500}
      data={data}
      xLabel="X Axis"
      yLabel="Y Axis"
      tooltipOpen={tooltipOpen}
      tooltipLeft={tooltipLeft}
      tooltipTop={tooltipTop}
      tooltipData={tooltipData}
      hideTooltip={hideTooltip}
      showTooltip={showTooltip}
    />
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);
