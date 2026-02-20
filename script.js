document.addEventListener('DOMContentLoaded', function() {
    // Scroll-triggered fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in');
    const videoSections = document.querySelectorAll('.video-section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
    videoSections.forEach(el => observer.observe(el));

    // Parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        const scrollHint = document.querySelector('.scroll-hint');

        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / 500);
        }

        if (scrollHint) {
            scrollHint.style.opacity = 1 - (scrolled / 300);
        }
    });

    // Contact option buttons → open mailto with pre-filled content
    document.querySelectorAll('.contact-option').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var subject = encodeURIComponent(btn.getAttribute('data-subject'));
            var body = btn.getAttribute('data-body');
            window.location.href = 'mailto:puremotionmediallc@gmail.com?subject=' + subject + '&body=' + body;
        });
    });

    // Lazy-load YouTube thumbnails
    document.querySelectorAll('.yt-thumb').forEach(function(thumb) {
        var id = thumb.getAttribute('data-id');
        // Use maxresdefault for best quality, fall back to hqdefault
        thumb.style.backgroundImage = 'url(https://img.youtube.com/vi/' + id + '/maxresdefault.jpg)';

        thumb.addEventListener('click', function() {
            var isWide = thumb.classList.contains('yt-thumb-wide');
            var iframe = document.createElement('iframe');
            iframe.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;

            if (isWide) {
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.style.border = 'none';
                iframe.style.borderRadius = '12px';
            } else {
                iframe.className = 'youtube-short';
            }

            thumb.replaceWith(iframe);
        });
    });

});
