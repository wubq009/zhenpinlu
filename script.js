// 导航栏交互
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 点击导航链接时关闭移动端菜单
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// 确保下拉菜单悬停正常工作
document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.addEventListener('mouseenter', () => {
        const menu = dropdown.querySelector('.dropdown-menu');
        if (menu) {
            menu.style.opacity = '1';
            menu.style.visibility = 'visible';
            menu.style.transform = 'translateY(0)';
        }
    });
    
    dropdown.addEventListener('mouseleave', () => {
        const menu = dropdown.querySelector('.dropdown-menu');
        if (menu) {
            menu.style.opacity = '0';
            menu.style.visibility = 'hidden';
            menu.style.transform = 'translateY(-10px)';
        }
    });
});

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// 滚动动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 为需要动画的元素添加观察
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.stat-card, .research-card, .team-card, .achievement-item, .news-card, .partner-logo');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// 数字计数动画
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-card h3');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + '+';
        }, 30);
    });
}

// 当统计卡片进入视口时启动计数动画
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// 图片懒加载
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// 团队成员卡片悬停效果增强
document.addEventListener('DOMContentLoaded', () => {
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// 研究方向卡片点击效果
document.addEventListener('DOMContentLoaded', () => {
    const researchCards = document.querySelectorAll('.research-card');
    
    researchCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('research-link')) {
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = 'translateY(-5px)';
                }, 150);
            }
        });
    });
});

// 新闻卡片日期动画
document.addEventListener('DOMContentLoaded', () => {
    const newsCards = document.querySelectorAll('.news-card');
    
    newsCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const dateElement = card.querySelector('.news-date');
            if (dateElement) {
                dateElement.style.transform = 'scale(1.1)';
                dateElement.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const dateElement = card.querySelector('.news-date');
            if (dateElement) {
                dateElement.style.transform = 'scale(1)';
            }
        });
    });
});

// 合作伙伴Logo轮播效果（可选）
function initPartnerCarousel() {
    const partnersGrid = document.querySelector('.partners-grid');
    if (!partnersGrid) return;
    
    const logos = partnersGrid.querySelectorAll('.partner-logo');
    let currentIndex = 0;
    
    setInterval(() => {
        logos[currentIndex].style.transform = 'translateY(-5px) scale(1.05)';
        logos[currentIndex].style.transition = 'transform 0.3s ease';
        
        setTimeout(() => {
            logos[currentIndex].style.transform = 'translateY(0) scale(1)';
        }, 300);
        
        currentIndex = (currentIndex + 1) % logos.length;
    }, 2000);
}

// 页面加载完成后初始化轮播
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initPartnerCarousel, 3000);
});

// 课题组简介图片轮播
function initAboutCarousel() {
    const imgs = document.querySelectorAll('.about-carousel .carousel-img');
    const dots = document.querySelectorAll('.about-carousel .dot');
    let idx = 0;
    let timer = null;
    function show(n) {
        imgs.forEach((img, i) => img.classList.toggle('active', i === n));
        dots.forEach((dot, i) => dot.classList.toggle('active', i === n));
        idx = n;
    }
    function next() {
        show((idx + 1) % imgs.length);
    }
    timer = setInterval(next, 3500);
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            show(i);
            clearInterval(timer);
            timer = setInterval(next, 3500);
        });
    });
}
document.addEventListener('DOMContentLoaded', initAboutCarousel);

// 课题组简介图片轮播（淡入淡出模式，带圆点，修正版）
function initAboutCarouselAltFadeDots() {
    const imgs = document.querySelectorAll('.about-carousel-alt.fade-mode .carousel-img-alt');
    const dots = document.querySelectorAll('.about-carousel-alt.fade-mode .carousel-dot');
    let idx = 0;
    let timer = null;
    function show(n) {
        imgs.forEach((img, i) => img.classList.remove('active'));
        dots.forEach((dot, i) => dot.classList.remove('active'));
        imgs[n].classList.add('active');
        dots[n].classList.add('active');
        idx = n;
    }
    function next() {
        show((idx + 1) % imgs.length);
    }
    function startAuto() {
        if (timer) clearInterval(timer);
        timer = setInterval(next, 3500);
    }
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            show(i);
            startAuto();
        });
    });
    show(0);
    startAuto();
}
document.addEventListener('DOMContentLoaded', initAboutCarouselAltFadeDots);

// 返回顶部按钮
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #1e3a8a;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(30, 58, 138, 0.3);
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'translateY(-3px)';
        backToTop.style.boxShadow = '0 6px 20px rgba(30, 58, 138, 0.4)';
    });
    
    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'translateY(0)';
        backToTop.style.boxShadow = '0 4px 15px rgba(30, 58, 138, 0.3)';
    });
}

// 页面加载完成后创建返回顶部按钮
document.addEventListener('DOMContentLoaded', createBackToTopButton);

// 主页轮播功能
function initHeroCarousel() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    let currentIndex = 0;
    let timer = null;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentIndex = index;
    }

    function nextSlide() {
        showSlide((currentIndex + 1) % slides.length);
    }

    function startAutoPlay() {
        if (timer) clearInterval(timer);
        timer = setInterval(nextSlide, 4000); // 每4秒切换一次
    }

    // 点击圆点切换轮播
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showSlide(i);
            startAutoPlay();
        });
    });

    // 初始化
    if (slides.length > 0) {
        showSlide(0);
        startAutoPlay();
    }
}

// 页面加载完成后初始化主页轮播
document.addEventListener('DOMContentLoaded', initHeroCarousel);

// 加载动画
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// 页面加载时的初始状态
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
});

// 错误处理
window.addEventListener('error', (e) => {
    console.error('页面错误:', e.error);
});

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 优化滚动事件
const optimizedScrollHandler = debounce(() => {
    // 滚动相关的处理逻辑
}, 10);

window.addEventListener('scroll', optimizedScrollHandler); 