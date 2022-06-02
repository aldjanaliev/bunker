$(document).ready(function() {
	$('.slider').slick({
  	dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true, 
    responsive: [
    {
      breakpoint: 781,
      settings: {
        arrows: false,
        dots: true,
      }
    }]
  });

	$('.letter-slider').slick({
  	dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    responsive: [
    {
      breakpoint: 781,
      settings: {
        arrows: false,
        dots: true,
      }
    }]
  });

  $('.reveiw-tab-slider').click(function() {
    $('.letter-slider').slick('refresh');
  });

  $('.sertificate-slider').slick({
  	dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

   $('.variants-body-slider').slick({
	  slidesToShow: 1,
	  slidesToScroll: 1,
    infinite: false,
	  arrows: false,
	  fade: true,
    speed: 300,
    draggable: false,
	  asNavFor: '.variants-heads'
	});
  $('.variants-heads').slick({
  	dots: false,
  	arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    focusOnSelect: true,
	  asNavFor: '.variants-body-slider',
	  responsive: [
    {
      breakpoint: 780,
      settings: {
    		infinite: true,
    		slidesToShow: 3,
        arrows: true,
        dots: false,
        centerMode: true,
      }
    }]
  });

  $('.gallery-slider').slick({
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
	  fade: true,
    draggable: false,
  });


  $('.coach-slider').slick({
  	dots: false,
  	arrows: true,
    speed: 300,
    // autoplay: 5000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
 		cssEase: 'linear'
  });

  $('.price-slider').slick({
  	dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
    {
      breakpoint: 1400,
      settings: {
    		slidesToShow: 3,
        arrows: false,
        dots: false,
      }
    },
    {
      breakpoint: 1200,
      settings: {
    		slidesToShow: 2,
        arrows: false,
        dots: false,
      }
    }]
  });
  

  // modal_choose-time
	let modalChooseNow = document.querySelector('.modal_choose-now')
	let modalChooseLeter = document.querySelector('.modal_choose-leter')
	let modalChooseInput = document.querySelector('.modal_choose-input')
	modalChooseNow.onclick = function(){
		modalChooseLeter.classList.remove('modal_choose-time__active')
		this.classList.add('modal_choose-time__active')
		modalChooseInput.disabled = true
		modalChooseInput.style.display = 'none'
	}
	modalChooseLeter.onclick = function(){
		modalChooseNow.classList.remove('modal_choose-time__active')
		this.classList.add('modal_choose-time__active')
		modalChooseInput.style.display = 'block'
		modalChooseInput.disabled = false
		modalChooseInput.focus()
	}

  // перезагружает слайдер из таба
  $('.game-tab-slider').click(function() {
    $('.coach-slider').slick('refresh');
  });


	$('a[href^="#"').on('click', function() {
    let href = $(this).attr('href');
    $('html, body').animate({
        scrollTop: $(href).offset().top
    });
    return false;
	});

	// gallery pagination
	if(galleryParrent = document.querySelector('.gallery')){
		let galleryParrent = document.querySelector('.gallery')
		let galleryPagination = document.querySelector('.pagination-current')
		let galleryArrow = [...document.querySelectorAll('.slick-arrow')]
		galleryArrow.forEach(item => {
			item.onclick = function(){
				if(this.classList.contains('slick-next')){
					let galleryCounter = +galleryPagination.innerHTML
					galleryPagination.innerHTML = ++galleryCounter
				} else{
					let galleryCounter = +galleryPagination.innerHTML
					galleryPagination.innerHTML = --galleryCounter
				}
			}
		})
	}

	// validation
	let selector = document.querySelectorAll('input[type="tel"]');
	let im = new Inputmask('+7 (999) 999-99-99');
	im.mask(selector);

	// ==========validate and send form==========
	// document.addEventListener('DOMContentLoaded', function(){
	// 	const form = [...document.querySelectorAll('form')]
	// 	form.forEach(item =>{
	// 		item.addEventListener('submit', formSend)
	// 		async function formSend(e){
	// 			e.preventDefault()
	// 			let error = formValidate(this)
	// 			let formData = new FormData(this)
	// 			if(document.querySelector('.file-upload')){
	// 				formData.append('file', formImage.files[0])
	// 			}
	// 			if(error === 0){
	// 				this.classList.add('_sending')
	// 				let sendBtn = document.querySelector('#btn_thanks')
	// 				sendBtn.click()

	// 				let response = await fetch('send.php',{
	// 					method: 'POST',
	// 					body: formData
	// 				})
	// 				if(response.ok){
	// 					// let result = await response.json()
	// 					console.log('sending message')
	// 					// console.log(result.message)
	// 					// fileInputText.innerHTML = ''
	// 					// form.reset()
	// 				} else{
	// 					console.log('error message')
	// 				}
	// 			} else{
	// 				console.log('not valid ' + error)
	// 			}
	// 		}
	// 	})

	// 	function formValidate(form) {
	// 		let error = 0
	// 		let formReq = form.querySelectorAll('._req')

	// 		for(let index = 0; index < formReq.length; index++){
	// 			const input = formReq[index]
	// 			formRemoveError(input)
	// 			if(input.classList.contains('_mail')){
	// 				if(emailTest(input)){
	// 					formAddError(input)
	// 					error++
	// 				}
	// 			} else if(input.getAttribute("type") == "checkbox" && input.checked == false){
	// 				formAddError(input)
	// 				error++
	// 			} else{
	// 				if(input.value === ''){
	// 					formAddError(input)
	// 					error++
	// 				}
	// 			}
	// 		}
	// 		return error
	// 	}

	// 	// checked input
	// 	let errorInputs = [...document.querySelectorAll('._req')]
	// 	errorInputs.forEach(item =>{
	// 		item.oninput = function(){
	// 			if(this.classList.contains('_error')){
	// 				if(this.classList.contains('_mail')){
	// 					if(!emailTest(this)){
	// 						this.classList.remove('_error')
	// 					}
	// 				} else if(this.classList.contains('detail_input__tel')){
	// 					if(!this.value.includes('_')){
	// 						this.classList.remove('_error')
	// 					}
						
	// 				} else{
	// 					if(!this.value == ''){
	// 						this.classList.remove('_error')
	// 					}
	// 				}
	// 			} else if(this.classList.contains('detail_input__tel')){
	// 				if(this.value.includes('_')){
	// 					this.classList.add('_error')
	// 				}
	// 			}
	// 		}
	// 	})

	// 	function formAddError(input){
	// 		if(input.classList.contains('ch-box')){
	// 			input.parentElement.classList.add('_error')
	// 		} else{
	// 			input.classList.add('_error')
	// 		}
	// 	}
	// 	function formRemoveError(input){
	// 		if(input.classList.contains('ch-box')){
	// 			input.parentElement.classList.remove('_error')
	// 		} else{
	// 			input.classList.remove('_error')
	// 		}
	// 	}
	// 	// check mail
	// 	function emailTest(input){
	// 		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
	// 	}
	// 	// upload files
	// 	let formImage = [...document.querySelectorAll('.form_file-input')]
	// 	formImage.forEach(item =>{
	// 		let fileInputParent = item.parentElement
	// 		let fileInputText = fileInputParent.querySelector('.file-txt')
	// 		item.addEventListener('change', () =>{
	// 			let formImageFiles = item.files[0]
	// 			fileInputText.innerText = formImageFiles.name
	// 			this.classList.add('file-upload')
	// 			console.log(formImageFiles.name)
	// 		})
	// 	})
		

	// })
	// ============validate and send form==========

	// forms-select
	$('.form_select-btn').on('click', function() {
		if($(this).hasClass('form_select-btn__active')){
			$(this).removeClass('form_select-btn__active')
			$(this).next().slideUp(500)
		} else{
			$('.form_select-btn__active').next().slideUp(100)
			$('.form_select-btn__active').removeClass('form_select-btn__active')
			$(this).addClass('form_select-btn__active')
			$(this).next().slideDown(500)
		}
	})
	$('.form_select-tab').on('click', function() {

			let thisParrent = $(this).closest('.form_select')
			thisParrent.find('.form_select-tab__active').removeClass('form_select-tab__active')
			$(this).addClass('form_select-tab__active')
			let thisTetxt = $(this).html()
			thisParrent.find('.form_select-btn-txt').html(thisTetxt)
			thisParrent.find('.form_select-btn').css({'color':'#000'})
			thisParrent.find('.form_select-body').slideUp(500)
			thisParrent.find('.form_select-btn').removeClass('form_select-btn__active')

			// select by attr
			if($(this).hasClass('select-choose')){
				let selectAttr = $(this).attr('data-choose')
				if($(this).hasClass('select-kind')){
					$('.form_select-btn-txt__btn').html('Выбрать тариф')
					$('.select-tarif').css({'display':'none'})
					console.log(123)
				}
				$('[data-item = "' + selectAttr + '"]').css({'display':'block'})
				$('.form_select__passive').removeClass('form_select__passive')
			}

			if($(this).hasClass('form_select-tab__input-wrap')){
				$('.form_select-tab__input')[0].focus()
			}

	})

	// close thanks modal
	let toThanksBtns = [...document.querySelectorAll('.to-thanks')]
	toThanksBtns.forEach(item =>{
		item.onclick = function(){
			if(this.classList.contains('bonus-btn')){
				let toThanksParrent = this.closest('.modal')
				let toThanksClose = toThanksParrent.querySelector('.fancybox-button')
				toThanksClose.click()
				let modalBonusIc = document.querySelector('.main-ic__bonus')
				modalBonusIc.remove()
				let modalBonus = document.querySelector('#modal-bonus')
				modalBonus.remove()
			}
			let toThanksParrent = this.closest('.modal')
			let toThanksClose = toThanksParrent.querySelector('.fancybox-button')
			toThanksClose.click()
		}
	})

	let menuBtn = document.querySelector('.mobile-btn')
	let menu = document.querySelector('.mobile-menu-body')
	menuBtn.onclick = function(){
		if(this.classList.contains('mobile-btn__active')){
			this.classList.remove('mobile-btn__active')
			menu.classList.remove('mobile-menu__active')
		} else{
			this.classList.add('mobile-btn__active')
			menu.classList.add('mobile-menu__active')
		}
	}

	// timer
	// modal-bonus
	let modalBonusBtn = document.querySelector('.modal-bonus_btn')
	var Countdown = {
			  
			  // Backbone-like structure
			  $el: $('.countdown'),
			  
			  // Params
			  countdown_interval: null,
			  total_seconds     : 0,
			  
			  // Initialize the countdown  
			  init: function() {
			    
			    // DOM
					this.$ = {
			    	hours  : this.$el.find('.bloc-time.hours .figure'),
			    	minutes: this.$el.find('.bloc-time.min .figure'),
			    	seconds: this.$el.find('.bloc-time.sec .figure')
			   	};

			    // Init countdown values
			    this.values = {
				      hours  : this.$.hours.parent().attr('data-init-value'),
			        minutes: this.$.minutes.parent().attr('data-init-value'),
			        seconds: this.$.seconds.parent().attr('data-init-value'),
			    };
			    
			    // Initialize total seconds
			    this.total_seconds = this.values.hours * 60 * 60 + (this.values.minutes * 60) + this.values.seconds;

			    // Animate countdown to the end 
			    this.count();    
			  },
			  
			  count: function() {
			    
			    var that    = this,
			        $hour_1 = this.$.hours.eq(0),
			        $hour_2 = this.$.hours.eq(1),
			        $min_1  = this.$.minutes.eq(0),
			        $min_2  = this.$.minutes.eq(1),
			        $sec_1  = this.$.seconds.eq(0),
			        $sec_2  = this.$.seconds.eq(1);
			    
			        this.countdown_interval = setInterval(function() {

			        if(that.total_seconds > 0) {

			            --that.values.seconds;              

			            if(that.values.minutes >= 0 && that.values.seconds < 0) {

			                that.values.seconds = 59;
			                --that.values.minutes;
			            }

			            if(that.values.hours >= 0 && that.values.minutes < 0) {

			                that.values.minutes = 59;
			                --that.values.hours;
			            }

			            // Update DOM values
			            // Hours
			            that.checkHour(that.values.hours, $hour_1, $hour_2);

			            // Minutes
			            that.checkHour(that.values.minutes, $min_1, $min_2);

			            // Seconds
			            that.checkHour(that.values.seconds, $sec_1, $sec_2);

			            --that.total_seconds;
			        }
			        else {
			            clearInterval(that.countdown_interval);
			        }
			    }, 1000);    
			  },
			  
			  animateFigure: function($el, value) {
			    
			     var that         = this,
					     $top         = $el.find('.top'),
			         $bottom      = $el.find('.bottom'),
			         $back_top    = $el.find('.top-back'),
			         $back_bottom = $el.find('.bottom-back');

			    // Before we begin, change the back value
			    $back_top.find('span').html(value);

			    // Also change the back bottom value
			    $back_bottom.find('span').html(value);

			    // Then animate
			    TweenMax.to($top, 0.8, {
			        rotationX           : '-180deg',
			        transformPerspective: 300,
				      ease                : Quart.easeOut,
			        onComplete          : function() {

			            $top.html(value);

			            $bottom.html(value);

			            TweenMax.set($top, { rotationX: 0 });
			        }
			    });

			    TweenMax.to($back_top, 0.8, { 
			        rotationX           : 0,
			        transformPerspective: 300,
				      ease                : Quart.easeOut, 
			        clearProps          : 'all' 
			    });    
			  },
			  
			  checkHour: function(value, $el_1, $el_2) {
			    
			    var val_1       = value.toString().charAt(0),
			        val_2       = value.toString().charAt(1),
			        fig_1_value = $el_1.find('.top').html(),
			        fig_2_value = $el_2.find('.top').html();

			    if(value >= 10) {

			        // Animate only if the figure has changed
			        if(fig_1_value !== val_1) this.animateFigure($el_1, val_1);
			        if(fig_2_value !== val_2) this.animateFigure($el_2, val_2);
			    }
			    else {

			        // If we are under 10, replace first figure with 0
			        if(fig_1_value !== '0') this.animateFigure($el_1, 0);
			        if(fig_2_value !== val_1) this.animateFigure($el_2, val_1);
			    }    
			  }
	};

	// Let's go !
	Countdown.init();

	// calendare
	var dateToday = new Date(); 

		$(function(){
			$('.calendare-in').datepicker({
				minDate: dateToday,
				inline: true,
				onSelect: date => {
		      $('.calendare').addClass('calendare__active')
		    }
			})
	})

	$('.calendare').on('click', function() {
		$(this).children('.datepicker-inline').slideToggle(300)
		$(this).toggleClass('calendare__active')
	})

})

// map plugin
document.addEventListener('DOMContentLoaded', function () {
	initApis();
})

var initApis = function initApis() {
  var loadApi = function loadApi() {
    if (this.id === 'map') {
      console.log('loading');
      var ym = document.createElement('script');
      ym.setAttribute('async', true);
      ym.src = 'libs/map.bundle.js';
      ym.addEventListener('load', function () {
        document.head.insertAdjacentHTML('beforeend', '<link rel="stylesheet" href="css/map.bundle.css">');
        yaMapRoute.build('#mapContainer', {
          share: {
            telegram: 'tg://resolve?domain=okyolo',
            viber: 'viber://chat?number=+79966066077',
            whatsapp: 'https://api.whatsapp.com/send?phone=79966066077&text=getlocation'
          }
        });
      });
      document.body.appendChild(ym);
    }
  };

  var observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      loadApi.call(entry.target);
      observer.unobserve(entry.target);
    });
  }, {
    rootMargin: "".concat(window.innerHeight * 2, "px 0px")
  });
  Array.prototype.forEach.call(document.querySelectorAll('#map'), function (container) {
    return observer.observe(container);
  });
};

