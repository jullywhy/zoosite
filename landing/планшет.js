// ============================================================
// ПЛАНШЕТНАЯ ВЕРСИЯ — СКРИПТЫ
// ============================================================

// ===== ФИКСАЦИЯ МЕНЮ ПРИ ПРОКРУТКЕ =====
document.addEventListener('DOMContentLoaded', function () {
    const menu = document.getElementById('tabletMenu');
    const menuTop = menu ? menu.offsetTop : 0;
    let isFixed = false;

    function handleScroll() {
        if (!menu) return;
        const scrollY = window.scrollY;

        if (scrollY > menuTop && !isFixed) {
            menu.classList.add('fixed');
            isFixed = true;
        } else if (scrollY <= menuTop && isFixed) {
            menu.classList.remove('fixed');
            isFixed = false;
        }
    }

    window.addEventListener('scroll', handleScroll);
});

// ===== БУРГЕР-МЕНЮ (С АНИМАЦИЕЙ, ВЫКАТЫВАЕТСЯ С X=753) =====
function toggleTabletMenu() {
    const overlay = document.getElementById('tabletMenuOverlay');
    if (!overlay) return;

    if (overlay.classList.contains('active')) {
        closeTabletMenu();
    } else {
        overlay.style.display = 'flex';
        overlay.classList.remove('closing');
        requestAnimationFrame(() => {
            overlay.classList.add('active');
        });
        document.body.style.overflow = 'hidden';
    }
}

function closeTabletMenu() {
    const overlay = document.getElementById('tabletMenuOverlay');
    if (!overlay) return;

    overlay.classList.add('closing');
    overlay.classList.remove('active');

    setTimeout(function () {
        overlay.style.display = 'none';
        overlay.classList.remove('closing');
        document.body.style.overflow = 'auto';
    }, 400);
}

// ===== ЗАКРЫТИЕ ПО ESCAPE =====
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeTabletMenu();
    }
});

// ===== ЛУПА (активируется при наличии текста) =====
document.addEventListener('DOMContentLoaded', function () {
    const tabletSearchInput = document.getElementById('tabletSearchInput');
    const tabletSearchIcon = document.getElementById('tabletSearchIcon');

    if (tabletSearchInput && tabletSearchIcon) {
        function checkTabletSearchInput() {
            const hasText = tabletSearchInput.value.trim().length > 0;
            if (hasText) {
                tabletSearchIcon.classList.add('active');
            } else {
                tabletSearchIcon.classList.remove('active');
            }
        }

        tabletSearchInput.addEventListener('input', checkTabletSearchInput);
        checkTabletSearchInput();
    }
});

// ===== COPY / DONE =====
let tabletTimeoutId = null;

function toggleTabletIcon() {
    const iconImage = document.getElementById('tabletIconImage');
    if (!iconImage) return;

    if (iconImage.src.includes('done.svg')) {
        return;
    }

    iconImage.src = 'done.svg';
    const copyIcon = document.getElementById('tabletCopyIcon');
    if (copyIcon) {
        copyIcon.style.width = '12px';
        copyIcon.style.height = '11px';
        copyIcon.style.left = '72px';
        copyIcon.style.top = '522px';
    }

    if (tabletTimeoutId) {
        clearTimeout(tabletTimeoutId);
    }

    tabletTimeoutId = setTimeout(() => {
        iconImage.src = 'copy.svg';
        if (copyIcon) {
            copyIcon.style.width = '13px';
            copyIcon.style.height = '13px';
            copyIcon.style.left = '72px';
            copyIcon.style.top = '518px';
        }
        tabletTimeoutId = null;
    }, 6000);
}

// ===== МОДАЛЬНЫЕ ОКНА =====

