<?php

$base64_image = @substr($_POST['image'], 22);

if ($base64_image) {
	$binary_image = base64_decode($base64_image);
	$md5 = md5($binary_image);
	$filename = __DIR__ . '/../posters/' . $md5 . '.png';

	if (!file_exists($filename)) {
		file_put_contents($filename, $binary_image);
	}

	echo json_encode([
		'image' => $md5,
	]);
}
