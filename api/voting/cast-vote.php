<?php
session_start(); 
require_once '../cors.php';
require_once '../db.php';
header("Content-Type: application/json");

$memberId = $_SESSION['member_id'] ?? null;

if (!$memberId) {
    http_response_code(401);
    echo json_encode(['error' => 'User not authenticated']);
    exit;
}

// Get JSON input
$data = json_decode(file_get_contents('php://input'), true);

$stmt = $pdo->prepare("SELECT * FROM members WHERE member_id = :member_id");
$stmt->execute([':member_id' => $memberId]);
$member = $stmt->fetch(PDO::FETCH_ASSOC); // Get primary ID

$pollId = $data['poll_id'] ?? null;
$voteChoice = $data['vote_choice'] ?? null;

if (!$pollId || !in_array($voteChoice, ['yes', 'no'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid poll_id or vote_choice']);
    exit;
}

try {
    // Check if the user has already voted for this poll
    $checkStmt = $pdo->prepare("
        SELECT COUNT(*) FROM polling_history
        WHERE member_id = :member_id AND poll_id = :poll_id
    ");
    $checkStmt->execute([
        ':member_id' => $member['id'],
        ':poll_id' => $pollId
    ]);

    $alreadyVoted = $checkStmt->fetchColumn();

    if ($alreadyVoted > 0) {
        http_response_code(409);
        echo json_encode(['error' => 'You have already voted in this poll']);
        exit;
    }

    // Insert the vote
    $insertStmt = $pdo->prepare("
        INSERT INTO polling_history (member_id, poll_id, vote_choice)
        VALUES (:member_id, :poll_id, :vote_choice)
    ");

    $insertStmt->execute([
        ':member_id' => $member['id'],
        ':poll_id' => $pollId,
        ':vote_choice' => $voteChoice
    ]);

    echo json_encode(['success' => true, 'message' => 'Vote cast successfully']);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

