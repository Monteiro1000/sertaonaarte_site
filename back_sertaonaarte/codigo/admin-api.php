<?php
// =====================================================
// API ADMIN - Votação Quero Tocar 2026
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

$input = json_decode(file_get_contents('php://input'), true);
$acao = isset($input['acao']) ? $input['acao'] : '';
$senha = isset($input['senha']) ? $input['senha'] : '';

// Verificar senha admin
if ($senha !== ADMIN_SENHA) {
    http_response_code(401);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Senha inválida.']);
    exit;
}

$pdo = getDB();

switch ($acao) {
    case 'listar':
        $stmt = $pdo->query('SELECT id, nome, email, banda_id, ip_address, data_voto FROM votos ORDER BY data_voto DESC');
        $votos = $stmt->fetchAll();

        // Contagem por banda
        $stmtContagem = $pdo->query('SELECT banda_id, COUNT(*) as total FROM votos GROUP BY banda_id');
        $contagem = [];
        foreach ($stmtContagem->fetchAll() as $row) {
            $contagem[$row['banda_id']] = (int)$row['total'];
        }

        // Total
        $stmtTotal = $pdo->query('SELECT COUNT(*) as total FROM votos');
        $total = (int)$stmtTotal->fetch()['total'];

        echo json_encode([
            'sucesso' => true,
            'votos' => $votos,
            'contagem' => $contagem,
            'total' => $total,
        ]);
        break;

    case 'limpar':
        $pdo->exec('DELETE FROM votos');
        $pdo->exec('ALTER TABLE votos AUTO_INCREMENT = 1');
        echo json_encode(['sucesso' => true, 'mensagem' => 'Todos os votos foram removidos.']);
        break;

    case 'login':
        echo json_encode(['sucesso' => true, 'mensagem' => 'Autenticado com sucesso.']);
        break;

    default:
        http_response_code(400);
        echo json_encode(['sucesso' => false, 'mensagem' => 'Ação inválida.']);
        break;
}
