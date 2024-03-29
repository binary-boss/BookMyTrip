// CRIO_SOLUTION_START_MODULE_ADVENTURE_DETAILS
// CRIO_SOLUTION_END_MODULE_ADVENTURE_DETAILS
import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  // CRIO_SOLUTION_START_MODULE_ADVENTURE_DETAILS
  const urlParams = new URLSearchParams(search);
  const adventureId = urlParams.get("adventure");
  return adventureId;
  // CRIO_SOLUTION_END_MODULE_ADVENTURE_DETAILS

  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call

  // CRIO_SOLUTION_START_MODULE_ADVENTURE_DETAILS
  try {
    const result = await fetch(
      config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`
    );
    const data = await result.json();
    return data;
  } catch (e) {
    return null;
  }
  // CRIO_SOLUTION_END_MODULE_ADVENTURE_DETAILS

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  // CRIO_SOLUTION_START_MODULE_ADVENTURE_DETAILS
  //Setting the name
  document.getElementById("adventure-name").innerHTML = adventure.name;

  //Setting the subtitle
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;

  //Loading the images
  adventure.images.map((image) => {
    let ele = document.createElement("div");
    ele.className = "col-lg-12";
    ele.innerHTML = `
    <img
        src=${image}
        alt=""
        srcset=""
        class="activity-card-image pb-3 pb-md-0"
      />
          `;
    document.getElementById("photo-gallery").appendChild(ele);
    let button = document.createElement("button");
    button.class
  });

  //Setting the content
  document.getElementById("adventure-content").innerHTML = adventure.content;
  // CRIO_SOLUTION_END_MODULE_ADVENTURE_DETAILS
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  // CRIO_SOLUTION_START_MODULE_ADVENTURE_DETAILS
  document.getElementById("photo-gallery").innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    <div id="" class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></li>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></li>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></li>
    </div>

    <div class="carousel-inner" id="carousel-inner">

    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Prev</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
</div>`;

  images.map((image, idx) => {
    let ele = document.createElement("div");
    ele.className = `carousel-item ${idx === 0 ? "active" : ""}`;
    ele.innerHTML = `
    <img
        src=${image}
        alt=""
        srcset=""
        class="activity-card-image pb-3 pb-md-0"
      />
          `;

    document.getElementById("carousel-inner").appendChild(ele);
  });
  // CRIO_SOLUTION_END_MODULE_ADVENTURE_DETAILS
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

  // CRIO_SOLUTION_START_MODULE_ADVENTURE_DETAILS
  if (adventure.available) {
    document.getElementById("reservation-panel-available").style.display =
      "block";
    document.getElementById("reservation-panel-sold-out").style.display =
      "none";
    document.getElementById("reservation-person-cost").innerHTML =
      adventure.costPerHead;
  } else {
    document.getElementById("reservation-panel-sold-out").style.display =
      "block";
    document.getElementById("reservation-panel-available").style.display =
      "none";
  }
  // CRIO_SOLUTION_END_MODULE_ADVENTURE_DETAILS
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

  // CRIO_SOLUTION_START_MODULE_ADVENTURE_DETAILS
  document.getElementById("reservation-cost").innerHTML =
    persons * adventure.costPerHead;
  // CRIO_SOLUTION_END_MODULE_ADVENTURE_DETAILS
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  // CRIO_SOLUTION_START_MODULE_ADVENTURE_DETAILS
  const form = document.getElementById("myForm");
  // FIXME - Check if tests fail if form.name.value is directly used in bodyString instead
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let url = config.backendEndpoint + "/reservations/new";

    let formElements = form.elements;

    let bodyString = JSON.stringify({
      name: formElements["name"].value,
      date: formElements["date"].value,
      person: formElements["person"].value,
      adventure: adventure.id,
    });

    try {
      let res = await fetch(url, {
        method: "POST",
        body: bodyString,
        headers: {
          "Content-Type": "application/json",
        },
      });

      debugger;
      if (res.ok) {
        alert("Success!");
        window.location.reload();
      } else {
        let data = await res.json();
        alert(`Failed - ${data.message}`);
      }
    } catch (err) {
      console.log(err);
      alert("Failed - fetch call resulted in error");
    }
  });
  // CRIO_SOLUTION_END_MODULE_ADVENTURE_DETAILS
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

  // CRIO_SOLUTION_START_MODULE_ADVENTURE_DETAILS
  if (adventure.reserved) {
    document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
  }
  // CRIO_SOLUTION_END_MODULE_ADVENTURE_DETAILS
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
