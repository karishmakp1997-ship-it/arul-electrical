<?php
// Loads KEY=VALUE pairs from the project-root .env file (kept OUTSIDE the web root).
function load_env($file) {
    if (!is_readable($file)) return;
    foreach (file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || $line[0] === '#' || strpos($line, '=') === false) continue;
        [$k, $v] = array_map('trim', explode('=', $line, 2));
        $v = trim($v, "\"'");
        if (getenv($k) === false) { putenv("$k=$v"); $_ENV[$k] = $v; }
    }
}
load_env(__DIR__ . '/../.env');
