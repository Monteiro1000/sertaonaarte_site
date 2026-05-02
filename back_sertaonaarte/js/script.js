document.addEventListener('DOMContentLoaded', function() {

    // ==================== ACESSIBILIDADE ====================
    (function() {
        function ensureAccessibilityElements() {
            var existingFab = document.getElementById('accessibility-fab');
            if (!existingFab) {
                existingFab = document.createElement('div');
                existingFab.className = 'accessibility-fab';
                existingFab.id = 'accessibility-fab';
                existingFab.setAttribute('aria-label', 'Opcoes de acessibilidade');
                existingFab.setAttribute('title', 'Acessibilidade');
                existingFab.innerHTML = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:26px;height:26px;" aria-hidden="true"><circle cx="12" cy="4" r="1.5" fill="currentColor"></circle><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7v5m0 0l-3 5m3-5l3 5M9 10h6"></path><circle cx="12" cy="12" r="10" stroke-width="2"></circle></svg>';
                document.body.appendChild(existingFab);
            }

            var existingPanel = document.getElementById('accessibility-panel');
            if (!existingPanel) {
                existingPanel = document.createElement('div');
                existingPanel.className = 'accessibility-panel';
                existingPanel.id = 'accessibility-panel';
                existingPanel.setAttribute('role', 'dialog');
                existingPanel.setAttribute('aria-label', 'Painel de acessibilidade');
                existingPanel.setAttribute('aria-modal', 'false');
                existingPanel.innerHTML = [
                    '<p class="accessibility-panel-title">Acessibilidade</p>',
                    '<div class="accessibility-options">',
                    '<button class="accessibility-option-btn" id="acc-font-increase" aria-label="Aumentar fonte">',
                    '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:18px;height:18px;" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>',
                    'Aumentar fonte',
                    '</button>',
                    '<button class="accessibility-option-btn" id="acc-font-decrease" aria-label="Diminuir fonte">',
                    '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:18px;height:18px;" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>',
                    'Diminuir fonte',
                    '</button>',
                    '<button class="accessibility-option-btn" id="acc-font-reset" aria-label="Resetar fonte">',
                    '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:18px;height:18px;" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>',
                    'Resetar fonte',
                    '</button>',
                    '<button class="accessibility-option-btn" id="acc-contrast" aria-label="Alto contraste" aria-pressed="false">',
                    '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:18px;height:18px;" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke-width="2"></circle><path stroke-width="2" d="M12 3v18" stroke-linecap="round"></path><path fill="currentColor" d="M12 3a9 9 0 010 18V3z"></path></svg>',
                    'Alto contraste',
                    '</button>',
                    '</div>'
                ].join('');
                document.body.appendChild(existingPanel);
            }
        }

        ensureAccessibilityElements();

        var fab   = document.getElementById('accessibility-fab');
        var panel = document.getElementById('accessibility-panel');
        var FONT_KEY      = 'acc_fontScale';
        var CONTRAST_KEY  = 'acc_contrast';
        var BASE_SIZE     = 16; // px
        var STEP          = 2;
        var MIN_SCALE     = 12;
        var MAX_SCALE     = 24;

        var currentSize = parseInt(localStorage.getItem(FONT_KEY), 10) || BASE_SIZE;
        var highContrast = localStorage.getItem(CONTRAST_KEY) === '1';

        function applyFont(size) {
            document.documentElement.style.fontSize = size + 'px';
            localStorage.setItem(FONT_KEY, size);
            currentSize = size;
        }

        function applyContrast(enabled) {
            document.body.classList.toggle('high-contrast', enabled);
            localStorage.setItem(CONTRAST_KEY, enabled ? '1' : '0');
            highContrast = enabled;
            var btn = document.getElementById('acc-contrast');
            if (btn) { btn.setAttribute('aria-pressed', String(enabled)); }
        }

        // Restaurar preferências salvas
        applyFont(currentSize);
        applyContrast(highContrast);

        if (!fab || !panel) { return; }

        fab.addEventListener('click', function(e) {
            e.stopPropagation();
            var isOpen = panel.classList.toggle('is-open');
            fab.classList.toggle('active', isOpen);
            if (isOpen) { panel.querySelector('button').focus(); }
        });

        // Fechar painel ao clicar fora
        document.addEventListener('click', function(e) {
            if (panel.classList.contains('is-open') && !panel.contains(e.target)) {
                panel.classList.remove('is-open');
                fab.classList.remove('active');
            }
        });

        var increaseBtn = document.getElementById('acc-font-increase');
        var decreaseBtn = document.getElementById('acc-font-decrease');
        var resetBtn = document.getElementById('acc-font-reset');
        var contrastBtn = document.getElementById('acc-contrast');

        if (increaseBtn) {
            increaseBtn.addEventListener('click', function() {
                if (currentSize < MAX_SCALE) { applyFont(currentSize + STEP); }
            });
        }

        if (decreaseBtn) {
            decreaseBtn.addEventListener('click', function() {
                if (currentSize > MIN_SCALE) { applyFont(currentSize - STEP); }
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                applyFont(BASE_SIZE);
            });
        }

        if (contrastBtn) {
            contrastBtn.addEventListener('click', function() {
                applyContrast(!highContrast);
            });
        }
    })();

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

    // ==================== GALERIAS COM ARRASTO ====================
    function setupDraggableCarousel(carousel, previousButton, nextButton, stepResolver) {
        if (!carousel) {
            return;
        }

        let isDragging = false;
        let startX = 0;
        let startScroll = 0;
        let pendingDelta = null;
        let rafId = null;

        const applyDrag = () => {
            if (pendingDelta === null) {
                rafId = null;
                return;
            }

            carousel.scrollLeft = startScroll - pendingDelta;
            pendingDelta = null;
            rafId = null;
        };

        carousel.addEventListener('mousedown', (event) => {
            isDragging = true;
            carousel.style.cursor = 'grabbing';
            startX = event.pageX - carousel.offsetLeft;
            startScroll = carousel.scrollLeft;
        });

        carousel.addEventListener('mouseleave', () => {
            isDragging = false;
            carousel.style.cursor = 'grab';
        });

        carousel.addEventListener('mouseup', () => {
            isDragging = false;
            carousel.style.cursor = 'grab';
        });

        carousel.addEventListener('mousemove', (event) => {
            if (!isDragging) {
                return;
            }

            event.preventDefault();
            const currentX = event.pageX - carousel.offsetLeft;
            pendingDelta = (currentX - startX) * 1.5;

            if (!rafId) {
                rafId = requestAnimationFrame(applyDrag);
            }
        });

        let touchStartX = 0;
        let touchStartScroll = 0;

        carousel.addEventListener('touchstart', (event) => {
            touchStartX = event.touches[0].clientX;
            touchStartScroll = carousel.scrollLeft;
        }, { passive: true });

        carousel.addEventListener('touchmove', (event) => {
            const touchX = event.touches[0].clientX;
            const walk = (touchStartX - touchX) * 2;
            carousel.scrollLeft = touchStartScroll + walk;
        }, { passive: true });

        if (previousButton) {
            previousButton.addEventListener('click', () => {
                carousel.scrollLeft -= stepResolver();
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                carousel.scrollLeft += stepResolver();
            });
        }
    }

    const galeria = document.querySelector('.fotos');
    setupDraggableCarousel(
        galeria,
        document.getElementById('galeria-esq'),
        document.getElementById('galeria-dir'),
        function() {
            const width = window.innerWidth;
            if (width >= 1024) {
                return 520;
            }
            if (width >= 768) {
                return 420;
            }
            return 320;
        }
    );

    const videosGaleria = document.querySelector('.videos');
    setupDraggableCarousel(
        videosGaleria,
        document.getElementById('videos-esq'),
        document.getElementById('videos-dir'),
        function() {
            const width = window.innerWidth;
            if (width >= 1024) {
                return 580;
            }
            if (width >= 768) {
                return 420;
            }
            return 320;
        }
    );

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

    // ==================== ANIMACOES EXCLUSIVAS DA INDEX ====================
    if (document.body.classList.contains('page-index')) {
        const revealTargets = document.querySelectorAll('section, .main-button, .highlight-card, .card, .video-item');
        revealTargets.forEach((el) => el.setAttribute('data-reveal', ''));

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.16,
                rootMargin: '0px 0px -10% 0px'
            });

            revealTargets.forEach((target) => observer.observe(target));
        } else {
            revealTargets.forEach((el) => el.classList.add('is-visible'));
        }

        const heroImages = document.querySelectorAll('.fotos-hero img');
        const heroArea = document.querySelector('.galeria-hero-container');

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

        if (heroArea && heroImages.length > 0 && !reduceMotion && !coarsePointer) {
            let pendingFrame = null;
            let pointerEvent = null;

            const animateParallax = function() {
                if (!pointerEvent) {
                    pendingFrame = null;
                    return;
                }

                const bounds = heroArea.getBoundingClientRect();
                const xPct = (pointerEvent.clientX - bounds.left) / bounds.width - 0.5;
                const yPct = (pointerEvent.clientY - bounds.top) / bounds.height - 0.5;

                heroImages.forEach((img, index) => {
                    const depth = (index % 3 + 1) * 5;
                    img.style.transform = 'translate3d(' + (xPct * depth) + 'px, ' + (yPct * depth) + 'px, 0) scale(1.02)';
                });

                pendingFrame = null;
            };

            heroArea.addEventListener('mousemove', function(event) {
                pointerEvent = event;
                if (!pendingFrame) {
                    pendingFrame = requestAnimationFrame(animateParallax);
                }
            }, { passive: true });

            heroArea.addEventListener('mouseleave', function() {
                heroImages.forEach((img) => {
                    img.style.transform = 'translate3d(0, 0, 0) scale(1)';
                });
            });
        }
    }
});

