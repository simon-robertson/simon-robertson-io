function enableColorSchemeControl() {
	const control = document.querySelector(".color-scheme.control")

	if (control === null) {
		return
	}

	control.addEventListener("mousedown", () => {
		document.documentElement.classList.toggle("dark")
	})
}

enableColorSchemeControl()
