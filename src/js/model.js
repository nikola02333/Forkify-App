// import config from './config'; moze i ovako pa onda config.API_URL

import {API_URL, RES_PER_PAGE,KEY} from './config';
import { AJAX} from './helpers';

export const state = {
    recipe:{},
    search: {
      query: '',
      results:[] ,
      page: 1,
      resultsPerPage: RES_PER_PAGE,

    },
    bookmakrs: []
};
const createRecepieObject = function(data){
  const {recipe} = data.data;

  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
     ... (recipe.key && { key : recipe.key} )
  };
}
export const loadRecipe = async function(id)
{
    try{

    
      
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);

      state.recipe = createRecepieObject(data);

    if(state.bookmakrs.some(bookmark => bookmark.id === id))
      {
        state.recipe.bookmarked = true;
      }
      else 
       {
         state.recipe.bookmarked = false;
        }

        }catch(err){
        console.log(err);
        // ovde henldamo gresku, a hocemo gresku na View!!!
        // konotrler ce pozvati recepiView
        throw err;
        }
}


 const persistBookmarks = function(){

  localStorage.setItem('bookmarks', JSON.stringify(state.bookmakrs) );
}

export const addBookmark = function(recipe){

  state.bookmakrs.push(recipe);
  
  // Mark current 

  persistBookmarks();

  if(recipe.id === state.recipe.id)
  {
     state.recipe.bookmarked = true;

  }

}
export const deleteBookmark = function(id){

  const index = state.bookmakrs.findIndex(el => el.id === id);

  state.bookmakrs.splice(index, 1);

  if(id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
}
export const loadSearchResult = async function(query){

  try {

    state.search.query = query;
    const data =await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

    state.search.results= data.data.recipes.map(rec => {
      return{
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ... (rec.key && { key : rec.key} )
      }
    });

    state.search.page = 1;
  } catch (error) {

    console.log(err);
    // ovde henldamo gresku, a hocemo gresku na View!!!
    // konotrler ce pozvati recepiView
    throw err;
  }
}

export const getSearchResultsPage = function(page = state.search.page){

  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;

  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
}

export const updateServings = function(newServings){
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * newServings / state.recipe.servings;
  });

  state.recipe.servings = newServings;
}


export const uploadRecepie = async function(newRecepie){

  // previm niz  od objekta !!!
  // entry[0]- key, entry[1] value
  
  try{

  
  const ingredients =  Object.entries(newRecepie).filter(entry=> entry[0].startsWith('ingredient') && entry[1] !== '')
        .map(ing => {
          const ingArr = ing[1].replaceAll(' ','').split(',');

          if(ingArr.length !== 3) throw new Error('Wrong ingredient format! Please use the corret format:');

         const [quantity, unit, description] = ingArr;
        return { quantity : quantity ? +quantity : null, unit, description}
        });

        const recipe = {
          title: newRecepie.title,
          source_url: newRecepie.sourceUrl,
          image_url: newRecepie.image,
          publisher: newRecepie.publisher,
          cooking_time: +newRecepie.cookingTime,
          servings: +newRecepie.servings,
          ingredients,
        }

       const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
      // console.log(data);

       state.recipe = createRecepieObject(data);
        
    
      
       addBookmark(state.recipe);
      }
      catch(err)
      {
        throw err;
      }
}

const init = function(){
  const storage = localStorage.getItem('bookmarks');

  if(storage) state.bookmakrs = JSON.parse(storage);
}


init();

const clearBookmarks = function(){

  localStorage.clear('bookmarks');

}
