const Filter = (props) => {

  const handleSubmit = (event) => {
    event.preventDefault();

    const filterField = {
      "Название": event.target["structure"].value.toLowerCase(),
      "Тип": event.target["type"].value.toLowerCase(),
      "Страна": event.target["country"].value.toLowerCase(),
      "Город": event.target["city"].value.toLowerCase(),
    };

    const yearFrom = event.target["yearFrom"].value;
    const yearTo = event.target["yearTo"].value;
    const heightFrom = event.target["heightFrom"].value;
    const heightTo = event.target["heightTo"].value;

    let arr = props.fullData;

    for (const key in filterField) {
      arr = arr.filter(item =>
        item[key].toLowerCase().includes(filterField[key])
      );
    }

    if (yearFrom) arr = arr.filter(item => item["Год"] >= Number(yearFrom));
    if (yearTo)   arr = arr.filter(item => item["Год"] <= Number(yearTo));
    if (heightFrom) arr = arr.filter(item => item["Высота"] >= Number(heightFrom));
    if (heightTo)   arr = arr.filter(item => item["Высота"] <= Number(heightTo));

    props.filtering(arr);
  };

  const handleReset = (event) => {
    event.preventDefault();
    event.target.closest('form').reset();
    props.filtering(props.fullData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label>Название: </label>
        <input name="structure" type="text" />
      </p>
      <p>
        <label>Тип: </label>
        <input name="type" type="text" />
      </p>
      <p>
        <label>Страна: </label>
        <input name="country" type="text" />
      </p>
      <p>
        <label>Город: </label>
        <input name="city" type="text" />
      </p>
      <p>
        <label>Год от: </label>
        <input name="yearFrom" type="number" />
      </p>
      <p>
        <label>Год до: </label>
        <input name="yearTo" type="number" />
      </p>
      <p>
        <label>Высота от: </label>
        <input name="heightFrom" type="number" />
      </p>
      <p>
        <label>Высота до: </label>
        <input name="heightTo" type="number" />
      </p>
      <p>
        <button type="submit">Фильтровать</button>
        <button type="button" onClick={handleReset}>Очистить фильтр</button>
      </p>
    </form>
  );
}

export default Filter;