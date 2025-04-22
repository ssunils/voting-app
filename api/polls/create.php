<?php
// Include database connection=

// Set response headers
header("Content-Type: application/json; charset=UTF-8");

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed."]);
    exit;
}

// Get the input data
$data = json_decode(file_get_contents("php://input"), true);

// Validate input
if (!isset($data['title']) || !isset($data['options']) || !is_array($data['options']) || count($data['options']) < 2) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid input. 'title' and at least two 'options' are required."]);
    exit;
}

$title = htmlspecialchars(strip_tags($data['title']));
$options = array_map('htmlspecialchars', array_map('strip_tags', $data['options']));

try {
    // Insert poll into the database
    $query = "INSERT INTO polls (title) VALUES (:title)";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':title', $title);
    $stmt->execute();
    $pollId = $pdo->lastInsertId();

    // Insert poll options into the database
    $query = "INSERT INTO poll_options (poll_id, option_text) VALUES (:poll_id, :option_text)";
    $stmt = $pdo->prepare($query);

    foreach ($options as $option) {
        $stmt->bindParam(':poll_id', $pollId);
        $stmt->bindParam(':option_text', $option);
        $stmt->execute();
    }

    // Respond with success
    http_response_code(201);
    echo json_encode(["message" => "Poll created successfully.", "poll_id" => $pollId]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["message" => "An error occurred while creating the poll.", "error" => $e->getMessage()]);
}
?>