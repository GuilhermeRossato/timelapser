function step1() {
	document.querySelector(".step1").style.display = "flex";
}

function onImageAdd(img) {
	document.querySelector(".step1").style.display = "none";
	step2(img);
}

function onImageChange(evt) {
	const files = evt.target.files;
	if (files.length !== 1) {
		return false;
	}

	for (let i = files.length-1; i >= 0; i--) {
		const file = files[i];

		if (!file.type.match('image.*')) {
			continue;
		}

		const reader = new FileReader();

		reader.onload = (e) => {
			const url = e.target.result;
			const img = new Image();
			img.onload = onImageAdd.bind(window, img);
			img.src = url;
		}

		reader.readAsDataURL(file);
	}

	evt.target.style.display = "none";
}