// ==================== MODAL DE TRANSPARÊNCIA ====================

// Dados das parcerias com anexos de exemplo
const parcerias = {
    '2025': {
        id: '2025',
        ano: '2025',
        objeto: 'APOIO FINANCEIRO PARA DESPESAS DE CUSTEIO',
        projeto: 'Festival de Música e Arte Independente Rock Sertão',
        valor: '85.000,00',
        status: 'Executado',
        photo: '../documentos/2024emendaparlamentarestadual/fotogeral24.png',
        attachments: [
    { name: 'Extrato da Proposta.', url: '../documentos/2024emendaparlamentarestadual/extrato-da-proposta.pdf' },
    { name: 'fomento datado e assinado', url: '../documentos/2024emendaparlamentarestadual/fomento-datado-e-assinado.pdf'},
]
    },
    '2023': {
        id: '2023',
        ano: '2023',
        objeto: 'Realizar oficinas de capacitação com circuito de formação na cidade de Nossa Senhora da Glória - SE.',
        projeto: 'CIRCUTO "ROCK SERTÃO" DE FORMAÇÃO',
        valor: '330.000,00',
        status: 'Executado',
        photo: '../documentos/circuitoDeFormacao/fotogeral.png', // ADICIONE A URL DA FOTO AQUI
        attachments: [
    { name: 'Extrato da proposta', url: '../documentos/circuitoDeformacao/ExtratoProposta.pdf' },
    { name: 'Parecer Técnico', url: '../documentos/circuitoDeformacao/parecertecnico.pdf' },
    { name: 'Termo de fomento', url: '../documentos/circuitoDeformacao/termodefomento.pdf' },
]
    },
    '2022': {
        id: '2022',
        ano: '2022',
        objeto: 'Realização do festival "Rock Sertão 2023", na cidade de Nossa Senhora da Glória em Sergipe.',
        projeto: 'ROCK SERTÃO 2023',
        valor: 'R$176.000,00',
        status: 'Executado',
        photo: '../documentos/rocksertao2023/rocksertao2023.png', // ADICIONE A URL DA FOTO AQUI
        attachments: [
    { name: 'Extrato da proposta', url: '../documentos/circuitoDeformacao/ExtratoProposta.pdf' },
    { name: 'Parecer de mérito', url: '../documentos/circuitoDeformacao/parecerdemerito.pdf' },
    { name: 'Termo de fomento', url: '../documentos/circuitoDeformacao/termodefomento.pdf' },
]
    }
};

