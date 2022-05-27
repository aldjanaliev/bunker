$(document).ready(function() {
	$('.slider').slick({
  	dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
    {
      breakpoint: 781,
      settings: {
        arrows: false,
        dots: true,
      }
    }]
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
	  asNavFor: '.variants-body-slider'
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
    autoplay: 5000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
 		cssEase: 'linear'
  });

	$('a[href^="#"').on('click', function() {
    let href = $(this).attr('href');
    $('html, body').animate({
        scrollTop: $(href).offset().top - 100
    });
    return false;
	});

	// gallery pagination
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
})



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
		}
	})
})

// form btns
let formBtn = document.querySelectorAll('.memo-form_btn')
formBtn.forEach(item =>{
	item.onclick = function(){
		if(!this.classList.contains('memo-form_btn__active')){
			let formBtnActive = document.querySelector('.memo-form_btn__active')
			formBtnActive.classList.remove('memo-form_btn__active')
			this.classList.add('memo-form_btn__active')
		}
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
let mapDots = [...document.querySelectorAll('.map-dots')]
mapDots.forEach(item => {
	item.onclick = function(){
		let mapDotsDesc = this.querySelector('.map-dots_txt')
		mapDotsDesc.classList.add('map-dots_txt__active')
		setTimeout(function(){ mapDotsDesc.classList.remove('map-dots_txt__active')}, 2000);
	}
})

// variant tabs
let variantHead = [...document.querySelectorAll('.variant-head')]
variantHead.forEach(item =>{
	item.onclick = function(){
		let variantHeadActive = document.querySelector('.variant-head__active')

		variantHeadActive.classList.remove('variant-head__active')
		this.classList.add('variant-head__active')
	}
})

