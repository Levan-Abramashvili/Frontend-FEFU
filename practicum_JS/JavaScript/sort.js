/*формируем массив для сортировки по двум уровням вида
[
{column: номер столбца, по которому осуществляется сортировка,
direction: порядок сортировки (true по убыванию, false по возрастанию)
},
...
]
*/
const createSortArr = (data) => {
    let sortArr = [];
    const sortSelects = data.getElementsByTagName('select');
    for (const item of sortSelects) {
        // получаем номер выбранной опции
        const keySort = item.value;
        // в случае, если выбрана опция Нет, заканчиваем формировать массив
        if (keySort == 0) {
            break;
        }
        // получаем порядок сортировки очередного уровня
        // имя флажка сформировано как имя поля SELECT и слова Desc
        const desc = document.getElementById(item.id + 'Desc').checked;
        //очередной элемент массива - по какому столбцу и в каком порядке сортировать
        sortArr.push(
            {column: keySort - 1,
            direction: desc}
        );
    }
    return sortArr;
};

const sortTable = (idTable, formData) => {
    // формируем управляющий массив для сортировки
    const sortArr = createSortArr(formData);
    
    if (sortArr.length === 0) {
        clearTable(idTable);
        createTable(buildings, idTable);
        return false;
    }
    
    let table = document.getElementById(idTable);
    
    const headerRow = table.rows[0];
    const columnNames = [];
    for (let cell of headerRow.cells) {
        columnNames.push(cell.innerHTML.trim());
    }
    
    let rowData = [];
    for (let i = 1; i < table.rows.length; i++) {
        rowData.push(table.rows[i]);
    }
    
    rowData.sort((first, second) => {
        for (let { column, direction } of sortArr) {
            const firstCellText = first.cells[column].innerHTML.trim();
            const secondCellText = second.cells[column].innerHTML.trim();
            
            const columnName = columnNames[column];
            let comparison;
            
            if (columnName === 'Год' || columnName === 'Высота') {
                const numA = parseFloat(firstCellText.replace(',', '.'));
                const numB = parseFloat(secondCellText.replace(',', '.'));
                comparison = numA - numB;
            } else {
                comparison = firstCellText.localeCompare(secondCellText, 'ru', {
                    numeric: true,
                    sensitivity: 'base'
                });
            }
            
            if (comparison !== 0) {
                return direction ? -comparison : comparison;
            }
        }
        return 0;
    });
    
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    
    rowData.forEach(row => {
        table.appendChild(row);
    });
}

// Функция для сброса сортировки
const resetSort = (idTable, sortForm) => {
    // 1. Формируем поля формы как при загрузке страницы
    const selects = sortForm.getElementsByTagName('select');
    
    // Сбрасываем все select на "Нет" (value = 0)
    for (let i = 0; i < selects.length; i++) {
        selects[i].value = 0;
        // Все кроме первого делаем недоступными
        if (i > 0) {
            selects[i].disabled = true;
        }
    }
    
    // Сбрасываем все чекбоксы "по убыванию"
    const checkboxes = sortForm.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // 2. Восстанавливаем таблицу с исходными данными
    clearTable(idTable);
    createTable(buildings, idTable);
};
