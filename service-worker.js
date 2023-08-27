import Data from './data.json' assert {type: "json"};
import { Swiper } from './swiper.js';


document.addEventListener("DOMContentLoaded", () => {

  const body = document.querySelector('body');

  bindClients(body);

  bindPosts(body, Data[0].id);

  document.getElementById('clientList').addEventListener('change', (e) => {
    body.removeChild(document.querySelector('.swiper').parentElement);
    bindPosts(body, e.target.value);
  });
});

function bindClients(div) {

  const wrapper = document.createElement('div');
  wrapper.className = 'wrapper';

  let clients = '';
  Data.forEach(el => {
    clients += `<option value=${el.id}>${el.name}</option>`;
  });

  const clientList = `
    <select id="clientList" class="client__list" style="padding: 10px 10px; width: 100%;">
      ${clients}
    </select>
  `;

  wrapper.innerHTML = clientList;

  div.append(wrapper);
}

function bindPosts(div, clientID) {

  const wrapper = document.createElement('div');
  wrapper.className = 'wrapper';

  let clientPosts = '';
  Data.forEach(el => {
    if (el.id == clientID) {
      el.posts.forEach(el => {
        clientPosts += `
          <div data-id=${el.id} class="swiper-slide" style="display: flex; flex-direction: column; gap: 10px; text-align: center">
            <p>${el.title}</p>
            <p>${el.description}</p>
            <button>${el.button}</button>
          </div>
        `;
      });
    }
  });

  const postList = `
    <div class="swiper">
      <div class="swiper-wrapper">
        ${clientPosts}
      </div>

      <div class="swiper-pagination"></div>
      
      
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
  
      <div class="swiper-scrollbar"></div>
    </div>
  `;

  wrapper.innerHTML = postList;

  div.append(wrapper);

  const swiper = new Swiper('.swiper', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

}




// const swiper = new Swiper('.swiper', {
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   }
// });

// async function getCurrentTab() {
//   let queryOptions = { active: true, lastFocusedWindow: true };
//   let [tab] = await chrome.tabs.query(queryOptions);
//   return tab;
// }

// document.querySelector('button').addEventListener('click', async () => {
//   const tab = await getCurrentTab();

//   console.log(tab);
// });