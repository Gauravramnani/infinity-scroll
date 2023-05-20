const imagecontainer = document.getElementById('image-container');
const loader = document.getElementById('loader'); 
let photosArray=[];
let ready=false;
let imagesloadded = 0;
let totalimages = 0;



let count =30;
let apikey='Rx2ot6wg3pgmNFFpD45nQYkfZd3bFjqo168fb_RdTMU';
let apiurl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}
`

function setAttribute (element,attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key])


    }
}

//check if all img were loaded
function imageload(){
    console.log('imag loaded');
    imagesloadded++;
    loader.hidden = true;
    if(imagesloadded === totalimages){
        ready = true;
        loader.hidden=true;
    }
    
}

function displayphotos(){
    totalimages = photosArray.length;
    imagesloadded = 0;

    photosArray.forEach((photo)=>{
        const item =document.createElement('a');
        // item.setAttribute('href',photo.links.html);
        // item.setAttribute('target','_blank');
        setAttribute(item, {
            href:photo.links.html,
            target:'_blank',
        })
        //create <img> for photo

        const img = document.createElement('img')
        setAttribute(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        //put <img> inside <a>
        item.append(img);
        imagecontainer.appendChild(item);
        //event listener, check when it finished  loading
        img.addEventListener('load',imageload)
    })
}

async function getphotos(){
    try{
        const response = await fetch(apiurl);
        photosArray = await response.json();
        console.log(photosArray);
        displayphotos();
    }
    catch(error){
        console.log(error)
    }
}

//check see if scrolling near bottem of the page,load more photos
window.addEventListener('scroll',()=>{
  
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready=false;
        console.log('load more');
        getphotos();
    }
})

getphotos();