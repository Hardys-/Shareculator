<?php

	$group_name = (string) $_POST['group'];
	$xml = simplexml_load_file('../data/user.xml');	
	$xpath = $xml->xpath('/info/record[0]');// . $group_name . ']');
	echo $xpath[0];/*
	if ($xpath == $group_name) {
	    echo (string) $xpath[0];
	} else {
	    echo "Not found";
	}

	/*$xml = simplexml_load_file('../data/user.xml');
	$info = new SimpleXMLElement($xml);
	echo  $info->record[0]->group;*/
?>		
