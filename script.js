const getCookie = (name) => {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

let firstTime = 0;
let timeDomLoaded = 0;
let timeDomUnloaded = 0;

document.addEventListener("DOMContentLoaded", () => {
  firstTime = Date.now();
  timeDomLoaded = Date.now();
});

window.onload = () => {
  const audio = new Audio("./sound/Windows Startup.wav");
  audio.play();

  document.querySelector("#time").innerHTML =
    new Date(getCookie("firstTime") - 0) + "";
  document.querySelector("#load").innerHTML =
    getCookie("page-load-time") + " ms";
  document.querySelector("#unload").innerHTML =
    getCookie("page-unload-time") + " ms";

  timeDomLoaded = Date.now() - timeDomLoaded;
};

window.onbeforeunload = () => {
  timeDomUnloaded = Date.now();
};

window.onunload = () => {
  timeDomUnloaded = Date.now() - timeDomUnloaded;

  document.cookie = `page-load-time=${timeDomLoaded};`;
  document.cookie = `page-unload-time=${timeDomUnloaded};`;
  document.cookie = `firstTime=${firstTime};`;
};

const statWindow = document.querySelector("#stat-window");
const nodeNote = document.querySelector("#notepad");

nodeNote.ondblclick = () => {
  statWindow.style.display = "flex";
};

statWindow.onclick = () => {
  statWindow.style.display = "none";
};
