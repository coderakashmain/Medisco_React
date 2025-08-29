/* JavaScript Document */
jQuery(document).ready(function() {
	if(jQuery('.reviewtwo-slider').length > 0){
		var swiper = new Swiper(".reviewtwo-slider", {
		  slidesPerView: 3,
		  spaceBetween: 24,  
		  loop: true,
		  centeredSlides: true,
		  speed: 2000,
		  freeMode: true,
		  autoplay: {
			delay: 2000,
		  },
		  navigation: {
			  nextEl: ".swiper-button-next",
			  prevEl: ".swiper-button-prev",
			},
			breakpoints: {
			10: {
			  slidesPerView: 1,
			}, 
			556: {
				slidesPerView: 2,
			  spaceBetween: 20,
			},  
			992: {
			  slidesPerView: 2,
			},  
			1200: {
			  slidesPerView: 3,
			},
		  },
		});
	}

	if(jQuery('.dental-project-slide').length > 0){
		var swiper = new Swiper(".dental-project-slide", {
			slidesPerView: 3,
			spaceBetween: 22,
			loop: true,
			speed: 1000,
			freeMode: true,
			autoplay: {
			  delay: 2000,
			},
			navigation: {
			  nextEl: ".swiper-button-next",
			  prevEl: ".swiper-button-prev",
			},
			breakpoints: {
			  10: {
				slidesPerView: 1,
			  }, 
			  992: {
				slidesPerView: 2,
			  },
			  1200: {
				slidesPerView: 3,
			  },
			},
		}); 
	}
	
	if(jQuery('.image-slider').length > 0){
			var swiper = new Swiper(".image-slider", {
			slidesPerView: 1,
			spaceBetween: 0,  
			loop: true,
			speed: 1000,
			freeMode: true,
			autoplay: {
				delay: 2000,
			},
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
			}, 
		}); 
	}

	
	if(jQuery('.swiper-review-two-img').length > 0){
		var swiperReview = new Swiper(".swiper-review-two-img", {
		  spaceBetween: 10,
		  slidesPerView: 3,
		  freeMode: true,
		  direction: "vertical",
		  watchSlidesProgress: true,
		});
		var swiper2 = new Swiper(".swiper-review-two", {
				  spaceBetween: 10,
				  pagination: {
					el: ".swiper-pagination",
					clickable: true,
				  },
				  thumbs: {
					swiper: swiperReview,
				  },
		});
	}
	

	if(jQuery('.services-slider').length > 0){
	   var swiper = new Swiper(".services-slider", {
		  slidesPerView: 4,
		  spaceBetween: 0,  
		  loop: true,
		  speed: 1000,
		  freeMode: true,
		  autoplay: {
			delay: 2000,
		  },
		  navigation: {
			  nextEl: ".services-swiper-button-next",
			  prevEl: ".services-swiper-button-prev",
			},
			breakpoints: {
			10: {
			  slidesPerView: 1,
			}, 
			575: {
			  slidesPerView: 1,
			},
			
			768: {
			  slidesPerView: 2,
			},
			
			992: {
			  slidesPerView: 3,
			},
			1200: {
			  slidesPerView: 4,
			},
		  },
		}); 
	}
		
	if(jQuery('.review-slider').length > 0){
		var swiper = new Swiper(".review-slider", {
		  slidesPerView: 2,
		  spaceBetween: 160,  
		  loop: true,
		  speed: 1000,
		  freeMode: true,
		  autoplay: {
			delay: 2000,
		  },
		  navigation: {
			  nextEl: ".swiper-button-next",
			  prevEl: ".swiper-button-prev",
			},
			breakpoints: {
			10: {
			  slidesPerView: 1,
			},  
			992: {
			  slidesPerView: 2,
			},
		  },
		});	
	}

	if(jQuery('.brand-slide').length > 0){
		var swiper = new Swiper(".brand-slide", {
			slidesPerView: 4,
			spaceBetween: 30,
			loop: true,
			speed: 1000,
			freeMode: true,
			autoplay: {
			  delay: 2000,
			},
			breakpoints: {
			  10: {
				slidesPerView: 2,
			  },
			  480: {
				slidesPerView: 2,
			  },
			  768: {
				slidesPerView: 3,
			  },
			  992: {
				slidesPerView: 4,
			  },
			  1200: {
				slidesPerView: 6,
			  },
			},
		}); 
	}		

	
});	
	
/* Document .ready END */