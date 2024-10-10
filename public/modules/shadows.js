function createShadows() {
    const dark = window.matchMedia("(prefers-color-scheme:dark)").matches

    /** @type {NodeListOf<HTMLElement>} */
    const sources = document.querySelectorAll("[data-shadow-source]")

    /** @type {HTMLElement[]} */
    const shadows = []

    /**
     * @param {HTMLElement} source
     * @param {HTMLElement} shadow
     * @param {DOMRect} bounds
     */
    const setShadowPosition = (source, shadow, bounds) => {
        shadow.style.top = bounds.bottom + window.scrollY + 1 + "px"

        if (source.dataset.shadowSource === "left") {
            shadow.style.left = bounds.left + "px"
            shadow.style.right = "0"
            shadow.style.backgroundImage = "url('/vectors/triangle-top-right.svg')"
        } else if (source.dataset.shadowSource === "right") {
            shadow.style.left = "0"
            shadow.style.right = bounds.left + "px"
            shadow.style.backgroundImage = "url('/vectors/triangle-top-left.svg')"
        }
    }

    /**
     * @param {HTMLElement} shadow
     * @param {DOMRect} bounds
     */
    const setShadowHeight = (shadow, bounds) => {
        shadow.style.height = Math.min(bounds.height / 2, 40) + "px"
    }

    sources.forEach((source) => {
        const bounds = source.getBoundingClientRect()
        const shadow = document.createElement("div")

        shadows.push(shadow)

        shadow.style.height = "0"
        shadow.style.position = "absolute"
        shadow.style.pointerEvents = "none"
        shadow.style.backgroundRepeat = "norepeat"
        shadow.style.backgroundSize = "cover"
        shadow.style.opacity = dark ? "0.25" : "0.08"
        shadow.style.transition = "height 0.5s ease-in-out"

        setShadowPosition(source, shadow, bounds)

        document.body.appendChild(shadow)

        setTimeout(() => {
            setShadowHeight(shadow, bounds)
        }, 10)
    })

    window.addEventListener(
        "resize",
        () => {
            sources.forEach((source, index) => {
                const bounds = source.getBoundingClientRect()
                const shadow = shadows[index]

                setShadowPosition(source, shadow, bounds)
                setShadowHeight(shadow, bounds)
            })
        },
        { passive: true },
    )

    const prefersDarkColorScheme = window.matchMedia("(prefers-color-scheme:dark)")

    prefersDarkColorScheme.addEventListener("change", () => {
        shadows.forEach((shadow) => {
            shadow.style.opacity = prefersDarkColorScheme.matches ? "0.25" : "0.08"
        })
    })
}

createShadows()
