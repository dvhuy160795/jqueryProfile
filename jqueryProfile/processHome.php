<?php
    session_start();
	if (isset($_SESSION['info'])){
		$_SESSION['info'][] = $_POST;
		//echo $_POST;
		//echo json_encode($_SESSION['info']);

	}else {
		$arr[] = $_POST;
		$_SESSION['info'] = $arr;
		//echo json_encode($_SESSION['info']);
	}
	//echo json_encode($_SESSION['info']);
	

