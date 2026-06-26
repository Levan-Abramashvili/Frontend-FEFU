import { useState } from "react";
import ChartDraw from './ChartDraw.js';

const Chart = (props) => {
  const [ox, setOx] = useState("Страна");
  const [oy, setOy] = useState([true, false]);
  const [chartType, setChartType] = useState("Точечная диаграмма");
  const [error, setError] = useState("");
  const [showChart, setShowChart] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newOy = [
      event.target["oy"][0].checked,
      event.target["oy"][1].checked
    ];

    if (!newOy[0] && !newOy[1]) {
      setError("Выберите хотя бы одно значение по оси OY");
      setShowChart(false);
      return;
    }

    setError("");
    setShowChart(true);
    setOx(event.target["ox"].value);
    setOy(newOy);
    setChartType(event.target["chartType"].value);
  };

  const createArrGraph = (data, key) => {
    const groups = {};

    data.forEach(item => {
      const k = item[key];

      if (!groups[k]) {
        groups[k] = [];
      }

      groups[k].push(item["Высота"]);
    });

    let entries = Object.entries(groups);

    if (key === "Год") {
      entries = entries.sort((a, b) => Number(a[0]) - Number(b[0]));
    }

    return entries.map(([label, heights]) => ({
      labelX: key === "Год" ? Number(label) : label,
      values: [Math.min(...heights), Math.max(...heights)]
    }));
  };

  return (
    <>
      <h4>Визуализация</h4>

      <form onSubmit={handleSubmit}>
        <p>Значение по оси OX:</p>

        <div>
          <label>
            <input
              type="radio"
              name="ox"
              value="Страна"
              defaultChecked={ox === "Страна"}
            />
            {" "}Страна
          </label>

          <br />

          <label>
            <input
              type="radio"
              name="ox"
              value="Год"
              defaultChecked={ox === "Год"}
            />
            {" "}Год
          </label>
        </div>

        <p>Значение по оси OY:</p>

        <div>
          <label>
            <input
              type="checkbox"
              name="oy"
              defaultChecked={oy[0]}
            />
            {" "}Максимальная высота
          </label>

          <br />

          <label>
            <input
              type="checkbox"
              name="oy"
              defaultChecked={oy[1]}
            />
            {" "}Минимальная высота
          </label>
        </div>

        {error && <p className="error-message">{error}</p>}

        <p>
          Тип диаграммы{" "}
          <select name="chartType" defaultValue={chartType}>
            <option value="Точечная диаграмма">Точечная диаграмма</option>
            <option value="Гистограмма">Гистограмма</option>
          </select>
        </p>

        <p>
          <button type="submit">Построить</button>
        </p>
      </form>

      {showChart && (
        <ChartDraw
          data={createArrGraph(props.data, ox)}
          oy={oy}
          chartType={chartType}
        />
      )}
    </>
  );
};

export default Chart;
