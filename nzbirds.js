/* This function should load all of the birds into your bird-display */
function loadAllBirds() {
    function response_callback(response) {
        if(response.status != 200){
           return;
        } else {
           return response.text();
        }
    }

    function data_callback(data) {
        let birds_array = JSON.parse(data);
 
        /* clear bird display */
        const myNode = document.getElementById("bird-display");
         myNode.innerHTML = '';
 
        /* create an elementfor bird information card */
        for (i = 0; i < birds_array.length; i++) {
            let bird = birds_array[i];
             new infoCard(bird.scientific_name /*, bird.family, bird.order, bird.status, bird.length, bird.weight*/)
        }
        setTimeout(loadAllBirds, 3000);
        return birds_array;
    }
    
    console.log("Up till here it is running - line 27")
    fetch(nzbird.json).then(response_callback).then(data_callback);
}

class infoCard {

    constructor(scientific_name) {
        /* add: family, order, status, length, weight*/
        this.scientific_name = scientific_name;
        /*this.family = family;
        this.order = order;
        this.status = status;
        this.length = length;
        this.weight = weight;*/
        this._create();
    }

    _create() {
        const cardDisplay = document.createElement('div');
        cardDisplay.setAttribute('class', this.type);
        cardDisplay.append(this._newElement('p', 'scientific_name', this.scientific_name));
        /* add more of these with more information*/

        document.querySelector('#bird-display').prepend(cardDisplay);
    }

    _newElement(type, className, content) {
        const e = document.createElement(type);
        e.setAttribute('class', className);
        e.textContent = content;
        return e;
    }
}

loadAllBirds()