$(function() {

	var box = document.querySelector(".box");

	box.innerHTML = "321";

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



	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	
});

$(window).load(function() {

	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");

});


// var link = document.querySelector(".login");
// var popup = document.querySelector(".modal-content");
// var close = popup.querySelector(".modal-content-close")
// var mapOverlay = document.querySelector(".modal-overlay");

// var form = popup.querySelector("form");
// var login = popup.querySelector("[name=login]");
// var password = popup.querySelector("[name=password]");

// var storage = localStorage.getItem("login");

// link.addEventListener("click", function (e) {
// 	e.preventDefault();
// 	mapOverlay.classList.add("modal-content-show");
// 	popup.classList.add("modal-content-show");
// 	if (storage) {
// 		login.value = storage;
// 		password.focus();
// 	} else {
// 		login.focus();
// 	}
// });

// close.addEventListener("click", function (e) {
// 	e.preventDefault();
// 	popup.classList.remove("modal-content-show");
// 	mapOverlay.classList.remove("modal-content-show");
// });

// form.addEventListener("submit", function(e){
// 	if (!login.value || !password.value) {
// 	e.preventDefault();
// 	alert("Нужно ввести логин и пароль");
// 	} else {
// 		localStorage.setItem("login", login.value);
// 	}
// });

// var mapOverlay = document.querySelector(".modal-overlay");
// var mapLink = document.querySelector(".btn-map");
// var mapPopup = document.querySelector(".modal-content-map");
// var mapClose = mapPopup.querySelector(".modal-content-close")

// mapLink.addEventListener("click", function (e) {
// 	e.preventDefault();
// 	mapPopup.classList.add("modal-content-show");
// 	mapOverlay.classList.add("modal-content-show");
// });

// mapClose.addEventListener("click", function (e) {
// 	e.preventDefault();
// 	mapPopup.classList.remove("modal-content-show");
// 	mapOverlay.classList.remove("modal-content-show");
// });

// mapOverlay.addEventListener("click", function (e) {
// 	e.preventDefault();
// 	popup.classList.remove("modal-content-show");
// 	mapPopup.classList.remove("modal-content-show");
// 	mapOverlay.classList.remove("modal-content-show");
// });