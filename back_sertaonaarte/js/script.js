document.addEventListener('DOMContentLoaded', function() {
   
    // ==================== MENU MOBILE ====================
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('close-menu-btn');

    if (menuBtn && mobileMenu && closeBtn) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });

        closeBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });

        
        const links = mobileMenu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // ==================== GALERIA COM ARRASTO ====================
    const galeria = document.querySelector('.fotos');
    
    if (galeria) {
        let isDown = false;
        let startX;
        let scrollLeft;
        let momentumID;

        // Mouse Events
        galeria.addEventListener('mousedown', (e) => {
            isDown = true;
            galeria.style.cursor = 'grabbing';
            startX = e.pageX - galeria.offsetLeft;
            scrollLeft = galeria.scrollLeft;
            cancelAnimationFrame(momentumID);
        });

        galeria.addEventListener('mouseleave', () => {
            isDown = false;
            galeria.style.cursor = 'grab';
        });

        galeria.addEventListener('mouseup', () => {
            isDown = false;
            galeria.style.cursor = 'grab';
        });

        galeria.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - galeria.offsetLeft;
            const walk = (x - startX) * 1.5;
            galeria.scrollLeft = scrollLeft - walk;
        });

        // Touch Events (para mobile)
        let touchStartX = 0;
        let touchStartScroll = 0;

        galeria.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartScroll = galeria.scrollLeft;
            cancelAnimationFrame(momentumID);
        }, false);

        galeria.addEventListener('touchmove', (e) => {
            const touchX = e.touches[0].clientX;
            const walk = (touchStartX - touchX) * 2;
            galeria.scrollLeft = touchStartScroll + walk;
        }, false);

        galeria.addEventListener('touchend', () => {
            // Momentum scrolling
            let velocity = 0;
            let lastX = 0;
            let lastTime = Date.now();

            const momentum = () => {
                const now = Date.now();
                const deltaTime = now - lastTime;
                
                if (deltaTime > 100) {
                    velocity = 0;
                } else {
                    velocity *= 0.95;
                    if (Math.abs(velocity) > 0.5) {
                        galeria.scrollLeft -= velocity;
                        momentumID = requestAnimationFrame(momentum);
                    }
                }
            };
        }, false);

        // Botões de navegação para galeria
        const btnEsq = document.getElementById('galeria-esq');
        const btnDir = document.getElementById('galeria-dir');

        const calcularScroll = () => {
            // Responsivo: ajusta o scroll baseado no tamanho da tela
            const width = window.innerWidth;
            if (width >= 1024) {
                return 520; // 500px (imagem) + 20px (gap)
            } else if (width >= 768) {
                return 420; // 400px (imagem) + 20px (gap)
            } else {
                return 320; // 300px (imagem) + 20px (gap)
            }
        };

        if (btnEsq) {
            btnEsq.addEventListener('click', () => {
                galeria.scrollLeft -= calcularScroll();
            });
        }

        if (btnDir) {
            btnDir.addEventListener('click', () => {
                galeria.scrollLeft += calcularScroll();
            });
        }

        // Recalcular quando a janela for redimensionada
        window.addEventListener('resize', () => {
            // A função calcularScroll já lida com os novos tamanhos
        });
    }

    // ==================== GALERIA DE VÍDEOS ====================
    const videosGaleria = document.querySelector('.videos');
    
    if (videosGaleria) {
        let isDown = false;
        let startX;
        let scrollLeft;
        let momentumID;

        // Mouse Events para vídeos
        videosGaleria.addEventListener('mousedown', (e) => {
            isDown = true;
            videosGaleria.style.cursor = 'grabbing';
            startX = e.pageX - videosGaleria.offsetLeft;
            scrollLeft = videosGaleria.scrollLeft;
            cancelAnimationFrame(momentumID);
        });

        videosGaleria.addEventListener('mouseleave', () => {
            isDown = false;
            videosGaleria.style.cursor = 'grab';
        });

        videosGaleria.addEventListener('mouseup', () => {
            isDown = false;
            videosGaleria.style.cursor = 'grab';
        });

        videosGaleria.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - videosGaleria.offsetLeft;
            const walk = (x - startX) * 1.5;
            videosGaleria.scrollLeft = scrollLeft - walk;
        });

        // Touch Events para vídeos
        let touchStartX = 0;
        let touchStartScroll = 0;

        videosGaleria.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartScroll = videosGaleria.scrollLeft;
            cancelAnimationFrame(momentumID);
        }, false);

        videosGaleria.addEventListener('touchmove', (e) => {
            const touchX = e.touches[0].clientX;
            const walk = (touchStartX - touchX) * 2;
            videosGaleria.scrollLeft = touchStartScroll + walk;
        }, false);

        videosGaleria.addEventListener('touchend', () => {
            // Momentum scrolling
            let velocity = 0;
            let lastX = 0;
            let lastTime = Date.now();

            const momentum = () => {
                const now = Date.now();
                const deltaTime = now - lastTime;
                
                if (deltaTime > 100) {
                    velocity = 0;
                } else {
                    velocity *= 0.95;
                    if (Math.abs(velocity) > 0.5) {
                        videosGaleria.scrollLeft -= velocity;
                        momentumID = requestAnimationFrame(momentum);
                    }
                }
            };
        }, false);

        // Botões de navegação para vídeos
        const btnVideosEsq = document.getElementById('videos-esq');
        const btnVideosDir = document.getElementById('videos-dir');

        const calcularScrollVideos = () => {
            // Responsivo: ajusta o scroll baseado no tamanho da tela
            const width = window.innerWidth;
            if (width >= 1024) {
                return 580; // 560px (vídeo) + 20px (gap)
            } else if (width >= 768) {
                return 420; // 400px (vídeo) + 20px (gap)
            } else {
                return 320; // 300px (vídeo) + 20px (gap)
            }
        };

        if (btnVideosEsq) {
            btnVideosEsq.addEventListener('click', () => {
                videosGaleria.scrollLeft -= calcularScrollVideos();
            });
        }

        if (btnVideosDir) {
            btnVideosDir.addEventListener('click', () => {
                videosGaleria.scrollLeft += calcularScrollVideos();
            });
        }
    }

    // ==================== FORMULÁRIO DE CONTATO ====================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            
            fetch(form.action, {
                method: form.method,
                body: formData,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    const message = document.getElementById('form-message');
                    if (message) {
                        message.style.display = 'block';
                    }
                    form.reset(); 
                } else {
                    alert('Erro ao enviar. Tente novamente.');
                }
            }).catch(error => {
                alert('Erro: ' + error.message);
            });
        });
    }
});


