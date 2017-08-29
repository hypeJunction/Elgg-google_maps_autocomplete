<?php
/**
 * Location input field
 *
 * @uses $vars['entity'] The ElggEntity that has a location
 * @uses $vars['value']  The default value for the location
 * @uses $vars['class']  Additional CSS class
 */

$vars['class'] = elgg_extract_class($vars, 'elgg-input-location');

$defaults = array(
	'disabled' => false,
);

if (isset($vars['entity'])) {
	$defaults['value'] = $vars['entity']->location;
	unset($vars['entity']);
}

$vars = array_merge($defaults, $vars);

$input = elgg_view('input/text', $vars);

foreach ([
	'location',
	'formatted_address',
	'street_address',
	'extended_address',
	'locality',
	'region',
	'postal_code',
	'country_code',
	'utc_offset',
	'latitude',
	'longitude',
		 ] as $part) {

	$input .= elgg_view('input/hidden', [
		'name' => "__location[$part][]",
	]);
}

echo elgg_format_element('div', [
	'class' => 'elgg-input-location-parts',
], $input);

?>
<script>
	require(['input/location'], function(autocomplete) {
	    autocomplete.init();
	});
</script>
