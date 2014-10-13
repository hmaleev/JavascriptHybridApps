//----------------------TEMPERATURE TESTS ----------------------

QUnit.module( "Temperature tests" );
QUnit.test( "Kelvin - Kelvin conversion", function( assert ) {

	var options = { 
        newUnit: 'Kelvin',
        currentUnit: 'Kelvin',
	    currentValue: 10
	}

	var temperatureConversion = new ConversionModule.TemperatureConvertion();
    var result = temperatureConversion.convert(options)
		
	assert.strictEqual( result, 10, "Successful conversion!" );
});
QUnit.test( "Kelvin - Celsius conversion", function( assert ) {

	var options = { 
        newUnit: 'Celsius',
        currentUnit: 'Kelvin',
	    currentValue: 0
	}

	var temperatureConversion = new ConversionModule.TemperatureConvertion();
    var result = temperatureConversion.convert(options)
		
	assert.strictEqual( result, -273.15, "Successful conversion!" );
});
QUnit.test( "Kelvin - Fahrenheit conversion", function( assert ) {

	var options = { 
        newUnit: 'Fahrenheit',
        currentUnit: 'Kelvin',
	    currentValue: 0
	}

	var temperatureConversion = new ConversionModule.TemperatureConvertion();
    var result = temperatureConversion.convert(options)
		
	assert.strictEqual( result, -459.67, "Successful conversion!" );
});

QUnit.test( "Input data validation - invalid number (a10)", function( assert ) {

	var options = { 
        newUnit: 'Kelvin',
        currentUnit: 'Kelvin',
	    currentValue: 'a10'
	}

	var temperatureConversion = new ConversionModule.TemperatureConvertion();
    var result = temperatureConversion.convert(options)
		
	assert.strictEqual( result, undefined, "Wrong  input value (a10)" );
});

QUnit.test( "Input data validation - invalid number (10a)", function( assert ) {

	var options = { 
        newUnit: 'Kelvin',
        currentUnit: 'Kelvin',
	    currentValue: '10a'
	}

	var temperatureConversion = new ConversionModule.TemperatureConvertion();
    var result = temperatureConversion.convert(options)
		
	assert.strictEqual( result, undefined, " Wrong input value (a10)" );
});

QUnit.test( "Input data validation - invalid number ('')", function( assert ) {

	var options = { 
        newUnit: 'Kelvin',
        currentUnit: 'Kelvin',
	    currentValue: ''
	}

	var temperatureConversion = new ConversionModule.TemperatureConvertion();
    var result = temperatureConversion.convert(options)
		
	assert.strictEqual( result, undefined, "Wrong  input value ('')" );
});

//----------------------DISTANCE TESTS ----------------------

QUnit.module( "Distance tests" );
QUnit.test( "Meter - Meter conversion", function( assert ) {

	var options = { 
        newUnit: 'Meters',
        currentUnit: 'Meters',
	    currentValue: 0
	}

	var distanceConversion = new ConversionModule.DistanceConvertion();
    var result = distanceConversion.convert(options)
		
	assert.strictEqual( result, 0, "Successful conversion!" );
});

QUnit.test( "Input data validation - invalid number (a10)", function( assert ) {

	var options = { 
        newUnit: 'Meters',
        currentUnit: 'Meters',
	    currentValue: 'a10'
	}

	var distanceConversion = new ConversionModule.DistanceConvertion();
    var result = distanceConversion.convert(options);
		
	assert.strictEqual( result, undefined, "Wrong  input value (a10)" );
});

QUnit.test( "Input data validation - invalid number (10a)", function( assert ) {

	var options = { 
        newUnit: 'Meters',
        currentUnit: 'Meters',
	    currentValue: '10a'
	}

	var distanceConversion = new ConversionModule.DistanceConvertion();
    var result = distanceConversion.convert(options);
		
	assert.strictEqual( result, undefined, " Wrong input value (a10)" );
});

QUnit.test( "Input data validation - invalid number (-3)", function( assert ) {

	var options = { 
      newUnit: 'Meters',
        currentUnit: 'Meters',
	    currentValue: -3
	}

	var distanceConversion = new ConversionModule.DistanceConvertion();
    var result = distanceConversion.convert(options);
		
	assert.strictEqual( result, undefined, "Wrong  input value (-3)" );
});


QUnit.test( "Input data validation - invalid number ('')", function( assert ) {

	var options = { 
      newUnit: 'Meters',
        currentUnit: 'Meters',
	    currentValue: ''
	}

	var distanceConversion = new ConversionModule.DistanceConvertion();
    var result = distanceConversion.convert(options);
		
	assert.strictEqual( result, undefined, "Wrong  input value ('')" );
});