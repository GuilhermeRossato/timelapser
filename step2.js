function step2(image) {
	const step = document.querySelector(".step2");
	step.style.display = "flex";
	const [background] = step.querySelectorAll("canvas");

	background.width = image.width;
	background.height = image.height;

	const scale = Math.max(image.width, image.height) / Math.max(window.innerWidth, window.innerHeight);

	const vmin = (window.innerWidth > window.innerHeight) ? "vw" : "vh";

	const isImageLandscape = image.width > image.height;
	const isWindowsLandscape = window.innerWidth > window.innerHeight;

	const canvasClasses = [
		isImageLandscape ? "image-landscape" : "image-portrait",
		isWindowsLandscape ? "window-landscape" : "window-portrait"
	];

	background.setAttribute("class", canvasClasses.join(" "));

	const ctx = background.getContext("2d");
	ctx.drawImage(image, 0, 0);

	ctx.save();
	ctx.scale(image.width, image.height);
	ctx.lineWidth = 1 / Math.min(image.width, image.height);
	ctx.strokeStyle = "rgba(0, 0, 0, 0.4)";
	ctx.beginPath();
	ctx.moveTo(0.3333, 0);
	ctx.lineTo(0.3333, 1);
	ctx.moveTo(0.6666, 1);
	ctx.lineTo(0.6666, 0);
	ctx.moveTo(0, 0.3333);
	ctx.lineTo(1, 0.3333);
	ctx.moveTo(1, 0.6666);
	ctx.lineTo(0, 0.6666);
	ctx.stroke();
	ctx.restore();


	/* Setting up the constraint */
	const facingMode = "user"; // Can be 'user' or 'environment' to access back or front camera (NEAT!)
	const constraints = {
		audio: false,
		video: {
			facingMode: facingMode
		}
	};
	setTimeout(() => navigator.mediaDevices.getUserMedia(constraints).then(acceptStream), 140);
}

function acceptStream(stream) {
	console.log(stream);
	const step = document.querySelector(".step2");
	const canvas = document.querySelector("canvas");
	const rect = canvas.getBoundingClientRect();
	const video = document.createElement('video');
	video.setAttribute('playsinline', '');
	video.setAttribute('autoplay', '');
	video.setAttribute('muted', '');
	video.width = stream.width || rect.width;
	video.height = stream.height || rect.height;
	video.srcObject = stream;
	video.setAttribute("style", `margin-left: ${-video.width}px;`);
	step.appendChild(video);
}