document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById('loader');

    gsap.registerPlugin(ScrollTrigger);

    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            playHeroAnimations();
        }, 500);
    }, 500);

    function playHeroAnimations() {
        const tl = gsap.timeline();

        tl.to('.subtitle', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
            .to('.title', { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, '-=0.5')
            .to('.description', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.8')
            .to('.cta-button', { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.5');

        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                "particles": {
                    "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                    "color": { "value": "#d4af37" },
                    "shape": { "type": "circle" },
                    "opacity": {
                        "value": 0.5,
                        "random": true,
                        "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#d4af37",
                        "opacity": 0.2,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": true,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": { "enable": true, "mode": "repulse" },
                        "onclick": { "enable": true, "mode": "push" },
                        "resize": true
                    },
                    "modes": {
                        "repulse": { "distance": 100, "duration": 0.4 },
                        "push": { "particles_nb": 4 }
                    }
                },
                "retina_detect": true
            });
        }
    }
    
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach((item, index) => {
        const xDir = item.classList.contains('left') ? -50 : 50;

        gsap.fromTo(item,
            { opacity: 0, x: xDir },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    const prints = document.querySelectorAll('.print');
    if (prints.length > 0) {
        gsap.to(prints, {
            scrollTrigger: {
                trigger: '#legacy',
                start: 'top 60%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            x: -20,
            duration: 0.8,
            stagger: {
                each: 0.5,
                repeat: -1,
                repeatDelay: 1,
                yoyo: true
            }
        });

        const mwTimeline = gsap.timeline({ repeat: -1, repeatDelay: 1, scrollTrigger: { trigger: '#legacy', start: 'top 70%' } });

        prints.forEach((print) => {
            mwTimeline.to(print, { opacity: 1, x: 0, duration: 0.5, ease: "power1.out" })
                .to(print, { opacity: 0, duration: 0.5, delay: 1 });
        });
        mwTimeline.clear();
        mwTimeline.set(prints, { opacity: 0, x: 50 });

        prints.forEach((print, i) => {
            mwTimeline.to(print, {
                opacity: 1,
                x: 0,
                duration: 0.6,
                ease: "power2.out"
            }, `+=${i * 0.2}`);
        });

        mwTimeline.to(prints, { opacity: 0, duration: 0.5, delay: 0.5 });
    }

    const statsSection = document.querySelector('#stats');
    if (statsSection) {
        ScrollTrigger.create({
            trigger: "#stats",
            start: "top 75%",
            once: true,
            onEnter: () => {
                const counters = document.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000; // ms
                    const stepTime = Math.abs(Math.floor(duration / target));

                    let current = 0;
                    const timer = setInterval(() => {
                        current += Math.ceil(target / 50);
                        if (current > target) current = target;
                        counter.innerText = current + (target >= 750 ? 'M+' : '');
                        if (current == target) {
                            clearInterval(timer);
                        }
                    }, 40);
                });
            }
        });
    }

    const quotes = document.querySelectorAll('.quote');
    let currentQuote = 0;

    if (quotes.length > 0) {
        function showNextQuote() {
            const nextQuote = (currentQuote + 1) % quotes.length;

            gsap.set(quotes[nextQuote], { opacity: 0, y: 20 });
            quotes[nextQuote].classList.add('active');

            gsap.to(quotes[currentQuote], {
                opacity: 0,
                y: -20,
                duration: 1,
                onComplete: () => {
                    quotes[currentQuote].classList.remove('active');
                    currentQuote = nextQuote;
                }
            });

            gsap.to(quotes[nextQuote], {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.2
            });
        }

        setInterval(showNextQuote, 5000);
    }


    gsap.from('.album-card', {
        scrollTrigger: {
            trigger: '.albums-grid',
            start: 'top 75%',
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroOverlay = document.querySelector('.hero-overlay');
        if (heroOverlay) {
            heroOverlay.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
        }
    });

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');

            const links = document.querySelectorAll('.nav-links li');
            links.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            hamburger.classList.toggle('toggle');
        });

        const links = document.querySelectorAll('.nav-links li a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                hamburger.classList.remove('toggle');
                const listItems = document.querySelectorAll('.nav-links li');
                listItems.forEach(item => item.style.animation = '');
            });
        });
    }
});
