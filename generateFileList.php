<?php
header('Content-Type: application/json');

$dir = "./img/";

$list = array();

if(is_dir($dir)){
    if($dh = opendir($dir)){
        while(($file = readdir($dh)) != false){

            if($file == "." or $file == ".." or $file == ".DS_Store"){
                //...
            } else {
                list($width, $height) = getimagesize($dir . $file);

                $list3 = array(
                    "file_name" => $file,
                    "width" => $width,
                    "height" => $height
                );
                array_push($list, $list3);
            }
        }
    }

    $return_array = array('files'=> $list);

    echo json_encode($return_array, 1);
}

?>