/*
   компонент, для фильтрации таблицы
   пропсы:
      fullData - полные данные, по которым формировалась таблица при загрузке страницы
      data - данные для фильтрации
      filtering - функция обновления данных для фильтрации
*/

const Filter = (props) => {
    
    const handleSubmit = (event) => {        
        event.preventDefault();		

        // создаем словарь со значениями текстовых полей
        const filterField = {
            "Название": event.target["structure"].value.toLowerCase(),
            "Тематика": event.target["type"].value.toLowerCase(),
            "Место нахождения": event.target["location"].value.toLowerCase(),
        };
        
        const yearFrom = Number(event.target["yearFrom"].value) || 0;
        const yearTo = Number(event.target["yearTo"].value) || Infinity;
        const visitsFrom = Number(event.target["visitsFrom"].value) || 0;
        const visitsTo = Number(event.target["visitsTo"].value) || Infinity;
        
        // фильтруем данные по значениям всех полей формы
        let arr = props.fullData;
        
        // текстовая фильтрация (по includes)
        for(const key in filterField) {
            if (filterField[key]) {  // если поле не пустое
                arr = arr.filter(item => 
                    item[key].toLowerCase().includes(filterField[key])
                );  
            }
        }
        
        arr = arr.filter(item => {
            const year = Number(item["Год открытия"]);
            const visits = Number(item["Посещаемость в год"]);
            
            const matchYear = year >= yearFrom && year <= yearTo;
            const matchVisits = visits >= visitsFrom && visits <= visitsTo;
            
            return matchYear && matchVisits;
        });
                
        // передаем родительскому компоненту новое состояние
        props.filtering(arr);
    }

    // Очистка формы
    const handleClear = (event) => {
        const form = event.target.form;
        form.reset();
        props.filtering(props.fullData);
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>
                <label>Название:</label>
                <input name="structure" type="text" />
            </p>
            <p>
                <label>Тематика:</label>		
                <input name="type" type="text" />
            </p>
            <p>
                <label>Место нахождения:</label>
                <input name="location" type="text" />
            </p>
            <p>
                <label>Год от:</label>
                <input name="yearFrom" type="number" />
            </p>
            <p>
                <label>Год до:</label>
                <input name="yearTo" type="number" />
            </p>
            <p>
                <label>Посещаемость от:</label>
                <input name="visitsFrom" type="number" />
            </p>
            <p>
                <label>Посещаемость до:</label>
                <input name="visitsTo" type="number" />
            </p>
            <p>         
                <button type="submit">Фильтровать</button>   

                <button type="button" onClick={handleClear}>Очистить</button>
            </p>  
        </form> 
    )
}

export default Filter;