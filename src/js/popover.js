
export class popover{
    constructor(parentEl){
        this.parentEl = parentEl;
    }
    static get markup(){  
            return `
                <div class="popover" placement="bottom">
                <h1 class= "popover-header">Оконо</h1>
                <p class="popover-body">Это окно всплывает само по себе</p>
                </div>
            `;
    }


    bindToDOM(){
        this.parentEl.innerHTML = popover.markup;
    }
}

