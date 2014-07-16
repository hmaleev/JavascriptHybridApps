

var btn = $("#temperatureConversionBtn");

btn.click( function () {

	var currentUnit = $("#originalTemperatureUnit").val();
	var currentUnitValue = parseFloat($("#temperatureValue").val());
	var newUnit = $("#convertedTemperatureUnit").val();

	function convertCurrentUnitToCelsius() {
		switch (currentUnit) {
			case "Celsius": return currentUnitValue;
			case "Kelvin": return currentUnitValue-273.15;
			case "Fahrenheit": return (currentUnitValue-32.0)/1.8;
		}
	}
	function convertCelsiusToNewTemperatureUnit() {
		switch (newUnit) {
			case "Celsius": return temporaryValue;
			case "Kelvin": return temporaryValue+273.15;
			case "Fahrenheit": return (temporaryValue*1.8 )+32.0; 
		}
	
	}
	var temporaryValue = parseFloat(convertCurrentUnitToCelsius());

	alert(convertCelsiusToNewTemperatureUnit());
})
