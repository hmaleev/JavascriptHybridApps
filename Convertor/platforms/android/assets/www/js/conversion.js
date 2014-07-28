var saveSettigsBtn = $("#saveSettingsBtn");
var convertBtn = $(".convertBtn");

convertBtn.click(function () {

    var temperatureDrawer = $("#drawer-temperature");
    var speedDrawer = $("#drawer-speed");
    var distanceDrawer = $("#drawer-distance");

    if (temperatureDrawer.is(':visible')) {
        var temperatureConversion = new ConversionModule.TemperatureConvertion();
        var newUnit = $("#convertedTemperatureUnit").val();
        $("#temperatureResult").html("RESULT: " + temperatureConversion.convert() + " " + newUnit);
    }
    if (speedDrawer.is(':visible')) {
        var speedConversion = new ConversionModule.SpeedConvertion();
        var newUnit = $("#convertedSpeedUnit").val();
        $("#speedResult").html("RESULT: " + speedConversion.convert() + " " + newUnit);
    }
    if (distanceDrawer.is(':visible')) {
        var distanceConversion = new ConversionModule.DistanceConvertion();
        var newUnit = $("#convertedDistanceUnit").val();
        $("#distanceResult").html("RESULT: " + distanceConversion.convert() + " " + newUnit);
    }
    navigator.notification.vibrate(300);
})

saveSettigsBtn.click(function () {

    var settings = new ConversionModule.Settings
    settings.save();
	navigator.notification.vibrate(300);
})

// --------------------------REVEALING MODULE PATTERN-------------------------

var ConversionModule = (function() {

    //----------SETTINGS----------
    function saveSettings() {
        var precision = $("#precision").val();
        //alert("Saved: " + precision);
        localStorage.setItem("precision", precision);
    }
    function loadSettings() {
        var precision = localStorage.getItem("precision");
        if (precision === null) {
            precision = 2;
        }
       // alert("Loaded: " + precision);
        if (precision === null) {
            precision = 2;
        }
        var loadedSettigs = {};
        loadedSettigs.precision = precision
        console.log(loadedSettigs);
        return loadedSettigs;
    }
    var Settings = (function () {
        var Settings = function () { };

        Settings.prototype.save = function () {
            saveSettings();
        }
        Settings.prototype.load = function () {
            loadSettings();
        }

        return Settings;

    }());

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
	var TemperatureConvertion = (function () {
	    var TemperatureConvertion = function () { };

	    TemperatureConvertion.prototype.convert = function () {
	        var currentUnit = $("#originalTemperatureUnit").val();
	        var currentValue = parseFloat($("#temperatureValue").val());
	        var newUnit = $("#convertedTemperatureUnit").val();
	        var temporaryValue = currentUnitToCelsius(currentUnit, currentValue);
	        var precision = loadSettings().precision;
	        var finalValue = celsiusToNewTemperatureUnit(newUnit, temporaryValue).toFixed(precision);

	        return finalValue;
	    }
	    return TemperatureConvertion;

	}());

    //----------DISTANCE CONVERSION----------
	function currentUnitToMeter(unit, currentValue) {
		//currentUnitValue = parseFloat(currentUnitValue);
		switch (unit) {
			case "Kilometers":
				return currentValue * 1000;
			case "Meters":
				return currentValue;
			case "Centimeters":
				return currentValue / 100;
			case "Milimeters":
				return currentValue / 1000;
			case "Inches":
				return currentValue / 39.370;
			case "Feet":
				return currentValue / 3.2808;
			case "Yards":
				return currentValue / 1.0936;
			case "Miles":
				return (currentValue / 0.00062137);
			case "Nautical Miles":
				return (currentValue / 0.000539957);
		}
	}
	function metersToNewDistanceUnit(newUnit, temporaryValue) {
		switch (newUnit) {
			case "Kilometers":
				return temporaryValue / 1000;
			case "Meters":
				return temporaryValue;
			case "Centimeters":
				return temporaryValue * 100;
			case "Milimeters":
				return temporaryValue * 1000;
			case "Inches":
				return temporaryValue * 39.370;
			case "Feet":
				return temporaryValue * 3.2808;
			case "Yards":
				return temporaryValue * 1.0936;
			case "Miles":
				return (temporaryValue * 0.00062137);
			case "Nautical Miles":
				console.log("here");
				return (temporaryValue * 0.000539957);
		}
	}
	var DistanceConvertion = (function () {
	    var DistanceConvertion = function () { };

	    DistanceConvertion.prototype.convert = function () {
	        var currentUnit = $("#originalDistanceUnit").val();
	        var currentValue = parseFloat($("#distanceValue").val());
	        var newUnit = $("#convertedDistanceUnit").val();
	        var temporaryValue = currentUnitToMeter(currentUnit, currentValue);
	        var precision = loadSettings().precision;
	        var finalValue = metersToNewDistanceUnit(newUnit, temporaryValue).toFixed(precision);
	        return finalValue;
	    }
	    return DistanceConvertion;

	}());

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
	var SpeedConvertion = (function () {
		var SpeedConvertion = function() {};

		SpeedConvertion.prototype.convert = function() {
			var currentUnit = $("#originalSpeedUnit").val();
			var currentValue = parseFloat($("#speedValue").val());
			var newUnit = $("#convertedSpeedUnit").val();
			var temporaryValue = currentUnitToMetersPerSecond(currentUnit, currentValue);
			var precision = loadSettings().precision;

			var finalValue = metersPerSecondToNewSpeedUnit(newUnit, temporaryValue).toFixed(precision);
			return finalValue;
		}
		return SpeedConvertion;
	}());

	return {
		TemperatureConvertion: TemperatureConvertion,
		DistanceConvertion: DistanceConvertion,
		SpeedConvertion: SpeedConvertion,
        Settings:Settings
	};
}());