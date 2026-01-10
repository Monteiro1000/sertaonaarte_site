document.addEventListener('DOMContentLoaded', function() {
   
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
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            document.getElementById('form-message').style.display = 'block';
            form.reset(); 
        } else {
            alert('Erro ao enviar. Tente novamente.');
        }
    }).catch(error => {
        alert('Erro: ' + error.message);
    });
});


