<?php
require_once 'cors.php';
session_start();
require_once 'db.php';

if (!isset($_SESSION['user_id']) || !isset($_SESSION['role'])) {
    http_response_code(401);
    echo json_encode(['message' => 'Not logged in']);
    exit;
}

$userId = $_SESSION['user_id'];
$role = $_SESSION['role'];
$table = ($role === 'admin') ? 'admin' : 'members';

try {
    // Set is_online = 0
    $updateOnline = $pdo->prepare("UPDATE $table SET is_online = 0 WHERE id = :id");
    $updateOnline->execute([':id' => $userId]);

    // Destroy session
    session_unset();
    session_destroy();

    echo json_encode(['success' => true, 'message' => 'Logged out successfully']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Logout failed', 'error' => $e->getMessage()]);
}
?>
