let categoriesBtn = document.querySelector("header .bottom-header .categories-section h2")
let categoriesSection = document.querySelector("header .bottom-header .categories-section .categories")

categoriesBtn.onclick = function () {
    categoriesSection.classList.toggle("active")
}

let cartIcon = document.querySelector("header .top-header .header-icons .icon.cart-icon i")
let shopMoreBtn = document.querySelector(".shop-more-btn")
let cartDiv = document.querySelector(".cart")

let closeCartIcon = document.querySelector(".cart .cart-top i")

cartIcon.onclick = function () {
    cartDiv.classList.toggle("active")
}
shopMoreBtn.onclick = function () {
    cartDiv.classList.toggle("active")
}
closeCartIcon.onclick = function () {
    cartDiv.classList.toggle("active")
}

let header = document.querySelector("header")
let canScroll = "true"
let lastScroll = 0

let humbBtn = document.querySelector(".humberger")
let closeNavLinkBtn = document.querySelector(".nav-close-btn")
let navLinksDiv = document.querySelector(".nav-links")

humbBtn.onclick = function () {
    navLinksDiv.classList.toggle("active")
    document.body.style.overflow = "hidden"
}
closeNavLinkBtn.onclick = function () {
    navLinksDiv.classList.toggle("active")
    document.body.style.overflow = "auto"
}

window.onresize = function () {
    if (window.innerWidth <= 800) {
        document.querySelectorAll(".arrow").forEach(function (arr) {
            arr.innerHTML = `<i class="fa-solid fa-down-long"></i>`
        })
        contactUsLink.onclick = function () {
            navLinksDiv.classList.toggle("active")
            document.body.style.overflow = "auto"
        }
    }else {
        document.querySelectorAll(".arrow").forEach(function (arr) {
            arr.innerHTML = `<i class="fa-solid fa-right-long"></i>`
        })
    }
}

let contactUsLink = document.querySelector(".link:nth-child(3)")


window.addEventListener("scroll", function () {
    let currentScroll = window.scrollY

    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add("hide")
    }
    else {
        header.classList.remove("hide")
    }

    lastScroll = currentScroll
})

let goUpBtn = document.querySelector(".go-up-btn")


window.addEventListener("scroll", function () {
    if  (window.scrollY >= 600) {
        goUpBtn.classList.add("active")

        goUpBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        })
    }
    else {
        goUpBtn.classList.remove("active")
    }
})

let productsSections = document.querySelectorAll(".products-section")

productsSections.forEach(function (productsSection) {
    
    let productsDiv = productsSection.querySelector(".products")
    let nextBtn = productsSection.querySelector(".next-btn")
    let prevBtn = productsSection.querySelector(".prev-btn")

    nextBtn.addEventListener("click", function () {
        productsDiv.scrollBy({
            left: 320,
            behavior: "smooth"
        })
    })
    
    prevBtn.addEventListener("click", function () {
        productsDiv.scrollBy({
            left: -320,
            behavior: "smooth"
        })
    })

    function checkSlideBtns() {
        let isNextAtEnd = productsDiv.scrollLeft + productsDiv.clientWidth >= productsDiv.scrollWidth 
        let isPrevAtEnd = productsDiv.scrollLeft <= 0
        
        nextBtn.classList.toggle("end", isNextAtEnd)
        prevBtn.classList.toggle("end", isPrevAtEnd)        
    }

    productsDiv.addEventListener("scroll", checkSlideBtns)   
})

let categories = document.querySelectorAll("header .bottom-header .categories-section .category")

categories.forEach(function (category) {
    category.addEventListener("click", function () {
        categoriesSection.classList.toggle("active")
    })
})


