<?php
	/*load client data*/
	$group = $_POST['group'];
	$owner = $_POST['owner'];
	$new = $_POST['flag'];
	$json =  stripcslashes($_POST['json']);

	$hash_string = hash('md5',$group.$owner,FALSE);
	$fileName = '../data/'.$hash_string.'.json';

	
	if(find_record_by_name($group, $owner) == "" ){ 
		/*save xml*/
		$xml = simplexml_load_file('../data/user.xml');
		$record = $xml->addChild('record');
		$record->addChild('group', $group);
		$record->addChild('owner',$owner);
		$record->addChild('file', $hash_string); //only keep the md5 hash string in xml
		$record->addChild('ip',$_SERVER['REMOTE_ADDR']);
		$record->addChild('timeStamp',date('Y-m-d H:i:s'));
		$record->addChild('count',0);
		file_put_contents('../data/user.xml', $xml->asXML());
	}else if( $new == 1 ){exit("Group & owner already existed!");}// keep unique

	/*save data*/
	$myfile = fopen($fileName, "w") or die("Unable to open file!");//depande on the user info
	fwrite($myfile, $json);
	fclose($myfile);

	/*check*/
	if(file_exists( $fileName ))
	{echo "Record saved!".$hash_string;}
	else{echo "Save failed!";}

	function find_record_by_name($grp, $own){
		$xml = simplexml_load_file('../data/user.xml');	
		$xpath = $xml->xpath("//record");
		while(list( , $node) = each($xpath)) {
			if ($node->group == $grp && $node->owner == $own ){return $node->file; } //find record
		};
		return ""; //cannot find
	}

?>
