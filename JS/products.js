fetch("products.json")
.then(function (response) {return response.json()})
.then (function (data) {
    
    
    data.forEach(function (product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || []

        let isInCart = cart.some(function (item) {
            return item.id == product.id
        })

        if ((product.category === "coasters" || product.category === "wall arts") && product.minPrice >=0 && product.maxPrice <= 999) {          
            let productsDiv = document.querySelector("#c-w")

            productsDiv.innerHTML += `
                <div class="product">
                    <div class="img"><img src="${product.img}" alt="product image"></div>
                    <div class="content">
                        <p href="#" class="name">${product.name}</p>
                        <p class="price">${product.minPrice} LE -- ${product.maxPrice} LE</p>
                        <div class="btns">
                            <div class="add-to-cart-btn ${isInCart ? "active" : ""}" data-id="${product.id}">
                                <i class="${isInCart ? "fa-solid fa-cart-flatbed" : "fa-solid fa-cart-plus"}"></i>
                                <h4>${isInCart ? "Item in cart" : "Add to cart"}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }

        if (product.category === "clocks" || product.category === "holders" || product.category === "flower boxes") {          
            let productsDiv = document.querySelector("#cl-d")
    
            productsDiv.innerHTML += `
                <div class="product">
                    <div class="img"><img src="${product.img}" alt="product image"></div>
                    <div class="content">
                        <p href="#" class="name">${product.name}</p>
                        <p class="price">${product.minPrice} LE -- ${product.maxPrice} LE</p>
                        <div class="btns">
                            <div class="add-to-cart-btn ${isInCart ? "active" : ""}" data-id="${product.id}">
                                <i class="${isInCart ? "fa-solid fa-cart-flatbed" : "fa-solid fa-cart-plus"}"></i>
                                <h4>${isInCart ? "Item in cart" : "Add to cart"}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }

        if (product.category === "holders" || product.category === "flower boxes"){          
            let productsDiv = document.querySelector("#h-f")
    
            productsDiv.innerHTML += `
                <div class="product">
                    <div class="img"><img src="${product.img}" alt="product image"></div>
                    <div class="content">
                        <p href="#" class="name">${product.name}</p>
                        <p class="price">${product.minPrice} LE -- ${product.maxPrice} LE</p>
                        <div class="btns">
                            <div class="add-to-cart-btn ${isInCart ? "active" : ""}" data-id="${product.id}">
                                <i class="${isInCart ? "fa-solid fa-cart-flatbed" : "fa-solid fa-cart-plus"}"></i>
                                <h4>${isInCart ? "Item in cart" : "Add to cart"}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }

        if (product.category === "tray" || product.category === "dominos"){          
            let productsDiv = document.querySelector("#o-")
    
            productsDiv.innerHTML += `
                <div class="product">
                    <div class="img"><img src="${product.img}" alt="product image"></div>
                    <div class="content">
                        <p href="#" class="name">${product.name}</p>
                        <p class="price">${product.minPrice} LE -- ${product.maxPrice} LE</p>
                        <div class="btns">
                            <div class="add-to-cart-btn ${isInCart ? "active" : ""}" data-id="${product.id}">
                                <i class="${isInCart ? "fa-solid fa-cart-flatbed" : "fa-solid fa-cart-plus"}"></i>
                                <h4>${isInCart ? "Item in cart" : "Add to cart"}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }
    })
})