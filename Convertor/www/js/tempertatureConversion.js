var btn = $("#temperatureConversionBtn");


btn.click(function() {
	var conversion = new ConversionModule.TemperatureConvertion();
	alert(conversion.convert());
})

// --------------------------REVEALING MODULE PATTERN-------------------------

var ConversionModule = (function() {

	function convertCurrentUnitToCelsius(unit, currentValue) {
		//currentUnitValue = parseFloat(currentUnitValue);
		switch (unit) {
			case "Celsius":
				return currentValue;
			case "Kelvin":
				return currentValue - 273.15;
			case "Fahrenheit":
				return (currentValue - 32.0) / 1.8;
		}
	}

	function convertCelsiusToNewTemperatureUnit(newUnit, temporaryValue) {
		switch (newUnit) {
			case "Celsius":
				return temporaryValue;
			case "Kelvin":
				return temporaryValue + 273.15;
			case "Fahrenheit":
				return (temporaryValue * 1.8) + 32.0;
		}
	}

	var TemperatureConvertion = (function() {
		var TemperatureConvertion = function() {};

		TemperatureConvertion.prototype.convert = function() {
			var currentUnit = $("#originalTemperatureUnit").val();
			var currentValue = parseFloat($("#temperatureValue").val());
			var newUnit = $("#convertedTemperatureUnit").val();
			var temporaryValue = convertCurrentUnitToCelsius(currentUnit, currentValue);
			var finalValue = convertCelsiusToNewTemperatureUnit(newUnit, temporaryValue).toFixed(2);

			return finalValue;
		}
		return TemperatureConvertion;

	}());
	return {
		TemperatureConvertion: TemperatureConvertion
	};
}());