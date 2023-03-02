class revealContainer {
    static #allContainers = []

    constructor(element) {
        this.element = element

        this.bottom = element.getBoundingClientRect().bottom
        this.top = element.getBoundingClientRect().top
    }

    static addContainer(container) {
        this.#allContainers.push(new revealContainer(container))
    }

    static get allContainers() {
        return this.#allContainers
    }

    visibilityStatus() {
        this.bottom = this.element.getBoundingClientRect().bottom
        this.top = this.element.getBoundingClientRect().top
        if (this.bottom < 0 || this.top > window.innerHeight) {
            this.element.classList.remove('reveal_active')
        } else {
            this.element.classList.add('reveal_active')
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {

    const revealContainers = Array.from(document.querySelectorAll('.reveal'))
    revealContainers.forEach((container) => {
        revealContainer.addContainer(container)
    })

    window.addEventListener('scroll', () => {
        revealContainer.allContainers.forEach(container => {
            container.visibilityStatus()
        });
    })

}, false)