// Armazenar dados da parceria atual
let currentParty = null;
let isAdmin = false;

function openModal(data) {
    currentParty = parcerias[data.id];
    
    document.getElementById('modalTitle').textContent = `Detalhes - ${data.ano}`;
    document.getElementById('modalAno').textContent = data.ano;
    document.getElementById('modalObjeto').textContent = data.objeto;
    document.getElementById('modalProjeto').textContent = data.projeto;
    document.getElementById('modalValor').textContent = data.valor;
    document.getElementById('modalStatus').textContent = data.status;
    
    // Renderizar foto
    renderPhoto();
    renderAttachments();
    
    document.getElementById('detailsModal').classList.add('show');
}

function closeModal() {
    document.getElementById('detailsModal').classList.remove('show');
    // Limpar input de arquivo
    document.getElementById('photoInput').value = '';
}

function renderPhoto() {
    const container = document.getElementById('imageContainer');
    
    if (currentParty && currentParty.photo) {
        container.innerHTML = `<img src="${currentParty.photo}" alt="Foto da Parceria" onclick="window.open(this.src, '_blank')" title="Abrir imagem em nova aba">`;
    } else {
        container.innerHTML = `
            <svg fill="none" stroke="currentColor" viewbox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>Nenhuma foto adicionada</p>
        `;
    }
    
    // Mostrar/ocultar painel administrativo
    document.getElementById('adminPhotoSection').style.display = isAdmin ? 'block' : 'none';
}

