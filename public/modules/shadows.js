function createShadows() {
    /** @type {NodeListOf<HTMLElement>} */
    const sources = document.querySelectorAll("[data-shadow-source]")

    sources.forEach((source) => {
        const bounds = source.getBoundingClientRect()
        const shadow = document.createElement("div")

        shadow.style.top = bounds.bottom + window.scrollY + "px"
        shadow.style.height = "0"
        shadow.style.position = "absolute"
        shadow.style.pointerEvents = "none"
        shadow.style.backgroundRepeat = "norepeat"
        shadow.style.backgroundSize = "cover"
        shadow.style.opacity = "0.08"
        shadow.style.transition = "height 0.5s ease-in-out"

        if (source.dataset.shadowSource === "left") {
            shadow.style.left = bounds.left + "px"
            shadow.style.right = "0"
            shadow.style.backgroundImage = "url('/vectors/triangle-top-right.svg')"
        } else if (source.dataset.shadowSource === "right") {
            shadow.style.left = "0"
            shadow.style.right = bounds.left + "px"
            shadow.style.backgroundImage = "url('/vectors/triangle-top-left.svg')"
        }

        document.body.appendChild(shadow)

        setTimeout(() => {
            shadow.style.height = "40px"
        }, 100)
    })
}

createShadows()
