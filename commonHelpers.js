import{a as p,S as g,i as l}from"./assets/vendor-6e0bf343.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();p.defaults.baseURL="https://pixabay.com";const L=15,m=async(o,e)=>{const n={q:o,image_type:"photo",orientation:"horizontal",safesearch:"true",key:"43337272-ad726c9b9e29498af38112cb0",page:e,per_page:L};return await p.get("/api/",{params:n})};function h(o){return o.map(e=>`
      <div class="card-wrapper">
  <li class="gallery-card">
    <a href="${e.largeImageURL}"><img src="${e.webformatURL}" alt="${e.tags}" class="gallery-img"/></a>
    <div class="gallery-panel">
      <p>Likes ${e.likes}</p>
      <p>Views ${e.views}</p>
      <p>Comments ${e.comments}</p>
      <p>Downloads ${e.downloads}</p>
    </div>
  </li>
</div>
    `).join("")}const y=document.querySelector(".js-form"),d=document.querySelector(".js-gallery"),u=document.querySelector(".loader"),a=document.querySelector(".load-more"),v=new g(".gallery a",{captionsresponse:"alt",captionDelay:250});let i=1;async function b(o){o.preventDefault();const e=o.target.elements.search.value.trim();if(d.innerHTML="",a.classList.remove("is-hiden"),e==="")return l.error({message:"The input field must not be empty!",position:"topRight"});try{const s=await m(e,i);if(s.length===0)return l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});d.innerHTML=h(s.data.hits),u.classList.remove("is-hidden"),v.refresh()}catch(s){console.log(s)}finally{u.classList.add("is-hidden"),a.classList.add("is-hiden"),y.reset()}}y.addEventListener("submit",b);const f=async o=>{try{i++;const{data:e}=await m(searchQuery,i);d.insertAdjacentElement("beforeend",h(e));const{height:s}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();if(window.scrollBy({top:s*2,behavior:"smooth"}),lastPage===i)return a.classList.add("is-hidden"),a.removeEventListener("click",f),l.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}catch(e){console.log(e)}};a.addEventListener("click",f);
//# sourceMappingURL=commonHelpers.js.map
