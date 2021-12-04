let timerId;
async function translate_text() {
  let data = document.getElementById("data").value;
  let sel_lang = document.querySelector("#lang").value;
  let sel_lang_from = document.querySelector("#langfrom").value;
  let show_out = document.getElementById("show_out");
  if (data.length <= 0) {
    show_out.innerText = "";
    return false;
  } else {
    const res = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      body: JSON.stringify({
        q: `${data}`,
        source: `${sel_lang_from}`,
        target: `${sel_lang}`,
      }),
      headers: { "Content-Type": "application/json" },
    });

    let get_data = await res.json();
    show_out.textContent = get_data.translatedText;
  }
}

// function which provide country name with value in selectbox as option
async function getCountry(selectb, n) {
  let res = await fetch("https://libretranslate.de/languages");
  let data = await res.json();
  data.forEach(({ code, name }) => {
    let opt = document.createElement("option");
    opt.setAttribute("value", code);
    if (n === 0 && code === "hi") {
      console.log("hi");
      opt.setAttribute("selected", "");
    }
    opt.innerText = name;
    selectb.append(opt);
  });
}

let selectbox = document.getElementById("lang");
let selectbox1 = document.getElementById("langfrom");

getCountry(selectbox, 0);
getCountry(selectbox1, 1);

async function getlan() {
  let sel_lang = document.getElementById("lang").value;
  let sel_lang_from = document.querySelector("#langfrom").value;
  let data = document.getElementById("data").value;
  let show_out = document.getElementById("show_out");

  if (data.length > 0) {
    const res = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      body: JSON.stringify({
        q: `${data}`,
        source: `${sel_lang_from}`,
        target: `${sel_lang}`,
      }),
      headers: { "Content-Type": "application/json" },
    });

    let get_data = await res.json();
    show_out.textContent = get_data.translatedText;
  }
}

async function getlan1() {
  let sel_lang = document.getElementById("lang").value;
  let sel_lang_from = document.querySelector("#langfrom").value;
  let data = document.getElementById("data").value;
  let show_out = document.getElementById("show_out").value;
  if (data.length > 0) {
    const res = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      body: JSON.stringify({
        q: `${show_out}`,
        source: `${sel_lang}`,
        target: `${sel_lang_from}`,
      }),
      headers: { "Content-Type": "application/json" },
    });

    let get_data = await res.json();
    document.getElementById("data").value = get_data.translatedText;
  }
}

function debounce(func, delay) {
  if (timerId) {
    clearTimeout(timerId);
  }

  timerId = setTimeout(() => {
    func();
  }, delay);
}
