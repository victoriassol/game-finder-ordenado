//LOGIN
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
 
const form = document.querySelector('#signup');
 
form.addEventListener('submit', function (e) {
    e.preventDefault();

    let isEmailValid = checkEmail(),
        isPasswordValid = checkPassword();
 
    let isFormValid = isEmailValid &&
        isPasswordValid;

    if (isFormValid) {
        let loginBtn = document.getElementById("submit-btn");
 
    loginBtn.addEventListener('click', () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let loginData = {'email': email,
        'password': password};
    let parsedLoginData = JSON.stringify(loginData);
 
    fetch('http://localhost:3000/login', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        method: 'POST',
        body: parsedLoginData
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);        
        if (res.hasOwnProperty('accessToken')) {window.location.href = "file:///C:/Users/qq/Desktop/GameFinder/app/indexGameFinder.html"}
 
        else if (!res.ok) {showSnackBar(".snackBar--invalidCred")};      
    })
    .catch(error => {showSnackBar(".snackBar--noConect")})
});
    }
});
 
const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};
 
const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove('success');
    formField.classList.add('error');
 
    const error = formField.querySelector('small');
    error.textContent = message;
};
const showSuccess = (input) => {
    const formField = input.parentElement;
 
    formField.classList.remove('error');
    formField.classList.add('success');
 
    const error = formField.querySelector('small');
    error.textContent = '';
}
const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
}
const checkPassword = () => {
 
    let valid = false;
 
    const password = passwordEl.value.trim();
 
    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Password must have at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }
 
    return valid;
};
function showSnackBar(snackBar) {
    var pertinentSnackBar = document.querySelector(snackBar);
 
    pertinentSnackBar.classList.add('show');
 
    setTimeout(function(){ pertinentSnackBar.classList.remove('show')}, 3000);
  }
 
//CARROUSEL 

const track = document.querySelector(".carrouselTrack");
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carrouselButton--right');
const prevButton = document.querySelector('.carrouselButton--left');
const dotsNav = document.querySelector('.carrouselNav');
const dots = Array.from(dotsNav.children);

const slideSize = slides[0].getBoundingClientRect();
const slideWidth = slideSize.width;
 
const setSlidePosition = (slide, index)=> {
    slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition)
 
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('currentSlide');
    targetSlide.classList.add('currentSlide');
}
const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('currentSlide');
    targetDot.classList.add('currentSlide');
}
 
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.currentSlide');
    const prevSlide= currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.currentSlide');
    const prevDot = currentDot.previousElementSibling;
    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
})
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.currentSlide');
    const nextSlide= currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.currentSlide');
    const nextDot = currentDot.nextElementSibling;
    moveToSlide(track, currentSlide, nextSlide)
    updateDots(currentDot, nextDot);
})
 
dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');
    if (!targetDot) return;
    const currentSlide = track.querySelector('.currentSlide');
    const currentDot= dotsNav.querySelector('.currentSlide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];
    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
})