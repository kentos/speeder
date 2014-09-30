<?php

// Parsers

include_once 'lib/simple_html_dom.php';

function aftonbladet($html) {

	// can we read?
	if(!stristr($html, '<article>')) {
		print 'We couldn\'t read this aftonbladet-article. Copy-paste the text using the HTML-button instead.';
		return false;
	}

	// parse html
	$html = str_get_html($html);

	// get title
	$title_tag = $html->find("title",0);
	$title = $title_tag->innertext;

	// get h1
	$h1_tag = $html->find('h1',0);
	$h1 = $h1_tag ? $h1_tag->innertext : "";

	// get lead
	$lead_tag = $html->find("div.abLeadText",0);
	$lead = $lead_tag ? $lead_tag->innertext : "";
	
	// get body
	$body_tag = $html->find("div.abBodyText",0);
	$body = $body_tag ? $body_tag->innertext : "";

	// get an image
	$img_tag = $html->find(".abArticle", 0)->find("img", 0);
	$img = $img_tag ? $img_tag->src : "";

	return array("title" => $h1, "lead" => $lead, "body" => $body, "img" => $img);

}

function parse($article_url) {

	$cache_filename = "temp/" . md5($article_url);

	$origin_url = $article_url;
	$article_url = (is_file($cache_filename)) ? $cache_filename : $article_url;

	$doc = file_get_contents( $article_url );
	file_put_contents($cache_filename, $doc);

	$data = array();

	if(strpos($origin_url, "aftonbladet.se") !== false) {
		// We found Aftonbladet
		$data = aftonbladet($doc);
	}

	return $data;

}