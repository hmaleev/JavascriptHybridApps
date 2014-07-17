var distanceConversionBtn = $("#distanceConversionBtn");
var speedConversionBtn = $("#speedConversionBtn");
var temperatureConversionBtn = $("#temperatureConversionBtn");

temperatureConversionBtn.click(function() {

	var temperatureConversion = new ConversionModule.TemperatureConvertion();
	var newUnit = $("#convertedTemperatureUnit").val();
	$("#distanceResult").html("RESULT: " + temperatureConversion.convert() + " " + newUnit);

})

distanceConversionBtn.click(function() {

	var conversion = new ConversionModule.DistanceConvertion();
	var newUnit = $("#convertedDistanceUnit").val();
	$("#distanceResult").html("RESULT: " + conversion.convert() + " " + newUnit);

})

speedConversionBtn.click(function() {

	var speedConversion = new ConversionModule.SpeedConvertion();
	var newUnit = $("#convertedSpeedUnit").val();

	$("#speedResult").html("RESULT: " + speedConversion.convert() + " " + newUnit);
})


// --------------------------REVEALING MODULE PATTERN-------------------------

var ConversionModule = (function() {

	//----------TEMPERATURE CONVERSION----------
	function currentUnitToCelsius(unit, currentValue) {
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

	function celsiusToNewTemperatureUnit(newUnit, temporaryValue) {
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


	function currentUnitToMeter(unit, currentValue) {
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
				return currentValue / 3.2808;
			case "Yard":
				return currentValue / 1.0936;
			case "Mile":
				return (currentValue * 0.00062137);
		}
	}

	function metersToNewDistanceUnit(newUnit, temporaryValue) {
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
				return temporaryValue * 3.2808;
			case "Yard":
				return temporaryValue * 1.0936;
			case "Mile":
				return (temporaryValue / 0.00062137);
		}
	}

	//----------SPEED CONVERSION----------


	function currentUnitToMetersPerSecond(unit, currentValue) {
		//currentUnitValue = parseFloat(currentUnitValue);
		switch (unit) {
			case "m/s":
				return currentValue;
			case "km/h":
				return currentValue / 3.6;
			case "mi/h":
				return currentValue / 2.23694;

		}
	}

	function metersPerSecondToNewSpeedUnit(newUnit, temporaryValue) {
		switch (newUnit) {
			case "m/s":
				return temporaryValue;
			case "km/h":
				return temporaryValue * 3.6;
			case "mi/h":
				return temporaryValue * 2.23694;
		}
	}
	//----------TEMPERATURE----------
	var TemperatureConvertion = (function() {
		var TemperatureConvertion = function() {};

		TemperatureConvertion.prototype.convert = function() {
			var currentUnit = $("#originalTemperatureUnit").val();
			var currentValue = parseFloat($("#temperatureValue").val());
			var newUnit = $("#convertedTemperatureUnit").val();
			var temporaryValue = currentUnitToCelsius(currentUnit, currentValue);
			var finalValue = celsiusToNewTemperatureUnit(newUnit, temporaryValue).toFixed(2);

			return finalValue;
		}
		return TemperatureConvertion;

	}());
	//----------DISTANCE----------
	var DistanceConvertion = (function() {
		var DistanceConvertion = function() {};

		DistanceConvertion.prototype.convert = function() {
			var currentUnit = $("#originalDistanceUnit").val();
			var currentValue = parseFloat($("#distanceValue").val());
			var newUnit = $("#convertedDistanceUnit").val();
			var temporaryValue = currentUnitToMeter(currentUnit, currentValue);
			var finalValue = metersToNewDistanceUnit(newUnit, temporaryValue).toFixed(3);

			return finalValue;
		}
		return DistanceConvertion;

	}());

	//----------SPEED----------
	var SpeedConvertion = (function() {
		var SpeedConvertion = function() {};

		SpeedConvertion.prototype.convert = function() {
			var currentUnit = $("#originalSpeedUnit").val();
			var currentValue = parseFloat($("#speedValue").val());
			var newUnit = $("#convertedSpeedUnit").val();
			var temporaryValue = currentUnitToMetersPerSecond(currentUnit, currentValue);
			var finalValue = metersPerSecondToNewSpeedUnit(newUnit, temporaryValue).toFixed(3);

			return finalValue;
		}
		return SpeedConvertion;

	}());

	return {
		TemperatureConvertion: TemperatureConvertion,
		DistanceConvertion: DistanceConvertion,
		SpeedConvertion: SpeedConvertion,
	};
}());