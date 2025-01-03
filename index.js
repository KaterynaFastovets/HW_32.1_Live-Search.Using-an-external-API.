const input = document.querySelector(".input");
const buttonClear = document.querySelector(".clear");
const containerResult = document.querySelector(".result");
const apiKey = "d55c5ee9";

input.addEventListener("input", (event) => {
  const value = event.target.value;
  getValue(value);
});

async function getValue(showSearch) {
  const resultSearch = containerResult;
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${showSearch}`;

  resultSearch.innerHTML = "";

  if (showSearch.length > 0) {
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok && data.Response === "True") {
        data.Search.forEach((movie) => {
         
          const div = document.createElement("div");
          div.classList.add("result-poster");
          div.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title} Poster">
            <p><strong>Title:</strong> ${movie.Title}</p>
            <p><strong>Year:</strong> ${movie.Year}</p>
          `;
          resultSearch.appendChild(div);
        });
      } else {
        resultSearch.innerHTML = `<p><strong>No results found for "${showSearch}".<strong/></p>`;
      }
    } catch (error) {
      resultSearch.innerHTML = `<p><strong>Error fetching data. Please try again later.</strong></p>`;
      console.error("Error fetching data from API:", error);
    }
  }
}

buttonClear.onclick = function () {
  const resultSearch = containerResult;
  resultSearch.innerHTML = "";
  input.value = "";
};