// Окно 404
function openModal() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Окно "Ведутся работы"
function openWorkModal() {
    const overlay = document.getElementById('modalWorkOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeWorkModal() {
    const overlay = document.getElementById('modalWorkOverlay');
    if (overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Закрытие по клику на фон
document.addEventListener('DOMContentLoaded', function () {
    const overlays = document.querySelectorAll('.modal-overlay, .modal-work-overlay');
    overlays.forEach(overlay => {
        overlay.addEventListener('click', function (e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Закрытие по Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal-overlay, .modal-work-overlay');
            modals.forEach(modal => {
                if (modal.style.display === 'flex') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
            closeTabletMenu();
        }
    });
});



// ===== ПЕРЕКЛЮЧЕНИЕ СЕРДЕЦ (ПЛАНШЕТ) =====
function toggleTabletHeart(element) {
    const img = element.querySelector('img');
    const currentSrc = img.getAttribute('src');

    if (currentSrc.includes('heart1.svg')) {
        img.setAttribute('src', 'heart2.svg');
    } else {
        img.setAttribute('src', 'heart1.svg');
    }
}

// ===== СЧЁТЧИКИ ТОВАРОВ (ПЛАНШЕТ) =====
document.addEventListener('DOMContentLoaded', function () {
    const prices = {
        1: 520,
        2: 280,
        3: 450
    };

    const quantities = {
        1: 1,
        2: 1,
        3: 1
    };

    // ===== КНОПКИ "В КОРЗИНУ" =====
    const productBtns = document.querySelectorAll('.tablet-product-btn');

    productBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const id = this.dataset.id;
            const counter = document.getElementById('tablet-counter-' + id);

            counter.classList.add('active');
            this.classList.add('hidden');

            quantities[id] = 1;
            document.getElementById('tablet-count-' + id).textContent = 1;
            updateTabletPrice(id, prices[id]);
        });
    });

    // ===== КНОПКА "+" =====
    document.querySelectorAll('.tablet-counter-plus').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const id = this.dataset.id;
            if (quantities[id] < 10) {
                quantities[id]++;
                document.getElementById('tablet-count-' + id).textContent = quantities[id];
                updateTabletPrice(id, prices[id]);
            }
        });
    });

    // ===== КНОПКА "-" =====
    document.querySelectorAll('.tablet-counter-minus').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const id = this.dataset.id;
            if (quantities[id] > 1) {
                quantities[id]--;
                document.getElementById('tablet-count-' + id).textContent = quantities[id];
                updateTabletPrice(id, prices[id]);
            } else {
                const counter = document.getElementById('tablet-counter-' + id);
                const btnAdd = document.querySelector('.tablet-product-btn[data-id="' + id + '"]');

                counter.classList.remove('active');
                btnAdd.classList.remove('hidden');
                quantities[id] = 1;
                document.getElementById('tablet-count-' + id).textContent = 1;
                updateTabletPrice(id, prices[id]);
            }
        });
    });

    // ===== ОБНОВЛЕНИЕ ЦЕНЫ =====
    function updateTabletPrice(id, basePrice) {
        const priceElement = document.getElementById('tablet-price-' + id);
        const total = basePrice * quantities[id];
        priceElement.textContent = total + ' ₽';
    }
});


// ============================================================
// МОДАЛЬНЫЕ ОКНА (ПЛАНШЕТНАЯ ВЕРСИЯ)
// ============================================================

let orderPhoneNumber = '';

// ===== ОТКРЫТИЕ/ЗАКРЫТИЕ ОКНА ОФОРМЛЕНИЯ =====
function openOrderModal() {
    const overlay = document.getElementById('modalOrderOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        document.querySelectorAll('.modal-order-error').forEach(el => {
            el.style.display = 'none';
            el.textContent = '';
        });
        document.querySelectorAll('.modal-order-input').forEach(el => el.value = '');
        const citySelect = document.getElementById('orderCity');
        if (citySelect) citySelect.value = '';
        const btn = document.getElementById('orderSubmitBtn');
        btn.disabled = true;
        btn.classList.remove('active');
    }
}

