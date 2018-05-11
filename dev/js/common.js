'use strict';

window.onload = function () {
    //google map
    var myOptions = {
        center: new google.maps.LatLng(46.439976, 30.766036),
        zoom: 14.7,
        mapTypeId: 'roadmap',
        disableDefaultUI: true,
    };

    var marker = new google.maps.Marker({
        position: {lat: 46.439376, lng: 30.769036},
        map: map
    });

    var map = new google.maps.Map(document.querySelector(".feedback__contacts-map"), myOptions);

    marker.setMap(map);
};

$(document).ready(function() {

    $('.top-banner__slider').slick({
        autoplay: true,
        infinite: true,
        autoplaySpeed: 2000,
		dots: false
	});

    $(".nav__list").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 500);
    });

});