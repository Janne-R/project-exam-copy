const searchText = document.querySelector(".search-text");
const searchButton = document.querySelector(".search-button");

searchButton.addEventListener("click", () => {
  let input = searchText.value;
  window.location.href = `search-result.html?search=${input}`
});