// tabs
let tabsWrap = document.querySelectorAll('.tabs-wrap')
tabsWrap.forEach(item =>{
	let tabHead = [...item.querySelectorAll('.tab-head')]
	tabHead.forEach((item, index) =>{
		item.onclick = function(){
			let tabsWrap = this.closest('.tabs-wrap')
			if(!this.classList.contains('tab-head__active')){
				let tabHeadParent = this.parentElement
				let tabHeadActive = tabHeadParent.querySelector('.tab-head__active')
				tabHeadActive.classList.remove('tab-head__active')
				this.classList.add('tab-head__active')

				let tabBody = [...tabsWrap.querySelectorAll('.tab-body')]
				let tabBodyActive = tabsWrap.querySelector('.tab-body__active')
				tabBodyActive.classList.remove('tab-body__active')
				tabBody[index].classList.add('tab-body__active')
			}

			// add slick refresh to price block
			if(this.classList.contains('like_tab')){
	  		$('.price-slider').slick('refresh');
			}
		}
	})
})

// form btns
let formBtn = document.querySelectorAll('.memo-form_btn')
formBtn.forEach(item =>{
	item.onclick = function(){
		let formBtnParent = this.parentElement
		if(!this.classList.contains('memo-form_btn__active')){
			let formBtnActive = formBtnParent.querySelector('.memo-form_btn__active')
			formBtnActive.classList.remove('memo-form_btn__active')
			this.classList.add('memo-form_btn__active')
		}
		let massangerText = this.querySelector('span').innerText
		let massangerType = formBtnParent.querySelector('.massanger_type')
		massangerType.value = massangerText
	}
})

