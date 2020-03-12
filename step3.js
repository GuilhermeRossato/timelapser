function step3() {
	document.querySelector(".step3").style.display = "block";
}

async function takePicture(delay = 0) {
	const title = document.querySelector(".step3 h1");
	for (let i = 0; i < delay*10; i++) {
		title.innerText = ((delay*10 - i)/10).toFixed(1) + " seconds...";
		await new Promise(resolve => setTimeout(resolve, 100));
	}
	title.innerText = "";
	takeASnap().then(downloadBlob);
}

function changeBackground(event) {
	document.querySelector("input").click();
}

function changeOpacity(event) {
	if (window.flickerTimer) {
		stopFlickering();
	}
	document.querySelector(".step2 video").style.transition = "0.5s opacity ease-in-out";
	let state = event.target.getAttribute("data-state");
	if (!state || state === "0") {
		state = "1";
		setVideoOpacity(0.5);
		event.target.innerText = "Change Opacity (50%)";
	} else if (state === "1") {
		state = "2";
		setVideoOpacity(0.25);
		event.target.innerText = "Change Opacity (25%)";
	} else if (state === "2") {
		state = "3";
		setVideoOpacity(0.1);
		event.target.innerText = "Change Opacity (10%)";
	} else if (state === "3") {
		state = "4";
		setVideoOpacity(1);
		event.target.innerText = "Change Opacity (100%)";
	} else if (state === "4") {
		state = "0";
		setVideoOpacity(0.75);
		event.target.innerText = "Change Opacity (75%)";
	}
	event.target.setAttribute("data-state", state);
}

function stepFlicker() {
	window.flickerOn = !window.flickerOn;
	setVideoOpacity(window.flickerOn ? 0.03 : 0.97);
}

function stopFlickering() {
	if (window.flickerTimer) {
		document.querySelector(".step3 button.flicker").innerText = "Flicker";
		window.clearInterval(window.flickerTimer);
		window.flickerTimer = undefined;
	}
}

function changeFlicker(event) {
	if (window.flickerTimer) {
		stopFlickering();
	} else {
		document.querySelector(".step2 video").style.transition = "none";
		event.target.innerText = "Stop Flickering";
		window.flickerTimer = setInterval(stepFlicker, 90);
	}
}

function takeASnap() {
	let canvas = document.querySelector("canvas.snap");
	if (!canvas) {
		canvas = document.createElement("canvas");
		canvas.setAttribute("class", "snap");
		canvas.setAttribute("style", "display: none");
		document.querySelector(".step3").appendChild(canvas);
	}
	const video = document.querySelector(".step2 video");

	const ctx = canvas.getContext('2d'); // get its context
	if (window.videoStream) {
		if (window.videoStream.videoWidth && window.videoStream.videoHeight) {
			canvas.width = window.videoStream.videoWidth;
			canvas.height = window.videoStream.videoHeight;
			console.log("used video 1", window.videoStream.videoWidth, window.videoStream.videoHeight);
		} else if (video.videoWidth && video.videoHeight) {
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
			console.log("used video 2", video.videoWidth, video.videoHeight);
		} else {
			const rect = video.getBoundingClientRect();
			canvas.width = rect.width;
			canvas.height = rect.height;
			console.log("had to use canvas", rect.width, rect.height);
		}
	}
	ctx.drawImage(video, 0, 0);
	return new Promise((res, rej) => {
		canvas.toBlob(res, 'image/jpeg');
	});
}

function downloadBlob(blob) {
	window.imageCount = (window.imageCount || 0) + 1;
	let a = document.createElement('a'); 
	a.href = URL.createObjectURL(blob);
	a.download = `image${window.imageCount}.jpg`;
	document.body.appendChild(a);
	a.click();
	setTimeout(() => a.remove(), 200);
}
