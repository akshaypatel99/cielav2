const currentTime = new Date().getHours();

if (currentTime > 6 && currentTime < 18) {
	document.body.style.backgroundImage = 'url(/images/day.jpg)';
} else {
	document.body.style.backgroundImage = 'url(/images/night.jpg)';
}
