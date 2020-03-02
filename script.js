function removeElement(element) {
  element.remove();
}

function openNav() {
	document.getElementById('nav-container').style.left = '0px';
	document.getElementById('nav-black').style.opacity = '0.7';
	document.getElementById('nav-black').style.pointerEvents = 'auto';
}

function closeNav() {
	document.getElementById('nav-container').style.left = '-300px';
	document.getElementById('nav-black').style.opacity = '0';
	document.getElementById('nav-black').style.pointerEvents = 'none';
}

var i = 0;
var a;
var filename;
var count = 1000;
var message;
var currentURL;
var timestamp;
var cache;
function loadImages() {
	closeNav();
	document.getElementById('navcircle').style.display = 'none';
	setTimeout(function() {
		timestamp = new Date().getTime();
		while (i < count) {
			i++;
			filename = "https://server.funkycameras.gq/camera/" + i + ".jpg";
			$('.container').append('<img class=img src="' + filename + '?t=' + timestamp + '" onError="removeElement(this)" onLoad="increaseCount(this)" />');
		}
		setTimeout(function() {
			document.getElementById('navcircle').style.display = 'block';
		}, 600);
	}, 600);
}

var images = document.querySelectorAll(".container img");

function increaseCount(question) {
	images = document.querySelectorAll(".container img");
	question.style.opacity = 1;
	if ((count - images.length) < 1) {
		count = count + 1000;
		loadImages();
	}
}

setInterval(function() {
	images = document.querySelectorAll(".container img");
	document.getElementById('count').innerHTML = images.length + ' Images Loaded';
}, 500);

function reloadImages() {
	closeNav();
	document.getElementById('navcircle').style.display = 'none';
	setTimeout(function() {
		a = 0;
		timestamp = new Date().getTime();
		while (a < images.length) {
			currentUrl = document.getElementsByClassName("img")[a].src;
			cache = currentUrl.indexOf('?');
			currentUrl = currentUrl.substring(0, cache != -1 ? cache : currentUrl.length);
			currentUrl = currentUrl + '?t=' + timestamp;
			document.getElementsByClassName("img")[a].src = currentUrl;
			document.getElementsByClassName("img")[a].style.opacity = 0;
			a++;
		}
		setTimeout(function() {
			document.getElementById('navcircle').style.display = 'block';
		}, 600);
	}, 600);
}

window.onload = function() {
  document.getElementsByClassName('container')[0].style.columnCount = 5;
  //document.documentElement.style.overflowY = 'scroll';
  setTimeout(function() {
    document.getElementById('load').style.opacity = 0;
    document.getElementById('load').style.pointerEvents = 'none';
  }, 10);
}