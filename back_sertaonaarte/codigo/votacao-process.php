<?php
// =====================================================
// PROCESSAR VOTO - Quero Tocar 2026
// =====================================================

require_once __DIR__ . '/db-config.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Método não permitido.']);
    exit;
}

// Ler dados JSON do body
$input = json_decode(file_get_contents('php://input'), true);

$nome = isset($input['nome']) ? trim($input['nome']) : '';
$email = isset($input['email']) ? trim(strtolower($input['email'])) : '';
$banda_id = isset($input['banda_id']) ? trim($input['banda_id']) : '';

// Validações
if (empty($nome) || mb_strlen($nome) > 255) {
    http_response_code(400);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Nome inválido.']);
    exit;
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 255) {
    http_response_code(400);
    echo json_encode(['sucesso' => false, 'mensagem' => 'E-mail inválido.']);
    exit;
}

if (empty($banda_id) || mb_strlen($banda_id) > 100) {
    http_response_code(400);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Banda inválida.']);
    exit;
}

// Validar que a banda existe no config
$configPath = __DIR__ . '/bandas-config.json';
$config = json_decode(file_get_contents($configPath), true);
$bandasValidas = array_column($config['bandas'], 'id');

if (!in_array($banda_id, $bandasValidas)) {
    http_response_code(400);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Banda não encontrada.']);
    exit;
}

// Capturar IP
$ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'desconhecido';
// Pegar apenas o primeiro IP caso haja múltiplos
$ip = explode(',', $ip)[0];
$ip = substr(trim($ip), 0, 45);

try {
    $pdo = getDB();

    $stmt = $pdo->prepare('INSERT INTO votos (nome, email, banda_id, ip_address, data_voto) VALUES (:nome, :email, :banda_id, :ip, NOW())');
    $stmt->execute([
        ':nome' => $nome,
        ':email' => $email,
        ':banda_id' => $banda_id,
        ':ip' => $ip,
    ]);

    echo json_encode(['sucesso' => true, 'mensagem' => 'Voto registrado com sucesso!']);

} catch (PDOException $e) {
    if ($e->getCode() == 23000) {
        // Violação de UNIQUE (e-mail já votou)
        http_response_code(409);
        echo json_encode(['sucesso' => false, 'mensagem' => 'Este e-mail já foi utilizado para votar.']);
    } else {
        http_response_code(500);
        echo json_encode(['sucesso' => false, 'mensagem' => 'Erro interno ao registrar voto.']);
    }
}
