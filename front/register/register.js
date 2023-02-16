function register(e) {
    e.preventDefault()
    const firstnameInput = document.getElementById("register-firstname")
    const lastnameInput = document.getElementById("register-lastname")
    const passnumberInput = document.getElementById("register-passnumber")
    const emailInput = document.getElementById("register-email")
    const passwordInput = document.getElementById("register-password")
    const passwordConfirmInput = document.getElementById("register-password-confirm")

    let users = localStorage.getItem("users")
    users = users ? JSON.parse(users) : []
    const newUser = {
        firstname: firstnameInput.value,
        lastname: lastnameInput.value,
        passnumber: passnumberInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    }

    if(newUser.password !== passwordConfirmInput.value) {
        alert("رمز عبور را به درستی تکرار نکردید")
        return
    }

    if(existEmail(newUser.email)) {
        alert("این ایمیل توسط کاربر دیگری استفاده شده است")
        return
    }
    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem("user", JSON.stringify(newUser))
    window.location.href = "../home/home"
}

function existEmail(email) {
    let users = localStorage.getItem("users")
    users = users ? JSON.parse(users) : []
    for (const user of users) {
        if(user.email == email) {
            return true
        }
        return false
    }
}