import View  from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View{
    
    parentElement = document.querySelector('.pagination');

    generateMarkup(){

        const currentPage = this.data.page;
        const numPages =Math.ceil (this.data.results.length / this.data.resultsPerPage);

        console.log(numPages);
        // Page 1
        if(currentPage === 1 && numPages > 1)
        {
            return ` <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
        }

        // Page 1, and there are NO other pages
        // Last page
        if(currentPage === numPages  && numPages > 1)
        {
            return `<button data-goto="${currentPage -1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>`;
        }
        //Other Page
        if(currentPage < numPages)
        {
            return  `<button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button> 
          <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
        }
        // Page 1, and there  are No other
        return '';
    }
    generateMarkupButton(page)
    {

    }

    addHandlerClick(handler){

        this.parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--inline');
            //search up, znaci gore gleda 
            if(!btn) return;
            const goToPage = +btn.dataset.goto;

            handler(goToPage);
        })
    }
}
export default new PaginationView();