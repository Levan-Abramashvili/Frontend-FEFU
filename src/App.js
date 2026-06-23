import './CSS/App.css';
import buildings from './data.js';
import Table from './components/Table.js';
import SelectComp from './components/Select.js';

function App() {
  return (
    <div className="App">
       <h3>Самые высокие здания и сооружения</h3>
       <Table data={buildings} amountRows="15" currentPage={3} showPagination={true} />
        <SelectComp />
    </div>
  );
}

export default App;