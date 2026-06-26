import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import Sort from './Sort.js';
import { useState } from 'react';

const Table = (props) => {
    const [activePage, setActivePage] = useState(1);
    const amountRows = Number(props.amountRows);
    
    const [dataTable, setDataTable] = useState(props.data);
    const [filteredData, setFilteredData] = useState(props.data);
    
    const updateDataTable = (value) => {
        setFilteredData(value);
        setDataTable(value);
        setActivePage(1);
        props.onDataChange(value);
    };
    
    const handleSort = (config) => {
        if (!config || (!config.level1.column && !config.level2.column && !config.level3.column)) {
            setDataTable([...filteredData]);
            props.onDataChange([...filteredData]);
            return;
        }
        
        const sorted = [...filteredData].sort((a, b) => {
            let result = 0;
            
            if (config.level1.column) {
                result = compare(a[config.level1.column], b[config.level1.column]);
                if (config.level1.desc) result = -result;
                if (result !== 0) return result;
            }
            
            if (config.level2.column) {
                result = compare(a[config.level2.column], b[config.level2.column]);
                if (config.level2.desc) result = -result;
                if (result !== 0) return result;
            }
            
            if (config.level3.column) {
                result = compare(a[config.level3.column], b[config.level3.column]);
                if (config.level3.desc) result = -result;
                if (result !== 0) return result;
            }
            
            return 0;
        });
        
        setDataTable(sorted);
        setActivePage(1);
        props.onDataChange(sorted);
    };
    
    const compare = (a, b) => {
        if (typeof a === 'number' && typeof b === 'number') {
            return a - b;
        }
        return String(a).localeCompare(String(b));
    };
    
    const n = Math.ceil(dataTable.length / amountRows);
    const pages = Array.from({ length: n }, (v, i) => i + 1);

    return (
        <>
            <h4>Фильтры</h4>
            <Filter filtering={updateDataTable} data={dataTable} fullData={props.data} />
            <Sort columns={Object.keys(props.data[0])} onSort={handleSort} />
            
            <table>
                <TableHead head={Object.keys(props.data[0])} />
                <TableBody body={dataTable} amountRows={amountRows} numPage={activePage} />
            </table>

            {n > 0 && (
                <div className="pagination">
                    {pages.map((item, i) => (
                        <span key={i} className={item === activePage ? "page-active" : "page"} onClick={() => setActivePage(item)}>
                            {item}
                        </span>
                    ))}
                </div>
            )}
        </>
    );
}

export default Table;