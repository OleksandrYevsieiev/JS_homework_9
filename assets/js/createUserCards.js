import { colorArray, arrTitles } from "./colorAndTitles.js";

const createUserCard = () => {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("cardDiv");
  return cardDiv;
};

const createUserName = (element, stringCSSProperty) => {
  const h1 = document.createElement("h1");
  h1.classList.add(stringCSSProperty);
  h1.textContent = `${element.firstName} ${element.lastName}`;
  if (element.firstName === "" && element.lastName === "") {
    h1.textContent = "Anonymous User";
  }
  return h1;
};

const createUserImage = (element, stringCSSProperty) => {
  const img = document.createElement("img");
  img.classList.add(stringCSSProperty);
  img.src = element.profilePicture;

  img.onerror = function (event) {
    const imgReplacer = document.createElement("div");
    imgReplacer.classList.add("imgReplacer");
    event.target.replaceWith(imgReplacer);

    if (element.firstName === "" || element.lastName === "") {
      imgReplacer.textContent = "?";
    } else {
      imgReplacer.textContent = `${element.firstName[0]} ${element.lastName[0]}`;
    }

    colorArray.map((color) => {
      if (element.firstName[0] === color[0]) {
        imgReplacer.style.backgroundColor = color[1];
      }
    });
  };
  return img;
};

const createUserTitle = (element, stringCSSProperty) => {
  const p = document.createElement("p");
  p.classList.add(stringCSSProperty);
  if (element) {
    p.textContent = element;
  } else {
    p.textContent = arrTitles[Math.floor(Math.random() * arrTitles.length)];
  }
  return p;
};

const createContactBtn = () => {
  const btn = document.createElement("button");
  btn.classList.add("btn");
  btn.textContent = "Connect";

  // btn.addEventListener("click", async () => {
  //   const responseUserCrads = await fetch("./users.json");
  //   const usersData = await responseUserCrads.json();
  //   console.log(usersData);
  //   usersData.map((element) => {
  //     history.pushState(null, null, `?id=${element.id}`);
  //   });
  // });
  return btn;
};

const createWebsiteHeader = () => {
  const websiteHeader = document.createElement("div");
  websiteHeader.classList.add("websiteHeader");
  return websiteHeader;
};

const createLoggedUserContainer = () => {
  const loggedUserContainer = document.createElement("div");
  loggedUserContainer.classList.add("loggedUserContainer");
  return loggedUserContainer;
};

export {
  createUserCard,
  createUserImage,
  createUserName,
  createUserTitle,
  createContactBtn,
  createWebsiteHeader,
  createLoggedUserContainer,
};
