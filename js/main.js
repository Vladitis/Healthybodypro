// Varmistetaan että DOM on ladattu ennen skriptien suorittamista
document.addEventListener('DOMContentLoaded', function() {
    // Lisätään sisään animaatiot elementeille
    animateOnScroll();
    
    // Mobiilivalikko
    const menuToggle = document.querySelectorAll('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu clicked');
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    });
    
    // Suljetaan valikko klikattaessa linkkejä
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.forEach(toggle => toggle.classList.remove('active'));
            document.body.classList.remove('no-scroll');
        });
    });

    // CTA-napit
    const ctaButtons = document.querySelectorAll('.btn-white, .btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('https://')) {
                console.log('CTA button clicked:', href);
                // Varmistetaan, että linkki aukeaa uudessa välilehdessä
                window.open(href, '_blank');
            }
        });
    });

    // Navigaation taustavärin muutos scrollatessa
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Sujuva scrollaus ankkurilinkeille
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Jätetään käsittelemättä jos kyseessä on tyhjä ankkuri "#"
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Lasketaan kohteen sijainti huomioiden fixed navbarin korkeus
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - navbarHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Aktiivinen navigaatiolinkki scrollatessa
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        let scrollPosition = window.scrollY;
        
        // Huomioidaan navbarin korkeus
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        scrollPosition += navbarHeight + 50; // Lisätään pieni offset
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector('.nav-menu a[href="#' + sectionId + '"]')?.classList.add('active');
            } else {
                document.querySelector('.nav-menu a[href="#' + sectionId + '"]')?.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // Yhteydenottolomakkeen käsittely
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Kerätään lomakkeen tiedot
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Tässä olisi oikea lomakkeen lähetys, nyt vain simuloidaan
            console.log('Lomakkeen tiedot:', formData);
            
            // Näytetään käyttäjälle tyylikkäämpi viesti onnistuneesta lähetyksestä
            showNotification('Kiitos viestistäsi! Olemme sinuun yhteydessä pian.', 'success');
            
            // Tyhjennetään lomake
            contactForm.reset();
        });
    }
    
    // Sivulatauksen jälkeen piilotetaan latausanimaatio jos sellainen olisi
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('loaded');
    }
    
    // Lisätään rinnakkaissiirtymä-efekti kuviin
    const parallaxImages = document.querySelectorAll('.service-image, .about-image');
    
    window.addEventListener('scroll', function() {
        parallaxImages.forEach(image => {
            if (isElementInViewport(image)) {
                const scrolled = window.scrollY;
                const rate = scrolled * 0.05;
                
                if (image.querySelector('img')) {
                    image.querySelector('img').style.transform = `translateY(-${rate}px)`;
                }
            }
        });
    });
    
    // Palvelukorttien hover-efekti
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            serviceCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// Tarkistetaan onko elementti näkyvissä
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0 &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
        rect.right >= 0
    );
}

// Animoidaan elementit kun ne tulevat näkyviin
function animateOnScroll() {
    // Lisätään fade-in luokka elementeille
    const elementsToAnimate = [
        { selector: '.hero-content h2', class: 'fade-in' },
        { selector: '.hero-content p', class: 'fade-in stagger-1' },
        { selector: '.hero-content .btn', class: 'fade-in stagger-2' },
        { selector: '.section-title', class: 'fade-in' },
        { selector: '.intro-content .lead', class: 'fade-in stagger-1' },
        { selector: '.intro-content p', class: 'fade-in stagger-2' },
        { selector: '.service-card', class: 'fade-in', multiple: true },
        { selector: '.testimonial', class: 'fade-in', multiple: true },
        { selector: '.about-image', class: 'fade-in' },
        { selector: '.about-text p', class: 'fade-in stagger-1', multiple: true },
        { selector: '.info-item', class: 'fade-in', multiple: true },
        { selector: '.contact-form', class: 'fade-in stagger-3' }
    ];
    
    // Lisätään luokat elementeille
    elementsToAnimate.forEach(item => {
        const elements = document.querySelectorAll(item.selector);
        
        if (elements.length > 0) {
            if (item.multiple) {
                elements.forEach((el, index) => {
                    el.classList.add(item.class);
                    if (index > 0) {
                        el.style.animationDelay = `${0.1 * index}s`;
                    }
                });
            } else {
                elements[0].classList.add(item.class);
            }
        }
    });
    
    // Tarkistetaan elementtien näkyvyys scrollattaessa
    const animateElements = document.querySelectorAll('.fade-in');
    
    function checkElements() {
        animateElements.forEach(el => {
            if (isElementInViewport(el)) {
                el.style.opacity = '1';
            }
        });
    }
    
    // Ajetaan tarkistus ensin ja sitten scrollattaessa
    checkElements();
    window.addEventListener('scroll', checkElements);
}

// Näytetään tyylikkäämpi ilmoitus käyttäjälle
function showNotification(message, type = 'info') {
    // Poista aiemmat ilmoitukset
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Luo uusi ilmoitus
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <p>${message}</p>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Lisää ilmoitus bodyyn
    document.body.appendChild(notification);
    
    // Näytä ilmoitus animaatiolla
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Sulje-painikkeen toiminnallisuus
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
    
    // Automaattinen sulkeminen 5 sekunnin jälkeen
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
} 