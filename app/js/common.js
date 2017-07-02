$(window).load(function() {
	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");
});

// var docShow = document.querySelector(".show");
// var docMenu = document.querySelector(".nav__menu");
// var docBtn = document.querySelector(".hide-nav");

// docBtn.addEventListener("click", function (e) {
// 	e.preventDefault();
// 	if (docShow = document.querySelector(".show")) 
// 		{	docMenu.classList.remove("show"); } 
// 	else {
// 		(docShow = document.querySelector(".show")) 
// 		{	docMenu.classList.add("show"); } 
// 	}
// });

// $(document).ready(function(){

// 	$('.featured-slider').slick({
// 		infinite: false,
// 		slidesToShow: 3,
// 		slidesToScroll: 1,
// 		autoplay: false,
// 		dots: false,
// 		prevArrow:"<img class='a-left control-c prev slick-prev' src='img/general/arrow_left.png'>",
// 		nextArrow:"<img class='a-right control-c next slick-next' src='img/general/arrow_right.png'>",
// 		responsive: [{
// 			breakpoint: 1300,
// 			settings: {
// 				slidesToShow: 2,
// 				slidesToScroll: 1,
// 			}
// 		}, {
// 			breakpoint: 666,
// 			settings: {
// 				slidesToShow: 1,
// 				slidesToScroll: 1
// 			}
// 		}]
// 	});
// });