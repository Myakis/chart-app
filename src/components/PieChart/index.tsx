import React, { FC } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { categoryFilter, DATA_API, randomColor } from "../../MOCK_API";

ChartJS.register(ArcElement, Tooltip, Legend);

interface IProps {
  dataChart: any[];
  labelName?: string;
}

const PieChart: FC<IProps> = ({ dataChart, labelName }) => {
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
      const items = chart.options.plugins.legend.labels.generateLabels(chart);

      const ul = getOrCreateLegendList(
        chart,
        "custom-legend",
        items.length < 4 ? "list-row" : "flex-column"
      );
      const dataValue = getDataChart(chart);
      // Remove old legend items
      while (ul.firstChild) {
        ul.firstChild.remove();
      }
      // Reuse the built-in legendItems generator

      const ulBox = document.createElement("ul");
      ulBox.className = "list-column";
      items.forEach((item: any) => {
        const li = document.createElement("li");
        li.style.alignItems = "center";
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
      if (items.length < 4) {
        ul.appendChild(ulBox);
      }

      items.forEach((item: any, index: number) => {
        const li = document.createElement("li");
        li.className = items.length < 4 ? "center" : "";
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

        const text = document.createTextNode(
          item.text + " : " + dataValue[index]
        );
        textContainer.appendChild(text);

        li.appendChild(boxSpan);
        li.appendChild(textContainer);
        ul.appendChild(li);
      });
    },
  };
  const ALPHA = 0.3;
  const arrayColors = Object.keys(dataChart).map(() => randomColor(ALPHA));

  const data = {
    labels: Object.keys(dataChart).map((item) => `${labelName} ${item}`),
    datasets: [
      {
        data: Object.values(dataChart),
        backgroundColor: arrayColors,
        hoverBackgroundColor: arrayColors.map((color) =>
          color.replace(`${ALPHA}`, "0.9")
        ),
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
                // enabled: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default PieChart;
