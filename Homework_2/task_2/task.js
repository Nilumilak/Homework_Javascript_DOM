class InterestList {
    constructor(container) {
        this.container = container
        this.toggler()
        this.container.forEach((el) => {
            this.subListDefine(el)
        })
    }

    toggler() {
        this.container.forEach((el) => {
            el.addEventListener('change', (ev) => {
                if (ev.target == el.querySelector('.interest__check')) {
                    Array.from(el.querySelectorAll('.interest')).forEach((subItem) => {
                        subItem.querySelector('.interest__check').checked = (!el.querySelector('.interest__check').checked ? false : true)
                    })
                } else {
                    if (!el.querySelector('.interest__check').checked) {
                        if (Array.from(el.querySelectorAll('.interest')).some((item) => item.querySelector('.interest__check').checked)) {
                            el.querySelector('.interest__check').indeterminate = true
                        } else {
                            el.querySelector('.interest__check').indeterminate = false
                        }
                    } else {
                        if (!Array.from(el.querySelectorAll('.interest')).some((item) => item.querySelector('.interest__check').checked)) {
                            el.querySelector('.interest__check').checked = false
                        }
                    }
                }
            })
        })
    }

    subListDefine(container) {
        if (!container.querySelector('ul.interests li.interest ul.interests')) {
            return
        } else {
            new InterestList(container.querySelectorAll('ul.interests li.interest'))
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const interestList = Array.from(document.querySelector('.interests_main').children.item(0).children)

    new InterestList(interestList)

}, false)