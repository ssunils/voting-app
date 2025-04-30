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

// Validate required fields
if (
    !isset($data['id']) ||
    !isset($data['title']) ||
    !isset($data['description']) ||
    strlen(trim($data['id'])) < 1 ||
    strlen(trim($data['title'])) < 1 ||
    strlen(trim($data['description'])) < 1
) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid input. 'id', 'title', and 'description' are required."]);
    exit;
}

// Sanitize inputs
$id = intval($data['id']);
$title = htmlspecialchars(strip_tags($data['title']));
$description = htmlspecialchars(strip_tags($data['description']));

// User ID from session
$user_id = $_SESSION['user_id'];

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

    // Update poll in the database
    $updateQuery = "
        UPDATE polls
        SET title = :title,
            description = :description,
            updated_by = :updated_by,
            updated_at = NOW()
        WHERE id = :id
    ";

    $stmt = $pdo->prepare($updateQuery);
    $stmt->execute([
        ':title' => $title,
        ':description' => $description,
        ':updated_by' => $user_id,
        ':id' => $id,
    ]);

    http_response_code(200);
    echo json_encode(["message" => "Poll updated successfully."]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["message" => "An error occurred while updating the poll.", "error" => $e->getMessage()]);
}
?>
