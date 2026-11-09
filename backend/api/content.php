<?php
require __DIR__ . '/../db.php';
$imgKeys = ['image', 'photo', 'logo', 'hero_image', 'about_image', 'why_image'];
$base = cfg()['upload_url'];
function fix($row, $imgKeys, $base) {
    foreach ($imgKeys as $k) if (isset($row[$k])) $row[$k] = img_url($row[$k]);
    return $row;
}
try {
    $pdo = db();
    $out = ['settings' => fix($pdo->query('SELECT * FROM settings WHERE id=1')->fetch() ?: [], $imgKeys, $base)];
    foreach (['capabilities','about_points','services','equipment','why_points','projects','process_steps','testimonials','faqs'] as $t) {
        $rows = $pdo->query("SELECT * FROM $t ORDER BY sort_order, id")->fetchAll();
        $out[$t] = array_map(function ($r) use ($imgKeys, $base) {
            $r = fix($r, $imgKeys, $base);
            if (isset($r['bullets'])) $r['bullets'] = array_values(array_filter(array_map('trim', preg_split('/\R/', $r['bullets']))));
            return $r;
        }, $rows);
    }
    json_out($out);
} catch (Throwable $e) {
    json_out(['error' => 'Database error. Check backend/config.php and import schema.sql.'], 500);
}
