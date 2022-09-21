import React, { useState } from "react";
import PieChart from "./components/PieChart";
import Tabs from "./components/Tabs";
import { detailsFilter, sectionFilter } from "./helper/currency";
import { DATA_API, TCurrency } from "./MOCK_API";

function App() {
  const [radioSelect, setRadioSelect] = useState<TCurrency>("RUB");
  const handlerSelectedCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currency = e.target.id as TCurrency;
    setRadioSelect(currency);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Вывод данных по диаграмме</h1>
      </header>
      <main>
        <section className="chart">
          <Tabs
            header={[
              "Сортировка по валюте",
              "Сортировка по категориям",
              "Детально",
            ]}
            body={[
              <PieChart
                dataChart={sectionFilter(DATA_API, "currency")}
                labelName={"Валюта"}
              />,
              <>
                <div className="converter-container">
                  <h2>Конвертировать в </h2>
                  <div className="change">
                    {["RUB", "USD", "EUR"].map((currency) => (
                      <label className="converter__label" key={currency}>
                        <input
                          className="converter__input"
                          type="radio"
                          id={`${currency}`}
                          checked={radioSelect === currency}
                          onChange={handlerSelectedCurrency}
                        />
                        <span>{currency}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <PieChart
                  dataChart={sectionFilter(DATA_API, "category", radioSelect)}
                  labelName={"Категория"}
                />
              </>,
              <PieChart
                dataChart={detailsFilter(DATA_API)}
                labelName={"Категория"}
              />,
            ]}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
