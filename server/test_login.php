<?php
// Simple script to test database connection and user authentication

require_once 'vendor/autoload.php';

use Illuminate\Container\Container;
use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Events\Dispatcher;

// Load .env file
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Configure database connection
$capsule = new Capsule;
$capsule->addConnection([
    'driver'    => 'mysql',
    'host'      => $_ENV['DB_HOST'],
    'database'  => $_ENV['DB_DATABASE'],
    'username'  => $_ENV['DB_USERNAME'],
    'password'  => $_ENV['DB_PASSWORD'],
    'charset'   => 'utf8',
    'collation' => 'utf8_unicode_ci',
    'prefix'    => '',
]);

$capsule->setEventDispatcher(new Dispatcher(new Container));
$capsule->setAsGlobal();
$capsule->bootEloquent();

echo "Database connection established.\n";

// Check if users table exists and has records
try {
    $users = Capsule::table('users')->get();
    echo "Found " . count($users) . " users in the database:\n";
    
    foreach ($users as $user) {
        echo "- {$user->email} (ID: {$user->id})\n";
    }
    
    if (count($users) > 0) {
        echo "\nTry logging in with one of these email addresses and the correct password.\n";
    } else {
        echo "\nNo users found. You may need to register a user first.\n";
    }
} catch (Exception $e) {
    echo "Error querying users table: " . $e->getMessage() . "\n";
    echo "Please check your database connection settings.\n";
}