<?php
header("Content-Type: application/json; charset=UTF-8");
require_once '../cors.php';

// Ensure the request is GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed."]);
    exit;
}

require_once '../db.php';
require_once '../auth_admin.php';

try {
    $stmt = $pdo->query("
        SELECT 
            poll_id AS name,
            SUM(vote_choice = 'yes') AS yes,
            SUM(vote_choice = 'no') AS no
        FROM polling_history
        GROUP BY poll_id
        ORDER BY poll_id ASC
    ");

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($results);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
