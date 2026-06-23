import { useState } from "react";

const SelectComp = () => {

    const [show, setShow] = useState(0);

    const showDigit = (event) => {
        event.preventDefault();	
        const a = event.target.a.value;
        setShow(a);
    }



    return(
        <form onSubmit={showDigit}>
            <input type="number" name="a"/>
            <button type="submit">Показать</button>
            <span>{show}</span>
        </form>
    )
}

export default SelectComp;