fetch("products.json")
.then(function (response) {return response.json()})
.then (function (data) {
    setTimeout(function () {
        let addToCartBtns = document.querySelectorAll(".add-to-cart-btn")
        addToCartBtns.forEach(function (btn) {
            btn.onclick = function (e) {
                let productId = e.target.closest(".add-to-cart-btn").getAttribute("data-id")
                let selectedProduct = data.find(function (product) {
                    return productId == product.id
                })

                addProductCart(selectedProduct)

                let allActiveBtns = document.querySelectorAll(`.add-to-cart-btn[data-id ="${productId}"]`)

                allActiveBtns.forEach(function(activeBtn) {
                    activeBtn.classList.add("active")
                    activeBtn.innerHTML = `
                        <i class="fa-solid fa-cart-flatbed"></i>
                        <h4>Item in cart</h4>
                    `
                })
            }
        })
    }, 50)
})

function addProductCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []

    cart.push({...product, quantity: 1})
    localStorage.setItem("cart", JSON.stringify(cart))
    updateCart()
}


function updateCart() {
    let cartItems = document.querySelector(".cart-items")
    let cart = JSON.parse(localStorage.getItem("cart")) || []

    let minPrice = 0
    let maxPrice = 0
    let totalCount = 0

    let subtotalInput = document.querySelector(".subtotal")
    let cartItemCountInput = document.querySelector(".cart-item-count")
    let cartCountInput = document.querySelector(".cart-count")

    let subtotalPriceInput = document.querySelector(".subtotal-price")
    let shippingPriceInput = document.querySelector(".shipping-price")
    let totalPriceInput = document.querySelector(".total-price")

    let ordersDiv = document.querySelector(".orders")
    let shippingPrice = 30
    
    let itemsInputForm = document.getElementById("items")
    let totalPriceInputForm = document.getElementById("total-price")
    let countItemsInputForm = document.getElementById("count-items")

    cartItems.innerHTML = ""
    
    if (itemsInputForm) {
        itemsInputForm.value = ""
        totalPriceInputForm.value = ""
        countItemsInputForm.value = ""
    }
    
    if (ordersDiv) {
        ordersDiv.innerHTML = ""
    }

    cart.forEach(function (product, index) {
        minPrice += product.minPrice * product.quantity
        maxPrice += product.maxPrice * product.quantity
        
        totalCount += product.quantity
        
        if (itemsInputForm) {
            itemsInputForm.value += `[ ${product.name} || totalPrice: ${product.minPrice * product.quantity} LE -- ${product.maxPrice * product.quantity} LE || Count: ${product.quantity}] \n`
            totalPriceInputForm.value = `${minPrice + shippingPrice} LE -- ${maxPrice + shippingPrice} LE`
            countItemsInputForm.value = totalCount
        }

        if (ordersDiv) {
            ordersDiv.innerHTML += `
                <div class="order">
                    <img src="${product.img}" alt="">
                    <div class="content">
                        <div class="name">${product.name}</div>
                        <div class="price">${product.minPrice * product.quantity} LE -- ${product.maxPrice * product.quantity} LE</div>
                        <div class="controling-btns">
                            <span class="dec-btn" data-index="${index}">-</span>
                            <div class="quantity">${product.quantity}</div>
                            <span class="inc-btn" data-index="${index}">+</span>
                        </div>
                    </div>
                    <div class="del-item" data-index="${index}"><i class="fa-solid fa-trash-can"></i></div>
                </div>
            `
        }


        cartItems.innerHTML += `
        <div class="item">
            <img src="${product.img}" alt="">
            <div class="content">
                <h4 class="name">${product.name}</h4>
                <p class="price">${product.minPrice * product.quantity} LE -- ${product.maxPrice * product.quantity} LE</p>
                <div class="controle-btns">
                <span class="dec-btn" data-index="${index}">-</span>
                    <p class="item-quantity">${product.quantity}</p>
                    <span class="inc-btn" data-index="${index}">+</span>
                </div>
            </div>
            <div class="del-item" data-index="${index}"><i class="fa-solid fa-trash-can"></i></div>
        </div>
        `

        incDecBtns()
        delItemsFromCart()
        checkoutBtnState()
        
    })
    subtotalInput.textContent = `${minPrice} LE -- ${maxPrice} LE`
    cartItemCountInput.textContent = totalCount
    cartCountInput.textContent = totalCount
    if (ordersDiv) {
        subtotalPriceInput.textContent = `${minPrice} LE -- ${maxPrice} LE`
        shippingPriceInput.textContent = `${shippingPrice} LE`
        totalPriceInput.textContent = `${minPrice + shippingPrice} LE -- ${maxPrice + shippingPrice} LE`
    }
}


