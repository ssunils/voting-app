<?php
header("Content-Type: application/json; charset=UTF-8");

require_once '../db.php';
require_once '../auth.php'; // Just checks if user is logged in (role doesn't matter)

try {
    // Query for the active poll
    $stmt = $pdo->query("
        SELECT id, title, description, poll_options
        FROM polls 
        WHERE active = 1 
        LIMIT 1
    ");
    $poll = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($poll) {
        echo json_encode([
            'success' => true,
            'data' => $poll
        ]);
    } else {
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'message' => 'No active poll found.'
        ]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database error',
        'error' => $e->getMessage()
    ]);
}
