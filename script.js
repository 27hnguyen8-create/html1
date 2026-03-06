document.addEventListener('DOMContentLoaded', () => {
    
    // 1. GLOBAL PAGE TRANSITIONS
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hostname === window.location.hostname && !this.hash && this.href !== window.location.href) {
                e.preventDefault();
                document.body.classList.add('page-exit');
                setTimeout(() => { window.location.href = this.href; }, 400);
            }
        });
    });

    // 2. HERO SLIDER LOGIC (Home Page)
    let heroIndex = 0;
    const heroSlides = document.querySelectorAll('.hero-slider .slide');
    if (heroSlides.length > 0) {
        window.moveSlide = (n) => {
            heroSlides[heroIndex].classList.remove('active');
            heroIndex = (heroIndex + n + heroSlides.length) % heroSlides.length;
            heroSlides[heroIndex].classList.add('active');
        };
        setInterval(() => moveSlide(1), 6000); // Auto-rotate every 6s
    }

    // 3. TAB SLIDER (Photography & Design Pages)
    const tabWrapper = document.querySelector('.tab-wrapper');
    const tabItems = document.querySelectorAll('.tab-item');
    
    if (tabWrapper && tabItems.length > 0) {
        let tabIndex = 0;
        let isPaused = false;
        let pauseTimeout;

        const updateTabSlider = () => {
            tabItems.forEach((item, i) => item.classList.toggle('active', i === tabIndex));
            const isMobile = window.innerWidth <= 768;
            const vwOffset = isMobile ? 85 + (30 / window.innerWidth * 100) : 70 + (30 / window.innerWidth * 100);
            tabWrapper.style.transform = `translateX(${-tabIndex * vwOffset}vw)`;
        };

        setInterval(() => {
            if (!isPaused) {
                tabIndex = (tabIndex + 1) % tabItems.length;
                updateTabSlider();
            }
        }, 5000);

        tabItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                clearTimeout(pauseTimeout);
                tabItems.forEach(t => t.classList.remove('paused'));
                tabIndex = index;
                updateTabSlider();
                item.classList.add('paused');
                isPaused = true;
                pauseTimeout = setTimeout(() => { 
                    isPaused = false; 
                    item.classList.remove('paused');
                }, 6000);
            });
        });
        window.addEventListener('resize', updateTabSlider);
    }

    // 4. DESIGN CATEGORIES
    const catContainer = document.querySelector('.cat-container');
    const catBoxes = document.querySelectorAll('.cat-box');
    
    if (catBoxes.length > 0) {
        catBoxes.forEach(box => {
            box.querySelector('.cat-title').addEventListener('click', () => {
                if (box.classList.contains('active')) {
                    box.classList.remove('active');
                    catContainer.classList.remove('expanded');
                    catBoxes.forEach(b => b.classList.remove('hidden'));
                } else {
                    catBoxes.forEach(b => {
                        b.classList.remove('active');
                        b.classList.toggle('hidden', b !== box);
                    });
                    box.classList.add('active');
                    catContainer.classList.add('expanded');
                }
            });
        });
    }
});