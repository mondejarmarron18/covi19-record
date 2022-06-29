<?php
class DBHandler
{
    private $servername = "";
    private $username = "";
    private $password = "";
    private $db = "";


    public function dbConnect()
    {
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->db);

        if ($conn->connect_error) die('Connection error: ' . $conn->connect_error);

        return $conn;
    }
}
