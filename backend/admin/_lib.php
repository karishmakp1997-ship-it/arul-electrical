<?php
require __DIR__ . '/../db.php';
session_start();
function h($s) { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }
function logged_in() { return !empty($_SESSION['admin']); }
function require_login() { if (!logged_in()) { header('Location: login.php'); exit; } }
function csrf() { return $_SESSION['csrf'] ?? ($_SESSION['csrf'] = bin2hex(random_bytes(16))); }
function check_csrf() { if (!hash_equals(csrf(), $_POST['csrf'] ?? '')) { http_response_code(400); exit('Invalid request token.'); } }
function flash($m = null) { if ($m !== null) { $_SESSION['flash'] = $m; return; } $f = $_SESSION['flash'] ?? ''; unset($_SESSION['flash']); return $f; }
function page_top($title) { ?><!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title><?= h($title) ?> | ARUL Admin</title><style>
*{box-sizing:border-box}body{margin:0;font:15px/1.5 system-ui,Segoe UI,sans-serif;background:#f4f2fa;color:#2a1650}
a{color:#4a0a8a;text-decoration:none}header{background:#3b0a6e;color:#fff;padding:14px 24px;display:flex;gap:18px;align-items:center;flex-wrap:wrap}
header b{color:#f6c000;font-size:18px;margin-right:12px}header a{color:#e9defa;font-size:14px}header a:hover{color:#f6c000}
main{max-width:1100px;margin:24px auto;padding:0 20px}.card{background:#fff;border-radius:12px;padding:22px;box-shadow:0 2px 10px rgba(60,10,110,.08);margin-bottom:20px}
table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:10px 8px;border-bottom:1px solid #eee;vertical-align:top;font-size:14px}th{color:#6b4fa0;font-size:12px;text-transform:uppercase}
.btn{display:inline-block;background:#3b0a6e;color:#fff;border:0;border-radius:8px;padding:10px 18px;cursor:pointer;font:600 14px system-ui}.btn.y{background:#f6c000;color:#3b0a6e}.btn.r{background:#b42318}.btn.s{padding:6px 12px;font-size:13px}
label{display:block;font-weight:600;margin:14px 0 4px}input[type=text],input[type=password],input[type=number],select,textarea{width:100%;padding:10px 12px;border:1px solid #d8d0ea;border-radius:8px;font:inherit}
textarea{min-height:110px}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:16px}.stat{background:#fff;border-radius:12px;padding:20px;box-shadow:0 2px 10px rgba(60,10,110,.08)}.stat b{font-size:28px;display:block;color:#3b0a6e}
.flash{background:#e6f6ea;color:#14532d;padding:10px 16px;border-radius:8px;margin-bottom:16px}.err{background:#fde8e8;color:#8a1c1c}img.th{height:44px;border-radius:6px}.row{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
</style></head><body><?php }
function nav($T) { ?><header><b>ARUL Admin</b><a href="index.php">Dashboard</a><?php foreach ($T as $k => $t): ?><a href="index.php?t=<?= h($k) ?>"><?= h($t['label']) ?></a><?php endforeach; ?><a href="index.php?t=enquiries">Enquiries</a><a href="logout.php" style="margin-left:auto">Logout</a></header><?php }
