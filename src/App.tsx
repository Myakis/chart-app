import React from "react";
import PieChart from "./components/PieChart";
import Tabs from "./components/Tabs";

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Вывод данных по диаграмме</h1>
      </header>
      <main>
        <section className="chart">
          <Tabs
            header={[
              "Сортировка по категориям",
              "Сортировка по категориям",
              "Сортировка по валюте",
              "Без сортировки",
            ]}
            body={[<PieChart />, <PieChart />, <PieChart />, <PieChart />]}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
