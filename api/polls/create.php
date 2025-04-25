<?php
header("Content-Type: application/json; charset=UTF-8");

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
    !isset($data['title']) ||
    !isset($data['description']) ||
    strlen(trim($data['title'])) < 1 ||
    strlen(trim($data['description'])) < 1
) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid input. 'title' and 'description' are required."]);
    exit;
}

// Sanitize inputs
$title = htmlspecialchars(strip_tags($data['title']));
$description = htmlspecialchars(strip_tags($data['description']));

// User ID from session
$user_id = $_SESSION['user_id'];


try {
    // Insert poll into the database
    $query = "
        INSERT INTO polls (created_by, updated_by, title, description, poll_options)
        VALUES (:created_by, :updated_by, :title, :description, 'Yes,No') 
    ";
    // Hard coding the YES, No value so that we can add more options later

    $stmt = $pdo->prepare($query);
    $stmt->execute([
        ':created_by' => $user_id,
        ':updated_by' => $user_id,
        ':title' => $title,
        ':description' => $description,
    ]);

    // Return success response
    http_response_code(201);
    echo json_encode(["message" => "Poll created successfully.", "poll_id" => $pdo->lastInsertId()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["message" => "An error occurred while creating the poll.", "error" => $e->getMessage()]);
}
?>
