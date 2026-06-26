import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

const ChartDraw = (props) => {
  const chartRef = useRef(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    setWidth(parseFloat(svg.style("width")));
    setHeight(parseFloat(svg.style("height")));
  }, []);

  const margin = {
    top: 10,
    bottom: 80,
    left: 50,
    right: 10
  };

  const boundsWidth = width - margin.left - margin.right;
  const boundsHeight = height - margin.top - margin.bottom;

  const { oy = [true, false], chartType = "Точечная диаграмма" } = props;

  const allValues = props.data.flatMap(d => {
    const vals = [];

    if (oy[0]) vals.push(d.values[1]);
    if (oy[1]) vals.push(d.values[0]);

    return vals;
  });

  const [minVal, maxVal] = d3.extent(allValues);

  const scaleX = useMemo(() => {
    return d3
      .scaleBand()
      .domain(props.data.map(d => d.labelX))
      .range([0, boundsWidth])
      .padding(0.2);
  }, [props.data, boundsWidth]);

  const scaleY = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([
        (minVal || 0) * 0.85,
        (maxVal || 1) * 1.02
      ])
      .range([boundsHeight, 0]);
  }, [boundsHeight, minVal, maxVal]);

  useEffect(() => {
    if (!width || !height) return;

    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    const xAxis = d3.axisBottom(scaleX);

    svg.append("g")
      .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-30)");

    const yAxis = d3.axisLeft(scaleY);

    svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .call(yAxis);

    const colors = {
      max: "red",
      min: "blue"
    };

    if (chartType === "Точечная диаграмма") {
      const drawDots = (valueIndex, color, type) => {
        svg.selectAll(`.dot-${valueIndex}`)
          .data(props.data)
          .enter()
          .append("circle")
          .attr("r", 5)
          .attr("cx", d => {
            let x = scaleX(d.labelX) + scaleX.bandwidth() / 2;

            if (oy[0] && oy[1] && d.values[0] === d.values[1]) {
              if (type === "max") {
                x -= 5;
              }

              if (type === "min") {
                x += 5;
              }
            }

            return x;
          })
          .attr("cy", d => scaleY(d.values[valueIndex]))
          .attr("transform", `translate(${margin.left}, ${margin.top})`)
          .style("fill", color)
      };

      if (oy[0]) drawDots(1, colors.max, "max");
      if (oy[1]) drawDots(0, colors.min, "min");

    } else {
      const bandWidth = scaleX.bandwidth();
      const seriesCount = (oy[0] ? 1 : 0) + (oy[1] ? 1 : 0);
      const barWidth = seriesCount > 1 ? bandWidth / 2 : bandWidth;

      props.data.forEach(d => {
        let offsetIndex = 0;

        if (oy[0]) {
          const barHeight = boundsHeight - scaleY(d.values[1]);

          svg.append("rect")
            .attr("x", margin.left + scaleX(d.labelX) + offsetIndex * barWidth)
            .attr("y", margin.top + scaleY(d.values[1]))
            .attr("width", barWidth)
            .attr("height", barHeight)
            .style("fill", colors.max)

          offsetIndex++;
        }

        if (oy[1]) {
          const barHeight = boundsHeight - scaleY(d.values[0]);

          svg.append("rect")
            .attr("x", margin.left + scaleX(d.labelX) + offsetIndex * barWidth)
            .attr("y", margin.top + scaleY(d.values[0]))
            .attr("width", barWidth)
            .attr("height", barHeight)
            .style("fill", colors.min)
        }
      });
    }

  }, [scaleX, scaleY, props.data, oy, chartType, width, height]);

  return (
    <svg ref={chartRef}></svg>
  );
};

export default ChartDraw;