<?php
header("Content-Type: application/json; charset=UTF-8");
require_once '../cors.php';

require_once '../db.php';
require_once '../auth_admin.php';

try {
    $stmt = $pdo->query("
        SELECT 
            m.name AS member_name,
            p.title AS poll_title,
            ph.vote_choice,
            ph.created_at
        FROM polling_history ph
        JOIN members m ON ph.member_id = m.id
        JOIN polls p ON ph.poll_id = p.id
        ORDER BY ph.created_at DESC
        LIMIT 5
    ");

    $votes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'total' => count($votes), // or run COUNT(*) if needed
        'votes' => $votes
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
