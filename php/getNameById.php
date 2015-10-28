<?php
	$Id = (string) $_POST['Id'];
	find_record_by_id($Id);


function find_record_by_id($file){
		$xml = simplexml_load_file('../data/user.xml');	
		$xpath = $xml->xpath("//record");
		while(list( , $node) = each($xpath)) {
			if ($node->file == $file ){ // return json_encode($array); }
				$va = $node->group ; $vb =  $node->owner;
				echo json_encode(array("group" => $va,"owner" => $vb));
			}
		};
		return true;
}

?>
