
$(document).ready(function () {

	var modal = $('.modal'),
	modalBtn = $('[data-toggle=modal]'),
	closeBtn = $('.modal__close');

	modalBtn.on('click', function () {
		modal.toggleClass('modal--visible');
	});

	closeBtn.on('click', function () {
		modal.toggleClass('modal--visible');
	});
// закрытие модального окна нажатием на кнопку Esc
	$(document).keydown(function (e) {
		if (e.code == 'Escape') {
			modal.removeClass('modal--visible');
		};
	});
// закрытие модального окна при нажатие на любое место вне его
	$(document).on('click', function (e) {
		if (modal.is(e.target)) {
			modal.removeClass('modal--visible');
		};
	});

//Кнопка прокрутки вверх
	$(window).scroll(function () {
		if ($(this).scrollTop() > 1000) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});
// плавная прокрутка 
	$('.pageup').on('click', function (e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, '300');
	});
	
	// слайдер в секции Завершенные проекты
	var projectSwiper = new Swiper('.projects-swiper-container', {
		// Optional parameters
		loop: true,
		// effect: 'fade',
		// fadeEffect: {
		//   crossFade: true
		// },
		pagination: {
			el: '.projects-swiper-pagination',
			type: 'bullets',
			clickable: true
		},
		navigation: {
			nextEl: '.projects-swiper-button-next',
			prevEl: '.projects-swiper-button-prev',
		},
		// Default parameters
		slidesPerView: 1,
		spaceBetween: 10,
		// Responsive breakpoints
		breakpoints: {
			640: {
				slidesPerView: 1,
				spaceBetween: 40
			}
		}
	});

	var next = $('.swiper-button-next');
	var prev = $('.swiper-button-prev');
	var bullets = $('.swiper-pagination');

	next.css('left', prev.width() + bullets.width() + 40)
	bullets.css('left', prev.width() + 20)

	// слайдер в секции 6 шагов
	var stepsSwiper = new Swiper('.steps__swiper-container', {
		// Optional parameters
		loop: true,
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		pagination: {
			el: '.steps__swiper-pagination',
			type: 'bullets',
			clickable: true
		},
		navigation: {
			nextEl: '.steps__swiper-button-next',
			prevEl: '.steps__swiper-button-prev',
		},
	});

	var step_next = $('.steps__swiper-button-next');
	var step_prev = $('.steps__swiper-button-prev');
	var step_bullets = $('.steps__swiper-pagination');

	step_next.css('left', step_prev.width() + step_bullets.width() + 40)
	step_bullets.css('left', step_prev.width() + 20)

// переключение слайдов по табам из секции 6 
	$('.steps-list__item').on('click', function () {
		$('.steps-list__item').removeClass('steps-list__item--active');
		$(this).addClass('steps-list__item--active');
		var index = $(this).data('index');
		stepsSwiper.slideTo(index);
	});
//Чтоб переключало список при клике на точки пагинации
	stepsSwiper.on('slideChange', (function () {
		var index = stepsSwiper.activeIndex - 1; //именно -1, чтоб не перескакивало через элемент списка!
		if (index === 6) index = 0;
		$('.steps-list__item').removeClass('steps-list__item--active');
		$('.steps-list__item').eq(index).addClass('steps-list__item--active');
	}));

// запустить анимацию, когда будет в области видимости
	$(window).scroll(function () {  
		let card = $('.designe__card');
		if ($(this).scrollTop() >= $('.designe').offset().top - $(window).height()* 0.9) {
			for(let i = 0; i <= card.length; i++) {
				$('.designe__card').eq(i).addClass(`card--animation-${i+1}`);
			}
			// $('.designe__card').addClass('card--animation');
		}    
	});

//Инициализируем библиотеку анимаций
	new WOW().init();

//валидация форм!
	const validForm = (selector) => {
		$(selector).validate({
			errorClass: "form__invalid",
			errorElement: "div",
			rules: {
				// simple rule, converted to {required:true}
				userName: {
					required: true,
					minlength: 2,
					maxlength: 15
				},
				userPhone: {
					required: true,
					minlength: 17, //c учетом пробелов, скобочек и дефисов
				},
				userQuestion: "required",
				policyCheckbox: {
					required: true
				},
				// compound rule
				userEmail: {
					required: true,
					email: true
				}
			},
			messages: {
				userName: {
					required: "Имя обязательно",
					minlength: jQuery.validator.format("Имя не короче {0} букв!"),
					maxlength: jQuery.validator.format("Имя не длиннее {0}букв!"),
				},
				userPhone: "Телефон обязателен",
				userQuestion: "Задайте свой вопрос",
				policyCheckbox: "Отметьте, чтобы продолжить",
				userEmail: {
					required: "Обязательно укажите email",
					email: "Введите в формате: name@domain.com"
				}
			},
		});
	}
	
	validForm('#modal-form');
	validForm('#control-form');
	validForm('#footer-form');
	
//Маска для телефона
	$('[type=tel]').mask('+7(000) 000-00-00', {
		placeholder: "Ваш номер телефона:"
	});


//Создание яндекс карт!	
	ymaps.ready(function () {
		var myMap = new ymaps.Map('map', {
						center: [47.244729, 39.723187],
						zoom: 18
				}, {
						searchControlProvider: 'yandex#search'
				}),

				// Создаём макет содержимого.
				MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
						'<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
				),

				myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
						hintContent: 'Офис Repair designe',
						balloonContent: 'Мы работаем с 10 до 22'
				}, {
						// Опции.
						// Необходимо указать данный тип макета.
						iconLayout: 'default#image',
						// Своё изображение иконки метки.
						iconImageHref: 'img/pin.png',
						// Размеры метки.
						iconImageSize: [32, 32],
						// Смещение левого верхнего угла иконки относительно
						// её "ножки" (точки привязки).
						iconImageOffset: [-5, -38]
				});

		myMap.geoObjects
				.add(myPlacemark);
	});
	

});