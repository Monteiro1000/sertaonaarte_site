<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Metodo nao permitido']);
    exit;
}

$smtpHost = 'smtp.hostinger.com';
$smtpPort = 465;
$smtpSecure = 'ssl';
$smtpUser = 'sertaonaarte@sertaonaarte.com.br';
$smtpPass = 'Rock ecultura123#';

$toEmail = 'sertaonaarte@sertaonaarte.com.br';
$fromEmail = $smtpUser;
$fromName = 'Inscricao Quero Tocar';

$requiredFields = [
    'nomeResponsavel',
    'nomeArtistico',
    'cpfCnpj',
    'cidadeUF',
    'enderecoCompleto',
    'telefoneContato',
    'emailContato',
    'nomeApresentacao',
    'cidadeOrigem',
    'formatoApresentacao',
    'generosPredom',
    'releaseArtistico',
    'conceitoApresentacao',
    'repertorioPrevisto',
    'apresentacoesRealizadas',
    'participacaoEventos',
    'videoAoVivo',
    'linksAudio',
    'redesSociais',
    'linkFotos',
    'integrantesFuncoes',
    'mapaPalco',
    'riderTecnico',
    'termos'
];

$fields = [];
foreach ($_POST as $key => $value) {
    if (is_string($value)) {
        $fields[$key] = trim($value);
    }
}

$missing = [];
foreach ($requiredFields as $field) {
    if (!isset($fields[$field]) || $fields[$field] === '') {
        $missing[] = $field;
    }
}

if (!empty($missing)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Campos obrigatorios ausentes', 'fields' => $missing]);
    exit;
}

$emailContato = filter_var($fields['emailContato'], FILTER_VALIDATE_EMAIL);
if ($emailContato === false) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'E-mail invalido']);
    exit;
}

$replyTo = $emailContato;
$replyToName = $fields['nomeResponsavel'] ?? '';

$subjectAdmin = 'Nova inscricao - Quero Tocar 2026';
$subjectUser = 'Confirmacao de inscricao - Quero Tocar 2026';

$bodyLines = [];
foreach ($fields as $key => $value) {
    if ($key === 'termos') {
        $value = 'Sim';
    }
    $label = humanize_key($key);
    $bodyLines[] = $label . ': ' . $value;
}

$bodyText = "Nova inscricao recebida:\n\n" . implode("\n", $bodyLines);
$bodyHtml = "<h2>Nova inscricao recebida</h2><table cellpadding=\"6\" cellspacing=\"0\" border=\"0\" style=\"width:100%; border-collapse: collapse;\">";
foreach ($bodyLines as $line) {
    $parts = explode(': ', $line, 2);
    $label = htmlspecialchars($parts[0] ?? '', ENT_QUOTES, 'UTF-8');
    $value = htmlspecialchars($parts[1] ?? '', ENT_QUOTES, 'UTF-8');
    $bodyHtml .= "<tr><td style=\"border-bottom:1px solid #e5e7eb; font-weight:600; width:35%;\">{$label}</td><td style=\"border-bottom:1px solid #e5e7eb;\">{$value}</td></tr>";
}
$bodyHtml .= "</table>";

$adminSent = smtp_send_mail(
    $smtpHost,
    $smtpPort,
    $smtpSecure,
    $smtpUser,
    $smtpPass,
    $fromEmail,
    $fromName,
    $toEmail,
    'Sertao na Arte',
    $replyTo,
    $replyToName,
    $subjectAdmin,
    $bodyText,
    $bodyHtml
);

if (!$adminSent) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Falha ao enviar e-mail']);
    exit;
}

$userBodyText = "Seu projeto musical foi inscrito com sucesso no Quero Tocar no Rock Sertão! 🎸

Agradecemos muito pelo seu interesse e por fazer parte dessa iniciativa que valoriza a música e os talentos da nossa cena. Acompanhe em nossas redes as demais etapas do Quero Tocar.

Seguimos juntos fortalecendo a música, a arte e a cultura no nosso país. Obrigado por participar!.\n\nResumo da sua inscricao:\n\n" . implode("\n", $bodyLines);
$userBodyHtml = "<p>Recebemos sua inscricao no Quero Tocar 2026. Em breve entraremos em contato.</p>" . $bodyHtml;

smtp_send_mail(
    $smtpHost,
    $smtpPort,
    $smtpSecure,
    $smtpUser,
    $smtpPass,
    $fromEmail,
    $fromName,
    $emailContato,
    $replyToName,
    $fromEmail,
    $fromName,
    $subjectUser,
    $userBodyText,
    $userBodyHtml
);

