// function getTime(time) {
//     const years = Math.floor(time / 31536000);
//     time %= 31536000;
  
//     const months = Math.floor(time / 2592000);
//     time %= 2592000;
  
//     const days = Math.floor(time / 86400);
//     time %= 86400;
  
//     const hours = Math.floor(time / 3600);
//     time %= 3600;
  
//     const minutes = Math.floor(time / 60);
//     const seconds = time % 60;
  
//     // Ensure double-digit formatting for hours, minutes, and seconds
//     const format = (num) => String(num).padStart(2, "0");
  
//     return `${years ? years + "y " : ""}${months ? months + "m " : ""}${days ? days + "d " : ""}${format(hours)}:${format(minutes)}:${format(seconds)}`;
//   }
// console.log()  

const data = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 22 },
    { name: "Charlie", age: 30 }
  ];
  
  // Sorting by age (ascending)
  data.sort((a, b) => a.age - b.age);
  
  console.log(data);
  