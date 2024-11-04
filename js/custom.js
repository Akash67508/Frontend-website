(function() {
	'use strict';

	// Testimonial Slider with Enhanced Animations
	var enhancedTinySlider = function() {
		var el = document.querySelectorAll('.testimonial-slider');

		if (el.length > 0) {
			var slider = tns({
				container: '.testimonial-slider',
				items: 1,
				axis: "horizontal",
				controlsContainer: "#testimonial-nav",
				swipeAngle: false,
				speed: 700,
				nav: true,
				controls: true,
				autoplay: true,
				autoplayHoverPause: true,
				autoplayTimeout: 3500,
				autoplayButtonOutput: false,
				mode: "carousel",
				animateIn: "fadeIn",
				animateOut: "fadeOut"
			});
		}
	};
	enhancedTinySlider();


	var interactiveQuantityControls = function() {
		var quantityContainers = document.querySelectorAll('.quantity-container');

		quantityContainers.forEach(function(container) {
			var quantityAmount = container.querySelector('.quantity-amount');
			var increaseBtn = container.querySelector('.increase');
			var decreaseBtn = container.querySelector('.decrease');

			quantityAmount.setAttribute("aria-live", "polite");

			increaseBtn.addEventListener('click', function() {
				updateQuantity(quantityAmount, 1);
				increaseBtn.classList.add("active");
				setTimeout(() => increaseBtn.classList.remove("active"), 200);
			});

			decreaseBtn.addEventListener('click', function() {
				updateQuantity(quantityAmount, -1);
				decreaseBtn.classList.add("active");
				setTimeout(() => decreaseBtn.classList.remove("active"), 200);
			});

			increaseBtn.addEventListener("keydown", (e) => { if (e.key === "Enter") updateQuantity(quantityAmount, 1); });
			decreaseBtn.addEventListener("keydown", (e) => { if (e.key === "Enter") updateQuantity(quantityAmount, -1); });
		});

		function updateQuantity(element, delta) {
			let value = parseInt(element.value, 10);
			value = isNaN(value) ? 0 : value;
			value = Math.max(0, value + delta);  
			element.value = value;
			element.dispatchEvent(new Event('change')); 
		}
	};
	interactiveQuantityControls();

	var lazyLoadImages = function() {
		var lazyImages = document.querySelectorAll('.lazy');

		lazyImages.forEach(function(img) {
			const observer = new IntersectionObserver((entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						img.src = img.dataset.src;
						img.classList.add("loaded");
						observer.unobserve(img);
					}
				});
			}, { threshold: 0.5 });
			observer.observe(img);
		});
	};
	lazyLoadImages();

})();
