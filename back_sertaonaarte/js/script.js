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
                return 520;
            } else if (width >= 768) {
                return 420;
            } else {
                return 320;
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

        window.addEventListener('resize', () => {

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
                return 580; 
            } else if (width >= 768) {
                return 420; 
            } else {
                return 320; 
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

    // ==================== REVEAL ON SCROLL ====================
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach(element => observer.observe(element));
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


