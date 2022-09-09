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
export const categoryFilter = (data: any[], filter: string) => {
  const result = data.reduce((acc: any, item) => {
    if (acc[item[filter]]) {
      acc[item[filter]] += item.value;
    } else {
      acc[item[filter]] = item.value;
    }

    return acc;
  }, {});
  return result
};
