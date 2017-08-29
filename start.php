<?php

/**
 * Google Maps Autocomplete
 *
 * Replaces location input with Google Maps Autocomplete
 *
 * @author    Ismayil Khayredinov <info@hypejunction.com>
 * @copyright Copyright (c) 2017, Ismayil Khayredinov
 */
require_once __DIR__ . '/autoloader.php';

elgg_register_event_handler('init', 'system', function () {

	elgg_define_js('google_maps_places', [
		'src' => elgg_http_add_url_query_elements('https://maps.googleapis.com/maps/api/js', [
			'key' => elgg_get_plugin_setting('api_key', 'google_client'),
			'libraries' => 'places',
		]),
	]);

	elgg_extend_view('theme_sandbox/forms', 'theme_sandbox/forms/location');
});