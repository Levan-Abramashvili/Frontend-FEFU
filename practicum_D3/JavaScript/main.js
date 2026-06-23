document.addEventListener("DOMContentLoaded", function() {
    const width = 600;
    const height = 600;      
    const svg = d3.select("svg")
       .attr("width", width)
	   .attr("height", height) ;

    const drawButton = document.querySelector('input[value="Нарисовать"]');
    drawButton.addEventListener('click', function() {
        const form = document.getElementById('setting');
        draw(form);
    });

    const clearButton = document.querySelector('input[value="Очистить"]');
    clearButton.addEventListener('click', function() {
        svg.selectAll('*').remove();
    });

    const animateButton = document.getElementById('animateBtn');
    animateButton.addEventListener('click', function() {
        const form = document.getElementById('setting');
        runAnimation(form);

    });

    const animationCheckbox = document.getElementById('enableAnimation');
    const easingContainer = document.getElementById('easingContainer');
    const finishFields = document.querySelectorAll('.finish__fields');
    const pathFields = document.querySelectorAll('.path__fields');
    const moveBlock = document.querySelectorAll('.setting__animation__second');
    const moveCheckbox = document.getElementById('moveAlongPath');
    const cordsInputs = document.querySelectorAll('.cords__inputs');
    const scaleFields = document.querySelectorAll('.scale__fields');
    const rotateFields = document.querySelectorAll('.rotate__fields');

    animateButton.style.display = 'none';
    easingContainer.style.display = 'none';
    finishFields.forEach(field => field.style.display = 'none');
    pathFields.forEach(field => field.style.display = 'none');
    moveBlock.forEach(field => field.style.display = 'none');
    

    animationCheckbox.addEventListener('change', function() {
        if (this.checked) {
            easingContainer.style.display = 'flex';
            drawButton.style.display = 'none';
            animateButton.style.display = 'flex';
            finishFields.forEach(field => field.style.display = 'inline-block');
            moveBlock.forEach(field => field.style.display = 'inline-block');
        } else {
            easingContainer.style.display = 'none';
            drawButton.style.display = 'flex';
            animateButton.style.display = 'none';
            finishFields.forEach(field => field.style.display = 'none');
            moveBlock.forEach(field => field.style.display = 'none');
        }
    });
    
    moveCheckbox.addEventListener('change', function() {
        if (this.checked) {
            cordsInputs.forEach(input => input.style.display = 'none');
            pathFields.forEach(field => field.style.display = 'inline-block');
            scaleFields.forEach(field => field.style.display = 'none');
            rotateFields.forEach(field => field.style.display = 'none');
        } else {
            cordsInputs.forEach(input => input.style.display = 'inline-block');
            pathFields.forEach(field => field.style.display = 'none');
            scaleFields.forEach(field => field.style.display = 'inline-block');
            rotateFields.forEach(field => field.style.display = 'inline-block');
        }
    });


})

const draw = (dataForm) => {
	const svg = d3.select("svg")
    let pict = drawSmile(svg)
    pict.attr("transform", `translate(${dataForm.cx.value}, ${dataForm.cy.value}),
        scale(${dataForm.mx.value}, ${dataForm.my.value}),
        rotate(${dataForm.angle.value})`);
}

const runAnimation = (dataForm) => {
	const svg = d3.select("svg")
    const moveCheckboxFlag = document.getElementById('moveAlongPath').checked;
    const pathFieldsValue = document.getElementById('pathType').value;

    const easingType = document.getElementById('easing').value;
        
    let easeFunction;
    switch(easingType) {
        case 'linear':
            easeFunction = d3.easeLinear;
            break;
        case 'elastic':
            easeFunction = d3.easeElastic;
            break;
        case 'bounce':
            easeFunction = d3.easeBounce;
            break;
        default:
            easeFunction = d3.easeLinear;
    }
    
    if (!moveCheckboxFlag) {
        let pict = drawSmile(svg);

        pict.attr("transform", `translate(${dataForm.cx.value}, ${dataForm.cy.value}),
                scale(${dataForm.mx.value}, ${dataForm.my.value}),
                rotate(${dataForm.angle.value})`)
        .transition()
        .duration(6000)
        .ease(easeFunction)
        .attr("transform", `translate(${dataForm.cx_finish.value}, ${dataForm.cy_finish.value}),
                scale(${dataForm.mx_finish.value}, ${dataForm.my_finish.value}),
                rotate(${dataForm.angle_finish.value})`);
    } else {
        let pict = drawSmile(svg);


		let path = drawPath(pathFieldsValue);	
		pict.transition()
        .ease(easeFunction)
        .duration(6000)
        .attrTween('transform', translateAlong(path.node()));
	}
    
}

