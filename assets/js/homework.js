"use strict";
/* Реализовать класс DataLoader. Класс должен являтся абстракцией над fetch'ом.
Конструктор класса принимает url по которому запрашивается инфа и метод по которому эту инфу обрабатывать( обычно используем json ). */

class DataLoader {
  constructor(url, method = "json") {
    this._url = url;
    if (method === "json") {
      this._method = async (url) => {
        const response = await fetch(url);
        const parsedResponse = await response.json();
        return parsedResponse;
      };
    } else {
      this._method = method;
    }
  }

  get url() {
    return this.url;
  }

  set url(url) {
    return (this._url = url);
  }

  get method() {
    return this._method;
  }

  set method(m) {
    return (this._method = m);
  }

  useMethod(value) {
    if (this.method) {
      return this.method(value);
    }
  }
}

const loader = new DataLoader();
loader.useMethod("/users.json");
console.log(loader.useMethod("/users.json"));
