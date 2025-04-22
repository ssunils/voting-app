<?php
// Database connection settings
$host = 'localhost'; 
$dbname = 'pollManager';
$username = 'root';
$password = 'root';
$port = '8889';


try {
    
    // Create a new PDO instance
    $pdo = new PDO("mysql:host=$host;port={$port};dbname=$dbname;charset=utf8", $username, $password);
    // Set error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $pdo;
} catch (PDOException $e) {
    // Handle connection error
    die("Database connection failed: " . $e->getMessage());
}
?>
