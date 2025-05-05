<?php
session_start(); 
require_once '../cors.php';
require_once '../db.php';
header("Content-Type: application/json");

// Get member ID from session
$memberId = $_SESSION['member_id'] ?? null;

$stmt = $pdo->prepare("SELECT * FROM members WHERE member_id = :member_id");
$stmt->execute([':member_id' => $memberId]);
$member = $stmt->fetch(PDO::FETCH_ASSOC); // Get primary ID

if (!$member['id']) {
    http_response_code(401); // Unauthorized
    echo json_encode(['error' => 'User not authenticated']);
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT p.*
        FROM polls p
        LEFT JOIN polling_history ph 
          ON p.id = ph.poll_id 
          AND ph.member_id = :member_id
        WHERE p.active = 1
          AND ph.id IS NULL
        ORDER BY p.start_date ASC
        LIMIT 1
    ");

    $stmt->execute([
        ':member_id' => $member['id'],
    ]);

    $poll = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($poll) {
        echo json_encode(['poll' => $poll]);
    } else {
        echo json_encode(['poll' => null, 'message' => 'No available polls']);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>