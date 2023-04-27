import Notiflix from 'notiflix';

const submit = document.querySelector('.search-form');
const input = document.querySelector('searchQuery');

submit.addEventListener('submit', onFetch);

// const axios = require('axios');
// axios
//     .get('/user?ID=35822629')
// // user_id: 35822629 
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });

function onFetch(event) {
  event.preventDefault;
  searchParam = input.value;
  if (searchParam === '') {
   Notiflix.Notify.info(
     'Sorry, there are no images matching your search query. Please try again.'
   );
  }
  fentch('https://pixabay.com/images/search/${searchParam}');
}
