// display spinner
const spinner = (displayStyle) => {
  document.getElementById("spinner").style.display = displayStyle;
};
// display Toggle
const ToggleDisplayResult = (displayStyle) => {
  document.getElementById("result").style.display = displayStyle;
};
// search product
const phoneSearch = async () => {
  // get value from input field
  const searchInput = document.getElementById("search");
  const searchText = searchInput.value.toLowerCase();
  // spinner & Toggle
  spinner("block");
  ToggleDisplayResult("none");
  // API
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayResult(data.data, searchText);
  searchInput.value = "";
};
// display search result
const displayResult = (data, searchText) => {
  const result = document.getElementById("result");
  result.innerHTML = "";
  const details = document.getElementById("details");
  details.innerHTML = "";
  if (data.length === 0) {
    const div = document.createElement("div");
    div.innerHTML = `
    <h2 class="text-center">${searchText} Not Found...</h2>
    `;
    result.appendChild(div);
  } else {
    data.slice(0, 20).map((phone) => {
      const div = document.createElement("div");
      div.classList.add("col-md-4", "mb-4");
      div.innerHTML = `
          <img src="${phone.image}" class="mx-auto d-block w-75">
          <div class="card-body text-center">
              <h5 class="card-title fs-4">Name: ${phone.phone_name}</h5>
              <p class="card-text fs-5">Brand: ${phone.brand}</p>
              <a href="#header" onclick="phoneDetails('${phone.slug}')" class="btn btn-primary">Details</a>
          </div>
      `;
      result.appendChild(div);
    });
  }
  // spinner & Toggle
  spinner("none");
  ToggleDisplayResult("flex");
};
// about product
const phoneDetails = async (id) => {
  // API
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const json = await res.json();
  displayDetails(json.data);
};
// display product details
const displayDetails = (data) => {
  //   details
  const details = document.getElementById("details");
  details.innerHTML = "";
  // div
  const div = document.createElement("div");
  div.classList.add("row", "align-items-center", "mb-4", "bg-light", "py-4");
  // phoneImg
  const phoneImg = document.createElement("div");
  phoneImg.classList.add("col-md-4");
  phoneImg.innerHTML = `
          <img src="${data.image}" class="mx-auto d-block w-75 mb-4 mb-md-0">
      `;
  // phone Details
  const phoneDetails = document.createElement("div");
  phoneDetails.classList.add("col-md-8");
  phoneDetails.innerHTML = `
    <h5 class=" fs-4">Name: ${data.name}</h5>
    <p class="fs-5 m-0">Release Date: 
    ${data.releaseDate ? data.releaseDate : "Release Date Not Found"}.</p>
    <p class="fs-5 m-0">Brand: 
    ${data.brand}.</p>
    <p class="fs-5 m-0">ChipSet: 
    ${data.mainFeatures.chipSet}.</p>
    <p class="fs-5 m-0">Display: 
    ${data.mainFeatures.displaySize}.</p>
    <p class="fs-5 m-0">Memory: 
    ${data.mainFeatures.memory}.</p>
    <p class="fs-5 m-0">Storage: 
    ${data.mainFeatures.storage}.</p>
    <p class="fs-5 m-0">Sensors: 
    ${data.mainFeatures.sensors.map((name) => " " + name)}.</p>
    `;
  // other
  const other = document.createElement("div");
  if (data.others != undefined) {
    other.innerHTML = `
        <p class="card-text fs-5 m-0">Other:</p>
        <p class="card-text m-0 ms-3" style="font-size: 15px">Bluetooth:
        ${data.others.Bluetooth}.</p>
        <p class="card-text m-0 ms-3" style="font-size: 15px">  GPS:
        ${data.others.GPS}.</p>
        <p class="card-text m-0 ms-3" style="font-size: 15px">  NFC:
        ${data.others.NFC}.</p>
        <p class="card-text m-0 ms-3" style="font-size: 15px">  Radio:
        ${data.others.Radio}.</p>
        <p class="card-text m-0 ms-3" style="font-size: 15px">  USB:
        ${data.others.USB}.</p>
        <p class="card-text m-0 ms-3" style="font-size: 15px">  WLAN:
        ${data.others.WLAN}.</p>
    `;
  }
  div.appendChild(phoneImg);
  div.appendChild(phoneDetails);
  phoneDetails.appendChild(other);
  details.appendChild(div);
};
