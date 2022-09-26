export enum HttpMethod {
  Get = "GET",
}

export const getHhVacancyUrl = (query: string) => {
  return `https://spb.hh.ru/search/vacancy?text=${query}`;
};
