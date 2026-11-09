<?php
function cfg() { static $c; return $c ?: ($c = require __DIR__ . '/config.php'); }
function db() {
    static $pdo;
    if (!$pdo) {
        $c = cfg();
        $opt = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC];
        if ($c['driver'] === 'pgsql') {          // Neon / PostgreSQL
            $port = $c['port'] ?: '5432';
            $pdo = new PDO("pgsql:host={$c['host']};port=$port;dbname={$c['name']};sslmode={$c['sslmode']}", $c['user'], $c['pass'], $opt);
        } else {                                  // MySQL (XAMPP / Aiven)
            $port = $c['port'] ?: '3306';
            if ($c['ssl_ca']) $opt[PDO::MYSQL_ATTR_SSL_CA] = ($c['ssl_ca'][0] === '/') ? $c['ssl_ca'] : __DIR__ . '/' . $c['ssl_ca'];
            $pdo = new PDO("mysql:host={$c['host']};port=$port;dbname={$c['name']};charset=utf8mb4", $c['user'], $c['pass'], $opt);
        }
    }
    return $pdo;
}
// Full URLs (Cloudinary) are used as they are; local file names get the /uploads/ prefix.
function img_url($v) { if (!$v) return ''; return preg_match('#^https?://#', $v) ? $v : cfg()['upload_url'] . $v; }
// Uploads an image to Cloudinary (used when CLOUDINARY_* env vars are set). Returns the https URL or false.
function cloud_upload($tmp) {
    $cloud = getenv('CLOUDINARY_CLOUD_NAME'); $key = getenv('CLOUDINARY_API_KEY'); $secret = getenv('CLOUDINARY_API_SECRET');
    if (!$cloud || !$key || !$secret || !function_exists('curl_init')) return false;
    $ts = time(); $folder = 'arul';
    $sig = sha1("folder=$folder&timestamp=$ts" . $secret);
    $ch = curl_init("https://api.cloudinary.com/v1_1/$cloud/image/upload");
    curl_setopt_array($ch, [CURLOPT_POST => true, CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 60,
        CURLOPT_POSTFIELDS => ['file' => new CURLFile($tmp), 'api_key' => $key, 'timestamp' => $ts, 'folder' => $folder, 'signature' => $sig]]);
    $res = json_decode((string)curl_exec($ch), true); curl_close($ch);
    return $res['secure_url'] ?? false;
}
function json_out($data, $code = 200) {
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}
