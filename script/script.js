function getTime(time) {
  const years = Math.floor(time / 31536000);
  time %= 31536000;

  const months = Math.floor(time / 2592000);
  time %= 2592000;

  const days = Math.floor(time / 86400);
  time %= 86400;

  const hours = Math.floor(time / 3600);
  time %= 3600;

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  // Ensure double-digit formatting for hours, minutes, and seconds
  const format = (num) => String(num).padStart(2, "0");

  return `${years ? years + "y " : ""}${months ? months + "m " : ""}${days ? days + "d " : ""}${format(hours)}:${format(minutes)}:${format(seconds)}`;
}



const removeActiveClass = () => {
  const buttons = document.getElementsByClassName('category-btn')
  for (let btn of buttons) {
    btn.classList.remove('active');
  }

}

// Fetch, Load and show categories or html
//create Load categories
const loadCategorires = () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((err) => console.log(err))

}

//load videos
const loadVideos = (searchText="") => {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
    .catch(err => console.log(err))
}

const loadCategoriresVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => {

      //sobaik active class remove 
      removeActiveClass()
      //id er class k active 
      const activeBtn = document.getElementById(`btn-${id}`)
      activeBtn.classList.add('active')
      displayVideos(data.category)
    })
    .catch(err => console.log(err))

}
//create display categories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById('categories');
  categories.forEach((item) => {
    //create a button
    const buttonContainer = document.createElement('div')

    buttonContainer.innerHTML = `
      <button id="btn-${item.category_id}" 
      onclick="loadCategoriresVideos(${item.category_id})" 
      class="btn category-btn">
        ${item.category}
      </button>
   `;

    //add button to category container
    categoryContainer.append(buttonContainer)

  });
}

//details of videos
const loadDetails =async (videoId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
  const res = await fetch(url);
  const data = await res.json()
  displayDetails(data.video); 
}
const displayDetails = (video) => {
   
    const detailsContainer = document.getElementById('modalContent')
    detailsContainer.innerHTML=`
     <img src="${video.thumbnail}" />
     <p>${video.description} </p>
    `
    //way-1
    //document.getElementById("showModalData").click()
    //way-2
    document.getElementById('customModal').showModal()
}

//create display videos
const displayVideos = (videos) => {
  const vdoContainer = document.getElementById('videos')
  vdoContainer.innerHTML = "";
  if (videos.length === 0) {
    vdoContainer.classList.remove('grid')
    vdoContainer.innerHTML = `
      <div class="min-h-[300px] w-full flex flex-col gap-5 justify-center items-center text-center">
        <img class="h-[100px] w-[100px]" src="design/Icon.png" alt="">
        <h1 class="text-2xl font-bold">Oops Sorry!! There are no videos in this content</h1>
      </div>
    `
    return
  } else {
    vdoContainer.classList.add('grid')
  }

  videos.forEach((vdo) => {
    console.log(vdo);

    const card = document.createElement('div')
    card.classList = 'card bg-base-100'
    card.innerHTML = `
  <figure class="h-[200px] relative">
    <img
      src=${vdo.thumbnail}
      class="h-full w-full object-cover"
      alt="Shoes"
      />
      ${vdo.others.posted_date?.length === 0 ? "" :
        ` <span class="absolute text-xm right-2 bottom-7 
      bg-black text-white rounded-full p-1">
      ${getTime(parseInt(vdo.others.posted_date))}
       </span>`
      }
     
  </figure>
  <div class="px-0 py-2 flex gap-2">
     <div class="">
      <img class="w-10 h-10 rounded-full object-cover" src="${vdo.authors[0].profile_picture}"/> 
     </div>
     <div>
       <h2 class="font-bold">
         ${vdo.title}
       </h2> 
       <div class="flex item-center gap-2">  
     <p class="text-gray-400">${vdo.authors[0].profile_name}</p>
      
      ${vdo.authors[0].verified === true ?
        '<img class="w-5"  src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>' :
        ''} 
     <div>
       <p><button onclick="loadDetails('${vdo.video_id}')" class="btn btn-sm btn-error">
        details
       </button></p>
     </div>

     </div>
     </div>
  </div>
    `;
    //add button to category container
    vdoContainer.append(card)
  })


}

document.getElementById('searchInput').addEventListener('keyup',(e)=>{
  console.log(e.target.value); 
  loadVideos(e.target.value);
   
})

loadCategorires()
loadVideos()

