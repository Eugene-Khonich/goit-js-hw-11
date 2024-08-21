import{S as d,i as n}from"./assets/vendor-f33cd494.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const u="https://pixabay.com/api/",p=a=>{const r=new URLSearchParams({key:"45505147-33e194e8689097e70f28421cd",q:a,image_type:"photo",orientation:"horizontal",safesearch:"true"});return fetch(`${u}?${r}`).then(s=>{if(!s.ok)throw new Error(s.status);return s.json()})},y=document.querySelector(".gallery-list"),f=a=>{const r=a.map(({webformatURL:s,largeImageURL:l,tags:e,likes:t,views:i,comments:g,downloads:m})=>`<li class="gallery-item">
        <a class="gallery-link" href="${l}">
          <img class="gallery-image" src="${s}" alt="${e}">
            <div class="gallery-image-stats">
            <ul class="gallery-image-stats-list">
              <li class="gallery-image-stats-item">
                <p class="gallery-image-stats-title">Likes</p>
                <p class="gallery-image-stats-text">${t}</p>
              </li>
              <li class="gallery-image-stats-item">
                <p class="gallery-image-stats-title">Views</p>
                <p class="gallery-image-stats-text">${i}</p>
              </li>
              <li class="gallery-image-stats-item">
                <p class="gallery-image-stats-title">Comments</p>
                <p class="gallery-image-stats-text">${g}</p>
              </li>
              <li class="gallery-image-stats-item">
                <p class="gallery-image-stats-title">Downloads</p>
                <p class="gallery-image-stats-text">${m}</p>
              </li>
            </ul>
          </div>
        </a>
      </li>`).join("");y.insertAdjacentHTML("beforeend",r)},c=document.querySelector(".form");document.querySelector(".gallery-list");const o=document.querySelector(".loader"),h=new d(".gallery-list a",{captionsData:"alt",captionDelay:250,overlayOpacity:.8}),L=a=>{a.preventDefault(),o.classList.remove("hidden");const r=a.target.elements.inputField.value.toLowerCase().trim();if(!r){n.error({title:"Error",message:"You need to type something on field!",position:"topRight"}),o.classList.add("hidden");return}p(r).then(s=>{if(s.hits.length===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),o.classList.add("hidden");return}else f(s.hits),h.refresh(),o.classList.add("hidden")}).catch(s=>{n.error({message:`There is an Error ${s}. Try again!`,position:"topRight"})}),c.reset()};c.addEventListener("submit",L);
//# sourceMappingURL=commonHelpers.js.map
