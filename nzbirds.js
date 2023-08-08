let URL = '/nzbird.json';

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

             new infoCard(bird.primary_name, bird.photo.credit, bird.other_names[0], bird.scientific_name, bird.family, 
                        bird.order, bird.status, bird.size.length.value, bird.size.length.units,
                        bird.size.weight.value, bird.size.weight.units, bird.photo.source, "info-card")
        }
        return birds_array;
    }
    fetch(URL).then(response_callback).then(data_callback);
}

class infoCard {
    constructor(primary_name, photoCredit, other_names, scientific_name, family, 
        order, status, length, lengthUnits, weight, weightUnits, source, type) {
        this.primary_name = primary_name;
        this.photoCredit = photoCredit;
        this.other_names = other_names;
        this.scientific_name = scientific_name;
        this.family = family;
        this.order = order;
        this.status = status;
        this.length = length;
        this.lengthUnits = lengthUnits;
        this.weight = weight;
        this.weightUnits = weightUnits;
        this.source = source;
        this.type = type;
        this._create();
    }
    _create() {
        const cardDisplay = document.createElement('div');
        cardDisplay.setAttribute('class', this.type);
        cardDisplay.append(this._conStatusRectangle(this.status));
        cardDisplay.append(this._newElement('h2', 'primary_name', this.primary_name));

        /* Photo: */
        cardDisplay.append(this._newImage('img', 'birdImage', this.source, "image of birdie"));
        cardDisplay.append(this._newElement('p', 'photoCredit', "Photo by " + this.photoCredit));

        cardDisplay.append(this._newElement('h3', 'other_names', this.other_names));
        cardDisplay.append(this._newElement('p', 'scientific_name', "Scientific Name: " + this.scientific_name));
        cardDisplay.append(this._newElement('p', 'family', "Family: " + this.family));
        cardDisplay.append(this._newElement('p', 'order', "Order: " + this.order));
        cardDisplay.append(this._newElement('p', 'status', "Status: " + this.status));
        cardDisplay.append(this._newElement('p', 'length', "Length: " + this.length + " " + this.lengthUnits));
        cardDisplay.append(this._newElement('p', 'weight', "Weight: " + this.weight + this.weightUnits));

        // Add the info card to the bird-display
        document.querySelector('#bird-display').append(cardDisplay);
    }
    _newElement(type, className, content) {
        const e = document.createElement(type);
        e.setAttribute('class', className);
        e.textContent = content;
        return e;
    }
    _newImage(type, className, src, content) {
        const e = document.createElement(type);
        e.setAttribute('class', className);
        e.setAttribute('src', src);
        e.textContent = content;
        return e;
    }
    _conStatusCircle(status) {
        const e = document.createElement('p');
        if (status == 'Nationally Vulnerable') {
            e.setAttribute('class', 'status-circle-nationally-vulnerable');
        } else {
            e.setAttribute('class', 'status-circle-not-threatened');
        }
        return e;
    }
    _conStatusRectangle(status) {
        const e = document.createElement('a');

        if (status == 'Not Threatened') {
            e.setAttribute('class', 'rec-not-threatened'); 

       } else if (status == 'Naturally Uncommon') {
            e.setAttribute('class', 'rec-naturally-uncommon');

        } else if (status == 'Relict') {
            e.setAttribute('class', 'rec-relicit');

        } else if (status == 'Recovering') {
            e.setAttribute('class', 'rec-recovering');

        } else if (status == 'Declining') {
            e.setAttribute('class', 'rec-declining');

        } else if (status == 'Nationally Increasing') {
            e.setAttribute('class', 'rec-nationally-increasing');

        } else if (status == 'Nationally Vulnerable') {
            e.setAttribute('class', 'rec-nationally-vulnerable'); 
            
        } else if (status == 'Nationally Endangered') {
            e.setAttribute('class', 'rec-nationally-endangered'); 

        } else if (status == 'Nationally Critical') {
            e.setAttribute('class', 'rec-nationally-critical'); 

        } else if (status == 'Extinct') {
            e.setAttribute('class', 'rec-extinct'); 

        } else if (status == 'Data Deficient') {
            e.setAttribute('class', 'rec-data-deficient');  
        } 

        return e;

    }
}

function loadSearchedBird() {

    /* get input from filter section */
    const searchInput = document.querySelector('#search-text');
    const searchText = searchInput.value;
    searchInput.value = '';

    // input from conservation status select menu
    const statusMenu = document.querySelector('#conservation-status-select');
    const statusChosen = statusMenu.value;
    statusMenu.value = '';

    function response_callback(response) {
        if(response.status != 200){
           return;
        } else {
           return response.text();
        }
    }

    function data_callback(data) {
        // Create the bird array
        let birds_array = JSON.parse(data);
 
        /* clear bird display */
        const myNode = document.getElementById("bird-display");
        myNode.innerHTML = '';

        // search for the correct element
        let bird = '';
        let displayBird = false;

        for (i = 0; i < birds_array.length; i++) {

            let b = birds_array[i];

            let sText = searchText.normalize("NFKD").toLowerCase();
            let primN = b.primary_name.normalize("NFKD").toLowerCase();
            let otherN = b.other_names[0].normalize("NFC").toLowerCase();
            let sciN = b.scientific_name.normalize("NFC").toLowerCase();


            if (primN.includes(sText) || otherN.includes(sText) || sciN.includes(sText)) {
                bird = birds_array[i];
                displayBird = true;
            } 

            // Add Conservation Status as a Search Factor
            if (statusChosen == 'All' && displayBird == true) {
                displayBird = true;
            } else if (statusChosen == '' && displayBird == true) {
                displayBird = true;
            }
             else if (displayBird == true && statusChosen == bird.status) {
                displayBird = true;
            } else {
                displayBird = false;
            }


            // Display the bird's card
            if (displayBird == true) {
                new infoCard(bird.primary_name, bird.photo.credit, bird.other_names[0], bird.scientific_name, bird.family, 
                    bird.order, bird.status, bird.size.length.value, bird.size.length.units,
                    bird.size.weight.value, bird.size.weight.units, bird.photo.source, "info-card");

                displayBird = false;
            }
        }
        return birds_array;
            
    }
    fetch(URL).then(response_callback).then(data_callback);
}

function randomBirdGenerator() {
    let index = Math.floor(Math.random() * 68);

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
 
        let bird = birds_array[index];

        new infoCard(bird.primary_name, bird.photo.credit, bird.other_names[0], bird.scientific_name, bird.family, 
                bird.order, bird.status, bird.size.length.value, bird.size.length.units,
                bird.size.weight.value, bird.size.weight.units, bird.photo.source, "info-card")

        return birds_array;
    }

    fetch(URL).then(response_callback).then(data_callback);

}


// RUNNING THESE FUNCTIONS TO OPERATE THE SITE
// Load all birds upon loading the page
loadAllBirds()

// Operate the search button and filter menu
document.querySelector("#search-button").addEventListener('click', searchHandler);
function searchHandler(event) {
    event.preventDefault();
    loadSearchedBird();
}

// Operate the refresh button
document.querySelector("#refresh-button").addEventListener('click', refreshHandler);
function refreshHandler(event) {
    loadAllBirds()
}

// Operate the Random Bird Generator
document.querySelector("#random-button").addEventListener('click', randomGeneratorHandler);
function randomGeneratorHandler(event) {
    event.preventDefault();
    randomBirdGenerator()
}
