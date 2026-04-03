// устанавливаем соответствие между полями формы и столбцами таблицы
const correspond = {
    "Название": "structure",
    "Тематика": "category",
    "Место нахождения": "city",
    "Год открытия": ["yearFrom", "yearTo"],
    "Посещаемость в год": ["heightFrom", "heightTo"]
}

/* Структура возвращаемого ассоциативного массива:
{
    input_id: input_value,
    ...
}
*/
const dataFilter = (dataForm) => {
    
    let dictFilter = {};

    // перебираем все элементы формы с фильтрами
    for (const item of dataForm.elements) {
        
        // получаем значение элемента
        let valInput = item.value;

        // если поле типа text - приводим его значение к нижнему регистру
        if (item.type === "text") {
            valInput = valInput.toLowerCase();
        } 
        /* САМОСТОЯТЕЛЬНО обработать значения числовых полей:
        - если в поле занесено значение - преобразовать valInput к числу;
        - если поле пусто и его id включает From  - занести в valInput 
           -бесконечность
        - если поле пусто и его id включает To  - занести в valInput 
           +бесконечность
        */
        if (item.type === "number") {
            if (item.value != "") {
                valInput = Number(valInput);
            }
            else if (item.id.includes("From")) {
                    valInput = -Infinity;
            }
            else if (item.id.includes("To")) {
                    valInput = Infinity;
            }
        }
        
         // формируем очередной элемент ассоциативного массива
        dictFilter[item.id] = valInput;
    }       
    return dictFilter;
}

// фильтрация таблицы
const filterTable = (data, idTable, dataForm) => {
    
    // получаем данные из полей формы
    const datafilter = dataFilter(dataForm);
    
    // выбираем данные соответствующие фильтру и формируем таблицу из них
    let tableFilter = data.filter(item => {

        /* в этой переменной будут "накапливаться" результаты сравнения данных
           с параметрами фильтра */
        let result = true;
        
        // строка соответствует фильтру, если сравнение всех значения из input 
        // со значением ячейки очередной строки - истина
         Object.entries(item).map(([key, val]) => {
            
            // текстовые поля проверяем на вхождение
            if (typeof val == 'string') {
                result &&= val.toLowerCase().includes(datafilter[correspond[key]]) 
            }
			
            // САМОСТОЯТЕЛЬНО проверить числовые поля на принадлежность интервалу
            else if (typeof val == 'number') {
                const filterKeys = correspond[key];

                const fromFilter = datafilter[filterKeys[0]];
                const toFilter = datafilter[filterKeys[1]];

                if (fromFilter !== -Infinity && val < fromFilter) {
                result = false;
                }
                if (toFilter !== Infinity && val > toFilter) {
                   result = false;
                }
            }
         });
         return result;
    });     

    // САМОСТОЯТЕЛЬНО вызвать функцию, которая удаляет все строки таблицы с id=idTable
    clearTable(idTable);

    if (tableFilter.length === 0) {
        // создастся только шапка таблицы
        createTable([], idTable);
    }
    else {
        // показать на странице таблицу с отфильтрованными строками
        createTable(tableFilter, idTable);  
    }
    
}

const searchButton = document.querySelector('input[value="Найти"]');

searchButton.addEventListener("click", () => {
    const filterForm = document.getElementById("filter");
    filterTable(landmarks, "list", filterForm);
});

const clearFilter = (data, idTable, dataForm) => {
    dataForm.reset();
    clearTable(idTable);
    createTable(data, idTable);
};

const clearFilterButton = document.querySelector('input[value="Очистить фильтры"]');

clearFilterButton.addEventListener("click", () => {
    const filterForm = document.getElementById("filter");
    clearFilter(landmarks, "list", filterForm);
});