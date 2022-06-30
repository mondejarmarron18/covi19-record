<?php
class DBHandler
{
    private $servername = "localhost";
    private $username = "admin";
    private $password = "MarronM5181996";
    private $db = "covid_db";


    public function dbConnect()
    {
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->db);

        if ($conn->connect_error) die('Connection error: ' . $conn->connect_error);

        return $conn;
    }
}
