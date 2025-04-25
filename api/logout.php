<?php
session_start();

// Unset all session variables
$_SESSION = [];

// Destroy the session
session_destroy();

// Respond with success message
header('Content-Type: application/json');
echo json_encode([
    'success' => true,
    'message' => 'You have been logged out successfully.'
]);
