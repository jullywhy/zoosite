// script.js
let timeoutId = null;
const copyIcon = document.getElementById('copyIcon');
const iconImage = document.getElementById('iconImage');

function toggleIcon() {
    // Если иконка уже в состоянии done, ничего не делаем
    if (iconImage.src.includes('done.svg')) {
        return;
    }

    // Меняем на done.svg с новыми размерами
    iconImage.src = 'done.svg';
    copyIcon.style.width = '24px';
    copyIcon.style.height = '28px';
    copyIcon.style.left = '185px';
    copyIcon.style.top = '1002px';

    // Очищаем предыдущий таймер, если был
    if (timeoutId) {
        clearTimeout(timeoutId);
    }

    // Через 4 секунды возвращаем обратно на copy.svg
    timeoutId = setTimeout(() => {
        iconImage.src = 'copy.svg';
        copyIcon.style.width = '22px';
        copyIcon.style.height = '25px';
        copyIcon.style.left = '185px';
        copyIcon.style.top = '1005px';
        timeoutId = null;
    }, 6000);
}

// Функция для фиксации меню при прокрутке
let isMenuFixed = false;
const menuBar = document.querySelector('.menu-bar');

function updateMenuPosition() {
    const scrollY = window.scrollY;
    const menuOriginalTop = 24;

    if (scrollY > menuOriginalTop && !isMenuFixed) {
        menuBar.classList.add('fixed-menu');
        isMenuFixed = true;
    }
    else if (scrollY <= menuOriginalTop && isMenuFixed) {
        menuBar.classList.remove('fixed-menu');
        isMenuFixed = false;
    }
}

// Слушаем событие прокрутки
window.addEventListener('scroll', updateMenuPosition);

// Добавьте эту функцию в конец файла script.js

// ===== ФУНКЦИЯ ДЛЯ ПЕРЕКЛЮЧЕНИЯ ИКОНОК СЕРДЦА =====
function toggleHeart(element) {
    const img = element.querySelector('img');
    const currentSrc = img.getAttribute('src');

    // Переключаем между heart1.svg и heart2.svg
    if (currentSrc.includes('heart1.svg')) {
        img.setAttribute('src', 'heart2.svg');
    } else {
        img.setAttribute('src', 'heart1.svg');
    }
}

// ===== ПЛАВНАЯ ПРОКРУТКА С УЧЁТОМ ФИКСИРОВАННОГО МЕНЮ =====
document.addEventListener('DOMContentLoaded', function () {
    // Находим все ссылки меню с якорями
    const menuLinks = document.querySelectorAll('.menu-link');

    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Отменяем стандартное поведение

            // Получаем ID цели из атрибута href
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Получаем высоту фиксированного меню (если оно зафиксировано)
                const menuBar = document.querySelector('.menu-bar');
                const isFixed = menuBar.classList.contains('fixed-menu');
                const menuHeight = isFixed ? menuBar.offsetHeight : 0;

                // Вычисляем позицию цели с учётом отступа сверху
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - menuHeight - 20;

                // Плавно прокручиваем
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});


// ===== МОДАЛЬНОЕ ОКНО =====
function openModal() {
    const overlay = document.getElementById('modalOverlay');
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden'; /* Блокируем прокрутку */
}

function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto'; /* Восстанавливаем прокрутку */
}

// Закрытие по клику на фон (overlay)
document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('modalOverlay');
    overlay.addEventListener('click', function (e) {
        if (e.target === this) {
            closeModal();
        }
    });

    // Закрытие по клавише Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});

// ===== ПРИВЯЗКА К КНОПКЕ "СВЯЗАТЬСЯ С НАМИ" =====
// Находим кнопку и добавляем обработчик
document.addEventListener('DOMContentLoaded', function () {
    const contactBtn = document.querySelector('.btn-contact');
    if (contactBtn) {
        contactBtn.addEventListener('click', function (e) {
            e.preventDefault();
            openModal();
        });
    }
});

// ===== МОДАЛЬНОЕ ОКНО =====
function openModal() {
    const overlay = document.getElementById('modalOverlay');
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Закрытие по клику на фон
document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) {
        overlay.addEventListener('click', function (e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }

    // Закрытие по клавише Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // ===== ДЛЯ ВСЕХ КНОПОК "читать.svg" =====
    const readButtons = document.querySelectorAll('.social-read-btn, .article-read-btn');

    readButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            openModal();
        });
    });

    // ===== ДЛЯ КНОПКИ "СВЯЗАТЬСЯ С НАМИ" =====
    const contactBtn = document.querySelector('.btn-contact');
    if (contactBtn) {
        contactBtn.addEventListener('click', function (e) {
            e.preventDefault();
            openModal();
        });
    }
});

