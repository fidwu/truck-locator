$(document).ready(function() {
    $.ajax({
        method: "GET",
        url: 'https://my.api.mockaroo.com/locations.json?key=a45f1200',
        dataType: 'json'
    }).success(function (response) {
        console.log(response);
        display(response);
    });

    display = (response) => {
        const truckDataContainer = document.getElementById("truckData");

        for(let i = 0; i < response.length; i++) {
            // create card
            const truckCard = document.createElement("div");
            truckCard.classList.add("card");

            // create card body
            const truckCardBody = document.createElement("div");
            truckCardBody.classList.add("card-body");

            // use to hide/show bootstrap popup modal
            const modal = new bootstrap.Modal(document.getElementById('modal'));

            const modalContent = document.createElement("div");
            modalContent.className = "modal-content-click";
            modalContent.onclick = function() {
                modal.hide();
                showMap(response[i]);
            };
            
            // display name
            const truckName = document.createElement("p");
            truckName.classList.add("card-title");
            truckName.innerHTML = response[i].name;

            // display address
            const truckAddress1 = document.createElement("p");
            truckAddress1.className = "card-subtitle";
            truckAddress1.innerHTML = response[i].address;

            const truckAddress2 = document.createElement("p");
            truckAddress2.className = "card-subtitle mb-2";
            truckAddress2.innerHTML = `${response[i].city}, ${response[i].state} ${response[i].postal_code}`;

            // display open until
            const openUntil = document.createElement("p");
            openUntil.className = "card-subtitle my-3 text-green";
            openUntil.innerHTML = "Open today until 9pm"; 

            // display phone number
            const phoneNum = document.createElement("p");
            phoneNum.className = "card-subtitle my-3 mb-3 text-orange";
            phoneNum.innerHTML = "<img src='assets/phone-icon.png' /> 123-456-7890";

            modalContent.append(truckName, truckAddress1, truckAddress2, openUntil, phoneNum);
            truckCardBody.appendChild(modalContent);

            // buttons
            const btnGroup = document.createElement("div");
            btnGroup.className = "btn-group-container";

            const directionsBtn = document.createElement("button");
            directionsBtn.className = "btn btn-directions";
            directionsBtn.innerHTML = "DIRECTIONS";
            directionsBtn.onclick = function() {
                openMap(response[i]);
            };
            
            const infoBtn = document.createElement("button");
            infoBtn.className = "btn btn-more-info";
            infoBtn.innerHTML = "MORE INFO";
            infoBtn.onclick = function() {
                modal.show();
                showInfo(response[i]);
            };

            btnGroup.append(directionsBtn, infoBtn);
            truckCardBody.append(btnGroup);

            truckCard.append(truckCardBody);
            truckDataContainer.appendChild(truckCard);
        }
    }

    showMap = (response) => {
        // create map iframe
        console.log("show map function");

        if (window.innerWidth <= 575) {
            toggleDisplay('map-btn');
        }

        const truckInfo = document.getElementById("truckInfo");
        var map = document.createElement('iframe');
        map.width = "100%";
        map.height = "100%";
        map.src = `https://maps.google.com/maps?q=${response.latitude},${response.longitude}&z=14&amp&output=embed`;

        // display map
        truckInfo.replaceChild(map, truckInfo.childNodes[0]);
    }

    openMap = (response) => {
        const fullAddress = `${response.address} ${response.city}, ${response.state} ${response.postal_code}`;
        const url = `https://maps.google.com?daddr=${encodeURIComponent(fullAddress)}`;
        window.open(url);
    }

    showInfo = (response) => {

        if (window.innerWidth <= 575) {
            toggleDisplay('map-btn');
        }

        const modalBody = document.getElementById("modalBody");
        modalBody.innerHTML = "<button type='button' class='close' data-dismiss='modal'>&times;</button>";

        // add image placeholder
        const image = document.createElement("img");
        image.className = "image";

        // display name
        const truckName = document.createElement("p");
        truckName.className = "card-title";
        truckName.innerHTML = response.name;
        
        // display address
        const truckAddress1 = document.createElement("p");
        truckAddress1.className = "card-subtitle";
        truckAddress1.innerHTML = response.address;
        const truckAddress2 = document.createElement("p");
        truckAddress2.className = "card-subtitle mb-3";
        truckAddress2.innerHTML = `${response.city}, ${response.state} ${response.postal_code}`;

        // display phone number
        const row = document.createElement("div");
        row.className = "row d-flex flex-wrap";

        const phoneNum = document.createElement("div");
        phoneNum.className = "card-subtitle col-6 text-orange mb-0";
        phoneNum.innerHTML = "<img src='assets/phone-icon.png' /> 123-456-7890";

        // display get directions text
        const getDirections = document.createElement("div");
        getDirections.className = "card-subtitle col-6 col-md text-orange mb-0";
        getDirections.innerHTML = "<img src='assets/direction-icon.png' /> Get Directions";

        row.append(phoneNum, getDirections);

        // display hours for each day
        const hours = document.createElement("div");
        hours.className = "my-3";
        const monday = document.createElement("div");
        monday.innerHTML = `
            <div class="row">
                <div class="col-4">Monday</div>
                <div class="col">${response.monday_open} - ${response.monday_close}</div>
            </div>
        `;
        const tuesday = document.createElement("div");
        tuesday.innerHTML = `
            <div class="row">
                <div class="col-4">Tuesday</div>
                <div class="col">${response.tuesday_open} - ${response.tuesday_close}</div>
            </div>
        `;
        const wednesday = document.createElement("div");
        wednesday.innerHTML = `
            <div class="row">
                <div class="col-4">Wednesday</div>
                <div class="col">${response.wednesday_open} - ${response.wednesday_close}</div>
            </div>
        `;
        const thursday = document.createElement("div");
        thursday.innerHTML = `
            <div class="row">
                <div class="col-4">Thursday</div>
                <div class="col">${response.thursday_open} - ${response.thursday_close}</div>
            </div>
        `;
        const friday = document.createElement("div");
        friday.innerHTML = `
            <div class="row">
                <div class="col-4">Friday</div>
                <div class="col">${response.friday_open} - ${response.friday_close}</div>
            </div>
        `;
        const saturday = document.createElement("div");
        saturday.innerHTML = `
            <div class="row">
                <div class="col-4">Saturday</div>
                <div class="col">${response.saturday_open} - ${response.saturday_close}</div>
            </div>
        `;
        const sunday = document.createElement("div");
        sunday.innerHTML = `
            <div class="row">
                <div class="col-4">Sunday</div>
                <div class="col">${response.sunday_open} - ${response.sunday_close}</div>
            </div>
        `;

        const viewFullBtn = document.createElement("button");
        viewFullBtn.className = "btn mt-2";
        viewFullBtn.innerHTML = "VIEW FULL DETAILS";
        viewFullBtn.onclick = function() {
            window.open(response.url);
        };
        
        hours.append(monday, tuesday, wednesday, thursday, friday, saturday, sunday);

        modalBody.append(image, truckName, truckAddress1, truckAddress2, row, hours, viewFullBtn);

    }

    toggleDisplay = (showId) => {

        const mapBtn = document.getElementById("map-btn");
        const listBtn = document.getElementById("list-btn");

        const truckInfo = document.getElementById("truckInfo");
        const truckData = document.getElementById("truckData");

        // make list button active -> display data
        if (showId === "list-btn" && mapBtn.classList.contains("btn-active")) {
            mapBtn.classList.remove("btn-active");
            listBtn.classList.add("btn-active");
            truckInfo.className = "d-none d-sm-block"; // hide
            truckData.className = "";
        }

        // make map button active -> display map/more info
        else if (showId === "map-btn" && listBtn.classList.contains("btn-active")){
            listBtn.classList.remove("btn-active");
            mapBtn.classList.add("btn-active");
            truckData.className = "d-none d-sm-block"; // hide
            truckInfo.className = "";
        }
    }
});