function closeOrderModal() {
    const overlay = document.getElementById('modalOrderOverlay');
    if (overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ===== ОТКРЫТИЕ/ЗАКРЫТИЕ ОКНА "ЗАКАЗ ОФОРМЛЕН!" =====
function openSuccessModal(phone) {
    const overlay = document.getElementById('modalSuccessOverlay');
    if (overlay) {
        const lastFour = phone.replace(/\D/g, '').slice(-4);
        const masked = '***-***-**-' + lastFour.slice(0, 2) + '-' + lastFour.slice(2);
        document.getElementById('successPhone').textContent = masked;
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeSuccessModal() {
    const overlay = document.getElementById('modalSuccessOverlay');
    if (overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
        closeOrderModal();
    }
}

// ===== ФУНКЦИИ ДЛЯ ТЕЛЕФОНА =====
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');

    if (value.startsWith('8')) {
        value = '7' + value.slice(1);
    }

    if (value.startsWith('9') && value.length > 0) {
        value = '7' + value;
    }

    let formatted = '';

    if (value.length > 0) {
        if (value.startsWith('7')) {
            formatted = '+7';
            value = value.slice(1);
        } else {
            formatted = '+7';
        }

        if (value.length > 0) {
            formatted += '-(' + value.slice(0, 3);
            value = value.slice(3);
        }

        if (value.length > 0) {
            formatted += ')-' + value.slice(0, 3);
            value = value.slice(3);
        }

        if (value.length > 0) {
            formatted += '-' + value.slice(0, 2);
            value = value.slice(2);
        }

        if (value.length > 0) {
            formatted += '-' + value.slice(0, 2);
            value = value.slice(2);
        }
    }

    input.value = formatted;
    const length = input.value.length;
    input.setSelectionRange(length, length);
}

function formatPhoneNumberStatic(digits) {
    if (!digits || digits.length === 0) return '';

    let formatted = '+7';
    let remaining = digits;

    if (remaining.startsWith('7')) {
        remaining = remaining.slice(1);
    } else {
        if (remaining.length > 0 && remaining[0] !== '7') {
            if (remaining[0] === '8') {
                remaining = remaining.slice(1);
            }
        }
    }

    if (remaining.length > 0) {
        formatted += '-(' + remaining.slice(0, 3);
        remaining = remaining.slice(3);
    } else {
        formatted += '-(';
    }

    if (remaining.length > 0) {
        formatted += ')-' + remaining.slice(0, 3);
        remaining = remaining.slice(3);
    } else {
        formatted += ')-';
    }

    if (remaining.length > 0) {
        formatted += '-' + remaining.slice(0, 2);
        remaining = remaining.slice(2);
    } else {
        formatted += '-';
    }

    if (remaining.length > 0) {
        formatted += '-' + remaining.slice(0, 2);
    } else {
        formatted += '-';
    }

    return formatted;
}

function validatePhone(value) {
    const digits = value.replace(/\D/g, '');
    return digits.length === 11;
}

// ===== ВАЛИДАЦИЯ =====
function validateName(value) {
    const regex = /^[A-Za-zА-Яа-яЁё\s]{2,}$/;
    return regex.test(value.trim());
}

function validateEmail(value) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value.trim());
}

function validateCity(value) {
    return value.trim().length >= 2;
}

function validateAddress(value) {
    return value.trim().length >= 2;
}

// ===== ПОКАЗ/СКРЫТИЕ ОШИБОК =====
function showError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideError(errorElement) {
    errorElement.style.display = 'none';
    errorElement.textContent = '';
}

// ===== ОБРАБОТЧИКИ СОБЫТИЙ =====
document.addEventListener('DOMContentLoaded', function () {
    const nameInput = document.getElementById('orderName');
    const emailInput = document.getElementById('orderEmail');
    const phoneInput = document.getElementById('orderPhone');
    const citySelect = document.getElementById('orderCity');
    const addressInput = document.getElementById('orderAddress');
    const submitBtn = document.getElementById('orderSubmitBtn');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const cityError = document.getElementById('cityError');
    const addressError = document.getElementById('addressError');

    // ===== ФОРМАТИРОВАНИЕ ТЕЛЕФОНА =====
    if (phoneInput) {
        phoneInput.addEventListener('input', function () {
            const digits = this.value.replace(/\D/g, '');
            if (digits.length > 11) {
                this.value = this.value.slice(0, -1);
                return;
            }
            formatPhoneNumber(this);
            if (phoneError) {
                phoneError.style.display = 'none';
            }
            checkFieldsFilled();
        });

        phoneInput.addEventListener('paste', function (e) {
            e.preventDefault();
            const pastedText = (e.clipboardData || window.clipboardData).getData('text');
            const digits = pastedText.replace(/\D/g, '');

            if (digits.length > 0) {
                let number = digits;
                if (number.startsWith('8')) {
                    number = '7' + number.slice(1);
                }
                if (!number.startsWith('7')) {
                    number = '7' + number;
                }
                number = number.slice(0, 11);
                this.value = formatPhoneNumberStatic(number);
                if (validatePhone(this.value)) {
                    if (phoneError) {
                        phoneError.style.display = 'none';
                    }
                }
                checkFieldsFilled();
            }
        });
    }

    // ===== ПРОВЕРКА ЗАПОЛНЕННОСТИ ПОЛЕЙ =====
    function checkFieldsFilled() {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const city = citySelect.value.trim();
        const address = addressInput.value.trim();

        const phoneDigits = phone.replace(/\D/g, '');
        const isPhoneFilled = phoneDigits.length > 0;

        if (name.length > 0 && email.length > 0 && isPhoneFilled && city.length > 0 && address.length > 0) {
            submitBtn.disabled = false;
            submitBtn.classList.add('active');
        } else {
            submitBtn.disabled = true;
            submitBtn.classList.remove('active');
        }
    }

    nameInput.addEventListener('input', checkFieldsFilled);
    emailInput.addEventListener('input', checkFieldsFilled);
    phoneInput.addEventListener('input', checkFieldsFilled);
    citySelect.addEventListener('change', checkFieldsFilled);
    addressInput.addEventListener('input', checkFieldsFilled);

    // ===== ОТПРАВКА ФОРМЫ =====
    submitBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (this.disabled) return;

        const name = nameInput.value;
        const email = emailInput.value;
        const phone = phoneInput.value;
        const city = citySelect.value;
        const address = addressInput.value;

        let isValid = true;

        if (!validateName(name)) {
            showError(nameError, 'Имя должно содержать минимум 2 буквы');
            isValid = false;
        } else {
            hideError(nameError);
        }

        if (!validateEmail(email)) {
            showError(emailError, 'Введите корректный email (example@mail.com)');
            isValid = false;
        } else {
            hideError(emailError);
        }

        if (!validatePhone(phone)) {
            showError(phoneError, 'Введите корректный номер телефона (11 цифр)');
            isValid = false;
        } else {
            hideError(phoneError);
        }

        if (!validateCity(city)) {
            showError(cityError, 'Выберите регион из списка');
            isValid = false;
        } else {
            hideError(cityError);
        }

        if (!validateAddress(address)) {
            showError(addressError, 'Введите адрес доставки (минимум 2 символа)');
            isValid = false;
        } else {
            hideError(addressError);
        }

        if (isValid) {
            orderPhoneNumber = phone;
            document.getElementById('modalOrderOverlay').style.display = 'none';
            openSuccessModal(phone);
        }
    });

    // ===== ВСЕ КНОПКИ "ОФОРМИТЬ ЗАКАЗ" =====
    const orderBtns = document.querySelectorAll('.btn-order, .btn-delivery-order, .tablet-btn-about-order, .tablet-btn-delivery-order');
    orderBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            openOrderModal();
        });
    });

    // ===== ЗАКРЫТИЕ ПО КЛИКУ НА ФОН =====
    const orderOverlay = document.getElementById('modalOrderOverlay');
    if (orderOverlay) {
        orderOverlay.addEventListener('click', function (e) {
            if (e.target === this) {
                closeOrderModal();
            }
        });
    }

    const successOverlay = document.getElementById('modalSuccessOverlay');
    if (successOverlay) {
        successOverlay.addEventListener('click', function (e) {
            if (e.target === this) {
                closeSuccessModal();
            }
        });
    }

    // ===== ЗАКРЫТИЕ ПО ESCAPE =====
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (document.getElementById('modalSuccessOverlay').style.display === 'flex') {
                closeSuccessModal();
            } else if (document.getElementById('modalOrderOverlay').style.display === 'flex') {
                closeOrderModal();
            }
        }
    });
});



