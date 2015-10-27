<?php
	/*load client data*/
	$name = $_POST['group'];
	$owner = $_POST['owner'];
	$json =  stripcslashes($_POST['json']);

	$hash_string = hash('md5',$name.$owner,FALSE);
	$fileName = '../data/'.$hash_string.'.json';

	/*save xml*/	
	$xml = simplexml_load_file('../data/user.xml');
	$record = $xml->addChild('record');
	$record->addChild('group', $name);
	$record->addChild('owner',$owner);
	$record->addChild('file', $hash_string); //only keep the md5 hash string in xml
	$record->addChild('ip',$_SERVER['REMOTE_ADDR']);
	$record->addChild('timeStamp',date('Y-m-d H:i:s'));
	$record->addChild('count',0);
	file_put_contents('../data/user.xml', $xml->asXML());

	/*save data*/
	$myfile = fopen($fileName, "w") or die("Unable to open file!");//depande on the user info
	fwrite($myfile, $json);
	fclose($myfile);

	/*check*/
	if(file_exists( $fileName ))
	{echo "Record saved!";}
	else{echo "Save failed!";}

	function find_record_by_id($file){
		$xml = simplexml_load_file('../data/user.xml');	
		$xpath = $xml->xpath("//record");
		while(list( , $node) = each($xpath)) {
			if ($node->file == $file ){return array("group"=>$node->group, "owner"=> $node->owner); }
		};
		return "";
	}
?>
