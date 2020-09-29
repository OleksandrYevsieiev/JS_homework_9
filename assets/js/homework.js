"use strict";
/* Реализовать класс DataLoader. Класс должен являтся абстракцией над fetch'ом.
Конструктор класса принимает url по которому запрашивается инфа и метод по которому эту инфу обрабатывать( обычно используем json ). */

class DataLoader {
  constructor(url, method) {
    this._url = url;
    this._method = method;
  }

  get url() {
    return this._url;
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

  async use() {
    const response = await fetch(this.url);
    const parsedResponse = await response[this._method]();
    return parsedResponse;
  }
}

const loader = new DataLoader("/users.json", "json");
loader.use();
