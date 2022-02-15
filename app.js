// What are we doing in our app

// Create an app object (to make use of namespacing)
const artApp = {};

// Save information  which will be reused (E.g. API key) within properties on the app object
artApp.apiKey = `nQkJYS3O`;
artApp.apiUrl = `https://www.rijksmuseum.nl/api/en/collection`

// Create a method that will make a call to the api and get some data
artApp.getArt = function(){

    // Use the URL constructor to format the API endpoint to which we will be making our reference
    const url = new URL(artApp.apiUrl)

    // format and add our parameters to our URL
    url.search = new URLSearchParams({
        key: artApp.apiKey,
        q: `monkey`,
        imgonly: true
    });
    
    // fetch the data from the API endpoint which we have created
    fetch(url)
    //do something with the promised object
        .then(function (apiResponse) {
            // take the promise that is returned and parse it into json
            return apiResponse.json()
        })
        .then(function (artFromApi) {
            console.log(artFromApi.artObjects);
        })

}


// Create an initialization method which will kickstart our app.
artApp.init = function() {
    console.log('app is initialized!!');
    artApp.getArt();
}

// Call the initialization method (at the end of our code)
artApp.init();
