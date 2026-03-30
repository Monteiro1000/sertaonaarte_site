# 🚀 Quick Start - Ativar Sistema de Votação

## ⏱️ Tempo estimado: 15 minutos

### Passo 1: Google reCAPTCHA (3 min)
```
1. Acesse: https://www.google.com/recaptcha/admin
2. Clique em "+"
3. Nome: "Quero Tocar 2026 Votação"
4. Tipo: reCAPTCHA v3
5. Domínio: sertaonaarte.com.br
6. Aceite termos
7. Copie:
   - SITE KEY → para votacao.html
   - SECRET KEY → para votacao-process.php
```

### Passo 2: Senha Admin (2 min)
```bash
# No Terminal/PowerShell:
php -r "echo password_hash('sua_senha_aqui', PASSWORD_BCRYPT);"

# Copie o resultado (algo como: $2y$10$...)
# Cole em: codigo/admin-votos.php linha 13
```

### Passo 3: Diretório de Votos (2 min)
```bash
# No Terminal/PowerShell:
mkdir back_sertaonaarte\.votos
```

### Passo 4: Atualizar Configurações (5 min)

**Arquivo:** `codigo/votacao-process.php` (linha 17)
```php
define('RECAPTCHA_SECRET_KEY', 'COLE_SUA_SECRET_KEY_AQUI');
```

**Arquivo:** `paginas/votacao.html` (linha ~330)
```html
<div class="g-recaptcha" data-sitekey="COLE_SUA_SITE_KEY_AQUI" data-action="votacao_banda"></div>
```

**Arquivo:** `paginas/votacao.html` (linha ~433)
```javascript
grecaptcha.execute('COLE_SUA_SITE_KEY_AQUI', { action: 'votacao_banda' })
```

**Arquivo:** `codigo/admin-votos.php` (linha 13)
```php
define('ADMIN_PASSWORD_HASH', 'COLE_O_HASH_GERADO_AQUI');
```

### Passo 5: Testar Local (3 min)
```
1. Abra: http://localhost/paginas/votacao.html
2. Selecione uma banda
3. Preencha nome e e-mail
4. Clique "Enviar Votação"
5. Você deve ver: ✓ Votação registrada com sucesso!
6. Teste novamente com mesmo e-mail (deve rejeitar)
```

### Passo 6: Testar Admin (3 min)
```
1. Abra: http://localhost/codigo/admin-votos.php
2. Digite sua senha
3. Você deve ver o ranking das bandas
4. Confirme que aparecem os votos de teste
```

### Passo 7: Deploy em Produção (5 min)
```
1. Fazer upload de todos os arquivos via FTP/Github
2. Criar pasta .votos no servidor
3. Testar acesso em: https://sertaonaarte.com.br/paginas/votacao.html
4. Verificar se reCAPTCHA está funcionando
5. Testar admin: https://sertaonaarte.com.br/codigo/admin-votos.php
```

---

## ✅ Checklist de Validação

- [ ] reCAPTCHA funciona (mostra aviso "Protegido por reCAPTCHA")
- [ ] Votação e-mail: rejeita dados duplicados
- [ ] Votação IP: rejeita do mesmo dispositivo
- [ ] Admin: faz login com senha
- [ ] Admin: mostra votos e ranking
- [ ] Link "Votação" aparece no menu
- [ ] Card "Votação Popular" aparece em destaques
- [ ] HTTPS está ativo (verde no navegador)

---

## 🛠️ Erros Comuns e Soluções

### ❌ "Validação de segurança falhou"
**Solução:** Verificar se Secret Key está correta em `votacao-process.php`

### ❌ "Arquivo .votos não encontrado"
**Solução:** Criar pasta manualmente ou alterar permissões (chmod 755)

### ❌ "Votação não carrega bandas"
**Solução:** Verificar se `bandas-config.json` é JSON válido (usar https://jsonlint.com)

### ❌ "Admin não deixa fazer login"
**Solução:** Gerar novo hash de senha e atualizar em `admin-votos.php`

### ❌ "reCAPTCHA não funciona"
**Solução:** Confirmar domínio em https://www.google.com/recaptcha/admin (deve estar autorizado)

---

## 📱 Testar em Móvel

1. **Local**: Acessar IP da máquina: `http://192.168.1.XX/paginas/votacao.html`
2. **Produção**: Testar em celular real a URL final

---

## 🎯 Próximos Passos (Opcionais)

- [ ] Configurar e-mail de confirmação
- [ ] Adicionar export em Excel
- [ ] Integrar analytics
- [ ] Publicar resultado final
- [ ] Criar certificado digital para vencedor

---

## 📞 Debug Mode

Se algo não funcionar, abra o console (F12) e procure por:
```javascript
// Deve aparecer uma mensagem de sucesso/erro
console.log('Votação enviada')
```

Verifique também os logs PHP do servidor em:
```
/var/log/php.log  (Linux)
C:\logs\php.log   (Windows)
```

---

**⏰ Tudo pronto em ~15 minutos!**  
**🎉 Sistema online e testado!**
