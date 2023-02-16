let user = localStorage.getItem("user")
const mainMenuButton = document.getElementById('main-menu-button')
const loginMenuButton = document.getElementById("navbar-login-button")
const navbarLoginButton = document.getElementById('navbar-login-button')
const navbarProfile = document.getElementById('navbar-profile')
const navbarlogout = document.getElementById('navbar-logout')
mainMenuButton.addEventListener('click', function () {
    window.location.href = "../home/home"
})
loginMenuButton.addEventListener('click', function () {
    window.location.href = "../login/login"
})
navbarProfile.addEventListener('click', function () {
    window.location.href = "../profile/profile"
})
if (user) {
    navbarLoginButton.style.display = 'none'
    navbarProfile.style.display = 'block'
} else {
    navbarLoginButton.style.display = 'block'
    navbarProfile.style.display = 'none'
    navbarlogout.style.display = 'none'
}
if (window.location.href.includes('home/home')) {
    mainMenuButton.classList.add('active')
} else if (window.location.href.includes('login/login') || window.location.href.includes("/register/register")) {
    loginMenuButton.classList.add('active')
} else if (window.location.href.includes('profile/profile')) {
    navbarProfile.classList.add('active')
}

function logout() {
    localStorage.removeItem('user')
    window.location.href = "../login/login"
}

function openNav() {
    const navbar = document.getElementById("navbar-side-menu")
    navbar.style.display = 'flex'
    navbar.style.width = "200px";
}

function closeNav() {
    const navbar = document.getElementById("navbar-side-menu")
    navbar.style.width = "0";
}

addEventListener("resize", e => {
    const navbar = document.getElementById("navbar-side-menu")
    if (window.innerWidth > 600) {
        navbar.style.display = 'flex'
        navbar.style.width = "100%";
    } 
    else {
        if(navbar.style.width === "100%") {
            navbar.style.display = 'none'
            navbar.style.width = "0";
        }
    }
})

