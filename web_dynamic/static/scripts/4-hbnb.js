#!/usr/bin/node
// Script that listen for changes on each input checkbox tag

// This function ensures the DOM is fully loaded before executing the script
$(document).ready(function() {
    const nameAmenity = [];

    // Listen for changes on each checkbox
    $('input:checkbox').click(function () {
      // checkbox was checked
        if ($(this).is(":checked")) {
        nameAmenity.push($(this).attr('data-name'));
    // if the checkbox is unchecked, you must remove the Amenity ID from the variable
    } else {
        const nameIndex = nameAmenity.indexOf($(this).attr('data-name'));
        nameAmenity.splice(nameIndex, 1);
    }
    // update the h4 tag inside the div Amenities with the list of Amenities checked
    $('.amenities h4').text(nameAmenity.join(', '));
    });
});
$(document).ready(function() {
    // execute a GET request to Status API
    $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
        // if the request is successful
        if (data.status === 'OK') {
            // add the class available to the DIV#api_status
            $('DIV#api_status').addClass('available');
        } else {
            // remove the class available to the DIV#api_status
            $('DIV#api_status').removeClass('available');
        }
    });
});
// Execute a POST request to places_search API
$.ajax({
    type: "POST",
    url: 'http://localhost:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: '{}',
    success: function (data) {
        $('.places').empty(); // Clear existing places
        for (const place of data) {
            const placeHTML = `
            <article>
                <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">$${place.price_by_night}</div>
                </div>
                <div class="information">
                    <div class="max_guest">${place.max_guest} Guests</div>
                    <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                    <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                </div>
                <div class="user">
                    <div class="description">${place.description}</div>
                </div>
            </article>`;
            $('.places').append(placeHTML);
        }
    }
});
$('button').click(function () {
$('.places > article').remove();
$.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    data: JSON.stringify({ amenities: Object.keys(checkAmen) }),
    contentType: 'application/json',
    success: function (data) {
    for (const place of data) {
        $.get('http://127.0.0.1:5001/api/v1/users/' + place.user_id, function (usrData) {
        const html = `<article>
<div class="title_box">
<h2>${place.name}</h2>
<div class="price_by_night">$${place.price_by_night}</div>
</div>
<div class="information">
<div class="max_guest">${place.max_guest} Guests</div>
<div class="number_rooms">${place.number_rooms} Bedrooms</div>
<div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
</div>
<div class="user">
<b>Owner:</b> ${usrData.first_name} ${usrData.last_name}
</div>
<div class="description">
${place.description}
</div>
</article>`;
        $('.places').append(html);
        });
    }
    }
});
});
