document.addEventListener("DOMContentLoaded", function() {
    createTable(landmarks, 'list');

    const sortForm = document.getElementById('sort');
    setSortSelects(landmarks[0], sortForm);

    const fieldsFirst = document.getElementById('fieldsFirst');
    fieldsFirst.addEventListener('change', function() {
        changeNextSelect(this, 'fieldsSecond');
    });

    const fieldsSecond = document.getElementById('fieldsSecond');
    fieldsSecond.addEventListener('change', function() {
        changeNextSelect(this, 'fieldsThird');
    });

    const sortBtn = document.querySelector('#sort input[value="Сортировать"]');
    sortBtn.addEventListener('click', function() {
        const sortForm = document.getElementById('sort');
        sortTable('list', sortForm);
    });

    const resetSortBtn = document.querySelector('#sort input[value="Сбросить сортировку"]');
    resetSortBtn.addEventListener('click', function() {
        const sortForm = document.getElementById('sort');
        resetSort('list', sortForm);
    });

    const findBtn = document.querySelector('#filter input[value="Найти"]');
    findBtn.addEventListener('click', function() {
        const filterForm = document.getElementById('filter');
        filterTable(landmarks, 'list', filterForm);
    });

    const clearBtn = document.querySelector('#filter input[value="Очистить фильтры"]');
    clearBtn.addEventListener('click', function() {
        const filterForm = document.getElementById('filter');
        filterForm.reset();
        
        const sortForm = document.getElementById('sort');
        resetSort('list', sortForm);
    });
})

// формирование полей элемента списка с заданным текстом и значением
const createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
}

// формирование поля со списком
// параметры – массив со значениями элементов списка и элемент select
const setSortSelect = (arr, sortSelect) => {
    // создаем OPTION Нет и добавляем ее в SELECT
    sortSelect.append(createOption('Нет', 0));
    // перебираем массив со значениями опций
    arr.forEach((item, index) => {
    // создаем OPTION из очередного ключа и добавляем в SELECT
    // значение атрибута VALUE увеличиваем на 1, так как значение 0 имеет опция Нет
    sortSelect.append(createOption(item, index + 1));
    });
}

// формируем поля со списком для многоуровневой сортировки
const setSortSelects = (data, dataForm) => {
    // выделяем ключи словаря в массив
    const head = Object.keys(data);
    // находим все SELECT в форме
    const allSelect = dataForm.getElementsByTagName('select');
    for(const item of dataForm.elements){
        // формируем очередной SELECT
        setSortSelect(head, item);
        // САМОСТОЯТЕЛЬНО все SELECT, кроме первого, сделать неизменяемым
        if (item.tagName === 'SELECT' && allSelect[0] !== item) {
            item.disabled = true;
        }
    }
}

// настраиваем поле для следующего уровня сортировки
const changeNextSelect = (curSelect, nextSelectId) => {
    // Если выбрано "Нет", блокируем все последующие select
    if (curSelect.value == 0) {
        const allSelects = document.getElementById('sort').getElementsByTagName('select');
        let foundCurrent = false;
        
        for (let select of allSelects) {
            if (foundCurrent) {
                select.disabled = true;
                select.value = 0;
            }
            if (select === curSelect) {
                foundCurrent = true;
            }
        }
        return;
    }
    
    let nextSelect = document.getElementById(nextSelectId);
    if (!nextSelect) return;
    
    nextSelect.disabled = false;
    
    nextSelect.innerHTML = document.getElementById('fieldsFirst').innerHTML;
    
    const allSelects = document.getElementById('sort').getElementsByTagName('select');
    for (let select of allSelects) {
        if (select.value != 0 && select !== nextSelect && !select.disabled) {
            const option = nextSelect.querySelector(`option[value="${select.value}"]`);
            if (option) {
                option.remove();
            }
        }
    }
}