document.addEventListener("DOMContentLoaded", function() {
    const countryInput = document.getElementById("countryInput");
    countryInput.checked = true;

    const maxHeight = document.getElementById("maxHeight");
    const minHeight = document.getElementById("minHeight");
    const checkboxError = document.getElementById("checkboxError");
    checkboxError.style.display = "none";
    const form = document.getElementById("setting");
    const svg = document.querySelector("svg");
    svg.style.display = "none";
    maxHeight.checked = false;
    minHeight.checked = false;
    const makeGraficButton = document.getElementById("makeGraficButton");

    makeGraficButton.addEventListener('click', function() {
        if (!maxHeight.checked && !minHeight.checked) {
            checkboxError.style.display = "flex";
            svg.style.display = "none";
        } else {
            svg.style.display = "block";
            drawGraph(buildings, form);
            checkboxError.style.display = "none";
        }
    });

    maxHeight.addEventListener('click', function() {
        checkboxError.style.display = "none";
    });

    minHeight.addEventListener('click', function() {
        checkboxError.style.display = "none";
    });

    showTable('build', buildings);
    const tableButton = document.getElementById("tableButton");
    tableButton.addEventListener("click", function() {
        const table = document.getElementById("build");
        
        if (tableButton.value === "Скрыть таблицу") {
            if (table) table.innerHTML = '';
            tableButton.value = "Показать таблицу";
        } else {
            showTable('build', buildings);
            tableButton.value = "Скрыть таблицу";
        }
    });
})

