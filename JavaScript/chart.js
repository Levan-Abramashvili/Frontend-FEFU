// Входные данные:
//   data - исходный массив (например, buildings)
//   key - поле, по которому осуществляется группировка

function createArrGraph(data, key) {  
  
    const groupObj = d3.group(data, d => d[key]);

    let arrGraph =[];
    for(let entry of groupObj) {
        const minMax = d3.extent(entry[1].map(d => d['Посещаемость в год']));
        arrGraph.push({labelX : entry[0], values : minMax});
     }

     return arrGraph;
}

function drawGraph(data, dataForm) {
    // значения по оси ОХ    
    const keyX = dataForm.oxInput.value === "0" ? "Место нахождения" : "Год открытия"; 
        
    // создаем массив для построения графика
    let arrGraph = createArrGraph(data, keyX);
    
    if (keyX === "Год открытия") {
        arrGraph.sort((a, b) => a.labelX - b.labelX);
    }

    const svg = d3.select("svg")  
    svg.selectAll('*').remove();

    // создаем словарь с атрибутами области вывода графика
    const attr_area = {
        width: parseFloat(svg.style('width')),
        height: parseFloat(svg.style('height')),
        marginX: 100,
        marginY: 100
    }
    
    let mode;
    if (dataForm.maxHeight.checked && dataForm.minHeight.checked) {
        mode = "both";
    } else if (dataForm.maxHeight.checked) {
        mode = "max";
    } else if (dataForm.minHeight.checked) {
        mode = "min";
    }

    // создаем шкалы преобразования и выводим оси
    const [scX, scY] = createAxis(svg, arrGraph, attr_area, mode);

    const diagramType = dataForm.diagramType.value
    if (diagramType === "0") {
        // рисуем график (точечную диаграмму)
        createChart(svg, arrGraph, scX, scY, attr_area, mode);
    } else if (diagramType === "1") {
        // рисуем график (точечную диаграмму)
        createHistogram(svg, arrGraph, scX, scY, attr_area, mode);
    } else if (diagramType === "2") {
        createLineChart(svg, arrGraph, scX, scY, attr_area, mode);
    }
}

function createAxis(svg, data, attr_area, mode) {
    let yValues;
    let yHeight;
    if (mode === "both") {
        yValues = data.flatMap(d => d.values);
        yHeight = 1.1;
    } else if (mode === "max") {
        yValues = data.flatMap(d => d.values[1]);
        yHeight = 1.1;
    } else if (mode === "min") {
        yValues = data.flatMap(d => d.values[0]);
        yHeight = 1.05;
    }
    
    // находим интервал значений, которые нужно отложить по оси OY 
    // максимальное и минимальное значение из максимальных высот по каждой стране
    const [min, max] = d3.extent(yValues);

    // функция интерполяции значений на оси
    // по оси ОХ текстовые значения
    const scaleX = d3.scaleBand()
                    .domain(data.map(d => d.labelX))
                    .range([0, attr_area.width - 2 * attr_area.marginX]);
                    
    const scaleY = d3.scaleLinear()
                    .domain([min * 0.85, max * yHeight ])
                    .range([attr_area.height - 2 * attr_area.marginY, 0]);  
    
     // создание осей
     const axisX = d3.axisBottom(scaleX); // горизонтальная 
     const axisY = d3.axisLeft(scaleY); // вертикальная

     // отрисовка осей в SVG-элементе
     svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, 
                                      ${attr_area.height - attr_area.marginY})`)
        .call(axisX)
        .selectAll("text") // подписи на оси - наклонные
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", d => "rotate(-45)");
    
    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .call(axisY);
        
    return [scaleX, scaleY]
}

function createChart(svg, data, scaleX, scaleY, attr_area, mode) {
    const r = 4;
    if (mode === "max") {
        svg.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", r)
        .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .attr("cy", d => scaleY(d.values[1]))
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("fill", "red");

    } else if (mode === "min") {
        svg.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", r)
        .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .attr("cy", d => scaleY(d.values[0]))
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("fill", "blue");

    } else if (mode === "both") {
        svg.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", r)
        .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .attr("cy", d => scaleY(d.values[0]))
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("fill", "blue");

        svg.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", r)
        .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .attr("cy", d => scaleY(d.values[1]) + 3)
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("fill", "red");
    }
}

function createHistogram(svg, data, scaleX, scaleY, attr_area, mode) {
    if (mode === "max") {
        svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .attr("y", d => scaleY(d.values[1]))
        .attr("width", scaleX.bandwidth() / 4)
        .attr("height", d => scaleY.range()[0] - scaleY(d.values[1]))
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("fill", "red");

    } else if (mode === "min") {
        svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() / 4)
        .attr("y", d => scaleY(d.values[0]))
        .attr("width", scaleX.bandwidth() / 4)
        .attr("height", d => scaleY.range()[0] - scaleY(d.values[0]))
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("fill", "blue");

    } else if (mode === "both") {
        svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() / 4)
        .attr("y", d => scaleY(d.values[0]))
        .attr("width", scaleX.bandwidth() / 4)
        .attr("height", d => scaleY.range()[0] - scaleY(d.values[0]))
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("fill", "blue");
        
        svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .attr("y", d => scaleY(d.values[1]))
        .attr("width", scaleX.bandwidth() / 4)
        .attr("height", d => scaleY.range()[0] - scaleY(d.values[1]))
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("fill", "red");
    }
}

function createLineChart(svg, data, scaleX, scaleY, attr_area, mode) {
    const line = d3.line()
        .x(d => scaleX(d.labelX))
        .y(d => scaleY(d.y))
        .curve(d3.curveMonotoneX);

    const drawLine = (valuesArray, color) => {
        const pathData = data.map(d => ({ labelX: d.labelX, y: valuesArray(d) }));
        svg.append("path")
           .datum(pathData)
           .attr("d", line)
           .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
           .style("fill", "none")
           .style("stroke", color)
           .style("stroke-width", 2);
    };

    if (mode === 'max') {
        drawLine(d => d.values[1], "red");
    } else if (mode === 'min') {
        drawLine(d => d.values[0], "blue");
    } else {
        drawLine(d => d.values[1], "red");
        drawLine(d => d.values[0], "blue");
    }
}