checkoutBtnState()

function incDecBtns() {
    let incBtns = document.querySelectorAll(".inc-btn ")
    let decBtns = document.querySelectorAll(".dec-btn ")
    let quantityPar = document.querySelector(".item-quantity")

    let cart = JSON.parse(localStorage.getItem("cart")) || []
    
    incBtns.forEach(function (incBtn) {
        incBtn.onclick = function (e) {
            let itemIndex = e.target.closest(".inc-btn").getAttribute("data-index")
            
            cart[itemIndex].quantity += 1
            
            localStorage.setItem("cart", JSON.stringify(cart))
            updateCart()
        }
    })
    
    decBtns.forEach(function (decBtn) {
        decBtn.onclick = function (e) {
            let itemIndex = e.target.closest(".dec-btn").getAttribute("data-index")

            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity -= 1
                
                localStorage.setItem("cart", JSON.stringify(cart))
                updateCart()
            }
        }
    })
}

function delItemsFromCart() {
    let delBtns = document.querySelectorAll(".del-item")
    let cart = JSON.parse(localStorage.getItem("cart")) || []


    delBtns.forEach(function (delBtn) {
        delBtn.onclick = function (e) {
            let itemIndex = e.target.closest(".del-item").getAttribute("data-index")

            let removedItem = cart.splice(itemIndex, 1)[0]
            localStorage.setItem("cart", JSON.stringify(cart))

            checkoutBtnState()
            updateCart()
            updateBtnState(removedItem.id)            
        }
    })
}

function updateBtnState(removedItem) {
    let allActiveBtns = document.querySelectorAll(`.add-to-cart-btn[data-id ="${removedItem}"]`)

    allActiveBtns.forEach(function(activeBtn) {
        activeBtn.classList.remove("active")
        activeBtn.innerHTML = `
            <i class="fa-solid fa-cart-plus"></i>
            <h4>Add to cart</h4>
        `
    })
}


function checkoutBtnState() {
    let btnsDiv = document.querySelector(".cart .cart-bottom .btns")
    let checkoutBtn = document.querySelector(".checkout-btn")
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    
    if (cart.length > 0) {
        btnsDiv.classList.remove("stop")
        checkoutBtn.href = "checkout.html"
    }
    else {
        btnsDiv.classList.add("stop")
    }
}


if (window.location.hash) {
    let section = document.querySelector(window.location.hash)
    setTimeout(function () {
        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }
    }, 100)
}


let checkoutmsgDiv = document.querySelector(".succes-checkout-msg")

if (localStorage.getItem("orderSuccess") === "true") {
    if (checkoutmsgDiv) {
        checkoutmsgDiv.classList.add("active")
        localStorage.removeItem("orderSuccess")
    }
}

let closeCheckoutMsg = document.querySelector(".succes-checkout-msg .close-msg")

if (closeCheckoutMsg) {
    closeCheckoutMsg.onclick = function () {
        closeCheckoutMsg.classList.toggle("active")
        if (closeCheckoutMsg.classList.contains("active")) {
            closeCheckoutMsg.className = `fa-solid fa-thumbs-up close-msg active`

            setTimeout(function () {
                checkoutmsgDiv.classList.remove("active")
            }, 1000)
        }
        else {
            closeCheckoutMsg.className = `fa-regular fa-thumbs-up close-msg`
        }
    }
}

let closeMsgBtn = document.querySelector(".close-msg-btn")

if (closeMsgBtn) {
    closeMsgBtn.onclick = function () {
        checkoutmsgDiv.classList.remove("active")
    }
}

updateCart()