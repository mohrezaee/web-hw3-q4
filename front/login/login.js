function login(e) {
    // e.preventDefault()
    const emailInput = document.getElementById('login-email')
    const passwordInput = document.getElementById('login-password')
    let users = localStorage.getItem("users")
    users = users ? JSON.parse(users) : []
    const exists = users.filter(item => item.email === emailInput.value && item.password == passwordInput.value)
    if(exists[0]) {
        localStorage.setItem("user", JSON.stringify(exists[0]))
        window.location.href = '../home/home.html'
    } else {
        alert("ایمیل یا رمز عبور اشتباه میباشد")
    }
}
let profile = localStorage.getItem("user")
if(profile) {
	window.location.href = '../home/home'
}