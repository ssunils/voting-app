<?php
header("Content-Type: application/json; charset=UTF-8");
require_once '../cors.php'; // CORS headers

// Ensure the request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed."]);
    exit;
}

require_once '../db.php';
require_once '../auth_admin.php'; // checks session

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['poll_id'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing poll_id']);
    exit;
}

$poll_id = (int)$data['poll_id'];
$start_date = date('Y-m-d H:i:s');

try {
    // Check if there's already an active poll
    $stmt = $pdo->query("SELECT id FROM polls WHERE active = 1 LIMIT 1");
    $activePoll = $stmt->fetch();

    if ($activePoll) {
        http_response_code(409);
        echo json_encode([
            'success' => false,
            'message' => 'An active poll already exists. Deactivate it first.',
            'active_poll_id' => $activePoll['id']
        ]);
        exit;
    }

    // Activate the new poll
    $stmt = $pdo->prepare("
        UPDATE polls 
        SET active = 1, start_date = :start_date 
        WHERE id = :poll_id
    ");
    $stmt->execute([
        ':poll_id' => $poll_id,
        ':start_date' => $start_date
    ]);

    if ($stmt->rowCount() > 0) {
        echo json_encode([
            'success' => true,
            'message' => 'Poll activated successfully',
            'poll_id' => $poll_id
        ]);
    } else {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Poll not found']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database error',
        'error' => $e->getMessage()
    ]);
}
