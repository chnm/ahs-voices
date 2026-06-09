/**
 * Arlington Stories — Global theme JS
 * Loaded on every page via layout.phtml
 */

(function () {
    'use strict';

    // ---------- Hero Carousel ----------

    function initHeroCarousel() {
        var carousel = document.querySelector('.hero-carousel');
        if (!carousel) return;

        var slides = carousel.querySelectorAll('.hero-slide');
        if (slides.length <= 1) return;

        var current = 0;
        var interval = 6000;
        var timer = null;
        var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) return;

        // Create progress bar
        var progressBar = document.createElement('div');
        progressBar.className = 'hero-carousel-progress';
        carousel.appendChild(progressBar);

        function resetProgress() {
            progressBar.classList.remove('running');
            void progressBar.offsetWidth;
            progressBar.classList.add('running');
        }

        function next() {
            slides[current].classList.remove('active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('active');
            resetProgress();
        }

        function start() {
            timer = setInterval(next, interval);
            resetProgress();
        }

        function stop() {
            clearInterval(timer);
            progressBar.classList.remove('running');
        }

        carousel.addEventListener('mouseenter', stop);
        carousel.addEventListener('mouseleave', start);

        start();
    }

    // ---------- Mobile Nav ----------

    function initMobileNav() {
        var toggle = document.getElementById('mobile-nav-toggle');
        if (!toggle) return;

        var nav = toggle.parentElement.querySelector('ul.navigation, #top-nav-contents');
        if (!nav) return;

        toggle.addEventListener('click', function () {
            var isOpen = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        document.addEventListener('click', function (e) {
            if (!toggle.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ---------- Init ----------

    document.addEventListener('DOMContentLoaded', function () {
        initHeroCarousel();
        initMobileNav();
    });
})();
