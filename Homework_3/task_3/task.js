class Product {
    static productsList = []

    constructor(container, cart) {
        this.container = container
        this.cart = cart

        this.decBtn = this.container.querySelector('.product__quantity-control_dec')
        this.incBtn = this.container.querySelector('.product__quantity-control_inc')
        this.productValue = this.container.querySelector('.product__quantity-value')
        this.productAddBtn = this.container.querySelector('.product__add')

        this.valueChanger(this.decBtn)
        this.valueChanger(this.incBtn)
        this.productAdd(this.productAddBtn)
    }

    valueChanger(el) {
        el.addEventListener('click', () => {
            if (el.className.includes('inc')) {
                this.productValue.textContent++
            } else {
                if  (this.productValue.textContent > 1) {
                    this.productValue.textContent--
                }
            }
        })  
    }

    productAdd(el) {
        el.addEventListener('click', (ev) => {
            
            let product = ev.target.closest('.product')
            let productId = product.dataset['id']
            let productImg = product.querySelector('img').src

            let elCartProduct = document.createElement('div')
            elCartProduct.classList.add('cart__product')
            elCartProduct.dataset.id = productId
            
            let elProductImg = document.createElement('img')
            elProductImg.classList.add('cart__product-image')
            elProductImg.src = productImg
            
            let elCartProductCount = document.createElement('div')
            elCartProductCount.classList.add('cart__product-count')
            elCartProductCount.textContent = this.productValue.textContent

            let elCartDelBtn = document.createElement('button')
            elCartDelBtn.classList.add('product__remove')
            elCartDelBtn.textContent = 'Удалить'
            elCartDelBtn.addEventListener('click', (ev) => {
                ev.target.closest('.cart__product').remove()
                Product.productsList.splice(Product.productsList.findIndex(el => el == elCartProduct), 1)
            })
            
            elCartProduct.appendChild(elProductImg)
            elCartProduct.appendChild(elCartProductCount)
            elCartProduct.appendChild(elCartDelBtn)

            if (Product.productsList.some(el => el.dataset['id'] == elCartProduct.dataset['id'])) {
                let currentElement = Product.productsList[Product.productsList.findIndex(el => el.dataset['id'] == elCartProduct.dataset['id'])]
                currentElement.querySelector('.cart__product-count').textContent = Number(currentElement.querySelector('.cart__product-count').textContent) + Number(this.productValue.textContent)
            } else {
                this.cart.appendChild(elCartProduct)
                Product.productsList.push(elCartProduct)
            }
        })
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const cart = document.querySelector('.cart .cart__products')
    const productsList = Array.from(document.querySelector('.products').children)

    productsList.forEach((el) => new Product(el, cart))

    
}, false)