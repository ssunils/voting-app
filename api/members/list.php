<?php
header('Content-Type: application/json');

// Import database configuration
// $config = require_once __DIR__ . '/../config.php';

try {
    // Connect to the database
    $pdo = require_once __DIR__ . '/../db_connect.php';

    // Query to fetch members list
    $stmt = $pdo->query("SELECT id, name, email FROM members");
    $members = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return the members list as JSON
    echo json_encode([
        'success' => true,
        'data' => $members
    ]);
} catch (PDOException $e) {
    // Handle database connection or query errors
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
?>