#!/usr/bin/node
// Script that listen for changes on each input checkbox tag

// This function ensures the DOM is fully loaded before executing the script
$('input:checkbox').click(function () {
    if ($(this).is(":checked")) {
        nameAmenity.push($(this).attr('data-name'));
    } else {
        const nameIndex = nameAmenity.indexOf($(this).attr('data-name'));
        nameAmenity.splice(nameIndex, 1);
    }
    $('.amenities h4').text(nameAmenity.join(', '));
});

$(document).ready(function() {
    // execute a GET request to Status API
    $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
        // if the request is successful
        if (data.status === 'OK') {
            // add the class available to the DIV#api_status
            $('#api_status').addClass('available');
        } else {
            // remove the class available from the DIV#api_status
            $('#api_status').removeClass('available');
        }
    })
    .done(function() {
        // success message in the console
        console.log('Success');
    });
});

