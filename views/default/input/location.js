define(function (require) {

    var elgg = require('elgg');
    require('google_maps_places');

    var api = {
        getOptions: function ($input) {
            var options = $input.data();
            var params = {
                input: $input
            };
            options = elgg.trigger_hook('options', 'input/location', params, options);
        },
        init: function () {
            $('.elgg-input-location:not(.elgg-state-ready)').each(function () {
                var $input = $(this);
                $input.addClass('elgg-state-ready');

                var options = api.getOptions($input);

                var autocomplete = new google.maps.places.Autocomplete($input[0], options);
                autocomplete.addListener('place_changed', function () {
                    api.fillParts($input, autocomplete);
                });
            });
        },
        fillParts: function ($input, autocomplete) {

            var $field = $input.closest('.elgg-input-location-parts');

            var parts = {
                location: function() {
                    return $input.val();
                },
                formatted_address: function (data) {
                    return data.formatted_address;
                },
                street_address: function (data) {
                    var house = '';
                    var street = '';
                    $.each(data.address_components, function (key, value) {
                        if (value.types[0] === 'street_number') {
                            house = value.short_name;
                        } else if (value.types[0] === 'route') {
                            street = value.short_name;
                        }
                    });
                    return [street, house].join(' ');
                },
                extended_address: function (data) {
                    return '';
                },
                locality: function (data) {
                    var locality = '';
                    $.each(data.address_components, function (key, value) {
                        if (value.types[0] === 'locality') {
                            locality = value.long_name;
                        }
                    });
                    return locality;
                },
                region: function (data) {
                    var region = '';
                    $.each(data.address_components, function (key, value) {
                        if (value.types[0] === 'administrative_area_level_1') {
                            region = value.short_name;
                        }
                    });
                    return region;
                },
                country_code: function (data) {
                    var country_code = '';
                    $.each(data.address_components, function (key, value) {
                        if (value.types[0] === 'country') {
                            country_code = value.short_name;
                        }
                    });
                    return country_code;
                },
                postal_code: function (data) {
                    var postal_code = '';
                    $.each(data.address_components, function (key, value) {
                        if (value.types[0] === 'postal_code') {
                            postal_code = value.short_name;
                        }
                    });
                    return postal_code;
                },
                utc_offset: function (data) {
                    return data.utc_offset;
                },
                'latitude': function (data) {
                    return data.geometry.location.lat();
                },
                'longitude': function (data) {
                    return data.geometry.location.lng();
                }
            };

            var data = autocomplete.getPlace();

            $.each(parts, function (index, callback) {
                var value = callback.call(this, data);
                $field.find('input[name="__location[' + index + '][]"]').val(value);
            });

        }
    };

    return api;
});
