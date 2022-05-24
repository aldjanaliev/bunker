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