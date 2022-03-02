const seeMore = document.getElementById("see-more");
// display spinner
const spinner = (displayStyle) => {
  document.getElementById("spinner").style.display = displayStyle;
};
// display Toggle
const ToggleDisplayResult = (displayStyle) => {
  document.getElementById("result").style.display = displayStyle;
};
// error
const error = (searchText, result) => {
  const div = document.createElement("div");
  div.innerHTML = `
      <h2 class="text-center">${searchText} Not Found...</h2>
      `;
  result.appendChild(div);
  seeMore.style.display = "none";
};
// search result
const searchResult = (phone, result) => {
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
  if (!isNaN(searchText)) {
    //   error messages
    console.log("e1", data);
    error(searchText, result);
  } else if (data.length == 0) {
    //   error messages
    error(searchText, result);
    console.log("e2", data);
  } else {
    console.log("e3", data);
    data.slice(0, 20).map((phone) => {
      searchResult(phone, result);
      if (20 < data.length) {
        seeMore.style.display = "block";
      }
    });
    // see More button
    seeMore.addEventListener("click", () => {
      data.slice(21).map((phone) => {
        searchResult(phone, result);
        seeMore.style.display = "none";
      });
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
  //   console.log(data);
  console.log(data);
  const details = document.getElementById("details");
  details.innerHTML = "";
  const div = document.createElement("div");
  //   div.classList.add("row");
  div.classList.add("row", "align-items-center", "mb-4", "bg-light", "py-4");
  div.innerHTML = `
      <div class="col-md-4">
          <img src="${data.image}" class="mx-auto d-block w-75">
      </div>
      <div class=" col-md-8">
          <h5 class="card-title fs-4">Name: 
          ${data.name}</h5>
          <p class="card-text fs-5 m-0">Brand: 
          ${data.brand}.</p>
          <p class="card-text fs-5 m-0">ChipSet: 
          ${data.mainFeatures.chipSet}.</p>
          <p class="card-text fs-5 m-0">Display: 
          ${data.mainFeatures.displaySize}
          <p class="card-text fs-5 m-0">Release Date: 
          ${data.releaseDate ? data.releaseDate : "Release Date Not Found"}.</p>
          <p class="card-text fs-5 m-0">Memory: 
          ${data.mainFeatures.memory}.</p>
          <p class="card-text fs-5 m-0">Brand: 
          ${data.brand}.</p>
          <p class="card-text fs-5 m-0">ChipSet: 
          ${data.mainFeatures.chipSet}.</p>
          <p class="card-text fs-5 m-0">Display: 
          ${data.mainFeatures.displaySize}.</p>
          <p class="card-text fs-5 m-0">Memory: 
          ${data.mainFeatures.memory}.</p>
          <p class="card-text fs-5 m-0">Storage: 
          ${data.mainFeatures.storage}.</p>
          <p class="card-text fs-5 m-0">Sensors: 
          ${data.mainFeatures.sensors.map((name) => " " + name)}.</p>
          <p class="card-text fs-5 m-0">Storage: 
          ${data.mainFeatures.storage}.</p>
          <p class="card-text fs-5 m-0">Release Date: 
          ${data.releaseDate}.</p>
          <p class="card-text fs-5 m-0">Other:</p>
          <p class="card-text m-0 ms-3" style="font-size: 15px">Bluetooth: 
          ${data.others?.Bluetooth ? data.others.Bluetooth : "Unspecified"}.</p>
          <p class="card-text m-0 ms-3" style="font-size: 15px">  GPS: 
          ${data.others?.GPS ? data.others.GPS : "Unspecified"}.</p>
          <p class="card-text m-0 ms-3" style="font-size: 15px">  NFC: 
          ${data.others?.NFC ? data.others.NFC : "Unspecified"}.</p>
          <p class="card-text m-0 ms-3" style="font-size: 15px">  Radio: 
          ${data.others?.Radio ? data.others.Radio : "Unspecified"}.</p>
          <p class="card-text m-0 ms-3" style="font-size: 15px">  USB: 
          ${data.others?.USB ? data.others.USB : "Unspecified"}.</p>
          <p class="card-text m-0 ms-3" style="font-size: 15px">  WLAN: 
          ${data.others?.WLAN ? data.others.WLAN : "Unspecified"}.</p>
      </div>
    `;
  details.appendChild(div);
};

// or

// const displayDetails = (data) => {
//   //   details
//   const details = document.getElementById("details");
//   details.innerHTML = "";
//   // div
//   const div = document.createElement("div");
//   div.classList.add("row", "align-items-center", "mb-4", "bg-light", "py-4");
//   // phoneImg
//   const phoneImg = document.createElement("div");
//   phoneImg.classList.add("col-md-4");
//   phoneImg.innerHTML = `
//               <img src="${data.image}" class="mx-auto d-block w-75 mb-4 mb-md-0">
//           `;
//   // phone Details
//   const phoneDetails = document.createElement("div");
//   phoneDetails.classList.add("col-md-8");
//   phoneDetails.innerHTML = `
//       <h5 class=" fs-4">Name: ${data.name}</h5>
//       <p class="fs-5 m-0">Release Date:
//       ${data.releaseDate ? data.releaseDate : "Release Date Not Found"}.</p>
//       <p class="fs-5 m-0">Brand:
//       ${data.brand}.</p>
//       <p class="fs-5 m-0">ChipSet:
//       ${data.mainFeatures.chipSet}.</p>
//       <p class="fs-5 m-0">Display:
//       ${data.mainFeatures.displaySize}.</p>
//       <p class="fs-5 m-0">Memory:
//       ${data.mainFeatures.memory}.</p>
//       <p class="fs-5 m-0">Storage:
//       ${data.mainFeatures.storage}.</p>
//       <p class="fs-5 m-0">Sensors:
//       ${data.mainFeatures.sensors.map((name) => " " + name)}.</p>
//       `;
//   // other
//   const other = document.createElement("div");
//   if (data.others != undefined) {
//     other.innerHTML = `
//       <p class="card-text fs-5 m-0">Other:</p>
//       <p class="card-text m-0 ms-3" style="font-size: 15px">Bluetooth:
//       ${data.others.Bluetooth}.</p>
//       <p class="card-text m-0 ms-3" style="font-size: 15px">  GPS:
//       ${data.others.GPS}.</p>
//       <p class="card-text m-0 ms-3" style="font-size: 15px">  NFC:
//       ${data.others.NFC}.</p>
//       <p class="card-text m-0 ms-3" style="font-size: 15px">  Radio:
//       ${data.others.Radio}.</p>
//       <p class="card-text m-0 ms-3" style="font-size: 15px">  USB:
//       ${data.others.USB}.</p>
//       <p class="card-text m-0 ms-3" style="font-size: 15px">  WLAN:
//       ${data.others.WLAN}.</p>
//       `;
//   }
//   div.appendChild(phoneImg);
//   div.appendChild(phoneDetails);
//   phoneDetails.appendChild(other);
//   details.appendChild(div);
// };
