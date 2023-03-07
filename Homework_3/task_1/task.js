document.addEventListener('DOMContentLoaded', () => {
    const tooltips = Array.from(document.getElementsByClassName('has-tooltip'))
    let activeElement = document.createElement('div')

    tooltips.forEach((el) => {
        el.addEventListener('click', (ev) => {
            ev.preventDefault()
            if (activeElement) {
                activeElement.remove()
            }
            
            if (activeElement.textContent == el.title) {
                activeElement.remove()
                activeElement = document.createElement('div')
            } else {
                let { x, y, height, width } = el.getBoundingClientRect()

                let tooltip = document.createElement('div')
                tooltip.textContent = el.title
                document.body.appendChild(tooltip)
                tooltip.classList.add('tooltip', 'tooltip_active')

                if (el.dataset.position == 'right') {
                    tooltip.style.left = `${x + width}px`
                    tooltip.style.top = `${y - tooltip.offsetHeight / 2 + height / 2}px`
                } else if (el.dataset.position == 'top') {
                    tooltip.style.left = `${x}px`
                    tooltip.style.top = `${y - tooltip.offsetHeight}px`
                } else if (el.dataset.position == 'left') {
                    tooltip.style.left = `${x - tooltip.offsetWidth}px`
                    tooltip.style.top = `${y - tooltip.offsetHeight / 2 + height / 2}px`
                } else {
                    tooltip.style.left = `${x}px`
                    tooltip.style.top = `${y + height}px`
                }

                activeElement = tooltip
            }
        })
    })
}, false)