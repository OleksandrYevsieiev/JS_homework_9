"use strict";

import {
  createUserCard,
  createUserImage,
  createUserName,
  createUserTitle,
  createContactBtn,
  createWebsiteHeader,
  createLoggedUserContainer,
} from "./createUserCards.js";

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

// ------------------------------------------------------------------------------------------------------------------- //

const mainContainer = document.createElement("div");
document.body.appendChild(mainContainer);
mainContainer.classList.add("mainContainer");

document.addEventListener("DOMContentLoaded", async () => {
  const responseUserCrads = await fetch("./users.json");
  const responseLoggedUser = await fetch("./auth.json");

  const loggedUserData = await responseLoggedUser.json();
  const usersData = await responseUserCrads.json();

  const websiteHeader = createWebsiteHeader();
  const userContainer = createLoggedUserContainer();
  websiteHeader.append(userContainer);

  function storageAvailable(type) {
    try {
      var storage = window[type],
        x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return false;
    }
  }

  if (storageAvailable("localStorage") && localStorage.length > 0) {
    userContainer.append(
      createUserTitle(localStorage.position, "pHeader"),
      createUserName(localStorage.name, "h2"),
      createUserImage(localStorage.image, "imgHeader")
    );
  } else {
    userContainer.append(
      createUserTitle(loggedUserData.position, "pHeader"),
      createUserName(loggedUserData, "h2"),
      createUserImage(loggedUserData, "imgHeader")
    );
  }

  const cardArray = usersData.map((element) => {
    const card = createUserCard();
    card.append(
      createUserImage(element, "img"),
      createUserName(element, "h1"),
      createUserTitle(element.position, "p"),
      createContactBtn()
    );

    card.addEventListener("click", async () => {
      const responseUserCrads = await fetch("./users.json");
      const usersData = await responseUserCrads.json();
      history.replaceState(usersData, null, `?id=${element.id}`);
    });

    return card;
  });

  if (!storageAvailable("localStorage") || !responseLoggedUser.ok) {
    throw new Error(
      "You are not authorized to see the user's list. Log in to continue."
    );
  } else {
    mainContainer.append(websiteHeader, ...cardArray);
  }
});