// ===== МОДАЛЬНОЕ ОКНО "ОФОРМЛЕНИЕ ЗАКАЗА" =====
let orderPhoneNumber = '';

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
        // Сбрасываем select для региона
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

// ===== МОДАЛЬНОЕ ОКНО "ЗАКАЗ ОФОРМЛЕН!" =====
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

// ===== ОСТАЛЬНЫЕ ФУНКЦИИ ВАЛИДАЦИИ =====
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

    // ===== ПРОВЕРКА ЗАПОЛНЕННОСТИ ПОЛЕЙ (ТОЛЬКО НА НАЛИЧИЕ СИМВОЛОВ) =====
    function checkFieldsFilled() {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const city = citySelect.value.trim();
        const address = addressInput.value.trim();

        // Проверяем, что поля НЕ ПУСТЫЕ (хотя бы 1 символ)
        // Для телефона проверяем, что есть хотя бы одна цифра
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

    // ===== ОТПРАВКА ФОРМЫ (ПОЛНАЯ ПРОВЕРКА) =====
    submitBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (this.disabled) return;

        const name = nameInput.value;
        const email = emailInput.value;
        const phone = phoneInput.value;
        const city = citySelect.value;
        const address = addressInput.value;

        let isValid = true;

        // Проверка имени (минимум 2 буквы)
        if (!validateName(name)) {
            showError(nameError, 'Имя должно содержать минимум 2 буквы');
            isValid = false;
        } else {
            hideError(nameError);
        }

        // Проверка email
        if (!validateEmail(email)) {
            showError(emailError, 'Введите корректный email (example@mail.com)');
            isValid = false;
        } else {
            hideError(emailError);
        }

        // Проверка телефона (11 цифр)
        if (!validatePhone(phone)) {
            showError(phoneError, 'Введите корректный номер телефона (11 цифр)');
            isValid = false;
        } else {
            hideError(phoneError);
        }

        // Проверка региона (минимум 2 символа)
        if (!validateCity(city)) {
            showError(cityError, 'Выберите регион из списка');
            isValid = false;
        } else {
            hideError(cityError);
        }

        // Проверка адреса (минимум 2 символа)
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
    const orderBtns = document.querySelectorAll('.btn-order, .btn-delivery-order');
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


// ===== МОДАЛЬНОЕ ОКНО "ЗАКАЗ ОФОРМЛЕН!" =====
function openSuccessModal(phone) {
    const overlay = document.getElementById('modalSuccessOverlay');
    if (overlay) {
        // Маскируем номер телефона (показываем последние 4 цифры)
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
        // Закрываем также окно оформления заказа
        const orderOverlay = document.getElementById('modalOrderOverlay');
        if (orderOverlay) {
            orderOverlay.style.display = 'none';
        }
    }
}

// Закрытие по клику на фон
document.addEventListener('DOMContentLoaded', function () {
    const successOverlay = document.getElementById('modalSuccessOverlay');
    if (successOverlay) {
        successOverlay.addEventListener('click', function (e) {
            if (e.target === this) {
                closeSuccessModal();
            }
        });
    }

    // Закрытие по клавише Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (document.getElementById('modalSuccessOverlay').style.display === 'flex') {
                closeSuccessModal();
            }
        }
    });
});



// ===== МОДАЛЬНОЕ ОКНО "Упс! Ведутся работы" ==========================
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
    const workOverlay = document.getElementById('modalWorkOverlay');
    if (workOverlay) {
        workOverlay.addEventListener('click', function (e) {
            if (e.target === this) {
                closeWorkModal();
            }
        });
    }

    // Закрытие по клавише Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (document.getElementById('modalWorkOverlay').style.display === 'flex') {
                closeWorkModal();
            }
        }
    });

    // ===== КНОПКА "ПЕРЕЙТИ В БЛОГ" =====
    const blogBtn = document.querySelector('.btn-blog');
    if (blogBtn) {
        blogBtn.addEventListener('click', function (e) {
            e.preventDefault();
            openWorkModal();
        });
    }

    // ===== ПОДБОРКИ (картинки в блоке "Подборки для каждого") =====
    const collectionImages = document.querySelectorAll('.collection-image');
    collectionImages.forEach(img => {
        img.addEventListener('click', function (e) {
            e.preventDefault();
            openWorkModal();
        });
    });
});


