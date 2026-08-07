let scriptURL = "https://script.google.com/macros/s/AKfycbzUae3wJMAj_OiuhqNBOzDnZ-bKzn1PWAvsoIcnxG_xGpSYcrj6ff2oFyZVLbkr3CCgvg/exec"

let form = document.getElementById("form-contact")
let inputs = document.querySelectorAll(".input-info .address .inputs .input input")

inputs.forEach(function (input) {
    input.oninput = function (e) {
        if (input.id == "email") {
            let re = /\w+@\w+\.\w+/i

            if (re.test(input.value) === false) {
                wrongeInput(input, "Pls Write A Valide Email ...", "email-msg")
            }
            else {
                rightInput(input, "Valid Email.", "email-msg")
            }
        }

        if (input.id == "username") {
            let re = /[a-z+]/i

            if (re.test(input.value) === false || input.value.trim().length < 3 || input.value.trim().length > 20 ) {
                wrongeInput(input, `Pls Write A Valide Username ... [${input.value.trim().length < 3 ?  "Min 3 Characters" : "Max 20 Characters"}]` , "username-msg")
            }
            if (re.test(input.value) === true && (input.value.trim().length >= 3 && input.value.trim().length <= 20)) {
                rightInput(input, "Valid UserName.", "username-msg")
            }
        }

        if (input.id == "address") {
            let re = /\w+/i

            if (re.test(input.value) === false || input.value.trim().length < 10 || input.value.trim().length > 40 ) {
                wrongeInput(input, `Pls Write A Valide Address ... [${input.value.trim().length < 10 ?  "Min 10 Characters" : "Max 40 Characters"}]` , "address-msg")
            }
            if (re.test(input.value) === true && (input.value.trim().length >= 10 && input.value.trim().length <= 40)) {
                rightInput(input, "Valid Address.", "address-msg")
            }
        }

        if (input.id == "phone") {
            let re = /\d+/
            console.log(input.value.length)
            console.log(input.value)
            if (re.test(input.value) === false || input.value.length < 11) {
                wrongeInput(input, `Pls Write A Valide Phone Number ... [${input.value.length < 11 ?  "Must Be 11 Numbers" : "Must Be 11 Numbers"}]` , "phone-msg")
            }
            if (re.test(input.value) === true && input.value.length === 11) {
                rightInput(input, "Valid Phone Number.", "phone-msg")
            }
        }
    }
})

function wrongeInput(input, msg, cls) {
    let inputDiv = input.parentElement
    inputDiv.classList.add("wronge")

    let msgSpan = document.querySelector(`.${cls}`)

    msgSpan.classList.add("wronge")
    msgSpan.innerHTML = `<i class="fa-regular fa-face-frown-open"></i> ${msg}`

    inputDiv.classList.remove("right")
    msgSpan.classList.remove("right")
}

function rightInput(input, msg, cls) {
    let inputDiv = input.parentElement
    inputDiv.classList.add("right")

    let msgSpan = document.querySelector(`.${cls}`)

    msgSpan.classList.add("right")
    msgSpan.innerHTML = `<i class="fa-regular fa-face-laugh-beam"></i> ${msg}`

    inputDiv.classList.remove("wronge")
    msgSpan.classList.remove("wronge")
}

form.onsubmit = function () {
    fetch(scriptURL, {
        method: "POST",
        body: new FormData(form)
    })
    .then(function (response) {
        setTimeout(function () {
            localStorage.removeItem("cart")
            localStorage.setItem("orderSuccess", "true")
            window.location.reload()
            window.location.href = "../index.html"
        }, 3000)
    })
    .catch(function (error) {
        return console.error("error!", error.message)
    })
}
