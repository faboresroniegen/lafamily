// LA FAMILIA - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // ========== Slideshow functionality ==========
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);

    // ========== Feature buttons navigation ==========
    document.querySelectorAll('.feature[data-href]:not(#friendshipGoalsBtn)').forEach(button => {
        button.addEventListener('click', function() {
            const href = this.getAttribute('data-href');
            if (href && href !== '#friendship-goals') {
                window.location.href = href;
            }
        });
    });

    // ========== Share Memories Modal ==========
    const shareMemoriesBtn = document.getElementById('shareMemoriesBtn');
    const memoriesModalOverlay = document.getElementById('memoriesModalOverlay');
    const memoriesModalCloseBtn = document.getElementById('memoriesModalCloseBtn');
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
    const memoryItems = document.querySelectorAll('.memory-item');

    shareMemoriesBtn.addEventListener('click', function(e) {
        e.preventDefault();
        memoriesModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    memoriesModalCloseBtn.addEventListener('click', function() {
        memoriesModalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    memoriesModalOverlay.addEventListener('click', function(e) {
        if (e.target === memoriesModalOverlay) {
            memoriesModalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ========== Lightbox functionality ==========
    let currentIndex = 0;
    const allMemories = Array.from(memoryItems);

    memoryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentIndex = index;
            openLightbox(index);
        });
    });

    function openLightbox(index) {
        const memory = allMemories[index];
        const type = memory.dataset.type;
        
        lightboxOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (type === 'image') {
            showImageLightbox(index);
        } else {
            showVideoLightbox(index);
        }
    }

    function showImageLightbox(index) {
        const imageLightbox = document.getElementById('imageLightbox');
        const videoLightbox = document.getElementById('videoLightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxCounter = document.getElementById('lightboxCounter');

        imageLightbox.classList.add('active');
        videoLightbox.classList.remove('active');

        const memory = allMemories[index];
        const thumb = memory.dataset.thumb || (memory.querySelector('img') && memory.querySelector('img').src) || '';
        const hiRes = memory.dataset.src || thumb;

        lightboxImage.classList.remove('zoomed');
        lightboxImage.src = thumb;
        lightboxImage.alt = memory.querySelector('img') ? memory.querySelector('img').alt : `Memory ${index + 1}`;
        lightboxCounter.textContent = `${index + 1} / ${allMemories.length}`;

        // Adjust sizing to viewport
        function adjustImageFitLocal() {
            try {
                const img = document.getElementById('lightboxImage');
                if (!img) return;
                const maxW = Math.max(120, window.innerWidth - 40);
                const maxH = Math.max(120, window.innerHeight - 140);
                img.style.maxWidth = maxW + 'px';
                img.style.maxHeight = maxH + 'px';
                if (!img.classList.contains('zoomed')) img.style.transform = 'translate3d(0,0,0) scale(1)';
            } catch (e) {}
        }

        adjustImageFitLocal();
        lightboxImage.onload = function() {
            adjustImageFitLocal();
        };

        // Preload hi-res and swap silently when ready
        if (hiRes && hiRes !== thumb) {
            const pre = new Image();
            pre.onload = function() {
                if (allMemories[currentIndex] === memory) {
                    lightboxImage.src = hiRes;
                    adjustImageFitLocal();
                }
            };
            pre.src = hiRes;
        }

        // Recalculate on viewport resize
        window.addEventListener('resize', function() {
            if (document.getElementById('lightboxOverlay') && document.getElementById('lightboxOverlay').classList.contains('active')) {
                adjustImageFitLocal();
            }
        });
    }

    function showVideoLightbox(index) {
        const imageLightbox = document.getElementById('imageLightbox');
        const videoLightbox = document.getElementById('videoLightbox');
        const lightboxVideo = document.getElementById('lightboxVideo');
        const videoCounter = document.getElementById('videoCounter');

        const memory = allMemories[index];
        const src = memory.dataset.src || '';

        videoLightbox.classList.add('active');
        imageLightbox.classList.remove('active');
        
        const sourceEl = lightboxVideo.querySelector('source');
        if (sourceEl) {
            sourceEl.src = src;
        } else {
            lightboxVideo.src = src;
        }
        lightboxVideo.load();
        lightboxVideo.play().catch(() => {});
        videoCounter.textContent = `${index + 1} / ${allMemories.length}`;
    }

    // ========== Lightbox navigation ==========
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const videoPrev = document.getElementById('videoPrev');
    const videoNext = document.getElementById('videoNext');

    function goToPrevious() {
        currentIndex = (currentIndex - 1 + allMemories.length) % allMemories.length;
        openLightbox(currentIndex);
    }

    function goToNext() {
        currentIndex = (currentIndex + 1) % allMemories.length;
        openLightbox(currentIndex);
    }

    lightboxPrev.addEventListener('click', goToPrevious);
    lightboxNext.addEventListener('click', goToNext);
    videoPrev.addEventListener('click', goToPrevious);
    videoNext.addEventListener('click', goToNext);

    // ========== Fullscreen & Zoom controls ==========
    const lightboxFullBtn = document.getElementById('lightboxFullBtn');
    const lightboxZoomBtn = document.getElementById('lightboxZoomBtn');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxContainer = document.querySelector('.lightbox-container');

    function enterFullscreen(elem) {
        if (elem.requestFullscreen) return elem.requestFullscreen();
        if (elem.webkitRequestFullscreen) return elem.webkitRequestFullscreen();
        return Promise.resolve();
    }

    function exitFullscreen() {
        if (document.exitFullscreen) return document.exitFullscreen();
        if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
        return Promise.resolve();
    }

    function toggleFullscreen() {
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
            enterFullscreen(lightboxContainer).catch(()=>{});
            lightboxOverlay.classList.add('fullscreen');
            lightboxFullBtn.innerHTML = '<i class="fas fa-compress"></i>';
        } else {
            exitFullscreen().catch(()=>{});
            lightboxOverlay.classList.remove('fullscreen');
            lightboxFullBtn.innerHTML = '<i class="fas fa-expand"></i>';
        }
    }

    if (lightboxFullBtn) lightboxFullBtn.addEventListener('click', toggleFullscreen);

    // Zoom toggle
    function setTransform(tx = 0, ty = 0, scale = 1) {
        lightboxImage.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;
    }

    let zoomed = false;
    let scaleFactor = 1.6;
    let startX = 0, startY = 0, lastX = 0, lastY = 0, isPanning = false;

    function toggleZoom() {
        if (!lightboxImage) return;
        zoomed = !zoomed;
        if (!zoomed) {
            lightboxImage.classList.remove('zoomed');
            setTransform(0,0,1);
            lastX = lastY = 0;
        } else {
            lightboxImage.classList.add('zoomed');
            setTransform(0,0,scaleFactor);
        }
        lightboxZoomBtn.innerHTML = zoomed ? '<i class="fas fa-search-minus"></i>' : '<i class="fas fa-search-plus"></i>';
    }

    if (lightboxZoomBtn) lightboxZoomBtn.addEventListener('click', toggleZoom);

    // Double-click / double-tap detection
    let lastTap = 0;
    if (lightboxImage) {
        lightboxImage.addEventListener('dblclick', toggleZoom);
        lightboxImage.addEventListener('touchend', function(e) {
            const now = Date.now();
            if (now - lastTap < 300) {
                e.preventDefault();
                toggleZoom();
            }
            lastTap = now;
        });

        // Touch/mouse pan when zoomed
        lightboxImage.addEventListener('touchstart', function(e) {
            if (!zoomed) return;
            if (e.touches.length !== 1) return;
            isPanning = true;
            startX = e.touches[0].clientX - lastX;
            startY = e.touches[0].clientY - lastY;
        }, {passive:false});

        lightboxImage.addEventListener('touchmove', function(e) {
            if (!isPanning) return;
            e.preventDefault();
            const x = e.touches[0].clientX - startX;
            const y = e.touches[0].clientY - startY;
            lastX = x;
            lastY = y;
            setTransform(x, y, scaleFactor);
        }, {passive:false});

        lightboxImage.addEventListener('touchend', function() {
            isPanning = false;
        });

        // Mouse pan for desktop
        lightboxImage.addEventListener('mousedown', function(e) {
            if (!zoomed) return;
            isPanning = true;
            startX = e.clientX - lastX;
            startY = e.clientY - lastY;
            document.body.style.userSelect = 'none';
        });

        window.addEventListener('mousemove', function(e) {
            if (!isPanning) return;
            lastX = e.clientX - startX;
            lastY = e.clientY - startY;
            setTransform(lastX, lastY, scaleFactor);
        });

        window.addEventListener('mouseup', function() {
            if (isPanning) {
                isPanning = false;
                document.body.style.userSelect = '';
            }
        });
    }

    // Close lightbox
    lightboxCloseBtn.addEventListener('click', function() {
        lightboxOverlay.classList.remove('active');
        document.body.style.overflow = '';
        const lightboxVideo = document.getElementById('lightboxVideo');
        lightboxVideo.pause();
    });

    lightboxOverlay.addEventListener('click', function(e) {
        if (e.target === lightboxOverlay) {
            lightboxOverlay.classList.remove('active');
            document.body.style.overflow = '';
            const lightboxVideo = document.getElementById('lightboxVideo');
            lightboxVideo.pause();
        }
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        if (lightboxOverlay.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                goToPrevious();
            } else if (e.key === 'ArrowRight') {
                goToNext();
            } else if (e.key === 'Escape') {
                lightboxOverlay.classList.remove('active');
                document.body.style.overflow = '';
                const lightboxVideo = document.getElementById('lightboxVideo');
                lightboxVideo.pause();
            }
        }
    });

    // ========== Friendship Goals Modal ==========
    const friendshipGoalsBtn = document.getElementById('friendshipGoalsBtn');
    const goalsModalOverlay = document.getElementById('goalsModalOverlay');
    const goalsModalCloseBtn = document.getElementById('goalsModalCloseBtn');

    friendshipGoalsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        goalsModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    goalsModalCloseBtn.addEventListener('click', function() {
        goalsModalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    goalsModalOverlay.addEventListener('click', function(e) {
        if (e.target === goalsModalOverlay) {
            goalsModalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && goalsModalOverlay.classList.contains('active')) {
            goalsModalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ========== Main CTA Modal ==========
    const ctaButton = document.querySelector('.cta-button');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalActionBtn = document.getElementById('modalActionBtn');
    
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        modalOverlay.style.opacity = '0';
        setTimeout(() => {
            modalOverlay.style.opacity = '';
        }, 400);
    }
    
    ctaButton.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        const existingRipple = this.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }
        
        this.appendChild(ripple);
        this.style.transform = 'scale(0.95)';
        this.classList.add('ripple');
        
        setTimeout(() => {
            this.style.transform = 'scale(1)';
            
            setTimeout(() => {
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }, 100);
        }, 200);
    });
    
    modalCloseBtn.addEventListener('click', closeModal);
    modalActionBtn.addEventListener('click', closeModal);
    
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // ========== Feature hover effects ==========
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });

        feature.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 10px 20px rgba(78, 205, 196, 0.3)';
        });
        
        feature.addEventListener('touchend', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // ========== Version animation ==========
    const versionDigit = document.querySelector('.version-digit');
    let currentVersion = 0;
    let animationInterval;
    
    function animateVersionChange(oldVersion, newVersion) {
        let counter = oldVersion;
        const increment = newVersion > oldVersion ? 1 : -1;
        const duration = 200;
        const steps = Math.abs(newVersion - oldVersion) + 1;
        
        clearInterval(animationInterval);
        
        animationInterval = setInterval(() => {
            versionDigit.textContent = counter;
            counter += increment;
            
            versionDigit.classList.remove('typing');
            setTimeout(() => {
                versionDigit.classList.add('typing');
            }, 10);
            
            if (counter === newVersion + increment) {
                clearInterval(animationInterval);
            }
        }, duration / steps);
    }
    
    function updateVersion() {
        const oldVersion = currentVersion;
        currentVersion = (currentVersion + 1) % 2;
        animateVersionChange(oldVersion, currentVersion);
    }
    
    setTimeout(() => {
        updateVersion();
        setInterval(updateVersion, 5000);
    }, 5000);
});
