var distanceConversionBtn = $("#distanceConversionBtn");
var areaConversionBtn = $("#areaConversionBtn");
var temperatureConversionBtn = $("#temperatureConversionBtn");

temperatureConversionBtn.click(function() {

	var temperatureConversion = new ConversionModule.TemperatureConvertion();
	alert(temperatureConversion.convert());
})

distanceConversionBtn.click(function() {

	var conversion = new ConversionModule.DistanceConvertion();
	alert(conversion.convert());
})

// --------------------------REVEALING MODULE PATTERN-------------------------

var ConversionModule = (function() {

	//----------TEMPERATURE CONVERSION----------
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
	//----------DISTANCE CONVERSION----------


	function convertCurrentUnitToMeter(unit, currentValue) {
		//currentUnitValue = parseFloat(currentUnitValue);
		switch (unit) {
			case "Meters":
				return currentValue;
			case "Kilometers":
				return currentValue * 1000;
			case "Centimeters":
				return currentValue / 100;
			case "Inches":
				return currentValue / 39.370;
			case "Foot":
				return  currentValue / 3.2808;
			case "Yard":
				return  currentValue / 1.0936;
			case "Mile":
				return (currentValue * 0.00062137);
		}
	}

	function convertMeterToNewDistanceUnit(newUnit, temporaryValue) {
		switch (newUnit) {
			case "Meters":
				return temporaryValue;
			case "Kilometers":
				return temporaryValue / 1000;
			case "Centimeters":
				return temporaryValue * 100;
			case "Inches":
				return temporaryValue * 39.370;
			case "Foot":
				return  temporaryValue * 3.2808;
			case "Yard":
				return  temporaryValue * 1.0936;
			case "Mile":
				return (temporaryValue / 0.00062137);
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

	var DistanceConvertion = (function() {
		var DistanceConvertion = function() {};

		DistanceConvertion.prototype.convert = function() {
			var currentUnit = $("#originalDistanceUnit").val();
			var currentValue = parseFloat($("#distanceValue").val());
			var newUnit = $("#convertedDistanceUnit").val();
			var temporaryValue = convertCurrentUnitToMeter(currentUnit, currentValue);
			var finalValue = convertMeterToNewDistanceUnit(newUnit, temporaryValue).toFixed(3);

			return finalValue;
		}
		return DistanceConvertion;

	}());

	return {
		TemperatureConvertion: TemperatureConvertion,
		DistanceConvertion: DistanceConvertion
	};
}());