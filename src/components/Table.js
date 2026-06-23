import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import { useState } from 'react';

const Table = (props) => {
    const [activePage, setActivePage] = useState(1);
    const amountRows = Number(props.amountRows);
    
    const [dataTable, setDataTable] = useState(props.data);
    
    const updateDataTable = (value) => {
        setDataTable(value);
        setActivePage(1);
    };
    
    const n = Math.ceil(dataTable.length / amountRows); 
    const arr = Array.from({ length: n }, (v, i) => i + 1);
    
    const changeActive = (event) => {
        setActivePage(Number(event.target.innerHTML));
    };
    
    const pages = arr.map((item, index) =>  
         <span 
             key={index} 
             className={item === activePage ? "page-active" : "page"}
             onClick={changeActive}
         >
             {item}
         </span>
    );

    return( 
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

        {props.showPagination !== false && n > 0 && (
            <div className="pagination">
                {pages}
            </div>
        )}
      </>   
    )   
}

export default Table;