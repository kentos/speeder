<?php

$articles[] = "http://www.aftonbladet.se/nyheter/article19614539.ab";
$articles[] = "http://www.aftonbladet.se/nyheter/kolumnister/wolfganghansson/article19614569.ab";
$articles[] = "http://www.aftonbladet.se/nyheter/article19614056.ab";
$articles[] = "http://www.aftonbladet.se/nyheter/valaret2014/article19613990.ab";
$articles[] = "http://www.aftonbladet.se/nyheter/article19614184.ab";
$articles[] = "http://www.aftonbladet.se/nyheter/article19614223.ab";

?>

<!DOCTYPE html>
<html>
	<head>
		<title>A POC of Speeder</title>
		<link rel="stylehseet" type="text/css" href="https://raw.githubusercontent.com/murtaugh/HTML5-Reset/master/assets/css/reset.css" />
		<link rel="stylesheet" type="text/css" href="static/css/style.css" />
		
		<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
		<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
		<script src="static/js/speeder.js"></script>
	</head>

<body>
	<div id="header"></div>
	<div id="loading">Laddar ...</div>

	<div id="wrapper">
		Here's what we're aiming to fill
	</div>

	<script>
		var myReadingList = new Array();
	<?php foreach($articles as $art): ?>
			myReadingList.push("<?php echo $art ?>");

	<?php endforeach; ?>
	</script>
</body>
</html>