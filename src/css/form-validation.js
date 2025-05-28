const form = document.querySelector('form')
const username = document.querySelector('#username')
const password = document.querySelector('#password')
const usernameError = document.querySelector('#usernameError')
const passwordError = document.querySelector('#passwordError')

username.addEventListener('input', (event)=>{
    if (username.validity.valid){
        usernameError.textContent = ''
        usernameError.className = 'error'
    } else {
        showErrorUsername()
    }
})

password.addEventListener('input', (event)=>{
    if (password.validity.valid){
        passwordError.textContent = ''
        passwordError.className = 'error'
    } else {
        showErrorPassword()
    }
})

form.addEventListener('submit', (event)=>{
    if (!username.validity.valid || !password.validity.valid){
        showError()
        event.preventDefault()
    }
})

function showErrorUsername(){
    if (username.validity.tooShort){
        usernameError.textContent = 'the username must at least contain 5 characters'
    } else if (username.validity.tooLong) {
        usernameError.textContent = 'the username is too long'
    } else if (username.validity.patternMismatch){
        usernameError.textContent = 'only letters and numbers are allowed'
    }
    usernameError.className = 'error active'
}

function showErrorPassword(){
    if (password.validity.tooShort){
        passwordError.textContent = 'Password must at least contain 8 characters'
    } else if (password.validity.tooLong){
        passwordError.textContent = 'Password is too long, max 32 characters'
    } else if (password.validity.patternMismatch){
        passwordError.textContent = 'Password must include uppercase, lowercase, number, and special character'
    }
    passwordError.className = 'error active'
}