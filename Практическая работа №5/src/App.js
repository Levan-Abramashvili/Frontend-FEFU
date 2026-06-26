import './CSS/App.css';
import landmarks from './data.js';
import Table from './components/Table.js';
import Chart from './components/Chart.js';
import { useState } from 'react';

function App() {
  const [tableData, setTableData] = useState(landmarks);

  return (
    <div className="App">
      <h3>Достопримечательности России</h3>
      <Chart data={tableData} />
      <Table
        data={landmarks}
        amountRows={15}
        paginate={true}
        onDataChange={setTableData}
      />
    </div>
  );
}

export default App;