// game tabs
let gameTab = [...document.querySelectorAll('.game-right_item')]
let gameBody = [...document.querySelectorAll('.game-mid_item')]
gameTab.forEach((item, index) =>{
	item.onclick = function(){
		if(!this.classList.contains('game-right_item__active')){
			let gameTabActive = document.querySelector('.game-right_item__active')
			gameTabActive.classList.remove('game-right_item__active')
			this.classList.add('game-right_item__active')
			let gameBodyActive = document.querySelector('.game-mid_item__active')
			gameBodyActive.style.opacity = '0'
			setTimeout(function(){ 
			gameBodyActive.classList.remove('game-mid_item__active')
			gameBody[index].classList.add('game-mid_item__active')
			gameBody[index].style.opacity = '1'
			}, 250);

		}
	}
})

// link to-price tabs
let linkToPriceBall = document.querySelector('.main-item__ball')
let linkToPriceRest = document.querySelector('.main-item__rest')
let linkToPriceLazer = document.querySelector('.main-item__lazer')
let priceTabParrent = document.querySelector('.price-in')
let priceTab = [...priceTabParrent.querySelectorAll('.tab-head')]
let priceBody = [...priceTabParrent.querySelectorAll('.tab-body')]
let toPrice = function(a){
	let priceTabActive = priceTabParrent.querySelector('.tab-head__active')
	let priceBodyActive = priceTabParrent.querySelector('.tab-body__active')
	priceTabActive.classList.remove('tab-head__active')
	priceBodyActive.classList.remove('tab-body__active')
	priceTab[a].classList.add('tab-head__active')
	priceBody[a].classList.add('tab-body__active')
	$('.price-slider').slick('refresh');
}
linkToPriceLazer.onclick = function(){
	toPrice(0)
}
linkToPriceBall.onclick = function(){
	toPrice(1)
}
linkToPriceRest.onclick = function(){
	toPrice(2)
}

// maps dots
// let mapDots = [...document.querySelectorAll('.map-dots')]
// mapDots.forEach(item => {
// 	item.onclick = function(){
// 		let mapDotsDesc = this.querySelector('.map-dots_txt')
// 		mapDotsDesc.classList.add('map-dots_txt__active')
// 		setTimeout(function(){ mapDotsDesc.classList.remove('map-dots_txt__active')}, 2000);
// 	}
// })

// variant tabs
let variantHead = [...document.querySelectorAll('.variant-head')]
variantHead.forEach(item =>{
	item.onclick = function(){
		let variantHeadActive = document.querySelector('.variant-head__active')

		variantHeadActive.classList.remove('variant-head__active')
		this.classList.add('variant-head__active')
	}
})

