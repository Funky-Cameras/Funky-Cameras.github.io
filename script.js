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
var loaded = 0;
var openSrc = '';
var cacheImg = '';

function loadImages() {
	closeNav();
	document.getElementById('loader').style.opacity = 0;
	document.getElementById('loader').style.pointerEvents = 'none';
	document.getElementById('navcircle').style.display = 'none';
	setTimeout(function() {
		timestamp = new Date().getTime();
		while (i < count) {
			i++;
			filename = "https://www.trafficnz.info/camera/" + i + ".jpg";
			$('.container').append('<img class=img src="' + filename + '?t=' + timestamp + '" onError="removeElement(this)" onLoad="increaseCount(this)" onClick="openImg(this)" />');
		}
		document.getElementById('reloadbutton').style.display = 'block';
		document.getElementById('loadbutton').style.display = 'none';
		setTimeout(function() {
			document.getElementById('navcircle').style.display = 'block';
			loaded = 1;
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
	document.getElementById('count').innerHTML = 'Checking ' + images.length + ' Cameras';
}, 500);

setInterval(function() {
	if (loaded == 1) {
		a = 0;
		document.getElementById('menuimg').style.display = 'none';
		document.getElementById('loadimg').style.display = 'block';
		timestamp = new Date().getTime();
		while (a < images.length) {
			currentUrl = document.getElementsByClassName("img")[a].src;
			cache = currentUrl.indexOf('?');
			currentUrl = currentUrl.substring(0, cache != -1 ? cache : currentUrl.length);
			currentUrl = currentUrl + '?t=' + timestamp;
			document.getElementsByClassName("img")[a].src = currentUrl;
			a++;
		}
		opensrc = opensrc + '?t=' + timestamp;
		opensrc = 'url("' + opensrc + '")';
		document.getElementById('popup').style.backgroundImage = opensrc;
		setTimeout(function() {
			document.getElementById('menuimg').style.display = 'block';
			document.getElementById('loadimg').style.display = 'none';
		}, 600);
	}
}, 45000);

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

function openImg(question) {
	document.getElementById('popup').style.backgroundImage = 'url("' + question.src + '")';
	document.getElementById('popup').style.opacity = 1;
	document.getElementById('popupbacking').style.opacity = 0.8;
	document.getElementById('popupbacking').style.pointerEvents = 'auto';
	opensrc = question.src;
	cacheImg = opensrc.indexOf('?');
	opensrc = opensrc.substring(0, cacheImg != -1 ? cacheImg : opensrc.length);
}

function closeImg() {
	document.getElementById('popup').style.opacity = 0;
	document.getElementById('popupbacking').style.opacity = 0;
	document.getElementById('popupbacking').style.pointerEvents = 'none';
}

window.onload = function() {
  setTimeout(function() {
	setInterval(function() {
		document.getElementsByClassName('container')[0].style.columnCount = document.getElementById('columnslider').value;
	}, 500);
  }, 10);
}