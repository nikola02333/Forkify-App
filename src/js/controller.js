

import * as model from './model.js';
import recipeView from './views/recepieView.js';
import searcgView from './views/searchView';
import resultsView from './views/resultsViews';
import paginationView from './views/paginationView';
import recepieView from './views/recepieView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecepieView from './views/addRecepieView.js';

import {MODAL_CLOSE_SEC} from './config';


console.log('Hello from console');
const controlRecipes = async function (){
  try{
    
    const id = window.location.hash.slice(1);
    if(!id) return;
    recipeView.renderSpinner();


    resultsView.update(model.getSearchResultsPage());
    
    bookmarksView.update(model.state.bookmakrs);
    // 1 loading recepit
   await model.loadRecipe(id);
    
 

    //console.log(recipe);

    recipeView.render(model.state.recipe);
    // 2 rendering recepie 
   
   
  //controlServings();

  } catch(err)
  {
    alert(err);
    recipeView.renderError();
    console.error(err);
  }
}


const controlSearchResults = async function(){

  try {

    resultsView.renderSpinner();
    
    const query = searcgView.getQuery();

    if(!query) return;


    await model.loadSearchResult(query);

    //resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // render Inital paginatnion buttons
    paginationView.render(model.state.search);

  } catch (error) {
    console.log(error);
  }
}

const controlAddBookmark = function(){

  // Add-Remove Bookmakr
  if( !model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);

  else model.deleteBookmark(model.state.recipe.id);


  recipeView.update(model.state.recipe);

  //render bookmarks
  bookmarksView.render(model.state.bookmakrs);

}

const controlPagination= function(goToPage){

  resultsView.render(model.getSearchResultsPage(goToPage));

  // render New paginatnion buttons
  paginationView.render(model.state.search);

}
const controlServings = function(newServings){

  model.updateServings(newServings);

  console.log('Control Servings called');
 // recipeView.render(model.state.recipe);   ovako sve renderuje
 recipeView.update(model.state.recipe);
}

const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmakrs);
}

const controlAddRecepie = async function(newRecepie){

  try {

    addRecepieView.renderSpinner();

  await model.uploadRecepie(newRecepie);
   
  console.log(model.state.recipe);

  recipeView.render(model.state.recipe);

  addRecepieView.renderMessage('Recepie was succesfuly uploaded');


    bookmarksView.render(model.state.bookmakrs);

    // change id in URL

    window.history.pushState(null,'',`#${model.state.recipe.id}`);



  setTimeout( function() {
    addRecepieView.toggleWindow()
  }, MODAL_CLOSE_SEC * 100);

  } catch (err) {
    console.error(err);
    addRecepieView.renderError(err.message);
  }
}

const init = function( ){
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);

  // Publisher-Subskriber patern
  recipeView.addHandlerUpdateServings(controlServings);
  recepieView.addHandlerAddBookmark(controlAddBookmark);

  searcgView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  
  addRecepieView.addHandlerUpload(controlAddRecepie);
}


init();