http_response_code(200);
echo json_encode(['ok' => true]);

function humanize_key(string $key): string
{
    $label = str_replace(['_', '-'], ' ', $key);
    $label = preg_replace('/([a-z])([A-Z])/', '$1 $2', $label);
    return ucwords($label);
}

function smtp_send_mail(
    string $host,
    int $port,
    string $secure,
    string $username,
    string $password,
    string $fromEmail,
    string $fromName,
    string $toEmail,
    string $toName,
    string $replyTo,
    string $replyToName,
    string $subject,
    string $textBody,
    string $htmlBody
): bool {
    $fromName = sanitize_header_value($fromName);
    $toName = sanitize_header_value($toName);
    $subject = sanitize_header_value($subject);
    $replyToName = sanitize_header_value($replyToName);

    $boundary = 'b1_' . bin2hex(random_bytes(8));

    $headers = [
        "From: {$fromName} <{$fromEmail}>",
        "To: {$toName} <{$toEmail}>",
        "Reply-To: {$replyToName} <{$replyTo}>",
        'MIME-Version: 1.0',
        "Content-Type: multipart/alternative; boundary=\"{$boundary}\""
    ];

    $message = "Subject: {$subject}\r\n";
    $message .= implode("\r\n", $headers) . "\r\n\r\n";
    $message .= "--{$boundary}\r\n";
    $message .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
    $message .= $textBody . "\r\n\r\n";
    $message .= "--{$boundary}\r\n";
    $message .= "Content-Type: text/html; charset=UTF-8\r\n\r\n";
    $message .= $htmlBody . "\r\n\r\n";
    $message .= "--{$boundary}--\r\n";

    $remote = $secure === 'ssl' ? "ssl://{$host}:{$port}" : "{$host}:{$port}";
    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => true,
            'verify_peer_name' => true,
            'allow_self_signed' => false
        ]
    ]);

    $fp = @stream_socket_client($remote, $errno, $errstr, 20, STREAM_CLIENT_CONNECT, $context);
    if (!$fp) {
        return false;
    }

    stream_set_timeout($fp, 20);

    if (!smtp_expect($fp, 220)) {
        fclose($fp);
        return false;
    }

    $ehloHost = $_SERVER['SERVER_NAME'] ?? 'localhost';
    if (!smtp_command($fp, "EHLO {$ehloHost}", 250)) {
        fclose($fp);
        return false;
    }

    if ($secure === 'tls') {
        if (!smtp_command($fp, 'STARTTLS', 220)) {
            fclose($fp);
            return false;
        }
        if (!stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            fclose($fp);
            return false;
        }
        if (!smtp_command($fp, "EHLO {$ehloHost}", 250)) {
            fclose($fp);
            return false;
        }
    }

    if (!smtp_command($fp, 'AUTH LOGIN', 334)) {
        fclose($fp);
        return false;
    }
    if (!smtp_command($fp, base64_encode($username), 334)) {
        fclose($fp);
        return false;
    }
    if (!smtp_command($fp, base64_encode($password), 235)) {
        fclose($fp);
        return false;
    }

    if (!smtp_command($fp, "MAIL FROM:<{$fromEmail}>", 250)) {
        fclose($fp);
        return false;
    }
    if (!smtp_command($fp, "RCPT TO:<{$toEmail}>", 250)) {
        fclose($fp);
        return false;
    }
    if (!smtp_command($fp, 'DATA', 354)) {
        fclose($fp);
        return false;
    }

    fwrite($fp, $message . "\r\n.\r\n");
    if (!smtp_expect($fp, 250)) {
        fclose($fp);
        return false;
    }

    smtp_command($fp, 'QUIT', 221);
    fclose($fp);
    return true;
}

function smtp_command($fp, string $command, int $expectedCode): bool
{
    fwrite($fp, $command . "\r\n");
    return smtp_expect($fp, $expectedCode);
}

function smtp_expect($fp, int $expectedCode): bool
{
    $response = '';
    while (!feof($fp)) {
        $line = fgets($fp, 515);
        if ($line === false) {
            break;
        }
        $response .= $line;
        if (preg_match('/^\d{3} /', $line)) {
            break;
        }
    }

    return (int)substr($response, 0, 3) === $expectedCode;
}

function sanitize_header_value(string $value): string
{
    $value = str_replace(["\r", "\n"], ' ', $value);
    return trim($value);
}
