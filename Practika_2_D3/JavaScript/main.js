document.addEventListener("DOMContentLoaded", function() {
    const width = 600;
    const height = 600;      
    const svg = d3.select("svg")
       .attr("width", width)
	   .attr("height", height) ;

    const clearButton = document.querySelector('input[value="Очистить"]');
    clearButton.addEventListener('click', function() {
        svg.selectAll('*').remove();
    });

    const animateButton = document.querySelector('input[value="Анимировать"]');
    animateButton.addEventListener('click', function() {
        const form = document.getElementById('setting');
        runAnimation(form);

    });
})

const runAnimation = (dataForm) => {
	const svg = d3.select("svg")
    const durationField = document.getElementById('duration');
    
    let pict = drawSmile(svg);
    let path = drawPath();

    pict.transition()
    .duration(durationField.value)
    .ease(d3.easeLinear)
    .attrTween('transform', translateAlong(path.node(), dataForm));
}

