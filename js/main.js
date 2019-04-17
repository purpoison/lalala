$(document).ready(function() {

	window.maps = [];

	$("input[name='is_custom_icon']").change(function(e){
		$(this).next("[name='icon']").toggle(':visible');
	});

	$('.map').each(function(index, el) {
		var map = new google.maps.Map(el, {
			zoom: 10,
			center: { lat: $(this).data('lat'), lng: $(this).data('lng') }
		});
			window.maps.push(map);
		var marker = new google.maps.Marker({
				position: { lat: $(this).data('lat'), lng: $(this).data('lng') },
				map: map,
			});
	});
			console.log(maps)
	$('.add-marker').submit(function(e){
		e.preventDefault();
		var $this = $(this),
			$lat = $("input[name='lat']", $this).val(),
			$lng = $("input[name='lng']", $this).val(),
			$title = $("input[name='title']", $this).val(),
			$index = $this.prev('.map').data('index');
			// console.log(maps[$index]);
			var marker = new google.maps.Marker({
					position: {lat: +$lat, lng: +$lng},
					map: maps[$index],
					title: $title,
					icon: $("[name='icon']",$this).is(':visible') ? $("[name='icon'] option:selected",$this).val() : false, 
					animation: $("[name='is_animated']", $this).prop('checked') ? google.maps.Animation.DROP : false,
			});
			maps[$index].setCenter(marker.getPosition());
			// console.log($("[name='icon']",$this).is(':visible'))
		});
	navigator.geolocation.getCurrentPosition(
		function getposition (position){
			var options = {
					zoom: 16,
					center: { lat: position.coords.latitude, lng: position.coords.longitude},
			};
			map = new google.maps.Map($('.geolocation')[0], options);
			marker = new google.maps.Marker({
				position: { lat: position.coords.latitude, lng: position.coords.longitude},
				map:map,
			})
		},
		function error (error){
			alert('Разрешите доступ!');
			location.reload();
		},
	);
});