<?php
require __DIR__ . '/_lib.php'; require_login();
$T = require __DIR__ . '/tables.php'; $pdo = db(); $c = cfg();
$t = $_GET['t'] ?? ''; $id = isset($_GET['id']) ? (int)$_GET['id'] : 0; $new = isset($_GET['new']);

function upload($name, $dir) {
    if (empty($_FILES[$name]['name']) || $_FILES[$name]['error'] !== UPLOAD_ERR_OK) return null;
    $f = $_FILES[$name]; $ext = strtolower(pathinfo($f['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, ['jpg','jpeg','png','webp','gif'], true) || $f['size'] > 5 * 1024 * 1024) return false;
    $mime = (new finfo(FILEINFO_MIME_TYPE))->file($f['tmp_name']);
    if (strpos($mime, 'image/') !== 0) return false;
    if (getenv('CLOUDINARY_CLOUD_NAME')) return cloud_upload($f['tmp_name']);
    $fn = bin2hex(random_bytes(8)) . '.' . $ext;
    return move_uploaded_file($f['tmp_name'], $dir . '/' . $fn) ? $fn : false;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    check_csrf(); $pt = $_POST['t'] ?? '';
    if ($pt === 'enquiries' && ($_POST['do'] ?? '') === 'delete') {
        $pdo->prepare('DELETE FROM enquiries WHERE id=?')->execute([(int)$_POST['id']]); flash('Enquiry deleted.'); header('Location: index.php?t=enquiries'); exit;
    }
    if (!isset($T[$pt])) exit('Unknown section.');
    $cfgT = $T[$pt]; $single = !empty($cfgT['single']); $pid = $single ? 1 : (int)($_POST['id'] ?? 0);
    if (($_POST['do'] ?? '') === 'delete' && !$single) {
        $pdo->prepare("DELETE FROM $pt WHERE id=?")->execute([$pid]); flash('Deleted.'); header("Location: index.php?t=$pt"); exit;
    }
    $cols = []; $vals = []; $bad = false;
    foreach ($cfgT['fields'] as $f) {
        [$n, , $type] = $f;
        if ($type === 'image') {
            $up = upload($n, $c['upload_dir']);
            if ($up === false) { $bad = true; continue; }
            if ($up) { $cols[] = $n; $vals[] = $up; } elseif (!empty($_POST["remove_$n"])) { $cols[] = $n; $vals[] = ''; }
        } elseif ($type === 'checkbox') { $cols[] = $n; $vals[] = empty($_POST[$n]) ? 0 : 1; }
        else { $cols[] = $n; $vals[] = trim($_POST[$n] ?? ''); }
    }
    if (!$single) { $cols[] = 'sort_order'; $vals[] = (int)($_POST['sort_order'] ?? 0); }
    if ($pid) {
        $pdo->prepare("UPDATE $pt SET " . implode(',', array_map(fn($x) => "$x=?", $cols)) . ' WHERE id=?')->execute([...$vals, $pid]);
    } else {
        $pdo->prepare("INSERT INTO $pt (" . implode(',', $cols) . ') VALUES (' . implode(',', array_fill(0, count($cols), '?')) . ')')->execute($vals);
    }
    flash($bad ? 'Saved, but an image was rejected (use JPG/PNG/WEBP under 5 MB).' : 'Saved.'); header('Location: index.php?t=' . $pt . ($single ? '' : '')); exit;
}

page_top($t ? ($T[$t]['label'] ?? 'Enquiries') : 'Dashboard'); nav($T); echo '<main>';
if ($m = flash()) echo '<div class="flash">' . h($m) . '</div>';

if ($t === '') {
    echo '<h2>Dashboard</h2><div class="grid">';
    foreach ($T as $k => $x) { if (!empty($x['single'])) { echo '<a class="stat" href="index.php?t=settings"><b>⚙</b>' . h($x['label']) . '</a>'; continue; }
        echo '<a class="stat" href="index.php?t=' . h($k) . '"><b>' . (int)$pdo->query("SELECT COUNT(*) FROM $k")->fetchColumn() . '</b>' . h($x['label']) . '</a>'; }
    echo '<a class="stat" href="index.php?t=enquiries"><b>' . (int)$pdo->query('SELECT COUNT(*) FROM enquiries')->fetchColumn() . '</b>Enquiries</a></div>';
} elseif ($t === 'enquiries') {
    echo '<div class="card"><h2>Enquiries</h2><div style="overflow:auto"><table><tr><th>Date</th><th>Name</th><th>Company</th><th>Mobile</th><th>Email</th><th>Voltage</th><th>Equipment</th><th>Site</th><th>Scope</th><th></th></tr>';
    foreach ($pdo->query('SELECT * FROM enquiries ORDER BY id DESC') as $e) {
        echo '<tr><td>' . h($e['created_at']) . '</td><td>' . h($e['full_name']) . '</td><td>' . h($e['company']) . '</td><td>' . h($e['mobile']) . '</td><td>' . h($e['email']) . '</td><td>' . h($e['voltage']) . '</td><td>' . h($e['equipment']) . '</td><td>' . h($e['site_location']) . '</td><td>' . nl2br(h($e['scope'])) . '</td>'
           . '<td><form method="post" onsubmit="return confirm(\'Delete this enquiry?\')"><input type="hidden" name="csrf" value="' . h(csrf()) . '"><input type="hidden" name="t" value="enquiries"><input type="hidden" name="do" value="delete"><input type="hidden" name="id" value="' . (int)$e['id'] . '"><button class="btn r s">Delete</button></form></td></tr>';
    }
    echo '</table></div></div>';
} elseif (isset($T[$t])) {
    $cfgT = $T[$t]; $single = !empty($cfgT['single']);
    if ($single || $id || $new) {
        $row = $single ? $pdo->query("SELECT * FROM $t WHERE id=1")->fetch() : ($id ? $pdo->query("SELECT * FROM $t WHERE id=" . $id)->fetch() : []);
        $row = $row ?: [];
        echo '<div class="card"><h2>' . h($cfgT['label']) . ($single ? '' : ($id ? ' – Edit' : ' – Add new')) . '</h2><form method="post" enctype="multipart/form-data">'
           . '<input type="hidden" name="csrf" value="' . h(csrf()) . '"><input type="hidden" name="t" value="' . h($t) . '"><input type="hidden" name="id" value="' . $id . '">';
        foreach ($cfgT['fields'] as $f) {
            [$n, $label, $type] = $f; $val = $row[$n] ?? ''; echo '<label>' . h($label) . '</label>';
            if ($type === 'textarea') echo '<textarea name="' . $n . '">' . h($val) . '</textarea>';
            elseif ($type === 'select') { echo '<select name="' . $n . '">'; foreach ($f[3] as $o) echo '<option' . ($o === $val ? ' selected' : '') . '>' . h($o) . '</option>'; echo '</select>'; }
            elseif ($type === 'checkbox') echo '<input type="checkbox" name="' . $n . '" value="1"' . ($val ? ' checked' : '') . '> Yes';
            elseif ($type === 'image') { if ($val) echo '<p><img class="th" style="height:90px" src="' . h(img_url($val)) . '"> <label style="display:inline;font-weight:400"><input type="checkbox" name="remove_' . $n . '" value="1"> remove</label></p>'; echo '<input type="file" name="' . $n . '" accept="image/*">'; }
            else echo '<input type="text" name="' . $n . '" value="' . h($val) . '">';
        }
        if (!$single) echo '<label>Order (lower shows first)</label><input type="number" name="sort_order" value="' . (int)($row['sort_order'] ?? 0) . '">';
        echo '<p><button class="btn y">Save</button> ' . ($single ? '' : '<a class="btn" href="index.php?t=' . h($t) . '">Back</a>') . '</p></form></div>';
    } else {
        $first = $cfgT['fields'][0][0]; $title = $cfgT['fields'][1][0]; $hasImg = false; foreach ($cfgT['fields'] as $f) if ($f[2] === 'image') { $hasImg = $f[0]; }
        echo '<div class="card"><div class="row"><h2 style="margin:0">' . h($cfgT['label']) . '</h2><a class="btn y" href="index.php?t=' . h($t) . '&new=1" style="margin-left:auto">+ Add new</a></div><table><tr>' . ($hasImg ? '<th>Image</th>' : '') . '<th>Title</th><th>Order</th><th></th></tr>';
        foreach ($pdo->query("SELECT * FROM $t ORDER BY sort_order, id") as $r) {
            $label = $r['title'] ?? ($r['name'] ?? $r[$first]);
            echo '<tr>' . ($hasImg ? '<td>' . ($r[$hasImg] ? '<img class="th" src="' . h(img_url($r[$hasImg])) . '">' : '–') . '</td>' : '') . '<td>' . h($label) . '</td><td>' . (int)$r['sort_order'] . '</td><td class="row"><a class="btn s" href="index.php?t=' . h($t) . '&id=' . (int)$r['id'] . '">Edit</a>'
               . '<form method="post" onsubmit="return confirm(\'Delete this item?\')"><input type="hidden" name="csrf" value="' . h(csrf()) . '"><input type="hidden" name="t" value="' . h($t) . '"><input type="hidden" name="do" value="delete"><input type="hidden" name="id" value="' . (int)$r['id'] . '"><button class="btn r s">Delete</button></form></td></tr>';
        }
        echo '</table></div>';
    }
}
echo '</main></body></html>';
