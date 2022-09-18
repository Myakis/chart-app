type TData = {
  currency: string;
  category: string;
  value: number;
};

export const DATA_API: TData[] = [
  {
    currency: "RUR",
    category: "A",
    value: 1200,
  },
  {
    currency: "RUR",
    category: "B",
    value: 1600,
  },
  {
    currency: "RUR",
    category: "C",
    value: 2200,
  },
  {
    currency: "USD",
    category: "A",
    value: 800,
  },
  {
    currency: "USD",
    category: "C",
    value: 1100,
  },
  {
    currency: "EUR",
    category: "A",
    value: 4000,
  },
  {
    currency: "EUR",
    category: "B",
    value: 600,
  },
  {
    currency: "EUR",
    category: "C",
    value: 1900,
  },
];

export type TCurrency = "RUB" | "USD" | "EUR";
const RUB = 1;
const EUR = 70;
const USD = 60;

const converterValue = (
  currency: TCurrency,
  convertedCurrency: TCurrency,
  value: number
) => {
  switch (convertedCurrency) {
    case "EUR":
      return currency === "RUB"
        ? value * EUR
        : currency === "USD"
        ? value * (EUR / USD)
        : value;
    case "USD":
      return currency === "RUB"
        ? value * USD
        : currency === "EUR"
        ? value * (USD / EUR)
        : value;

    case "RUB":
      return currency === "USD"
        ? value * (USD / RUB)
        : currency === "EUR"
        ? value * (EUR / RUB)
        : value;

    default:
      return value;
  }
};

export const categoryFilter = (
  data: any[],
  filter: string,
  currency?: TCurrency
) => {
  const result = data.reduce((acc: any, item) => {
    if (acc[item[filter]]) {
      acc[item[filter]] += currency
        ? Math.round(converterValue(item.currency, currency, item.value))
        : item.value;
    } else {
      acc[item[filter]] = item.value;
    }

    return acc;
  }, {});
  return result;
};

export const detailsFilter = (data: TData[]) => {
  const result = data.reduce((acc: any, item) => {
    if (acc[item.category + "(" + item.currency + ")"]) {
      acc[item.category] += item.value;
    } else {
      acc[item.category + "(" + item.currency + ")"] = item.value;
    }

    return acc;
  }, {});
  return result;
};

//HELPERS
export const randomColor = (a: number = 1) => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const color = `rgba(${r}, ${g}, ${b}, ${a})`;

  return color;
};
