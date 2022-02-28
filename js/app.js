const phoneSearch = async () => {
  const searchInput = document.getElementById("search");
  searchInput.value = " ";
  const searchText = searchInput.value;
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayResult(data.data);
};

const displayResult = (data) => {
  const result = document.getElementById("result");
  data.map((phone) => {
    // console.log(phone)
    const div = document.createElement("div");
    div.classList.add("col-md-4");
    div.innerHTML = `
        <img src="${phone.image}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title fs-4">Name: ${phone.phone_name}</h5>
            <p class="card-text fs-5">Brand: ${phone.brand}</p>
            <a href="#details" onclick="phoneDetails('${phone.slug}')" class="btn btn-primary">Details</a>
        </div>
    `;
    result.appendChild(div);
  });
};

const phoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const json = await res.json();
  displayDetails(json.data);
};

const displayDetails = (data) => {
  console.log(data);
  const details = document.getElementById("details");
  const div = document.createElement("div");
  div.innerHTML = `
    <img src="${data.image}" class="card-img-top">
    <div class="card-body">
        <h5 class="card-title fs-4">Name: ${data.name}</h5>
        <p class="card-text fs-5 m-0">Brand: ${data.brand}.</p>
        <p class="card-text fs-5 m-0">ChipSet: ${data.mainFeatures.chipSet}.</p>
        <p class="card-text fs-5 m-0">Display: ${
          data.mainFeatures.displaySize
        }.</p>
        <p class="card-text fs-5 m-0">Memory: ${data.mainFeatures.memory}.</p>
        <p class="card-text fs-5 m-0">Sensors: 
        ${data.mainFeatures.sensors.map((name) => " " + name)}.</p>
        <p class="card-text fs-5 m-0">Storage: ${data.mainFeatures.storage}.</p>
        <p class="card-text fs-5 m-0">Release Date: ${data.releaseDate}.</p>
    </div>
  `;
  details.appendChild(div);
};
