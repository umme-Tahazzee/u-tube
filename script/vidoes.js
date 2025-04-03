const loadVideos = () => {
   fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
     .then(res=>console.log(res))
     .catch(err => console.log(err))
}
loadVideos()