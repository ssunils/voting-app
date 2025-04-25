<?php
require_once '../cors.php';
require_once '../db.php';
session_start(); // Start the session
header("Content-Type: application/json");
if (isset($_SESSION['user_id']) && isset($_SESSION['role'])) {
    echo json_encode([
        'authenticated' => true,
        'user_id' => $_SESSION['user_id'],
        'name' => $_SESSION['name'] ?? '',
        'role' => $_SESSION['role']
    ]);
} else {
    echo json_encode(['authenticated' => false]);
}