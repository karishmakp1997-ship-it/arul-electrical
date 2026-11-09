<?php
require_once __DIR__ . '/env.php';
// Values come from the .env file in the project root (see .env.example).
return [
    'host' => getenv('DB_HOST') ?: '127.0.0.1',
    'name' => getenv('DB_NAME') ?: 'arul_electrical',
    // 'mysql' (XAMPP, Aiven) or 'pgsql' (Neon / PostgreSQL)
    'driver' => getenv('DB_DRIVER') ?: 'mysql',
    'port' => getenv('DB_PORT') ?: '',
    'sslmode' => getenv('DB_SSLMODE') ?: 'require',
    // For cloud MySQL (Aiven): path to the CA certificate, e.g. certs/aiven-ca.pem
    'ssl_ca' => getenv('DB_SSL_CA') ?: '',
    'user' => getenv('DB_USER') ?: 'root',
    'pass' => getenv('DB_PASS') ?: '',
    'upload_dir' => __DIR__ . '/uploads',
    'upload_url' => '/uploads/',
];
