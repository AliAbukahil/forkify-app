// const { data } = require('browserslist');

// import everything *
import * as model from './model.js';
import recipeView from './views/recipeView.js';

// for polyfilling some functions & methods like Promise or find() that Parcel can't polyfill
import 'core-js/stable';
// for polyfilling async/await
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    // simple gurad clause => this way is the modern way of preforming this test
    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
  }
};

// Publisher-Subscriber-Pattern Implementation
// this keeps everything nicely separated in the MVC architecture
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
