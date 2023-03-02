class BookControl {
    constructor(book, container, prefix, bookPrefix, type=NaN) {
        this.book = book
        this.container = container
        this.prefix = prefix
        this.bookPrefix = bookPrefix
        this.type = type
        this.buttons = Array.from(container.querySelectorAll(`.${prefix}`))
        this.btnModeList = []
        this.btnToggle()
    }

    btnToggle() {
        this.buttons.forEach((el) => {
            el.addEventListener('click', (event) => {
                event.preventDefault()

                this.buttons.forEach((el) => {
                    el.classList.remove(`${this.prefix}_active`)
                })

                this.btnModeList = []
                this.buttons.forEach((el) => {
                    this.btnModeList = this.btnModeList.concat(Object.values(el.dataset))
                })

                this.btnModeList.forEach((mode) => {
                    this.book.classList.remove(`book_${this.bookPrefix}-${mode}`)
                })

                this.btnModeList.forEach((mode) => {
                    if (event.target.classList.contains(`${this.prefix}_${mode}`) 
                    || event.target.classList.contains(`${this.type}_${this.prefix}_${mode}`)) {
                        this.book.classList.add(`book_${this.bookPrefix}-${mode}`)
                        event.target.classList.add(`${this.prefix}_active`)
                    } else {
                        event.target.classList.add(`${this.prefix}_active`)
                    }
                })
            })
        })
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const book = document.querySelector('.book')
    const bookControlFS = document.querySelector('.book__control_font-size')
    const bookControlColor = document.querySelector('.book__control_color')
    const bookControlBackground = document.querySelector('.book__control_background')

    new BookControl(book, bookControlFS, 'font-size', 'fs')
    new BookControl(book, bookControlColor, 'color', 'color', 'text')
    new BookControl(book, bookControlBackground, 'color', 'bg', 'bg')

}, false)