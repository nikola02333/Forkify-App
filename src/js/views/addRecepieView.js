import View  from './View';
import icons from 'url:../../img/icons.svg';

class AddRecepieView extends View{
    
    parentElement = document.querySelector('.upload');

    window = document.querySelector('.add-recipe-window');
    overlay = document.querySelector('.overlay');
    btnOpen = document.querySelector('.nav__btn--add-recipe');
    btnClose = document.querySelector('.btn--close-modal');
    _message = 'Recepe was succesfuly uploaded';

 // moze i remove, al toogle ce dodati klasu ako nije tamo, a ako postoji, onda ce je obrisati 

    constructor()
    {
        super();
        this.addHandlerShowWindow();
        this.addHandlerHideWindow();
    }

    toggleWindow(){
        
        this.overlay.classList.toggle('hidden');
        this.window.classList.toggle('hidden');
    }

   

    addHandlerUpload(handler){
        this.parentElement.addEventListener('submit', function(e){
            e.preventDefault();
            // this pokazuje na uploadFormu
            const dataArray = [...new FormData(this)];
            const data = Object.fromEntries(dataArray);
            handler(data);
            // api call se radi u modelu
        });
    }

    addHandlerShowWindow(){
        this.btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    }

    addHandlerHideWindow(){
        this.btnClose.addEventListener('click', this.toggleWindow.bind(this));
        this.overlay.addEventListener('click', this.toggleWindow.bind(this));
    }

    
}
export default new AddRecepieView();