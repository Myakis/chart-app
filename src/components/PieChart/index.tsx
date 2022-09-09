import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { categoryFilter, DATA_API } from "../../MOCK_API";

ChartJS.register(ArcElement, Tooltip, Legend);
const PieChart = () => {
  const sortedData = categoryFilter(DATA_API, "currency");
  const getOrCreateLegendList = (chart: any, id: string, className: string) => {
    const legendContainer = document.getElementById(id);
    let listContainer = legendContainer?.querySelector("ul");

    if (!listContainer) {
      listContainer = document.createElement("ul");
      listContainer.className = `list ${className}`;

      legendContainer?.appendChild(listContainer);
    }

    return listContainer;
  };
  const getDataChart = (chart: any) => {
    return chart.config.data.datasets[0].data;
  };

  const htmlLegendPlugin = {
    id: "htmlLegend",
    afterUpdate(chart: any, args: any, options: any) {
      const ul = getOrCreateLegendList(chart, "custom-legend", "list-row");
      const dataValue = getDataChart(chart);
      // Remove old legend items
      while (ul.firstChild) {
        ul.firstChild.remove();
      }
      // Reuse the built-in legendItems generator
      const items = chart.options.plugins.legend.labels.generateLabels(chart);

      const ulBox = document.createElement("ul");
      ulBox.className = "list-column";
      items.forEach((item: any) => {
        const li = document.createElement("li");
        li.style.alignItems = "center";
        li.style.cursor = "pointer";
        li.style.display = "flex";

        // Color box
        const boxSpan = document.createElement("span");
        boxSpan.style.background = item.fillStyle;
        boxSpan.style.borderColor = item.strokeStyle;
        boxSpan.style.borderWidth = item.lineWidth + "px";
        boxSpan.style.display = "inline-block";
        boxSpan.style.height = "20px";
        boxSpan.style.width = "20px";

        li.appendChild(boxSpan);
        ulBox.appendChild(li);
      });
      ul.appendChild(ulBox);

      items.forEach((item: any, index: number) => {
        const li = document.createElement("li");
        li.className = "center";
        li.style.alignItems = "center";
        li.style.cursor = "pointer";
        li.style.display = "flex";
        li.style.flexDirection = "row";
        li.style.marginLeft = "10px";

        li.onclick = () => {
          const { type } = chart.config;
          if (type === "pie" || type === "doughnut") {
            chart.toggleDataVisibility(item.index);
          } else {
            chart.setDatasetVisibility(
              item.datasetIndex,
              !chart.isDatasetVisible(item.datasetIndex)
            );
          }
          chart.update();
        };

        // Color box
        const boxSpan = document.createElement("span");
        boxSpan.style.background = item.fillStyle;
        boxSpan.style.borderColor = item.strokeStyle;
        boxSpan.style.borderWidth = item.lineWidth + "px";
        boxSpan.style.display = "inline-block";
        boxSpan.style.height = "20px";
        boxSpan.style.marginRight = "10px";
        boxSpan.style.width = "20px";

        // Text
        const textContainer = document.createElement("p");
        textContainer.style.color = item.fontColor;
        textContainer.style.margin = "0";
        textContainer.style.padding = "0";
        textContainer.style.textDecoration = item.hidden ? "line-through" : "";

        const text = document.createTextNode(item.text + " : " + dataValue[index]);
        textContainer.appendChild(text);

        li.appendChild(boxSpan);
        li.appendChild(textContainer);
        ul.appendChild(li);
      });
    },
  };
  const data = {
    labels: Object.keys(sortedData).map((item) => `Категория: ${item}`),
    datasets: [
      {
        data: Object.values(sortedData),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div className="grid">
      <div id="custom-legend" className="chart-container">
        <Pie
          data={data}
          plugins={[htmlLegendPlugin]}
          options={{
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default PieChart;
