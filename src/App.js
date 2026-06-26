import './CSS/App.css';
import landmarks from './data.js';
import Table from './components/Table.js';

function App() {
  return (
    <div className="App">
       <h3>Достопримечательности России</h3>
       <Table data={landmarks} amountRows="15" currentPage={3} showPagination={true} />
    </div>
  );
}

export default App;