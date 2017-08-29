# Google Maps Autocomplete

![Elgg 2.3](https://img.shields.io/badge/Elgg-2.3-orange.svg?style=flat-square)

## Features

 - Replaces location input with Google Maps Autocomplete
 
## API Key

Make sure your Google API key supports:

 - Google Maps JavaScript API 
 - Google Places API Web Service

## Notes

### Autocomplete options

You can pass options to `google.maps.places.Autocomplete` component using `data-` attributes of the input field.
 
```php
echo elgg_view_input('location', [
    'name' => 'city_in_france',
    'data-types' => json_encode(['(cities)']),
    'data-component-restrictions' => json_encode(['country' => 'fr']),
]);
```

You can further filter options for each input using ``'options', 'input/location'`` JavaScript plugin hook.

### Accessing address parts

You can access address parts, UTC offset and lat/long of the location in your action:

```php
$location = get_input('my_input_name');
$extended = get_input('__location');

$index = array_search($location, $extended['location']);

$street_address = $extended['street_address'][$index];
$postal_code = $extended['postal_code'][$index];
...

```