<?php
    session_start();

    $profiles = array();
	if (isset($_SESSION['info'])){
		$profiles = $_SESSION['info'];

	}
?>


<!DOCTYPE html>
<html>
<head>
	<title>jquery Home</title>
</head>
<script type="text/javascript" src="../jquery-3.2.1.min.js"></script>

<script src="profile.js">


</script>
<body>
	<input type="text" name="txtName" id="txtName">
	<p>Name is : <font id="displayName"></font></p>
	<input type="text" name="txtAge" id="txtAge">
	<p>BirthYear is : <font id="displayBirthYear"></font></p>
	<input type="button" name="btn" id="btn" value="add to Reponsive">
	
	<table border="1" id="profileT">
		<thead>
			<tr>
			<th>Name</th>
			<th>BirthYear</th>
			</tr>
		</thead>
		<tbody id="profileInfo">
			<?php 
			foreach ($profiles as $profile) {
				echo "<tr><td>".$profile['name']."</td><td>".$profile['age']."</td></tr>";
			}
			?>
		</tbody>
	</table>
</body>
</html>