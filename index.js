const input = document.querySelector(".input");
const buttonSearch = document.querySelector(".search");
const buttonClear = document.querySelector(".clear");
const containerResult = document.querySelector(".result");
const apiKey = "d55c5ee9";

input.addEventListener("input", (event) => {
  const value = event.target.value;
  getValue(value);
});

async function getValue(showSearch) {
  const resultSearch = containerResult;
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${input.value}`;

  if (showSearch.length) {
    let response = await fetch(url);
    let data = await response.json();
    resultSearch.innerHTML = "";

    for (i = 0; i < url.length; i++) {
      let div = document.createElement("div");
      div.classList.add("result-poster");
      div.innerHTML +=
        `<img src = "${data.Search[i].Poster}">` +
        `<p>Title: ${data.Search[i].Title}</p>` +
        `<p>Year: ${data.Search[i].Year}</p>`;
      resultSearch.append(div);
    }
    if (!response.ok) {
      throw new Error("Error" + response.status);
    }
  }
}

buttonSearch.onclick = function () {
  const resultSearch = containerResult;
  resultSearch.innerHTML += resultSearch.innerHTML;
};

buttonClear.onclick = function () {
  const resultSearch = containerResult;
  resultSearch.innerHTML = "";
  input.value = "";
};
