import { useState } from "react";
import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';

const Table = (props) => {

  const [activePage, setActivePage] = useState(1);
  const [dataTable, setDataTable] = useState(props.data);

  const updateDataTable = (value) => {
    setDataTable(value);
    setActivePage(1);
  
    if (props.onFilter) {
      props.onFilter(value);
    }
  };

  const changeActive = (event) => {
    setActivePage(Number(event.target.innerHTML));
  };

  if (!props.paginate) {
    return (
      <table>
        <TableHead head={Object.keys(props.data[0])} />
        <TableBody
          body={dataTable}
          amountRows={dataTable.length}
          numPage={1}
        />
      </table>
    );
  }

  const n = Math.ceil(dataTable.length / props.amountRows);
  const arr = Array.from({ length: n }, (_, i) => i + 1);

  const pages = arr.map((item, index) => (
    <span
      key={index}
      onClick={changeActive}
      className={item === activePage ? "active-page" : ""}
    >
      {item}
    </span>
  ));

  return (
    <>
      <h4>Фильтры</h4>
      <Filter
        filtering={updateDataTable}
        data={dataTable}
        fullData={props.data}
      />
      <table>
        <TableHead head={Object.keys(props.data[0])} />
        <TableBody
          body={dataTable}
          amountRows={props.amountRows}
          numPage={activePage}
        />
      </table>
      <div>
        {pages}
      </div>
    </>
  );
}

export default Table;
