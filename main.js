const urlApiRandom = "https://api.thecatapi.com/v1/images/search?limit=2";
const urlApiFavourite = "https://api.thecatapi.com/v1/favourites/";
const urlApiUpload = "https://api.thecatapi.com/v1/images/upload";
const spanError = document.querySelector("#span-error");
const btnRandomKitten = document.querySelector("#btn-random-kitten");
const btnUploadKitten = document.querySelector("#btn-upload-kitten");
const contentRandomKitten = document.querySelector("#content-random-kitten");
const contentFavoriteKitten = document.querySelector("#content-favorites-kitten");
const options = {
    "headers": {
        "x-api-key": "live_xx3g7aCM6uP1jBOKPtSHwuhPoG6ZA27qjcMN3NdQyQVquNoyWNeWFQOGbT4PxNBp",
        "Content-Type": "application/json"
    }    
}
async function fetchData(urlApi, options) {
    const response = await fetch(urlApi, options);
    const data  = await response.json();
    if(response.status !== 200) {
        spanError.textContent = `Error: ${response.status}, ${response.statusText};`
    }
    return data;
}

async function loadRandomKittens() {
    try {
        const kittens = await fetchData(urlApiRandom, options);
        const arrKitten = [];
        contentRandomKitten.innerHTML="";
        kittens.forEach(kitten => {
            const button = document.createElement("button");
            button.className = "btn-add-kitten";
            button.title = "add to my favorites kitten";
            button.textContent = "+";
            button.addEventListener("click", (event) => {
                addFavoriteKitten(kitten.id, event.target.parentNode);
            });
            const img = document.createElement("img");
            img.className = "img-kitten random-kitten";
            img.alt = "random thumbnail kitten";
            img.loading = "lazy";
            img.src = kitten.url;
            const content = document.createElement("div");
            content.className = "content-kitten";
            content.append(button, img);
            arrKitten.push(content);
        });
        contentRandomKitten.append(...arrKitten);
    } catch (error) {
        console.log(error);
    }
}

async function loadFavoriteKittens() {
    try {
        const kittens = await fetchData(urlApiFavourite, options);
        const arrKitten = [];
        contentFavoriteKitten.innerHTML="";
        kittens.forEach(kitten => {
            const button = document.createElement("button");
            button.className = "btn-add-kitten";
            button.title = "delete from my favorites kitten";
            button.textContent = "-";
            button.addEventListener("click", (event) => {
                deleteFavoriteKitten(kitten.id, event.target.parentNode);
            });
            const img = document.createElement("img");
            img.className = "img-kitten favorite-kitten";
            img.alt = "favorite thumbnail kitten";
            img.loading = "lazy";
            img.src = kitten.image.url;
            const content = document.createElement("div");
            content.className = "content-kitten";
            content.append(button, img);
            arrKitten.push(content);
        });
        contentFavoriteKitten.append(...arrKitten);
    } catch (error) {
        console.log(error);    
    }
}

async function addFavoriteKitten(id,parent) {
    try {        
        const newOptions = {
            "method": "POST",
            "body": JSON.stringify({
                "image_id": id
            }),
            ...options
        };   
        const kitten = await fetchData(urlApiFavourite, newOptions);
        parent.remove();
        console.log(event);
        loadFavoriteKittens();                  
        isEmptyContentRandomKittens();      

    } catch (error) {
        console.log(error);
    }
}

async function deleteFavoriteKitten(id, parent) {
    try {
        const newOptions = {
            "method": "DELETE",
            ...options
        };   
        const kitten = await fetchData(`${urlApiFavourite}${id}`, newOptions);
        parent.remove();
    } catch (error) {
        console.log(error);
    }
}


function isEmptyContentRandomKittens() {
    if(contentRandomKitten.childElementCount === 0){
        loadRandomKittens();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadRandomKittens();
    loadFavoriteKittens();
});

btnRandomKitten.addEventListener("click", loadRandomKittens);

async function uploadKitten() {
    try {
        const form = document.querySelector("#form-kiten");
        const formData = new FormData(form);
        const newOptions = {
            "method": "POST",
            "body": formData,
            "headers": {
                "x-api-key": options.headers["x-api-key"]
            }            
        };   
        const kitten = await fetchData(urlApiUpload, newOptions);
        console.log(kitten);
    } catch (error) {
        console.log(error);
    }
}
btnUploadKitten.addEventListener("click", uploadKitten);
