const phoneSearch = async () => {
  const searchInput = document.getElementById("search");
  const searchText = searchInput.value;
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  //   console.log(searchText);

  const res = await fetch(url);
  const data = await res.json();
  displayResult(data.data);
  searchInput.value = " ";
};

const displayResult = (data) => {
  const result = document.getElementById("result");
  data.map((phone) => {
    // console.log(phone);
    const div = document.createElement("div");
    div.classList.add("col-md-4", "mb-3");
    div.innerHTML = `
        <img src="${phone.image}" class="mx-auto d-block w-75">
        <div class="card-body text-center">
            <h5 class="card-title fs-4">Name: ${phone.phone_name}</h5>
            <p class="card-text fs-5">Brand: ${phone.brand}</p>
            <a href="#button" onclick="phoneDetails('${phone.slug}')" class="btn btn-primary">Details</a>
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
  //   console.log(data);
  const details = document.getElementById("details");
  details.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("row");
  div.innerHTML = `
    <div class="col-md-4 mb-5">
        <img src="${data.image}" class="mx-auto d-block w-75">
    </div>
    <div class="card-body col-md-8">
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
