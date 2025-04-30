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
    // Total members
    $totalMembersStmt = $pdo->query("SELECT COUNT(*) FROM members");
    $totalMembers = $totalMembersStmt->fetchColumn();

    // Users online (assuming a field 'is_online' in users table)
    $usersOnlineStmt = $pdo->query("SELECT COUNT(*) FROM members WHERE is_online = 1");
    $usersOnline = $usersOnlineStmt->fetchColumn();

    // Pending polls (assuming is_active = 0 and not completed)
    $pendingPollsStmt = $pdo->query("SELECT COUNT(*) FROM polls WHERE start_date IS NULL AND end_date IS NULL");
    $pendingPolls = $pendingPollsStmt->fetchColumn();

    // Completed polls (assuming a field 'is_completed' = 1)
    $completedPollsStmt = $pdo->query("SELECT COUNT(*) FROM polls WHERE end_date IS NOT NULL");
    $completedPolls = $completedPollsStmt->fetchColumn();

    echo json_encode([
        "total_members" => (int)$totalMembers,
        "users_online" => (int)$usersOnline,
        "pending_polls" => (int)$pendingPolls,
        "completed_polls" => (int)$completedPolls,
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["message" => "Error fetching dashboard stats.", "error" => $e->getMessage()]);
}
?>