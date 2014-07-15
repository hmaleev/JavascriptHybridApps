

var btn = $("#temperatureConversionBtn");

btn.click( function () {

	var currentUnit = $("#originalTemperatureUnit").val();
	var currentUnitValue = $("#temperatureValue").val();
	var newUnit = $("#convertedTemperatureUnit").val();

	function convertCurrentUnitToCelsius() {
		switch (currentUnit) {
			case "Celsius": return currentUnitValue;
			case "Kelvin": return currentUnitValue -273.15;
		}
	
	}
	alert(convertCurrentUnitToCelsius( ));
})