// ===== КАРТИНКА КОТА (открывает окно 404) =====
document.addEventListener('DOMContentLoaded', function () {
    const socialCat = document.querySelector('.social-cat');
    if (socialCat) {
        socialCat.addEventListener('click', function (e) {
            e.preventDefault();
            openModal(); // Открывает окно "Упс! 404"
        });
    }
});


// ===== ИКОНКА ЛУПЫ (активируется только при наличии текста) =====
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.search-icon');

    if (searchInput && searchIcon) {
        // Функция проверки наличия текста
        function checkSearchInput() {
            const hasText = searchInput.value.trim().length > 0;

            if (hasText) {
                searchIcon.classList.add('active');
            } else {
                searchIcon.classList.remove('active');
            }
        }

        // Проверяем при вводе текста
        searchInput.addEventListener('input', checkSearchInput);

        // Проверяем при загрузке страницы (на случай, если поле уже заполнено)
        checkSearchInput();

        // Обработчик клика по иконке (только если активна)
        searchIcon.addEventListener('click', function (e) {
            e.preventDefault();
            // Проверяем, есть ли класс active
            if (this.classList.contains('active')) {
                openWorkModal(); // Открывает окно "Ведутся работы"
            }
        });
    }
});


// ===== СЧЁТЧИКИ ТОВАРОВ =====
document.addEventListener('DOMContentLoaded', function () {
    // Цены для каждого товара
    const prices = {
        1: 620,
        2: 280,
        3: 150,
        4: 3320
    };

    // Текущие количества
    const quantities = {
        1: 1,
        2: 1,
        3: 1,
        4: 1
    };

    // ===== ФУНКЦИЯ ОБНОВЛЕНИЯ КНОПКИ "+" =====
    function updatePlusButton(id) {
        const plusBtn = document.querySelector('.counter-plus[data-id="' + id + '"]');
        if (quantities[id] >= 10) {
            plusBtn.classList.add('disabled');
        } else {
            plusBtn.classList.remove('disabled');
        }
    }

    // ===== ФУНКЦИЯ ОБНОВЛЕНИЯ ЦЕНЫ =====
    function updatePrice(id, basePrice) {
        const priceElement = document.getElementById('price-' + id);
        const total = basePrice * quantities[id];
        priceElement.textContent = total + ' ₽';
        updatePlusButton(id);
    }

    // ===== ОБРАБОТЧИК ДЛЯ КНОПОК "В КОРЗИНУ" =====
    const productBtns = document.querySelectorAll('.product-btn');

    productBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const id = this.dataset.id;
            const counter = document.getElementById('counter-' + id);
            const priceElement = document.getElementById('price-' + id);

            // Показываем счётчик
            counter.classList.add('active');

            // Скрываем кнопку
            this.classList.add('hidden');

            // Устанавливаем начальное значение
            quantities[id] = 1;
            document.getElementById('count-' + id).textContent = 1;
            updatePrice(id, prices[id]);
        });
    });

    // ===== ОБРАБОТЧИК ДЛЯ КНОПКИ "+" =====
    document.querySelectorAll('.counter-plus').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const id = this.dataset.id;
            if (quantities[id] < 10) {
                quantities[id]++;
                document.getElementById('count-' + id).textContent = quantities[id];
                updatePrice(id, prices[id]);
            }
        });
    });

    // ===== ОБРАБОТЧИК ДЛЯ КНОПКИ "-" =====
    document.querySelectorAll('.counter-minus').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const id = this.dataset.id;
            if (quantities[id] > 1) {
                quantities[id]--;
                document.getElementById('count-' + id).textContent = quantities[id];
                updatePrice(id, prices[id]);
            } else {
                // Если количество стало меньше 1, возвращаем кнопку "В корзину"
                const counter = document.getElementById('counter-' + id);
                const btnAdd = document.querySelector('.product-btn[data-id="' + id + '"]');

                counter.classList.remove('active');
                btnAdd.classList.remove('hidden');
                quantities[id] = 1;
                document.getElementById('count-' + id).textContent = 1;
                updatePrice(id, prices[id]);
            }
        });
    });

    // ===== ИНИЦИАЛИЗАЦИЯ (проверяем начальное состояние) =====
    for (let id = 1; id <= 4; id++) {
        updatePlusButton(id);
    }
});

