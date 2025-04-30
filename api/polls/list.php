<?php
header('Content-Type: application/json');

require_once '../cors.php';
require_once '../db.php';
require_once '../auth_admin.php';

try {
    // Query to fetch polls with yes/no counts and final result
    $stmt = $pdo->query("
        SELECT 
            p.id,
            p.title,
            p.description,
            p.start_date,
            p.end_date,
            p.active,
            p.created_at,
            p.updated_at,
            COALESCE(SUM(ph.vote_choice = 'yes'), 0) AS yes_votes,
            COALESCE(SUM(ph.vote_choice = 'no'), 0) AS no_votes,
            CASE
                WHEN SUM(ph.vote_choice = 'yes') > SUM(ph.vote_choice = 'no') THEN 'Accepted'
                WHEN SUM(ph.vote_choice = 'yes') = SUM(ph.vote_choice = 'no') THEN 'Tie'
                ELSE 'Rejected'
            END AS result
        FROM polls p
        LEFT JOIN polling_history ph ON p.id = ph.poll_id
        GROUP BY p.id
        ORDER BY p.id DESC
    ");

    $polls = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'data' => $polls
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
