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
  const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${input.value}`;

  if (showSearch.length) {
    let response = await fetch(url);
    let data = await response.json();
    let movie = Object(data);
    resultSearch.innerHTML = "";

    for (i = 0; i < 9; i++) {
      let div = document.createElement("div");
      div.classList.add("result-poster");
      div.innerHTML +=
       
        `<img src = "${movie.Search[i].Poster}">` +
        `<p>Title: ${movie.Search[i].Title}</p>` +
        `<p>Year: ${movie.Search[i].Year}</p>`;
      resultSearch.append(div);
    }
  }
  if (!response.ok) {
    throw new Error("Error" + response.status);
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

// input.addEventListener("keypress", function (event) {

//   let key = event.which || event.keyCode;
//   if (key === 13) {
//     buttonSearch.click();
//   }
// });
