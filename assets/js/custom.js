$(function () {

    // Header Scroll
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 60) {
            $("header").addClass("fixed-header");
        } else {
            $("header").removeClass("fixed-header");
        }
    });


    // Featured Owl Carousel
    $('.featured-projects-slider .owl-carousel').owlCarousel({
        center: true,
        loop: true,
        margin: 30,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    })


    // Count
    $('.count').each(function () {
		$(this).prop('Counter', 0).animate({
			Counter: $(this).text()
		}, {
			duration: 1000,
			easing: 'swing',
			step: function (now) {
				$(this).text(Math.ceil(now));
			}
		});
	});


    // ScrollToTop
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const btn = document.getElementById("scrollToTopBtn");
    btn.addEventListener("click", scrollToTop);

    window.onscroll = function () {
        const btn = document.getElementById("scrollToTopBtn");
        if (document.documentElement.scrollTop > 100 || document.body.scrollTop > 100) {
            btn.style.display = "flex";
        } else {
            btn.style.display = "none";
        }
    };


    // Aos
	AOS.init({
		once: true,
	});

    // Video lazy loading - Load video after everything else
    const heroVideo = document.getElementById('hero-video');
    if (heroVideo) {
        window.addEventListener('load', function() {
            heroVideo.setAttribute('preload', 'auto');
            heroVideo.load();
            heroVideo.play().catch(error => {
                // Silently handle cases where autoplay might be blocked
                console.log("Video auto-play handled after page load.");
            });
        });
    }

    // Services Section Scroll Lock & Tab Switcher (Desktop Only)
    if (window.matchMedia("(min-width: 1024px)").matches) {
        const servicesSection = document.getElementById('services');
        const tabButtons = [
            document.getElementById('one-tab'),
            document.getElementById('two-tab'),
            document.getElementById('three-tab'),
            document.getElementById('four-tab')
        ];
        
        let currentTabIndex = 0;
        let isServicesInView = false;
        let lastTabChange = 0;
        const cooldown = 600; // ms
        let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Keep local tab index in sync if user clicks manually
        tabButtons.forEach((btn, index) => {
            if (btn) {
                btn.addEventListener('shown.bs.tab', () => {
                    currentTabIndex = index;
                });
            }
        });

        // Intersection Observer to detect when Services section is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isServicesInView = entry.isIntersecting;
            });
        }, {
            threshold: 0.35
        });

        if (servicesSection) {
            observer.observe(servicesSection);
        }

        // Listen to wheel events to lock scroll and cycle tabs
        window.addEventListener('wheel', function (e) {
            if (!isServicesInView || !servicesSection) return;

            const rect = servicesSection.getBoundingClientRect();
            const now = Date.now();
            const isScrollingDown = e.deltaY > 0;
            const isScrollingUp = e.deltaY < 0;

            // Check if top of services is aligned near viewport top (within 80px)
            const isAligned = rect.top >= -80 && rect.top <= 80;

            if (isAligned) {
                if (isScrollingDown && currentTabIndex < 3) {
                    e.preventDefault();
                    if (now - lastTabChange > cooldown) {
                        currentTabIndex++;
                        const tab = new bootstrap.Tab(tabButtons[currentTabIndex]);
                        tab.show();
                        lastTabChange = now;
                    }
                } else if (isScrollingUp && currentTabIndex > 0) {
                    e.preventDefault();
                    if (now - lastTabChange > cooldown) {
                        currentTabIndex--;
                        const tab = new bootstrap.Tab(tabButtons[currentTabIndex]);
                        tab.show();
                        lastTabChange = now;
                    }
                }
            } else {
                // If not aligned, but close, snap it
                if (rect.top > 0 && rect.top < window.innerHeight * 0.3 && isScrollingDown) {
                    e.preventDefault();
                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }, { passive: false });

        // Scroll listener to reset tabs upon entry direction
        window.addEventListener('scroll', () => {
            if (!servicesSection) return;
            const rect = servicesSection.getBoundingClientRect();
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const isScrollingDown = currentScrollTop > lastScrollTop;

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                // Scrolled down into section from above
                if (rect.top > 0 && rect.top < window.innerHeight && isScrollingDown && currentTabIndex !== 0) {
                    if (rect.top > window.innerHeight * 0.5) {
                        currentTabIndex = 0;
                        const tab = new bootstrap.Tab(tabButtons[0]);
                        tab.show();
                    }
                }
                // Scrolled up into section from below
                if (rect.bottom > 0 && rect.bottom < window.innerHeight && !isScrollingDown && currentTabIndex !== 3) {
                    if (rect.bottom < window.innerHeight * 0.5) {
                        currentTabIndex = 3;
                        const tab = new bootstrap.Tab(tabButtons[3]);
                        tab.show();
                    }
                }
            }
            lastScrollTop = currentScrollTop;
        });
    }

});

