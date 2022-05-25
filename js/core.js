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
			gameBodyActive.classList.remove('game-mid_item__active')
			gameBody[index].classList.add('game-mid_item__active')
		}
	}
})

