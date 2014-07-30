var saveSettigsBtn = $("#saveSettingsBtn");
var convertBtn = $(".convertBtn");

convertBtn.click(function () {

    var temperatureDrawer = $("#drawer-temperature");
    var speedDrawer = $("#drawer-speed");
    var distanceDrawer = $("#drawer-distance");
    var powerDrawer = $("#drawer-power");
    var massDrawer = $("#drawer-mass");

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
    if (powerDrawer.is(':visible')) {
        var powerConversion = new ConversionModule.PowerConvertion();
        var newUnit = $("#convertedPowerUnit").val();
        $("#powerResult").html("RESULT: " + powerConversion.convert() + " " + newUnit);
    }
    if (massDrawer.is(':visible')) {
        var massConversion = new ConversionModule.MassConvertion();
        var newUnit = $("#convertedMassUnit").val();
        $("#massResult").html("RESULT: " + massConversion.convert() + " " + newUnit);
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
        localStorage.setItem("precision", precision);
        var separator = $("#separator").val();
        localStorage.setItem("separator", separator);
		var theme = $("#theme").val();
        localStorage.setItem("theme", theme);
    }
    function loadSettings() {
        var precision = localStorage.getItem("precision");
        var separator = localStorage.getItem("separator");
		var theme = localStorage.getItem("theme");
        if (precision === null) {
            precision = 2;
        }
       // alert("Loaded: " + precision);
        if (precision === null) {
            precision = 2;
        }
        var loadedSettigs = {};
        loadedSettigs.precision = precision;
        loadedSettigs.separator = separator;
		loadedSettigs.theme = theme;
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

	function returnLocalizedResult(finalValue) {
	    var separator = loadSettings().separator;
	    switch (separator) {
	        case "123456.78":
	            return finalValue;
	        case "123.456,78":
	            finalValue = parseFloat(finalValue).toLocaleString("de-de", { maximumFractionDigits: 5 });
	            console.log( "---after locale---  " + finalValue);
	            return finalValue;
	        case "123,456.78":
	            finalValue = parseFloat(finalValue).toLocaleString("en-us", { maximumFractionDigits: 5 });
	            console.log("---after locale---  " + finalValue);
	            return finalValue;
	        case "123 456,78":
	            finalValue = parseFloat(finalValue).toLocaleString("bg-bg", { maximumFractionDigits: 5 });
	            console.log("---after locale---  " + finalValue);
	            return finalValue;
	        default:
	            finalValue = parseFloat(finalValue);
	            return finalValue;
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
	        finalValue = returnLocalizedResult(finalValue);
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
	        finalValue = returnLocalizedResult(finalValue);
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
			finalValue = returnLocalizedResult(finalValue);
			return finalValue;
		}
		return SpeedConvertion;
	}());

    //----------POWER CONVERSION----------
	function currentUnitToWatts(unit, currentValue) {
	    //currentUnitValue = parseFloat(currentUnitValue);
	    switch (unit) {
	        case "megawatt":
	            return currentValue * 1000000;
	        case "kilowatt":
	            return currentValue * 1000;
	        case "watt":
	            return currentValue;
	        case "horserpower (electric)":
	            return currentValue / 0.00134048;
	        case "horserpower (metric)":
	            return currentValue / 0.00135962;
	    }
	}
	function wattsToNewPowerUnit(newUnit, temporaryValue) {
	    switch (newUnit) {
	        case "megawatt":
	            return temporaryValue / 1000000;
	        case "kilowatt":
	            return temporaryValue / 1000;
	        case "watt":
	            return temporaryValue;
	        case "horserpower (electric)":
	            return temporaryValue * 0.00134048;
	        case "horserpower (metric)":
	            return temporaryValue * 0.00135962;
	    }
	}
	var PowerConvertion = (function () {
	    var PowerConvertion = function () { };

	    PowerConvertion.prototype.convert = function () {
	        var currentUnit = $("#originalPowerUnit").val();
	        var currentValue = parseFloat($("#powerValue").val());
	        var newUnit = $("#convertedPowerUnit").val();
	        var temporaryValue = currentUnitToWatts(currentUnit, currentValue);
	        var precision = loadSettings().precision;

	        var finalValue = wattsToNewPowerUnit(newUnit, temporaryValue).toFixed(precision);
	        finalValue = returnLocalizedResult(finalValue);
	        return finalValue;
	    }
	    return PowerConvertion;
	}());

    //----------MASS CONVERSION----------
	function currentUnitToKilograms(unit, currentValue) {
	    //currentUnitValue = parseFloat(currentUnitValue);
	    switch (unit) {
	        case "tonne":
	            return currentValue * 1000;
	        case "kilogram":
	            return currentValue ;
	        case "gram":
	            return currentValue / 1000;
	        case "miligram":
	            return currentValue / 1000000;
	        case "long ton (UK)":
	            return currentValue * 1016.04691;
	        case "short ton (US)":
	            return currentValue * 907.18475;
	        case "stone":
	            return currentValue * 6.35029;
	        case "pound (lb)":
	            return currentValue * 0.453592;
	        case "ounce (oz)":
	            return currentValue * 0.02835;
	    }
	}
	function kilogramsToNewMassUnit(newUnit, temporaryValue) {
	    switch (newUnit) {
	        case "tonne":
	            return temporaryValue / 1000;
	        case "kilogram":
	            return temporaryValue;
	        case "gram":
	            return temporaryValue * 1000;
	        case "miligram":
	            return temporaryValue * 1000000;
	        case "long ton (UK)":
	            return temporaryValue / 1016.04691;
	        case "short ton (US)":
	            return temporaryValue / 907.18475;
	        case "stone":
	            return temporaryValue / 6.35029;
	        case "pound (lb)":
	            return temporaryValue / 0.453592;
	        case "ounce (oz)":
	            return temporaryValue / 0.02835;
	    }
	}
	var MassConvertion = (function () {
	    var MassConvertion = function () { };

	    MassConvertion.prototype.convert = function () {
	        var currentUnit = $("#originalMassUnit").val();
	        var currentValue = parseFloat($("#massValue").val());
	        var newUnit = $("#convertedMassUnit").val();
	        var temporaryValue = currentUnitToKilograms(currentUnit, currentValue);
	        var precision = loadSettings().precision;

	        var finalValue = kilogramsToNewMassUnit(newUnit, temporaryValue).toFixed(precision);
	        finalValue = returnLocalizedResult(finalValue);
	        return finalValue;
	    }
	    return MassConvertion;
	}());


	return {
		TemperatureConvertion: TemperatureConvertion,
		DistanceConvertion: DistanceConvertion,
		SpeedConvertion: SpeedConvertion,
		MassConvertion: MassConvertion,
		PowerConvertion:PowerConvertion,
        Settings:Settings
	};
}());