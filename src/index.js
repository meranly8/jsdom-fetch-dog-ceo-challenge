document.addEventListener("DOMContentLoaded", () => {
    let breeds

    fetchImages()
    fetchBreeds()

    const filter = document.querySelector("#breed-dropdown")
    filter.addEventListener("change", filterDropdown)
})

function fetchImages() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4" 
    fetch(imgUrl)
    .then(resp => resp.json())
    .then(data => addImagesToDOM(data.message))
}

function addImagesToDOM(data) {    
    const imgContainer = document.querySelector("#dog-image-container")

    data.forEach(image => {
        let img = document.createElement("img")
        img.src = image
        imgContainer.appendChild(img)
    })
}

function fetchBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all' 
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(data => {
        breeds = Object.keys(data.message)
        addBreedsToDOM(breeds)
    })
}

function addBreedsToDOM(data) {
    const list = document.querySelector("#dog-breeds")

    data.forEach(breed => {
        let li = document.createElement("li")
        li.innerText = breed
        li.id = breed
        list.append(li)
        changeBreedColor()
    })
}

function changeBreedColor(){
    const breedLIs = document.querySelectorAll("#dog-breeds li")

    breedLIs.forEach(breed => {
        breed.addEventListener("click", () => {
            breed.style.color = "skyblue"
        })
    })
}

function filterDropdown() {
    const breedsList = document.querySelector("#dog-breeds")
    const letter = document.querySelector("#breed-dropdown").value
    breedsList.innerText = ""
    breeds.forEach(breed => {
        if (breed.startsWith(letter) || letter === "default") {
            const li = document.createElement("li")
            li.innerText = breed
            breedsList.append(li)
            changeBreedColor()
        }
    })
  }