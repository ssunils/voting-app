<?php
require_once 'auth.php';
if (isset($_SESSION['role']) && $_SESSION['role'] !== 'admin') {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Admins only']);
    exit;
}
