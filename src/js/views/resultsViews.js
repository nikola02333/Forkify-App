import View  from './View';
import icons from 'url:../../img/icons.svg';

import previewView from './previewView';

class ResultsView extends View{
    
    parentElement = document.querySelector('.results');
    errorMessage= 'No recepies found for your query.Pleas try another one!';
    message = '';

    generateMarkup(){

      return this.data.map( result => previewView.render(result, false)).join('');
     
  }
  
   
}
export default new ResultsView();