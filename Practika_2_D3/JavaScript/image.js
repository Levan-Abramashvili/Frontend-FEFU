// Создаем изображение (Машинка)
// Рисуем относительно центра (0, 0)
function drawSmile(svg) {
    // Создаем группу, которая будет нашей машинкой
    let car = svg.append("g")
        .style("stroke", "black")
        .style("stroke-width", 1);

    // 1. Кузов (Прямоугольник)
    car.append("rect")
        .attr("x", -30)
        .attr("y", -15)
        .attr("width", 60)
        .attr("height", 20)
        .style("fill", "red");

    // 2. Крыша (Многоугольник - трапеция)
    car.append("polygon")
        .attr("points", "-15,-15 15,-15 10,-30 -10,-30")
        .style("fill", "red");

    // 3. Левое колесо (Круг)
    car.append("circle")
        .attr("cx", -18)
        .attr("cy", 5)
        .attr("r", 8)
        .style("fill", "black");

    // 4. Правое колесо (Круг)
    car.append("circle")
        .attr("cx", 18)
        .attr("cy", 5)
        .attr("r", 8)
        .style("fill", "black");

    // 5. Фара (Круг)
    car.append("circle")
        .attr("cx", 30)
        .attr("cy", -5)
        .attr("r", 3)
        .style("fill", "yellow")
        .style("stroke", "none"); // Убираем обводку у фары

    // 6. Окно (Прямоугольник)
    car.append("rect")
        .attr("x", -8)
        .attr("y", -28)
        .attr("width", 16)
        .attr("height", 13)
        .style("fill", "lightblue")
        .style("stroke", "none"); // Убираем обводку у окна

    return car;  
}