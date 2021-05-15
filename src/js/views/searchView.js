class SearchView{

    parentEl = document.querySelector('.search');
    getQuery()
    {
        const query= this.parentEl.querySelector('.search__field').value;
        this.clearInput();
        return query;
    }

    clearInput(){
        this.parentEl.querySelector('.search__field').value = '';
    }
    addHandlerSearch(handler){
        this.parentEl.addEventListener('submit', function(e){
            //aha posto imamo formu, moramo prvo da odradimo e.PreventDefault() da se ne bi refresovala
            e.preventDefault();
            handler();
        })
    }
}

export default new SearchView();