// ===== ПОДСКАЗКИ АДРЕСОВ (DADATA) =====
document.addEventListener('DOMContentLoaded', function () {
    const addressInput = document.getElementById('orderAddress');
    const suggestionsWrapper = document.getElementById('suggestionsWrapper');
    const suggestionsList = document.getElementById('suggestionsList');

    // Токен для DaData (бесплатный, можно получить на dadata.ru)
    // Замените на свой токен: https://dadata.ru/profile/#api-key
    const API_KEY = 'adf9aef46badd2e3a95f39bbfcb779d9aeedd81e'; // Пример, замените на свой

    let timeoutId = null;
    let currentSuggestions = [];

    // Функция для получения подсказок
    function fetchSuggestions(query) {
        if (query.length < 2) {
            suggestionsWrapper.classList.remove('active');
            return;
        }

        clearTimeout(timeoutId);

        timeoutId = setTimeout(function () {
            fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Token ' + API_KEY
                },
                body: JSON.stringify({
                    query: query,
                    count: 10,
                    from_bound: { value: 'city' },
                    to_bound: { value: 'house' }
                })
            })
                .then(response => response.json())
                .then(data => {
                    currentSuggestions = data.suggestions || [];
                    renderSuggestions(currentSuggestions, query);
                })
                .catch(error => {
                    console.error('Ошибка при получении подсказок:', error);
                    // Если API не работает, показываем заглушку
                    currentSuggestions = [];
                    renderSuggestions([], query);
                });
        }, 300);
    }

    // Функция для отображения подсказок
    function renderSuggestions(suggestions, query) {
        suggestionsList.innerHTML = '';

        if (suggestions.length === 0) {
            suggestionsWrapper.classList.remove('active');
            return;
        }

        suggestions.forEach(suggestion => {
            const li = document.createElement('li');
            const value = suggestion.value;

            // Подсвечиваем совпадения
            const lowerQuery = query.toLowerCase();
            const index = value.toLowerCase().indexOf(lowerQuery);

            if (index !== -1) {
                const before = value.substring(0, index);
                const match = value.substring(index, index + query.length);
                const after = value.substring(index + query.length);
                li.innerHTML = before + '<span class="highlight">' + match + '</span>' + after;
            } else {
                li.textContent = value;
            }

            li.addEventListener('click', function () {
                addressInput.value = value;
                suggestionsWrapper.classList.remove('active');
                // Триггерим событие input для проверки заполненности
                addressInput.dispatchEvent(new Event('input'));
                // Закрываем список
                currentSuggestions = [];
            });

            suggestionsList.appendChild(li);
        });

        suggestionsWrapper.classList.add('active');
    }

    // Событие при вводе
    if (addressInput) {
        addressInput.addEventListener('input', function () {
            const query = this.value.trim();
            if (query.length >= 2) {
                fetchSuggestions(query);
            } else {
                suggestionsWrapper.classList.remove('active');
                currentSuggestions = [];
            }
        });

        // Закрытие при потере фокуса (с задержкой, чтобы клик сработал)
        addressInput.addEventListener('blur', function () {
            setTimeout(function () {
                suggestionsWrapper.classList.remove('active');
            }, 200);
        });

        // Закрытие при нажатии Escape
        addressInput.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                suggestionsWrapper.classList.remove('active');
                this.blur();
            }
        });
    }

    // Закрытие при клике вне поля
    document.addEventListener('click', function (e) {
        if (!e.target.closest('#orderAddress') && !e.target.closest('.suggestions-wrapper')) {
            suggestionsWrapper.classList.remove('active');
        }
    });
});

// ===== ФУНКЦИЯ ДЛЯ ОТКРЫТИЯ ОКНА "ВЕДУТСЯ РАБОТЫ" =====
function openWorkModal(event) {
    if (event) {
        event.preventDefault(); // Отменяем переход по ссылке
    }
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
    const workOverlay = document.getElementById('modalWorkOverlay');
    if (workOverlay) {
        workOverlay.addEventListener('click', function (e) {
            if (e.target === this) {
                closeWorkModal();
            }
        });
    }

    // Закрытие по Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (document.getElementById('modalWorkOverlay').style.display === 'flex') {
                closeWorkModal();
            }
        }
    });
});