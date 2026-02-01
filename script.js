// Mobile Menu Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Change icon class
        const icon = mobileBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Scroll to Top Logic
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        if (scrollTopBtn) scrollTopBtn.classList.add('visible');
    } else {
        if (scrollTopBtn) scrollTopBtn.classList.remove('visible');
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth Scroll for Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Only if link is on the same page
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (navLinks) navLinks.classList.remove('active');
        }
    });
});

// Cart Logic
function addToCart(id, name, price, image, type) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if item exists
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            image: image,
            type: type,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Item added to cart!');

    // Navigate to cart page as requested ("mengarah ke keranjang")
    // Uncomment the next line if immediate redirection is desired:
    window.location.href = 'cart.html';
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.textContent = count > 0 ? count : '';
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    generateTOC();
    initFAQ();
    initShareButtons();
});

// TOC Generator
function generateTOC() {
    const tocList = document.querySelector('.toc-list');
    const content = document.querySelector('.article-content');

    if (!tocList || !content) return;

    const headings = content.querySelectorAll('h2, h3');

    if (headings.length === 0) {
        document.querySelector('.toc-container').style.display = 'none';
        return;
    }

    headings.forEach((heading, index) => {
        const id = `heading-${index}`;
        heading.id = id;

        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${id}`;
        a.textContent = heading.textContent;
        // Indent H3
        if (heading.tagName === 'H3') {
            li.style.marginLeft = '20px';
        }

        li.appendChild(a);
        tocList.appendChild(li);
    });

    // Toggle Logic
    const tocHeader = document.querySelector('.toc-header');
    if (tocHeader) {
        tocHeader.addEventListener('click', () => {
            const icon = tocHeader.querySelector('i');
            tocList.classList.toggle('hidden');
            if (tocList.classList.contains('hidden')) {
                icon.className = 'fas fa-chevron-down';
            } else {
                icon.className = 'fas fa-chevron-up';
            }
        });
    }
}

// FAQ Accordion
function initFAQ() {
    const questions = document.querySelectorAll('.faq-question');
    questions.forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            item.classList.toggle('active');
        });
    });
}

// Share Buttons
function initShareButtons() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);

    const fb = document.querySelector('.share-facebook');
    if (fb) fb.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;

    const tw = document.querySelector('.share-twitter');
    if (tw) tw.href = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;

    const wa = document.querySelector('.share-whatsapp');
    if (wa) wa.href = `https://api.whatsapp.com/send?text=${title}%20${url}`;
}