function updatePhoto() {
    const input = document.getElementById('photoInput');
    const file = input.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            if (currentParty) {
                currentParty.photo = e.target.result;
                renderPhoto();
            }
        };
        reader.readAsDataURL(file);
    }
}

function renderAttachments() {
    const attachmentsList = document.getElementById('attachmentsList');
    attachmentsList.innerHTML = '';
    
    if (!currentParty || currentParty.attachments.length === 0) {
        attachmentsList.innerHTML = '<p style="color: #9ca3af; font-size: 14px; margin: 0;">Nenhum anexo adicionado</p>';
        return;
    }
    
    currentParty.attachments.forEach((attachment, index) => {
        const item = document.createElement('div');
        item.className = 'attachment-item';
        item.innerHTML = `
            <div class="attachment-name">
                <svg fill="currentColor" viewbox="0 0 20 20">
                    <path d="M8.5 3.5a2 2 0 00-1.414.586l-5 5a2 2 0 002.828 2.828l.172-.172V7a2 2 0 114 0v5.172l.172-.172a2 2 0 002.828-2.828l-5-5A2 2 0 008.5 3.5zM2 13a2 2 0 100 4h16a2 2 0 100-4H2z" />
                </svg>
                <p>${attachment.name}</p>
            </div>
            <button class="attachment-button" onclick="viewPdf('${attachment.url}', '${attachment.name}')">Visualizar</button>
        `;
        attachmentsList.appendChild(item);
    });
}

function viewPdf(url, name) {
    document.getElementById('pdfTitle').textContent = name;
    document.getElementById('pdfFrame').src = url;
    document.getElementById('pdfViewerModal').classList.add('show');
}

function closePdfViewer() {
    document.getElementById('pdfViewerModal').classList.remove('show');
    document.getElementById('pdfFrame').src = '';
}

// Fechar modais ao clicar fora
window.onclick = function(event) {
    const detailsModal = document.getElementById('detailsModal');
    const pdfModal = document.getElementById('pdfViewerModal');
    
    if (event.target === detailsModal) {
        closeModal();
    }
    if (event.target === pdfModal) {
        closePdfViewer();
    }
}

// Função para adicionar anexo
function addAttachment(partyId, fileName, fileUrl) {
    if (parcerias[partyId]) {
        parcerias[partyId].attachments.push({
            name: fileName,
            url: fileUrl
        });
        renderAttachments();
    }
}

// Ativar modo administrativo
function enableAdminMode() {
    isAdmin = true;
    console.log('✓ Modo Administrativo Ativado!');
    console.log('Edite o arquivo script.js para adicionar as fotos das parcerias no objeto "parcerias".');
    
    // Se um modal está aberto, atualizar para mostrar opções admin
    if (currentParty) {
        renderPhoto();
    }
}

// Função para adicionar foto via URL
function setPhotoUrl(partyId, photoUrl) {
    if (parcerias[partyId]) {
        parcerias[partyId].photo = photoUrl;
        if (currentParty && currentParty.id === partyId) {
            renderPhoto();
        }
        console.log(`Foto adicionada à parceria ${partyId}`);
    }
}


