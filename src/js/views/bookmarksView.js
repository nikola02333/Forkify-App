import View  from './View';
import icons from 'url:../../img/icons.svg';

import previewView from './previewView';

class BookmarkView extends View{
    
    parentElement = document.querySelector('.bookmarks__list');
    errorMessage= 'No bookmarks yet.Pleas  find one!';
    message = '';

    addHandlerRender(handler){
        window.addEventListener('load', handler);
    }
    generateMarkup(){

        return this.data.map( bookmark => previewView.render(bookmark, false)).join('');
       
    }
    
   
}
export default new BookmarkView();