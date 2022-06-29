<?php
require_once "./DBHandler.php";

header('Content-Type: application/json');

$reqMethod = $_SERVER['REQUEST_METHOD'];
$dbHandler = new DBHandler();



switch (strtolower($reqMethod)) {
    case 'post':
        try {
            $data = json_decode(file_get_contents('php://input'));
            $sql = "INSERT INTO person (name, gender, age, mobileNumber, bodyTemp, nationality, covid19Diagnosed, covid19Exposure, vaccinated) VALUES ('" . $data->name . "', '" . $data->gender . "', '" . $data->age . "', '" . $data->mobileNumber . "', '" . $data->bodyTemp . "', '" . $data->nationality . "', '" . $data->covid19Diagnosed . "', '" . $data->covid19Exposure . "', '" . $data->vaccinated . "')";
            $res =  $dbHandler->dbConnect()->query($sql);

            echo json_encode('Saving Success!');
        } catch (Exception $error) {
            echo json_encode('Saving Failed');
        }
        break;
    case 'put':
        try {
            $data = json_decode(file_get_contents('php://input'));
            $sql = "UPDATE person SET name='" . $data->name . "', gender='" . $data->gender . "', age='" . $data->age . "', mobileNumber='" . $data->mobileNumber . "', bodyTemp='" . $data->bodyTemp . "', nationality='" . $data->nationality . "', covid19Diagnosed='" . $data->covid19Diagnosed . "', covid19Exposure='" . $data->covid19Exposure . "', vaccinated='" . $data->vaccinated . "' WHERE id='" . $data->id . "'";
            $res =  $dbHandler->dbConnect()->query($sql);

            echo json_encode('Updating Success!');
        } catch (Exception $error) {
            echo json_encode('Update Failed');
        }
        break;
    case 'delete':
        try {
            $data = json_decode(file_get_contents('php://input'));
            $sql = "DELETE FROM person WHERE id='" . $data->id . "'";
            $res = $dbHandler->dbConnect()->query($sql);

            echo json_encode('Deleting Success');
        } catch (Exception $error) {
            echo json_encode('Deleting Failed');
        }
        break;
    default:
        $qry = $_SERVER['QUERY_STRING'];

        if (isset($qry) && !empty($qry)) {
            $id = explode('=', $qry)[1];

            $sql = "SELECT * FROM person WHERE id='" . $id . "'";
            $res = $dbHandler->dbConnect()->query($sql);
            $data = $res->fetch_assoc();
            echo json_encode($data);
        } else {
            $sql = "SELECT * FROM person";
            $res = $dbHandler->dbConnect()->query($sql);
            $data = $res->fetch_all(MYSQLI_ASSOC);
            echo json_encode($data);
        }
}

exit();
