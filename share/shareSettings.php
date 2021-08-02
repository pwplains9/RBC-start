<?php

$protocol = $_SERVER['PROTOCOL'] = isset($_SERVER['HTTPS']) && !empty($_SERVER['HTTPS']) ? 'https' : 'http';
$host = $protocol . '://' . $_SERVER['HTTP_HOST'];
$title = 'title Главной страницы.';
$description = 'description Главной страницы';
$image = $host . '/images/url-картинки';

 $pages = [
 	'/url страницы' => [
 		'title' => 'title страницы',
 		'description' => 'description страницы',
 		'image' => '/images/url-картинки',
 	],
 ];

$page = @$pages[$_SERVER['REQUEST_URI']];

if ($page) {
	$title = !is_null(@$page['title']) ? $page['title'] : $title;
	$description = !is_null(@$page['description']) ? $page['description'] : $description;
	$image = !is_null(@$page['image']) ? $host . $page['image'] : $image;
}

?>
