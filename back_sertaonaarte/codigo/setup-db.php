<?php
// =====================================================
// CRIAR TABELA DE VOTOS
// =====================================================
// Execute este arquivo UMA VEZ pelo navegador para criar a tabela.
// Acesse: https://seudominio.com.br/codigo/setup-db.php
// Depois de criar, pode apagar este arquivo por segurança.
// =====================================================

require_once __DIR__ . '/db-config.php';

header('Content-Type: application/json; charset=utf-8');

try {
    $pdo = getDB();

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS votos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            banda_id VARCHAR(100) NOT NULL,
            ip_address VARCHAR(45) DEFAULT NULL,
            data_voto DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            UNIQUE KEY unique_email (email)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    echo json_encode([
        'sucesso' => true,
        'mensagem' => 'Tabela "votos" criada com sucesso! Você pode apagar este arquivo agora.'
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'sucesso' => false,
        'mensagem' => 'Erro ao criar tabela: ' . $e->getMessage()
    ]);
}
