<?php

if (isset($_POST['data_of_note'])) 
{
	$db = new PDO('mysql:host=localhost;dbname=homepage;charset=utf8', 'anilshanbhag', 'masteranil');
	$content = $_POST['data_of_note'];
	$stmt = $db->query("INSERT INTO ReadingList (category, content) VALUES ('research', '$content')");
	echo "Successful :)";
}
else 
{
	$db = new PDO('mysql:host=localhost;dbname=homepage;charset=utf8', 'anilshanbhag', 'masteranil');
	$stmt = $db->query("SELECT * FROM ReadingList");

	foreach($stmt as $row) {
    	echo $row['Content'] . "\n"; 
	}
}

?>