<?php
require __DIR__ . '/_lib.php';
$pdo = db(); $first = (int)$pdo->query('SELECT COUNT(*) FROM admins')->fetchColumn() === 0; $error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    check_csrf();
    $u = trim($_POST['username'] ?? ''); $p = $_POST['password'] ?? '';
    if ($first) {
        if (strlen($u) < 3 || strlen($p) < 8) $error = 'Username 3+ characters and password 8+ characters required.';
        else { $pdo->prepare('INSERT INTO admins (username,password_hash) VALUES (?,?)')->execute([$u, password_hash($p, PASSWORD_DEFAULT)]); $first = false; flash('Admin created. Log in now.'); header('Location: login.php'); exit; }
    } else {
        $s = $pdo->prepare('SELECT * FROM admins WHERE username=?'); $s->execute([$u]); $a = $s->fetch();
        if ($a && password_verify($p, $a['password_hash'])) { session_regenerate_id(true); $_SESSION['admin'] = $a['id']; header('Location: index.php'); exit; }
        $error = 'Wrong username or password.';
    }
}
page_top('Login'); $f = flash(); ?>
<main style="max-width:420px"><div class="card"><h2><?= $first ? 'Create admin account' : 'Admin login' ?></h2>
<?php if ($f): ?><div class="flash"><?= h($f) ?></div><?php endif; if ($error): ?><div class="flash err"><?= h($error) ?></div><?php endif; ?>
<form method="post"><input type="hidden" name="csrf" value="<?= h(csrf()) ?>">
<label>Username</label><input type="text" name="username" required autofocus>
<label>Password</label><input type="password" name="password" required>
<p><button class="btn" type="submit"><?= $first ? 'Create admin' : 'Login' ?></button></p></form></div></main></body></html>
