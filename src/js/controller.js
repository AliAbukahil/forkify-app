// const { data } = require('browserslist');

// import everything *
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

// for polyfilling some functions & methods like Promise or find() that Parcel can't polyfill
import 'core-js/stable';
// for polyfilling async/await
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// this code is not javescript code but Parcel code to save the state
// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    // simple gurad clause => this way is the modern way of preforming this test
    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

// this asynchronus function will call the asynchronus loadSearchResults from the model.js
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    // this guard clause is when there is no query
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render Results
    resultsView.render(model.getSearchResultsPage());
  } catch (err) {
    console.log(err);
  }
};

// Publisher-Subscriber-Pattern Implementation
// this keeps everything nicely separated in the MVC architecture
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
