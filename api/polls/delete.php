<?php
header("Content-Type: application/json; charset=UTF-8");
require_once '../cors.php';

// Ensure the request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed."]);
    exit;
}

require_once '../db.php';
require_once '../auth_admin.php';

// Get and decode input JSON
$data = json_decode(file_get_contents("php://input"), true);

// Validate required field
if (!isset($data['id']) || strlen(trim($data['id'])) < 1) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid input. 'id' is required."]);
    exit;
}

// Sanitize input
$id = intval($data['id']);

try {
    // Check if the poll exists
    $checkQuery = "SELECT id FROM polls WHERE id = :id";
    $checkStmt = $pdo->prepare($checkQuery);
    $checkStmt->execute([':id' => $id]);

    if ($checkStmt->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(["message" => "Poll not found."]);
        exit;
    }

    // Delete the poll from the database
    $deleteQuery = "DELETE FROM polls WHERE id = :id";
    $stmt = $pdo->prepare($deleteQuery);
    $stmt->execute([':id' => $id]);

    http_response_code(200);
    echo json_encode(["message" => "Poll deleted successfully."]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["message" => "An error occurred while deleting the poll.", "error" => $e->getMessage()]);
}
?>
