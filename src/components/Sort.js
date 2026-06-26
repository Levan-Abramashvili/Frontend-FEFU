import { useState } from 'react';

const Sort = (props) => {
    const columns = props.columns;
    
    const [sort1, setSort1] = useState('');
    const [sort2, setSort2] = useState('');
    const [sort3, setSort3] = useState('');
    const [desc1, setDesc1] = useState(false);
    const [desc2, setDesc2] = useState(false);
    const [desc3, setDesc3] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSort({
            level1: { column: sort1, desc: desc1 },
            level2: { column: sort2, desc: desc2 },
            level3: { column: sort3, desc: desc3 }
        });
    };

    const handleReset = () => {
        setSort1('');
        setSort2('');
        setSort3('');
        setDesc1(false);
        setDesc2(false);
        setDesc3(false);
        props.onSort(null);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h4>Сортировка</h4>
            <p>
                <select 
                    value={sort1} 
                    onChange={(e) => {
                        setSort1(e.target.value);
                        setSort2('');
                        setSort3('');
                        setDesc2(false);
                        setDesc3(false);
                    }}
                >
                    <option value="">Нет</option>
                    {columns.map((col, i) => (
                        <option key={`l1-${i}`} value={col}>{col}</option>
                    ))}
                </select>
                    <label>
                        <input 
                            type="checkbox" 
                            checked={desc1} 
                            onChange={(e) => setDesc1(e.target.checked)} 
                        />
                        по убыванию?
                    </label>
            </p>
            
            <p>
                <select 
                    value={sort2} 
                    onChange={(e) => {
                        setSort2(e.target.value);
                        setSort3('');
                        setDesc3(false);
                    }}
                >
                    <option value="">Нет</option>
                    {columns.filter(col => col !== sort1).map((col, i) => (
                        <option key={`l2-${i}`} value={col}>{col}</option>
                    ))}
                </select>
    
                    <label>
                        <input 
                            type="checkbox" 
                            checked={desc2} 
                            disabled={!sort1}
                            onChange={(e) => setDesc2(e.target.checked)} 
                        />
                        по убыванию?
                    </label>
            </p>
            
            <p>
                <select 
                    value={sort3} 
                    onChange={(e) => setSort3(e.target.value)}
                >
                    <option value="">Нет</option>
                    {columns.filter(col => col !== sort1 && col !== sort2).map((col, i) => (
                        <option key={`l3-${i}`} value={col}>{col}</option>
                    ))}
                </select>
                    <label>
                        <input 
                            type="checkbox" 
                            checked={desc3} 
                            disabled={!sort2}
                            onChange={(e) => setDesc3(e.target.checked)} 
                        />
                        по убыванию?
                    </label>
            </p>
            
            <p>
                <button type="submit">Сортировать</button>
                <button type="button" onClick={handleReset}>Сбросить</button>
            </p>
        </form>
    );
};

export default Sort;