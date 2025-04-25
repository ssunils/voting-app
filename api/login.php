<?php
require_once 'cors.php';
session_start();
require_once 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

if (!$username || !$password) {
    http_response_code(400);
    echo json_encode(['message' => 'Username and password required']);
    exit;
}

function tryLogin($pdo, $table, $role, $username, $password)
{
    $stmt = $pdo->prepare("SELECT id, password, name FROM $table WHERE username = :username");
    $stmt->execute([':username' => $username]);
    $user = $stmt->fetch();

    if ($user && $password == $user['password']) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['role'] = $role;
        $_SESSION['name'] = $user['name'];
        return true;
    }

    return false;
}

// Try logging in as admin or member
if (
    tryLogin($pdo, 'admin', 'admin', $username, $password) ||
    tryLogin($pdo, 'members', 'member', $username, $password)
) {
    echo json_encode([
        'success' => true,
        'message' => 'Login successful',
        'role' => $_SESSION['role'],
        'username' => $username,
        'name' => $_SESSION['name'],
    ]);
} else {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
}
