/**
 * @typedef {Object} Point
 * @property {Number} x
 * @property {Number} y
 * @property {Number} targetX
 * @property {Number} targetY
 * @property {Number} timeout
 */

/**
 * @typedef {Object} RenderState
 * @property {HTMLElement} container
 * @property {HTMLCanvasElement} canvas
 * @property {CanvasRenderingContext2D} context
 * @property {HTMLElement} statusContainer
 * @property {Array<Point>} points
 * @property {Number} timestamp
 * @property {boolean} paused
 * @property {string} colorBackground
 * @property {string} colorEdge
 * @property {string} colorPrimary
 */

/** @type {RenderState} */
const state = {}

/**
 * TODO: Rewrite this to use WebGPU
 *
 * @returns {void}
 */
function main() {
    const container = document.getElementById("page-header-background")

    if (container === null) {
        return
    }

    const canvas = document.createElement("canvas")

    canvas.width = container.offsetWidth
    canvas.height = container.offsetHeight
    canvas.style.display = "block"
    canvas.style.pointerEvents = "none"

    container.appendChild(canvas)

    const context = canvas.getContext("2d", {
        alpha: true,
        desynchronized: true,
    })

    if (context === null) {
        return
    }

    const statusContainer = document.getElementById("status-container")

    /** @type {Point[]} */
    const points = []

    const randomizeAxis = Math.random()
    const randomizeDirection = Math.random()

    for (let i = 0; i < 10; i++) {
        const point = {
            x: 0,
            y: 0,
            targetX: 0,
            targetY: 0,
            timeout: 0,
        }

        randomizePointTargetPosition(point)

        point.x = point.targetX
        point.y = point.targetY

        if (randomizeAxis < 0.5) {
            point.x += randomizeDirection < 0.5 ? -1 : 1
        } else {
            point.y += randomizeDirection < 0.5 ? -1 : 1
        }

        points[i] = point
    }

    state.container = container
    state.canvas = canvas
    state.context = context
    state.statusContainer = statusContainer
    state.points = points
    state.time = 0
    state.paused = true

    monitorColorScheme()
    monitorSize()
    monitorVisibility()
    render()
}

/**
 * @returns {void}
 */
function monitorColorScheme() {
    const updateColors = () => {
        const css = window.getComputedStyle(document.documentElement)
        const colorBackground = css.getPropertyValue("--color-page-background")
        const colorEdge = css.getPropertyValue("--color-edge")
        const colorPrimary = css.getPropertyValue("--color-primary")

        state.colorBackground = colorBackground
        state.colorEdge = colorEdge
        state.colorPrimary = colorPrimary
    }

    window.matchMedia("(prefers-color-scheme:dark)").addEventListener("change", updateColors)

    updateColors()
}

/**
 * @returns {void}
 */
function monitorSize() {
    const observer = new ResizeObserver(() => {
        state.canvas.width = state.container.offsetWidth
        state.canvas.height = state.container.offsetHeight
    })

    observer.observe(state.container)
}

/**
 * @returns {void}
 */
function monitorVisibility() {
    const observer = new IntersectionObserver((entries) => {
        const entry = entries[0]
        state.paused = entry.isIntersecting === false
    })

    observer.observe(state.container)
}

/**
 * @returns {void}
 */
function render() {
    window.requestAnimationFrame(render)

    const time = Date.now()

    if (state.time < 1) {
        state.time = time
        return
    }

    const delta = time - state.time
    const seconds = delta * 0.001

    state.time = time

    if (state.paused) {
        return
    }

    for (let i = 0; i < state.points.length; i++) {
        const point = state.points[i]

        point.timeout -= delta

        if (point.timeout < 1) {
            randomizePointTargetPosition(point)
            randomizePointTimeout(point)
            continue
        }

        point.x += (point.targetX - point.x) * (1 * seconds)
        point.y += (point.targetY - point.y) * (1 * seconds)
    }

    const width = state.canvas.width
    const height = state.canvas.height

    state.context.fillStyle = state.colorBackground
    state.context.fillRect(0, 0, width, height)

    state.context.strokeStyle = state.colorEdge
    state.context.lineWidth = 1

    for (let i = 0; i < state.points.length - 1; i++) {
        const pointA = state.points[i]
        const pointB = state.points[i + 1]

        state.context.beginPath()
        state.context.moveTo(width * pointA.x, height * pointA.y)
        state.context.lineTo(width * pointB.x, height * pointB.y)
        state.context.stroke()
    }

    state.context.fillStyle = state.colorEdge

    for (let i = 1; i < state.points.length - 1; i++) {
        const point = state.points[i]
        renderPoint(point, 5)
    }

    state.context.fillStyle = state.colorPrimary

    renderPoint(state.points[0], 8)
    renderPoint(state.points[state.points.length - 1], 8)
}

/**
 * @param {Point} point
 * @param {number} radius
 * @returns {void}
 */
function renderPoint(point, radius) {
    const width = state.canvas.width
    const height = state.canvas.height

    state.context.beginPath()
    state.context.arc(width * point.x, height * point.y, radius, 0, Math.PI * 2)
    state.context.fill()
}

/**
 * @param {Point} point
 * @returns {void}
 */
function randomizePointTargetPosition(point) {
    point.targetX = Math.random()
    point.targetY = Math.random()
}

/**
 * @param {Point} point
 * @returns {void}
 */
function randomizePointTimeout(point) {
    point.timeout = 2000 + 2000 * Math.random()
}

main()
