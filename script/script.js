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

 return `${years ? years + "y " : ""}${months ? months + "m " : ""}${days ? days + "d " : ""}${hours}:${minutes}:${seconds}`;
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
const loadVideos = () => {
 fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
  .then(res => res.json())
  .then(data => displayVideos(data.videos))
  .catch(err => console.log(err))
}

//create display categories
const displayCategories = (categories) => {
 const categoryContainer = document.getElementById('categories');
 categories.forEach((item) => {

  //create a button
  const button = document.createElement('button')
  button.classList = 'btn';
  button.innerText = item.category;
  //add button to category container
  categoryContainer.append(button)

 });
}
// const cardDemo = {
//  "status": true,
//  "message": "Successfully fetched all the videos",
//  "videos": [
//   {
//    "category_id": "1001",
//    "video_id": "aaaa",
//    "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//    "title": "Shape of You",
//    "authors": [
//     {
//      "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//      "profile_name": "Olivia Mitchell",
//      "verified": ""
//     }
//    ],
//    "others": {
//     "views": "100K",
//     "posted_date": "16278"
//    },
//    "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
//   }
//  ]
// }

//create display videos
const displayVideos = (videos) => {
 const vdoContainer = document.getElementById('videos')
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
    ` <span class="absolute right-2 bottom-7 
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
     </div>
     </div>
  </div>
    `;
  //add button to category container
  vdoContainer.append(card)
 })


}


loadCategorires()
loadVideos()

