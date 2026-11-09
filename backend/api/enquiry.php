<?php
require __DIR__ . '/../db.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_out(['ok' => false], 405);
$d = json_decode(file_get_contents('php://input'), true) ?: $_POST;
$v = fn($k) => trim((string)($d[$k] ?? ''));
$err = [];
if ($v('full_name') === '') $err['full_name'] = 'Enter your full name.';
if ($v('company') === '') $err['company'] = 'Enter your company or organization.';
if (!preg_match('/^[+\d\s()\-]{7,20}$/', $v('mobile'))) $err['mobile'] = 'Enter a valid mobile number.';
if (!filter_var($v('email'), FILTER_VALIDATE_EMAIL)) $err['email'] = 'Enter a valid email address.';
if ($v('scope') === '') $err['scope'] = 'Describe your project scope.';
if ($err) json_out(['ok' => false, 'errors' => $err], 422);
// Robot verification (Google reCAPTCHA v2). Skipped only if RECAPTCHA_SECRET is empty in .env.
$secret = getenv('RECAPTCHA_SECRET');
if ($secret) {
    $tok = trim((string)($d['captcha'] ?? '')); $ok = false;
    if ($tok !== '') {
        $post = http_build_query(['secret' => $secret, 'response' => $tok, 'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '']);
        $ctx = stream_context_create(['http' => ['method' => 'POST', 'header' => "Content-type: application/x-www-form-urlencoded\r\n", 'content' => $post, 'timeout' => 8]]);
        $res = @file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, $ctx);
        $ok = $res && (json_decode($res, true)['success'] ?? false);
    }
    if (!$ok) json_out(['ok' => false, 'error' => 'Robot verification failed. Please tick "I\'m not a robot" and try again.'], 422);
}
try {
    db()->prepare('INSERT INTO enquiries (full_name,company,mobile,email,voltage,equipment,site_location,scope) VALUES (?,?,?,?,?,?,?,?)')
        ->execute([$v('full_name'), $v('company'), $v('mobile'), $v('email'), $v('voltage'), $v('equipment'), $v('site_location'), $v('scope')]);
    json_out(['ok' => true]);
} catch (Throwable $e) {
    json_out(['ok' => false, 'error' => 'Could not save. Please call our hotline.'], 500);
}
