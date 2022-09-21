import { EUR, USD, RUB } from './../constants/currency';
import { TCurrency, TData } from './../MOCK_API';
export const converterValue = (
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
  
  export const sectionFilter = (
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
  