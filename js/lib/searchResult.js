import getImageUrl from "../lib/getImageUrl.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);

const search = params.get("search");

const url = `https://familykitchen.janne-ringdal.one/wp-json/wp/v2/posts?_embed&per_page=100&search=${search}`;

async function viewResults() {

  try {

    const getPosts = await fetch(url);
    const resultPosts = await getPosts.json();

    const searchContainer = document.querySelector(".search-result");
    const searchParameter = document.querySelector(".search-parameter");

    if (resultPosts.length === 0) {
      searchParameter.innerHTML = `<h1 class="header-h1">Could not find any blogs matching: "${search}"</h1>`
    }
    else {
      searchParameter.innerHTML = `<h1 class="header-h1">Search result for: "${search}"</h1>`
      searchContainer.innerHTML = "";
      for (let i = 0; i < resultPosts.length; i++) {


        searchContainer.innerHTML += `<a href="blog-specific.html?id=${resultPosts[i].id}">
                                                      <h2>${resultPosts[i].title.rendered}</h2>
                                                      <div class="blog-post-image" style="background-image: url(${getImageUrl("medium", resultPosts[i].featured_media, resultPosts[i]._embedded["wp:featuredmedia"])})"></div>
                                                      <p>${resultPosts[i].excerpt.rendered}</p>
                                                      <button class="button"> View recipe</button>
                                                      `;
      }

    }
  }
  catch (error) {
  }
}

viewResults();