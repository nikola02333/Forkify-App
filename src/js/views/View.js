import icons from 'url:../../img/icons.svg';

export default class View{
    data;

    render(data, render= true){

        if(!data || (Array.isArray(data) && data.length === 0 )) return this.renderError();

        this.data= data;
        const markup = this.generateMarkup();

        if( !render ){
          return markup;
        }

        this.clear();
        this.parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    clear()
    {
        this.parentElement.innerHTML = '';
    }

    update(data){
     

      this.data= data;
      const newMarkup = this.generateMarkup();
      // sada porediti stari Markup sa  newMarkup

      const newDOM = document.createRange().createContextualFragment(newMarkup);

      const newElements = Array.from( newDOM.querySelectorAll('*'));

      const curElements = Array.from( this.parentElement.querySelectorAll('*'));

      // Sada idemo  poredjenje kroz oba niza 

      newElements.forEach((newEl, i) => {
        const curEl = curElements[i];

        // imamo funk. isEqualNode(), gleda samo kontent 
        if( !newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '')
        {
          curEl.textContent = newEl.textContent;
        }

        //update  changed ATTRIBUTES
        if(!newEl.isEqualNode(curEl))
        {
          Array.from( newEl.attributes).forEach( attr => curEl.setAttribute(attr.name, attr.value));

        }
      })

    }

    renderMessage(message = this.message){
      const markup =  ` 
      <div class='message'>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
  this.clear();
  this.parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderError(message= this.errorMessage){
      const markup =  `  <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
  this.clear();
  this.parentElement.insertAdjacentHTML('afterbegin', markup);
    }

     renderSpinner = function(){
        const markup = `<div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
      this.parentElement.innerHTML = '';
      this.parentElement.insertAdjacentHTML('afterbegin',markup);
      }
}