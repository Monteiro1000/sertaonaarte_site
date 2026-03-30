<?php
// =====================================================
// CONFIGURAÇÃO DO BANCO DE DADOS - SERTÃO NA ARTE
// =====================================================
// Preencha com as credenciais do seu banco MySQL na Hostinger.
// Você encontra essas informações no painel da Hostinger:
// hPanel > Banco de Dados > MySQL
// =====================================================

define('DB_HOST', 'localhost');              // Host do banco (geralmente localhost na Hostinger)
define('DB_NAME', 'SEU_BANCO_AQUI');        // Nome do banco de dados
define('DB_USER', 'SEU_USUARIO_AQUI');      // Usuário do banco
define('DB_PASS', 'SUA_SENHA_AQUI');        // Senha do banco

// Senha do painel admin (texto puro — será comparada via password_verify com hash)
define('ADMIN_SENHA', 'sertaonaarte2026');

// =====================================================
// NÃO EDITE ABAIXO DESTA LINHA
// =====================================================

function getDB() {
    try {
        $pdo = new PDO(
            'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]
        );
        return $pdo;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['sucesso' => false, 'mensagem' => 'Erro de conexão com o banco de dados.']);
        exit;
    }
}
