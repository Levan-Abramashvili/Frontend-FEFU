/* массив точек пути будет иметь следующий вид:
  [
    {x: координата, y: координата},
    {x: координата, y: координата},
    ...
  ]
*/

// создаем массив точек, расположенных по кругу
function createPathDeltoid() {
    const svg = d3.select("svg");
	const width = svg.attr("width");
	const height = svg.attr("height");
    const R = 100;
    let data = [];

    for (let t = 2.1 ; t <= 2.1 + Math.PI * 2; t += 0.1) {
        data.push(
            {x: width / 2 + R * (2 * Math.sin(t) - Math.sin(2 * t)),
             y: height / 2 - R * (2 * Math.cos(t) + Math.cos(2 * t))}
        );
    }
    return data
}

const drawPath = () => {
	// создаем массив точек
	const dataPoints = createPathDeltoid();

	const line = d3.line()
		.x((d) => d.x)
		.y((d) => d.y);
    const svg = d3.select("svg")
	// создаем путь на основе массива точек	  
	const path = svg.append('path')
		.attr('d', line(dataPoints))
		.attr('stroke', 'black')
		.attr('fill', 'none');
		
	return path;
}

function translateAlong(path, dataForm) {
    const length = path.getTotalLength();
    return function() {
        return function(t) {
            const mx = dataForm.mx.valueAsNumber;
            const my = dataForm.my.valueAsNumber;
            const mx_finish = dataForm.mx_finish.valueAsNumber;
            const my_finish = dataForm.my_finish.valueAsNumber;
            const angle = dataForm.angle.valueAsNumber;
            const angle_finish = dataForm.angle_finish.valueAsNumber;

            const {x, y} = path.getPointAtLength(t * length);
            const scaleX = mx + (mx_finish - mx) * t;
            const scaleY = my + (my_finish - my) * t;
            const rotation = angle + (angle_finish - angle) * t;

            return `translate(${x},${y}), scale(${scaleX}, ${scaleY}), rotate(${rotation})`;
        }
    }
}
