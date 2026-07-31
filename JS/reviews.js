fetch("reviews.json")
.then(function (response) {return response.json()})
.then (function (data) {

    let counterDiv = document.querySelector(".counter span")
    let counter = 0
    data.forEach(function (feedback) {

        if (feedback.category == "feedback") {
            let reviewsDiv = document.querySelector(".reviews")

            reviewsDiv.innerHTML += `
                <div class="review">
                    <img src="${feedback.img}" alt="feedBack img">
                    <div class="stars">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                </div>
            `
            
            counter += 1
        }
    })
    counterDiv.textContent = counter
})