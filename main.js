// check localStorage
let mainColors = localStorage.getItem("color-option")

if (mainColors !== null) {
    document.documentElement.style.setProperty('--main-color', localStorage.getItem('color-option'))
     document.querySelectorAll(".colors-list li").forEach (element => {
            element.classList.remove("active")
            if (element.dataset.color === localStorage.getItem('color-option')) {
                element.classList.add("active")

            }
        })
}

let backgroundOption = true

let backgroundInterval;

let backgroundLocalItem = localStorage.getItem("background_option")

if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === 'true') {
        backgroundOption = true
    }else{
        backgroundOption = false
    }

    document.querySelectorAll(".random-backgrounds span").forEach(span => {
        span.classList.remove("active")
    })

    if ( backgroundLocalItem === 'true') {
        document.querySelector(".random-backgrounds .yes").classList.add("active")
    }else {
        document.querySelector(".random-backgrounds .no").classList.add("active")
    }

}

// Toggle Spin class On Icon
document.querySelector(".toggle-setting i").onclick = function() {
    this.classList.toggle("fa-spin")
    document.querySelector(".setting-box").classList.toggle("opened")
}

// switch colors
const colorsLi = document.querySelectorAll(".colors-list li") 
colorsLi.forEach(li => {
    li.addEventListener("click", (e) => {

// console.log(e.target.dataset.color)
// set color on root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color)
        localStorage.setItem("color-option", e.target.dataset.color)

        handleActive(e)
    })
})





// switch random background option
const randomBackEl = document.querySelectorAll(".random-backgrounds span") 
randomBackEl.forEach(span => {
    span.addEventListener("click", (e) => {
        handleActive(e)
        if (e.target.dataset.background === 'yes') {
            backgroundOption = true
            randomizeImgs()
            localStorage.setItem("background_option", true)
        }else {
            backgroundOption = false
            clearInterval(backgroundInterval)
            localStorage.setItem("background_option", false)
        }
    })
})














// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");



let imgsArray = ["photo1.jpg", "photo3.jpg", "photo4.jpg", "photo9.jpg", "photo12.jpg", "photo13.jpg", "photo14.jpg"]



function randomizeImgs() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
    
        let randomNumber = Math.floor(Math.random() * imgsArray.length)
        landingPage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] +'")'
    },10000)
    }
}

randomizeImgs()



// **********************************

//skills selector

let ourSkills = document.querySelector(".skills")

window.onscroll = function() {
    let skillsOffsetTop = ourSkills.offsetTop;
    // console.log(skillsOffsetTop)

    let skillsOuterHeight= ourSkills.offsetHeight
    // console.log(skillsOuterHeight)

    

    let windowHeight = this.innerHeight
    // console.log(windowHeight)
    let windowScrollTop = this.pageYOffset
    // console.log(windowScrollTop)
    // console.log(skillsOffsetTop + skillsOuterHeight - windowHeight)

    if ((windowScrollTop + 10) > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span")
        allSkills.forEach (skill => {
            skill.style.width = skill.dataset.progress
        })

    }

}


//************************************* */
// Create Popup With Image

let ourGallery = document.querySelectorAll(".gallery img")
ourGallery.forEach(img => {
    img.addEventListener("click", (e) => {
        let overLay = document.createElement("div")
        overLay.className = 'popup-overLay'
        document.body.appendChild(overLay)

        let popupBox = document.createElement("div")
        popupBox.className = 'popup-box'
        if (img.alt !== null) {
            let imgHeading = document.createElement("h3")
            let imgText = document.createTextNode(img.alt)
            imgHeading.appendChild(imgText)
            popupBox.appendChild(imgHeading)
            // popupBox.prepend(imgHeading)
        }



        let popupImage = document.createElement("img")
        popupImage.src = e.target.src

        popupBox.appendChild(popupImage)
        document.body.appendChild(popupBox)

        let closeButton = document.createElement("span")
        let closeButtonText = document.createTextNode("x")
        closeButton.appendChild(closeButtonText)
        closeButton.className = 'close-button'
        popupBox.prepend(closeButton)

        document.addEventListener('click', function(e) {
    if (e.target.className == 'close-button') {
        e.target.parentNode.remove()
        overLay.remove()
    }
})

        
    })
})
// Start Nav Bullets
// select all bullets
const allBullets = document.querySelectorAll (".nav-bullets .bullet")
// allBullets.forEach(bullet => {
//     bullet.addEventListener('click', function(e) {
//         document.querySelector(e.target.dataset.section).scrollIntoView({
//             behavior: "smooth"
//         })
//     })
// })
// End Nav Bullets

// select all links
const allLinks = document.querySelectorAll (".links li a")
// allLinks.forEach(link => {
//     link.addEventListener('click', function(e) {
//         e.preventDefault()
//         document.querySelector(e.target.dataset.section).scrollIntoView({
//             behavior: "smooth"
//         })
//     })
// })


function scrolling (elements) {
    elements.forEach(ele => {
        ele.addEventListener('click', (e) => {
            e.preventDefault()
            // if (e.target.dataset.name) {
            //     handle(e)
            // }
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
}
scrolling (allBullets)
scrolling (allLinks)

// Handle Active State

function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active")
    })
    ev.target.classList.add("active")
}

// function handle(ev) {
//     ev.target.parentElement.querySelectorAll(".add").forEach(element => {
//         element.classList.remove("add")
//     })
//     ev.target.classList.add("add")
// }


let bulletsSpan = document.querySelectorAll(".bullets-option span")
let bulletsContainer = document.querySelector(".nav-bullets")
let bulletLocalItem = localStorage.getItem("bullets-option")

if (bulletLocalItem !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove("active")
    })
    if (bulletLocalItem === 'block') {
        bulletsContainer.style.display = 'block'
        document.querySelector(".bullets-option .yes").classList.add("active")
    }else {
        bulletsContainer.style.display = 'none'
        document.querySelector(".bullets-option .no").classList.add("active")
    }

}

bulletsSpan.forEach(span => {
    span.addEventListener('click', (e) => {
        handleActive(e)
        if (span.dataset.display === 'show') {
            bulletsContainer.style.display = 'block'
            localStorage.setItem("bullets-option", "block")
        }else {
            bulletsContainer.style.display = 'none'
            localStorage.setItem("bullets-option", "none")
        }
    })
})



//***************************** */
//reset button
document.querySelector(".reset-option").onclick = function() {
    // localStorage.clear();
    
    localStorage.removeItem("color-option")
    localStorage.removeItem("background_option")
    localStorage.removeItem("bullets-option")
    window.location.reload()
}

//***************************************************************

//toggle menu 
let toggleBtn = document.querySelector(".toggle-menu")
let tLinks = document.querySelector(".links")
toggleBtn.onclick = function(e) {
    // Stop Propagation
    e.stopPropagation()
    this.classList.toggle("menu-active")
    tLinks.classList.toggle("open")
}

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {
    if (toggleBtn.classList.contains("menu-active") && tLinks.classList.contains("open") && e.target !== toggleBtn && e.target !== tLinks) {
        toggleBtn.classList.remove("menu-active")
        tLinks.classList.remove("open")
    }
    
})

// Stop Propagation On Menu
tLinks.onclick = function(e) {
    e.stopPropagation()
}