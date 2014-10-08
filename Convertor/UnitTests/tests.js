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
QUnit.module( "Distance tests" );