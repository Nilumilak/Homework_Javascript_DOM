class Rotator {
    constructor(rotator) {
        this.rotator = rotator
        this.allRotatorChildren = Array.from(rotator.children)

        this.allRotatorChildren.forEach((rotator) => {
            rotator.style.color = rotator.dataset.color
        })

        this.counter = 0

        this.toggleRotator(this)
    }

    toggleRotator(rotator) {
        return function changeRotator(rotator) {
            console.log(rotator)
            setTimeout(() => {
                rotator.allRotatorChildren[rotator.counter].classList.toggle('rotator__case_active')

                if (rotator.allRotatorChildren[rotator.counter].nextElementSibling) {
                    rotator.allRotatorChildren[rotator.counter].nextElementSibling.classList.toggle('rotator__case_active')
                    rotator.counter++
                } else {
                    rotator.counter = 0
                    rotator.allRotatorChildren[rotator.counter].classList.toggle('rotator__case_active')
                }
                changeRotator(rotator)

            }, rotator.allRotatorChildren[rotator.counter].dataset.speed)
        }(rotator)
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const allRotators = Array.from(document.querySelectorAll('.rotator'))
    allRotators.forEach((element) => { new Rotator(element) })
}, false)