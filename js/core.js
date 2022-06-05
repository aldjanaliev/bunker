$(document).ready(function() {
	$('.slider').slick({
  	dots: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '10px',
    responsive: [
    {
      breakpoint: 781,
      settings: {
    		slidesToShow: 1,
      }
    }]
  });

	$('.letter-slider').slick({
  	dots: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '10px',
    responsive: [
    {
      breakpoint: 781,
      settings: {
    		slidesToShow: 1,
        arrows: true,
        dots: false,
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
	  asNavFor: '.variants-heads',
	   responsive: [
    {
      breakpoint: 780,
      settings: {
    		infinite: true,
      }
    }]
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
    },
    ]
  });

  $('.game-right-slider').slick({
    infinite: false,
    slidesToShow: 7,
    slidesToScroll: 1,
    vertical: true,
    arrows: false,
    dots: false,
    focusOnSelect: true,
    asNavFor: '.game-mid-slider',
    responsive: [
    {
    	breakpoint: 780,
    	settings: {
    		infinite: true,
    		focusOnSelect: true,
   			vertical: false,
    		variableWidth: true,
    		slidesToShow: 1,
    	}
    }]
  });
  $('.game-mid-slider').slick({
	  slidesToShow: 1,
	  slidesToScroll: 1,
    infinite: false,
	  arrows: false,
	  fade: true,
    draggable: false,
	  asNavFor: '.game-right-slider',
	  responsive: [
    {
    	breakpoint: 780,
    	settings: {
    		infinite: true,
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
    swipe: false
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
    },{
      breakpoint: 780,
      settings: {
    		slidesToShow: 1,
        arrows: true,
        dots: false,
      }
    }]
  });
  

  // modal_choose-time
	let modalChooseNow = document.querySelector('.modal_choose-now')
	let modalChooseParrent = modalChooseNow.closest('.form')
	let modalChooseLeter = document.querySelector('.modal_choose-leter')
	let modalChooseInput = document.querySelector('.modal_choose-input')
	modalChooseNow.onclick = function(){
		modalChooseLeter.classList.remove('modal_choose-time__active')
		this.classList.add('modal_choose-time__active')
		modalChooseInput.disabled = true
		modalChooseInput.style.display = 'none'
		modalChooseParrent.setAttribute('data-thanks','to-callback-now')
	}
	modalChooseLeter.onclick = function(){
		modalChooseParrent.setAttribute('data-thanks','to-callback')
		modalChooseNow.classList.remove('modal_choose-time__active')
		this.classList.add('modal_choose-time__active')
		modalChooseInput.style.display = 'block'
		modalChooseInput.disabled = false
		modalChooseInput.focus()
	}


	$('.scroll-btn').on('click', function() {
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
		let galleryArrow = [...galleryParrent.querySelectorAll('.slick-arrow')]
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

	// number validation 
	let selector = document.querySelectorAll('input[type="tel"]');
	let im = new Inputmask('+7 (999) 999-99-99');
	im.mask(selector);

	$('.main-ic__open').on('click', function(){
		$(this).toggleClass('main-ic__active')
		$('.main-ic').slideToggle(150)
	})

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
			let thisParrentModal = $(this).closest('.modal')
			let thisParrent = $(this).closest('.form_select')
			thisParrent.find('.form_select-tab__active').removeClass('form_select-tab__active')
			$(this).addClass('form_select-tab__active')
			let thisTetxt = $(this).html()

			let selectForChange = thisParrent.find('.form_select-btn-txt')
			let inputForChange = selectForChange.next('input')
			selectForChange.html(thisTetxt)
			let txtForChange = selectForChange.text()
			// txtForChange = txtForChange.replace(/\s{2,}/g, ' ')
			if(thisTetxt.length > 30){
				let txtForChange = $(this).find('.select-flex_top').text()
				inputForChange.val(txtForChange)
			} else{
				inputForChange.val(txtForChange)
			}
			console.log(inputForChange.attr('name') + ' ---- ' + inputForChange.val())

			thisParrent.find('.form_select-btn').css({'color':'#000'})
			thisParrent.find('.form_select-body').slideUp(500)
			thisParrent.find('.form_select-btn').removeClass('form_select-btn__active')

			// select by attr
			if($(this).hasClass('select-choose')){
				let selectAttr = $(this).attr('data-choose')
				if($(this).hasClass('select-kind')){
					$('.form_select-btn-txt__btn').html('Выбрать тариф')
					$('.select-tarif').css({'display':'none'})
				}
				$('[data-item = "' + selectAttr + '"]').css({'display':'block'})
				$('.form_select__passive').removeClass('form_select__passive')
			}

			if($(this).hasClass('form_select-tab__input-wrap')){
				$('.form_select-tab__input')[0].focus()
			}

			// ====== регулируем количество вводимых игроков =========
			if($(this).attr('data-col')){
				thisParrentModal.find('.form_select-col__passive').removeClass('form_select-col__passive')
				thisParrentModal.find('.hide-10').css({'display':'block'})
				thisParrentModal.find('.hide-8').css({'display':'block'})
				thisParrentModal.find('.hide-6').css({'display':'block'})
				thisParrentModal.find('.form_select-btn-col').html('Выбрать количество')
				$('.select-num').find('.form_select-tab__active').removeClass('form_select-tab__active')
				if($(this).attr('data-col') == '10'){
					thisParrentModal.find('.hide-10').css({'display':'none'})
				} else if($(this).attr('data-col') == '8'){
					thisParrentModal.find('.hide-8').css({'display':'none'})
				} else if($(this).attr('data-col') == '6'){
					thisParrentModal.find('.hide-6').css({'display':'none'})
				}
			} else if($(this).attr('data-time')){
				thisParrentModal.find('.form_select-btn__add').addClass('form_select-col__passive')
				var multiplyPrice = $('.form_select-tab__active[data-time]').attr('data-time')
				thisParrentModal.find('.form-right_txt').html(multiplyPrice + ' руб./час')
				$('.sertificate-input').val(multiplyPrice + ' руб./час')
				console.log($('.sertificate-input').val())
			} else if($(this).attr('data-rent')){
				thisParrentModal.find('.form_select-btn__add').addClass('form_select-col__passive')
			}

			// ========= выводим стоимость сертификата =========
			if($(this).hasClass('multiply')){
				var multiplyPrice = $('.form_select-tab__active[data-price]').attr('data-price')
				multiplyPrice = multiplyPrice * +$(this).text()
				thisParrentModal.find('.form-right_txt').html(multiplyPrice + ' руб.')
				$('.sertificate-input').val(multiplyPrice + ' руб./час')
				console.log($('.sertificate-input').val())
			}

			if($(this).attr('data-price')){
				thisParrentModal.find('.form-right_txt').html('количество человек × стоимость тарифа')
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

	// init timer in bonus modal after click btn
	let modalBonusIc = document.querySelector('.main-ic__bonus')
	modalBonusIc.onclick = function(){
		Countdown.init();
	}
	// modal-bonus
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

			            // if(that.values.minutes >= 0 && that.values.seconds < 0) {
			            if(that.values.minutes > 0 && that.values.seconds < 0) {

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

// =========== add numbers to form_select__num ==========
let addNum = function(){
	let addAfter = [...document.querySelectorAll('.form_select-tab__add')]
	addAfter.forEach(item => {
		let addTxt = ''
		for(let i = 11; i < 76; i++){
			addTxt = addTxt + `<span class="form_select-tab multiply">${i}</span>`
		}
		item.insertAdjacentHTML('afterend', addTxt)
	})
}

let toThanksModal = function(form){
	let dataToSend = '.' + form.getAttribute('data-thanks')
	let openThanksModal = document.querySelector(dataToSend)
	if(form.classList.contains('form-static')){
		openThanksModal.click()
	} else if(form.classList.contains('form-bonus')){
		let bonusModal = document.querySelector('#modal-bonus')
		let toThanksClose = bonusModal.querySelector('.fancybox-button')
		toThanksClose.click()
		let modalBonusIc = document.querySelector('.main-ic__bonus')
		modalBonusIc.remove()
		bonusModal.remove()
		openThanksModal.click()
	} else{
		let toThanksParrent = form.closest('.modal')
		let toThanksClose = toThanksParrent.querySelector('.fancybox-button')
		toThanksClose.click()
		openThanksModal.click()
	}
}

// map plugin
document.addEventListener('DOMContentLoaded', function () {
	initApis();
	addNum();

	// adding files in form
	let formImage = document.querySelector('.form_file-input')
		let fileInputText = document.querySelector('.form_select-file-txt')
		formImage.addEventListener('change', () =>{
			let formImageFiles = formImage.files[0]
			fileInputText.innerText = formImageFiles.name
			formImage.classList.add('file-upload')
			console.log(formImageFiles.name)
		})

	// ============== validate and sending form ==============
	const form = [...document.querySelectorAll('form')]
	form.forEach(item =>{
		item.addEventListener('submit', formSend)
		async function formSend(e){
			e.preventDefault()
			let error = formValidate(this)
			let formData = new FormData(this)
			if(document.querySelector('.file-upload')){
				formData.append('file', formImage.files[0])
			}
			if(error === 0){
				this.classList.add('_sending')
				toThanksModal(item)
				let response = await fetch('send.php',{
					method: 'POSt',
					body: formData
				})
				if(response.ok){
					let result = await response.json()
					console.log(result.message)
					fileInputText.innerHTML = ''
					form.reset()
				} else{
					console.log('error message')
				}
			} else{
				console.log('not valid ' + error)
			}
		}
	})

	function formValidate(form) {
		let error = 0
		let formReq = form.querySelectorAll('._req')
		for(let index = 0; index < formReq.length; index++){
			const input = formReq[index]
			formRemoveError(input)
			if(input.classList.contains('_mail')){
				if(emailTest(input)){
					formAddError(input)
					error++
				}
			} else if(input.getAttribute("type") == "checkbox" && input.checked == false){
				formAddError(input)
				error++
			} else if(input.getAttribute("type") == "tel" && input.value != ''){
				if(telTest(input)){
					formAddError(input)
					console.log()
					error++
				}
			} else{
				if(input.value.length < 2){
					formAddError(input)
					error++
				}
			}
		}
		return error
	}


	// checked input
	let errorInputs = [...document.querySelectorAll('._req')]
	errorInputs.forEach(item =>{
		item.oninput = function(){
			if(this.classList.contains('_error')){
				if(this.classList.contains('_mail')){
					if(!emailTest(this)){
						this.classList.remove('_error')
					}
				} else if(this.classList.contains('detail_input__tel')){
					if(!this.value.includes('_')){
						this.classList.remove('_error')
					}
					
				} else{
					if(!this.value == ''){
						this.classList.remove('_error')
					}
				}
			} else if(this.classList.contains('detail_input__tel')){
				if(this.value.includes('_')){
					this.classList.add('_error')
				}
			}
		}
	})

	function formAddError(input){
		if(input.classList.contains('ch-box')){
			input.parentElement.classList.add('_error')
		} else{
			input.classList.add('_error')
		}
	}
	function formRemoveError(input){
		if(input.classList.contains('ch-box')){
			input.parentElement.classList.remove('_error')
		} else{
			input.classList.remove('_error')
		}
	}
	// check mail
	function emailTest(input){
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
	}
	// check tel
	function telTest(input){
		return /_/.test(input.value)
	}
		
	// ============== /validate and sending form ==============
})

// added Yandex Map API
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

			// add slick refresh on tab
			if(this.classList.contains('game-tab-slider')){
		    $('.coach-slider').slick('refresh');
		  };
		  if(this.classList.contains('game-tab-slick')){
		    $('.game-mid-slider').slick('refresh');
		    $('.game-right-slider').slick('refresh');
		  };
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
// let gameTab = [...document.querySelectorAll('.game-right_item')]
// let gameBody = [...document.querySelectorAll('.game-mid_item')]
// gameTab.forEach((item, index) =>{
// 	item.onclick = function(){
// 		if(!this.classList.contains('game-right_item__active')){
// 			let gameTabActive = document.querySelector('.game-right_item__active')
// 			gameTabActive.classList.remove('game-right_item__active')
// 			this.classList.add('game-right_item__active')
// 			let gameBodyActive = document.querySelector('.game-mid_item__active')
// 			gameBodyActive.style.opacity = '0'
// 			setTimeout(function(){ 
// 			gameBodyActive.classList.remove('game-mid_item__active')
// 			gameBody[index].classList.add('game-mid_item__active')
// 			gameBody[index].style.opacity = '1'
// 			}, 250);
// 		}
// 	}
// })

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

// variant tabs
let variantHead = [...document.querySelectorAll('.variant-head')]
variantHead.forEach(item =>{
	item.onclick = function(){
		let variantHeadActive = document.querySelector('.variant-head__active')

		variantHeadActive.classList.remove('variant-head__active')
		this.classList.add('variant-head__active')
	}
})


// create modals for variants block
let btnMeet = [...document.querySelectorAll('.btn-meet')]
let inputMeetValue = document.querySelector('.input-meet')
let titleMeetText = document.querySelector('.tilte-meet')
btnMeet.forEach(item => {
	item.onclick = function(){
		if(this.getAttribute('data-meet') == 'big-birthday'){
			inputMeetValue.value = 'взрослый день рождения'
			titleMeetText.innerHTML = 'взрослый день рождения'
		} else if(this.getAttribute('data-meet') == 'sm-birthday'){
			inputMeetValue.value = 'детский день рождения'
			titleMeetText.innerHTML = 'детский день рождения'
		} else if(this.getAttribute('data-meet') == 'corporation'){
			inputMeetValue.value = 'корпоратив'
			titleMeetText.innerHTML = 'корпоратив'
		} else if(this.getAttribute('data-meet') == 'boys'){
			inputMeetValue.value = 'мальчишник'
			titleMeetText.innerHTML = 'мальчишник'
		} else if(this.getAttribute('data-meet') == 'friends'){
			inputMeetValue.value = 'игру с друзьями'
			titleMeetText.innerHTML = 'игру с друзьями'
		} else if(this.getAttribute('data-meet') == 'game'){
			inputMeetValue.value = 'своё мероприятие'
			titleMeetText.innerHTML = 'игру'
		}
		console.log(inputMeetValue.value)
	}
})

// create modals for price block
let btnOrder = [...document.querySelectorAll('.btn-order')]
let inputOrderValue = document.querySelector('.input-order')
let titleText = document.querySelector('.input-order_title')
btnOrder.forEach(item => {
	item.onclick = function(){
		switch(this.getAttribute('data-order')){
			case '1':
				inputOrderValue.value = 'игра Лазартаг, тариф Отделение'
				titleText.innerHTML = 'игры "Лазартаг" по тарифу "Отделение"'
				break;
			case '2':
				inputOrderValue.value = 'игра Лазартаг, тариф Взвод'
				titleText.innerHTML = 'игры "Лазартаг" по тарифу "Взвод"'
				break;
			case '3':
				inputOrderValue.value = 'игра Лазартаг, тариф Рота'
				titleText.innerHTML = 'игры "Лазартаг" по тарифу "Рота"'
				break;
			case '4':
				inputOrderValue.value = 'игра Лазартаг, тариф Батальон'
				titleText.innerHTML = 'игры "Лазартаг" по тарифу "Батальон"'
				break;
			case '5':
				inputOrderValue.value = 'игра Пейнтбол, тариф Боец'
				titleText.innerHTML = 'игры "Пейнтбол" по тарифу "Боец"'
				break;
			case '6':
				inputOrderValue.value = 'игра Пейнтбол, тариф Рекрут'
				titleText.innerHTML = 'игры "Пейнтбол" по тарифу "Рекрут"'
				break;
			case '7':
				inputOrderValue.value = 'игра Пейнтбол, тариф Рекрут расширенный'
				titleText.innerHTML = 'игры "Пейнтбол" по тарифу "Рекрут расширенный"'
				break;
			case '8':
				inputOrderValue.value = 'игра Пейнтбол, тариф Ветеран'
				titleText.innerHTML = 'игры "Пейнтбол" по тарифу "Ветеран"'
				break;
			case '9':
				inputOrderValue.value = 'зона отдыха, тариф "Банкетный зал мини"'
				titleText.innerHTML = 'зоны отдыха по тарифу "Банкетный зал мини"'
				break;
			case '10':
				inputOrderValue.value = 'зона отдыха, тариф "Банкетный зал макси"'
				titleText.innerHTML = 'зоны отдыха по тарифу "Банкетный зал макси"'
				break;
			case '11':
				inputOrderValue.value = 'обучение , тариф "Боец+"'
				titleText.innerHTML = '"Обучение" по тарифу "Боец+"'
				break;
			case '12':
				inputOrderValue.value = 'обучение , тариф "Команда+"'
				titleText.innerHTML = '"Обучение" по тарифу "Команда+"'
				break;
			case '13':
				inputOrderValue.value = 'обучение , тариф "Рекрут+"'
				titleText.innerHTML = '"Обучение" по тарифу "Рекрут+"'
				break;
		}
	}
})

// create review-modals for like block
let btnReview = [...document.querySelectorAll('.btn-review')]
let reviewImg = document.querySelector('.modal-coach-img')
let reviewImgSm = document.querySelector('.modal-coach-img-sm')
let reviewName = document.querySelector('.modal-coach_name')
let reviewUserImg = [...document.querySelectorAll('.modal-user-img')]
let reviewUserName = [...document.querySelectorAll('.modal-coach_user-name')]
let reviewDate = [...document.querySelectorAll('.modal-coach_date')]
let reviewText = [...document.querySelectorAll('.modal-coach_txt')]
let coachBtn = document.querySelector('.coach-btn')
btnReview.forEach(item => {
	item.onclick = function(){
		switch(this.getAttribute('data-coach')){
			case 'albert':
				reviewImg.setAttribute('src', 'img/like/coach-rev-1.png')
				reviewImgSm.setAttribute('src', 'img/mobile/coach-rev-1.png')
				reviewName.innerText = 'Альберт “гром”'
				reviewUserImg[0].setAttribute('src', 'img/like/coach-review.jpg')
				reviewUserName[0].innerText = 'Александр Александрович'
				reviewDate[0].innerText = 'февраль 2022'
				reviewText[0].innerText = 'Альберт “гром” Альберт “гром” Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Ipsum рот большого, рыбными рукопись даже вскоре своих взобравшись толку, что журчит буквоград подзаголовок рекламных раз одна переписали живет себя использовало курсивных подпоясал единственное рыбного, дорогу, маленький языкового запятой. Большой пояс своего переписывается, продолжил грамматики они, своих не его встретил решила которое если свой образ ее заманивший грустный ведущими осталось!'
				reviewUserImg[1].setAttribute('src', 'img/like/coach-review-4.jpg')
				reviewUserName[1].innerText = 'Наташа Саева'
				reviewDate[1].innerText = 'март 2022'
				reviewText[1].innerText = 'Альберт “гром” Альберт “гром” Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Ipsum рот большого, рыбными рукопись даже вскоре своих взобравшись толку, что журчит буквоград подзаголовок рекламных раз одна переписали живет себя использовало курсивных подпоясал единственное рыбного, дорогу, маленький языкового запятой. Большой пояс своего переписывается, продолжил грамматики они, своих не его встретил решила которое если свой образ ее заманивший грустный ведущими осталось!'
				coachBtn.setAttribute('data-coach-review','1')
				break;
			case 'gora':
				reviewImg.setAttribute('src', 'img/like/coach-rev-2.png')
				reviewImgSm.setAttribute('src', 'img/mobile/coach-rev-2.png')
				reviewName.innerText = 'Григорий'
				reviewUserImg[0].setAttribute('src', 'img/like/coach-review-2.jpg')
				reviewUserName[0].innerText = 'Павел Дуров'
				reviewDate[0].innerText = 'май 2021'
				reviewText[0].innerText = 'Григорий Григорий Григорий Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языкового но там раз прямо реторический текст от всех вопрос жаренные подпоясал одна маленькая то правилами он дорогу агентство проектах путь, ее языком первую пунктуация! Силуэт единственное имени даже, знаках подпоясал рекламных ручеек своего рыбного, предупредила мир сих толку, моей себя.'
				reviewUserImg[1].setAttribute('src', 'img/like/coach-review-3.jpg')
				reviewUserName[1].innerText = 'Михаил Сергеев'
				reviewDate[1].innerText = 'июль 2022'
				reviewText[1].innerText = 'Григорий Григорий Григорий Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Ipsum рот большого, рыбными рукопись даже вскоре своих взобравшись толку, что журчит буквоград подзаголовок рекламных раз одна переписали живет себя использовало курсивных подпоясал единственное рыбного, дорогу, маленький языкового запятой. Большой пояс своего переписывается, продолжил грамматики они, своих не его встретил решила которое если свой образ ее заманивший грустный ведущими осталось!'
				coachBtn.setAttribute('data-coach-review','2')
				break;
			case 'poli':
				reviewImg.setAttribute('src', 'img/like/coach-rev-3.png')
				reviewImgSm.setAttribute('src', 'img/mobile/coach-rev-3.png')
				reviewName.innerText = 'Полина'
				reviewUserImg[0].setAttribute('src', 'img/like/coach-review-4.jpg')
				reviewUserName[0].innerText = 'Юля Иванова'
				reviewDate[0].innerText = 'август 2022'
				reviewText[0].innerText = 'Полина Полина Полина Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Ipsum рот большого, рыбными рукопись даже вскоре своих взобравшись толку, что журчит буквоград подзаголовок рекламных раз одна переписали живет себя использовало курсивных подпоясал единственное рыбного, дорогу, маленький языкового запятой. Большой пояс своего переписывается, продолжил грамматики они, своих не его встретил решила которое если свой образ ее заманивший грустный ведущими осталось!'
				reviewUserImg[1].setAttribute('src', 'img/like/coach-review-3.jpg')
				reviewUserName[1].innerText = 'Денис Крымов'
				reviewDate[1].innerText = 'сентябрь 2021'
				reviewText[1].innerText = 'Полина Полина Полина Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Ipsum рот большого, рыбными рукопись даже вскоре своих взобравшись толку, что журчит буквоград подзаголовок рекламных раз одна переписали живет себя использовало курсивных подпоясал единственное рыбного, дорогу, маленький языкового запятой. Большой пояс своего переписывается, продолжил грамматики они, своих не его встретил решила которое если свой образ ее заманивший грустный ведущими осталось!'
				coachBtn.setAttribute('data-coach-review','3')
				break;
			case 'alex':
				reviewImg.setAttribute('src', 'img/like/coach-rev-4.png')
				reviewImgSm.setAttribute('src', 'img/mobile/coach-rev-4.png')
				reviewName.innerText = 'Александр'
				reviewUserImg[0].setAttribute('src', 'img/like/coach-review.jpg')
				reviewUserName[0].innerText = 'Джонни Деп'
				reviewDate[0].innerText = 'февраль 2022'
				reviewText[0].innerText = 'Александр Александр Александр Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Ipsum рот большого, рыбными рукопись даже вскоре своих взобравшись толку, что журчит буквоград подзаголовок рекламных раз одна переписали живет себя использовало курсивных подпоясал единственное рыбного, дорогу, маленький языкового запятой. Большой пояс своего переписывается, продолжил грамматики они, своих не его встретил решила которое если свой образ ее заманивший грустный ведущими осталось!'
				reviewUserImg[1].setAttribute('src', 'img/like/coach-review-2.jpg')
				reviewUserName[1].innerText = 'Иван Серебряников'
				reviewDate[1].innerText = 'апрель 2022'
				reviewText[1].innerText = 'Александр Александр АлександрДалеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Ipsum рот большого, рыбными рукопись даже вскоре своих взобравшись толку, что журчит буквоград подзаголовок рекламных раз одна переписали живет себя использовало курсивных подпоясал единственное рыбного, дорогу, маленький языкового запятой. Большой пояс своего переписывается, продолжил грамматики они, своих не его встретил решила которое если свой образ ее заманивший грустный ведущими осталось!'
				coachBtn.setAttribute('data-coach-review','4')
				break;
		}
	}
})

let reviewToSendTitle = document.querySelector('.review-title')
coachBtn.onclick = function(){
	switch(this.getAttribute('data-coach-review')){
		case '1':
			reviewToSendTitle.value = 'Альберта'
			break
		case '2':
			reviewToSendTitle.value = 'Григория'
			break
		case '3':
			reviewToSendTitle.value = 'Полины'
			break
		case '4':
			reviewToSendTitle.value = 'Александра'
			break
	}
	let modalCoach = document.querySelector('.modal-coach')
	modalCoachBtn = modalCoach.querySelector('.fancybox-button')
	modalCoachBtn.click()
	console.log(reviewToSendTitle.getAttribute('name') + ' ' + reviewToSendTitle.value)
}