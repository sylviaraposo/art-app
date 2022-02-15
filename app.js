// What are we doing in our app

// Create an app object (to make use of namespacing)
const artApp = {};

// Save information  which will be reused (E.g. API key) within properties on the app object
artApp.apiKey = `nQkJYS3O`;
artApp.apiUrl = `https://www.rijksmuseum.nl/api/en/collection`

// Create a method that will make a call to the api and get some data
artApp.getArt = function(usersChosenAnimal){

    // Use the URL constructor to format the API endpoint to which we will be making our reference
    const url = new URL(artApp.apiUrl)

    // format and add our parameters to our URL
    url.search = new URLSearchParams({
        key: artApp.apiKey,
        q: usersChosenAnimal,
        imgonly: true,
        ps: 25
    });
    
    // fetch the data from the API endpoint which we have created
    fetch(url)
    //do something with the promised object
        .then(function (apiResponse) {
            // take the promise that is returned and parse it into json
            return apiResponse.json()
        })
        .then(function (artFromApi) {
            // console.log(artFromApi.artObjects);

            //take the date returned from the API and passing it to the display method
            artApp.displayArt(artFromApi.artObjects)
        })

}

// Create a method which will take the API Data and display it on our page
artApp.displayArt = function(artArray) {
    artArray.forEach(function (individualArtObject){
        // console.log(individualArtObject);

        // extract the data from the API (artists name, piece title, image URL, alt text) and save it within variables
        const artworkTitle = individualArtObject.title;
        const artworkImage = individualArtObject.webImage.url;
        const artist = individualArtObject.principalOrFirstMaker;
        const altText = individualArtObject.longTitle;

        console.log(artworkTitle, artworkImage, artist, altText);

        // create an li element with a class of piece in which this information will be added
        const liElement = document.createElement('li');
        liElement.classList.add('piece');

        // create an h2 to hold the art title
        const headingElement = document.createElement('h2');
        headingElement.textContent = artworkTitle;

        // create an image to hold the artwork picture
        const image = document.createElement('img');
        // console.log(image);

        // this element node has src and alt properties which we can use!
        image.src = artworkImage;
        image.alt = altText;

        // create a paragraph with a class of artist to hold the artist name
        const paragraph = document.createElement('p');
        paragraph.classList.add('artist');
        paragraph.textContent = artist;
        
        // take the elements we have created and add them to the li
        liElement.append(headingElement, image, paragraph)

        console.log(liElement);
        // add the li to the ul so that the data is showing in the dom!!
        const ulElement = document.querySelector('#artwork');
        ulElement.appendChild(liElement)


    })
}

// Create an initialization method which will kickstart our app.
artApp.init = function() {
    console.log('app is initialized!!');
    artApp.getArt('whale');
}

// Call the initialization method (at the end of our code)
artApp.init();