// ВСЕ ЭЛЕМЕНТЫ, ОТКРЫВАЮЩИЕ ОКНО 404
document.addEventListener('DOMContentLoaded', function () {
    // Кнопки "читать.svg" в блоке "Мы в соцсетях"
    document.querySelectorAll('.social-read-btn, .tablet-social-read-btn').forEach(el => {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            openModal();
        });
    });

    // Кнопки "читать.svg" в карточках статей
    document.querySelectorAll('.article-read-btn, .tablet-article-read-btn').forEach(el => {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            openModal();
        });
    });

    // Кнопка "Перейти в блог"
    document.querySelectorAll('.btn-blog, .tablet-btn-blog').forEach(el => {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            openModal();
        });
    });

    // Картинка кота
    document.querySelectorAll('.social-cat, .tablet-social-cat').forEach(el => {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            openModal();
        });
    });
});




// ===== ПОДБОРКИ — ОТКРЫВАЮТ ОКНО "ВЕДУТСЯ РАБОТЫ" =====
document.addEventListener('DOMContentLoaded', function () {
    // Планшетная версия
    document.querySelectorAll('.tablet-collection-img').forEach(el => {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            openWorkModal();
        });
    });

    // Десктопная версия
    document.querySelectorAll('.collection-image').forEach(el => {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            openWorkModal();
        });
    });
});