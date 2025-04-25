<?php
header('Content-Type: application/json');

require_once '../db.php';      // DB connection
require_once '../auth_admin.php';    // Auth check

try {
    // Query to fetch members list
    $stmt = $pdo->query("SELECT id, name, email FROM members");
    $members = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'data' => $members
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
