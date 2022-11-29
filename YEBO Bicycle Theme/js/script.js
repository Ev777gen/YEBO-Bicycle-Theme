"use strict"

// menu - burger

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            this.Android() ||
            this.BlackBerry() ||
            this.iOS() ||
            this.Opera() ||
            this.Windows());
    },
};

if (isMobile.any()) {
    document.body.classList.add('_mobile');

    const menuLogo = document.querySelector('.menu__logo');
    const header = document.querySelector('.header');
    const mobileMenuBody = document.createElement('div');
    mobileMenuBody.classList.add('_mobile-menu-body');
    const burger = document.querySelector('.burger');
    
    header.append(mobileMenuBody);
    mobileMenuBody.append(menuLogo);
    mobileMenuBody.append(burger);

    let mobileMenuList = document.createElement('ul');
    mobileMenuList.classList.add('_mobile-menu-list');
    const menuLinks = document.querySelectorAll('.menu__link');
    for (let index = 0; index < menuLinks.length; index++) {
        const link = menuLinks[index];
        let listItem = document.createElement('li');
        listItem.innerHTML = link.outerHTML;
        mobileMenuList.append(listItem);
    }

    burger.addEventListener('click', function(e) {
        if (burger.classList.contains('_opened')) {
            burger.classList.remove('_opened');
            mobileMenuList.classList.remove('_opened');
            mobileMenuList.remove();
        } else {
            burger.classList.add('_opened');
            mobileMenuList.classList.add('_opened');
            header.append(mobileMenuList);
        }
    })
} else {
    document.body.classList.add('_pc');
}


// slider

new Swiper('.swiper', {
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    slidesPerView: 1,
    autoplay: {
        delay: 3500,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
    },
});


// shop

const shopImagesBody = document.querySelector('.shop__body_img');
let currentImage = null;

shopImagesBody.addEventListener('mouseover', onMouseOver);
shopImagesBody.addEventListener('mouseout', onMouseOut);

function onMouseOver(e) {
    if (currentImage) return;

    const image = e.target.closest('.images-block__image');
    if (!image) return;

    currentImage = image;

    const cover = document.createElement('a');
    const url = document.querySelector('.shop__button').closest('a').getAttribute('href');
    cover.setAttribute('href', url);
    cover.classList.add('_shop-link');

    const background = document.createElement('div');
    background.classList.add('_bgr-cover');
    cover.append(background);

    const iconLink = document.querySelector('.icon-link').cloneNode(true);
    iconLink.classList.add('visible');
    background.append(iconLink);

    image.append(cover);
}

function onMouseOut(e) {
    if (!currentImage) return;

    let relatedTarget = e.relatedTarget;
    while (relatedTarget) {
        // поднимаемся по дереву элементов и проверяем, внутри ли мы currentImage или нет. 
        // Если да, то это переход внутри элемента – игнорируем
        if (relatedTarget === currentImage) return;
        relatedTarget = relatedTarget.parentNode;
    }

    const target = e.target.closest('._shop-link');
    if (target === null) { // Это для случая быстрого перемещения мыши (выхода за пределы окна браузера)
        document.querySelector('._shop-link').remove();
    } else {
        target.remove();
    }
    currentImage = null;
}


// e-mail

const emailForm = document.querySelector('.email__form');
console.log(emailForm);
emailForm.addEventListener('submit', sendForm);

async function sendForm(e) {
    e.preventDefault();

    const emailInput = emailForm.querySelector('.email__input');

    if (checkEmail(emailInput.value)) {
        sendEmail(emailInput.value);
        if (emailInput.classList.contains('_error')) {
            emailInput.classList.remove('_error');
        }
        emailInput.value = '';
    } else {
        alert('Пожалуйста, введите корректный e-mail.');
        emailInput.classList.add('_error');
    }
}

function checkEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(email);
}
function sendEmail(email) {
    //
}