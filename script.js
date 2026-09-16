document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // DATA INVESTASI (bisa diganti sesuai kebutuhan)
    // ============================================
    const investments = [
        {
            name: 'Proyek Usaha A',
            progress: 80,
            target: 'Rp500.000.000',
            return: '12% - 18% per tahun',
            featured: true
        },
        {
            name: 'Proyek Usaha B',
            progress: 65,
            target: 'Rp750.000.000',
            return: '10% - 15% per tahun',
            featured: false
        },
        {
            name: 'Proyek Usaha C',
            progress: 90,
            target: 'Rp1.000.000.000',
            return: '15% - 22% per tahun',
            featured: false
        }
    ];

    let currentSlide = 0;
    const grid = document.getElementById('investmentsGrid');
    const controls = document.getElementById('sliderControls');
    const dotsContainer = document.getElementById('sliderDots');

    // ============================================
    // RENDER SLIDES
    // ============================================
    function renderSlides() {
        if (!grid) return;

        grid.innerHTML = investments.map((inv, i) => `
            <div class="investment-card ${inv.featured ? 'featured' : ''}"
                 style="display: ${i === currentSlide ? 'block' : 'none'}; animation: fadeIn 0.4s ease;">
                <div class="investment-progress">
                    <div class="progress-header">
                        <span>Terkumpul</span>
                        <span class="progress-percent">${inv.progress}%</span>
                    </div>
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill" style="width: ${inv.progress}%"></div>
                    </div>
                </div>
                <h3>${inv.name}</h3>
                <p class="investment-target">Telah terkumpul dari target ${inv.target}</p>
                <span class="investment-return">Imbal Hasil: ${inv.return}</span>
                <a href="#" class="btn-detail">
                    Lihat Detail
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </a>
            </div>
        `).join('');

        // Render dots
        if (dotsContainer) {
            dotsContainer.innerHTML = investments.map((_, i) =>
                `<span class="slider-dot ${i === currentSlide ? 'active' : ''}" data-index="${i}"></span>`
            ).join('');
        }

        // Tampilkan kontrol jika ada 2+ slide
        if (controls) {
            controls.style.display = investments.length > 1 ? 'flex' : 'none';
        }
    }

    // ============================================
    // NAVIGASI SLIDER
    // ============================================
    function showSlide(index) {
        if (!grid) return;
        if (index < 0) index = investments.length - 1;
        if (index >= investments.length) index = 0;
        currentSlide = index;

        const cards = grid.querySelectorAll('.investment-card');
        cards.forEach((card, i) => {
            card.style.display = i === currentSlide ? 'block' : 'none';
        });

        // Update dots
        document.querySelectorAll('.slider-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function nextSlide() { showSlide(currentSlide + 1); }
    function prevSlide() { showSlide(currentSlide - 1); }

    // ============================================
    // EVENT LISTENERS
    // ============================================
    document.getElementById('nextSlide')?.addEventListener('click', nextSlide);
    document.getElementById('prevSlide')?.addEventListener('click', prevSlide);

    dotsContainer?.addEventListener('click', function (e) {
        const dot = e.target.closest('.slider-dot');
        if (dot) showSlide(parseInt(dot.dataset.index));
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });

    // Auto-play (opsional, berhenti saat mouse bergerak)
    let autoPlay = setInterval(nextSlide, 5000);
    document.addEventListener('mousemove', () => { clearInterval(autoPlay); });
    document.addEventListener('touchstart', () => { clearInterval(autoPlay); });

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    menuToggle?.addEventListener('click', function () {
        mainNav?.classList.toggle('active');
    });

    // Tutup menu saat klik link (mobile)
    mainNav?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav?.classList.remove('active');
        });
    });

    // ============================================
    // FORM SUBSCRIBE
    // ============================================
    const form = document.getElementById('subscribeForm');
    form?.addEventListener('submit', function (e) {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (input && input.value.trim() !== '') {
            alert(
                'Terima kasih! Email Anda sudah terdaftar.\n\n' +
                'Tim InvestUsaha akan menghubungi Anda segera.\n\n' +
                'WhatsApp: +62 852-2008-9789'
            );
            form.reset();
        }
    });

    // ============================================
    // SMOOTH SCROLL (fallback untuk browser lama)
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Animasi masuk saat scroll (Intersection Observer)
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.advantage-card, .investment-card, .stat-card, .contact-card, .bank-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Init
    renderSlides();
});