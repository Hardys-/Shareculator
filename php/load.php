<?php

	$group_name = (string) $_POST['group'];
	$owner_name = (string) $_POST['owner'];
	$result = find_record_by_name($group_name, $owner_name);
	if( $result != ""){echo $result; }

	function find_record_by_name($group, $owner){
		$xml = simplexml_load_file('../data/user.xml');	
		$xpath = $xml->xpath("//record");
		while(list( , $node) = each($xpath)) {
			if ($node->group == $group && $node->owner == $owner ){return $node->file; }
		};
		return "";
	}
	
?>		
