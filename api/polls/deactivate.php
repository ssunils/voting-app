<?php
header("Content-Type: application/json; charset=UTF-8");

require_once '../db.php';
require_once '../auth_admin.php'; // checks if user is logged in

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['poll_id'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing poll_id']);
    exit;
}

$poll_id = (int) $data['poll_id'];
$end_date = date('Y-m-d H:i:s');
$updated_by = $_SESSION['user_id'];

try {
    $stmt = $pdo->prepare("
        UPDATE polls 
        SET active = 0, end_date = :end_date, updated_by = :updated_by 
        WHERE id = :poll_id AND active = 1
    ");
    $stmt->execute([
        ':poll_id' => $poll_id,
        ':end_date' => $end_date,
        ':updated_by' => $updated_by
    ]);

    if ($stmt->rowCount() > 0) {
        echo json_encode([
            'success' => true,
            'message' => 'Poll deactivated successfully',
            'poll_id' => $poll_id
        ]);
    } else {
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'message' => 'Poll not found or already inactive'
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
