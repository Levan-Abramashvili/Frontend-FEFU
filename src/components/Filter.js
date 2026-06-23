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
            "Тип": event.target["type"].value.toLowerCase(),
            "Страна": event.target["country"].value.toLowerCase(),
            "Город": event.target["city"].value.toLowerCase()
        };
        
        // числовые фильтры (интервалы) - Задание 3
        const yearFrom = Number(event.target["yearFrom"].value) || 0;
        const yearTo = Number(event.target["yearTo"].value) || Infinity;
        const heightFrom = Number(event.target["heightFrom"].value) || 0;
        const heightTo = Number(event.target["heightTo"].value) || Infinity;
        
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
        
        // числовая фильтрация (интервалы) - Задание 3
        arr = arr.filter(item => {
            const year = Number(item["Год"]);
            const height = Number(item["Высота"]);
            
            const matchYear = year >= yearFrom && year <= yearTo;
            const matchHeight = height >= heightFrom && height <= heightTo;
            
            return matchYear && matchHeight;
        });
                
        // передаем родительскому компоненту новое состояние
        props.filtering(arr);
    }

    // Задание 4: очистка формы и возврат исходных данных
    const handleClear = (event) => {
        // очищаем все поля формы
        const form = event.target.form;
        form.reset();
        
        // возвращаем исходные данные
        props.filtering(props.fullData);
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>
                <label>Название:</label>
                <input name="structure" type="text" />
            </p>
            <p>
                <label>Тип:</label>		
                <input name="type" type="text" />
            </p>
            {/* Задание 2: поля Страна и Город */}
            <p>
                <label>Страна:</label>
                <input name="country" type="text" />
            </p>
            <p>
                <label>Город:</label>
                <input name="city" type="text" />
            </p>
            {/* Задание 3: числовые поля для Год и Высота */}
            <p>
                <label>Год от:</label>
                <input name="yearFrom" type="number" />
            </p>
            <p>
                <label>Год до:</label>
                <input name="yearTo" type="number" />
            </p>
            <p>
                <label>Высота от:</label>
                <input name="heightFrom" type="number" />
            </p>
            <p>
                <label>Высота до:</label>
                <input name="heightTo" type="number" />
            </p>
            <p>         
                <button type="submit">Фильтровать</button>   
                {/* Задание 4: кнопка очистки */}
                <button type="button" onClick={handleClear}>Очистить</button>
            </p>  
        </form> 
    )
}

export default Filter;