
const API = "https://randomfox.ca/floof"

const sectionImages = document.querySelector("section.images")
const btnAddImage = document.querySelector("#addImage")
const btnRemoveImage = document.querySelector("#removeImage")

const callbackEntrie = (entries) => {
    entries.forEach((entry) => {

        const url = entry.target.dataset.src

        if(entry.isIntersecting){
            console.log(entry.target)
            entry.target.src = url
            observador.unobserve(entry.target)
        }
    })
}

const observador = new IntersectionObserver(callbackEntrie, null)


const fetchImage = async url =>{

    const imageSrc = await (await fetch(url)).json();

    const imageContainer = document.createElement("div")
    imageContainer.className = "image__container"

    const image = document.createElement("img")
    image.className = "image";
    image.dataset.src = imageSrc.image;
    observador.observe(image);

    imageContainer.appendChild(image);

    sectionImages.appendChild(imageContainer) 
}

const deleteImage = () => {
    sectionImages.innerHTML = "";
}


btnAddImage.addEventListener("click", () => fetchImage(API))
btnRemoveImage.addEventListener("click", () => deleteImage())

