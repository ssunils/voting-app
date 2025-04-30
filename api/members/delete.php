<?php
header('Content-Type: application/json');

require_once '../cors.php';
require_once '../db.php';      // DB connection
require_once '../auth_admin.php';    // Auth check

// Only allow DELETE method
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405); // Method Not Allowed
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method.'
    ]);
    exit;
}

// Get member ID from query string
$memberId = isset($_GET['id']) ? intval($_GET['id']) : null;

if (!$memberId) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Missing or invalid member ID.'
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("DELETE FROM members WHERE id = :id");
    $stmt->execute(['id' => $memberId]);

    if ($stmt->rowCount() > 0) {
        echo json_encode([
            'success' => true,
            'message' => 'Member deleted successfully.'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Member not found or already deleted.'
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
