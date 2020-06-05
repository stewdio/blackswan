






/*function composeCssHslTween( params ){


	//  No need to specify anything 
	//  other than a linear tween
	//  because CSS can modify the curve
	//  with `animation-timing-function`!!

	function tweenValue( from, to, percent ){

		const
		tweened = from + ( to - from ) * percent / 100,
		integer = Math.floor( tweened ),
		decimal = Math.round(( tweened - integer ) * 1000 ) / 1000,
		integerString = integer.toString(),
		decimalParts  = decimal.toString().split( '.' ),
		decimalString = decimalParts[ decimalParts.length - 1 ]

		return (

			integerString.padStart( 3, ' ' ) +'.'+
			decimalString.padEnd( 3, '0' )
		)
	}
	function composeCssCommand( objectPropertyName, objectPropertyValue, gain ){

		const cssPropertyName = objectPropertyName
			.split( /(?=[A-Z])/ )
			.join( '-' )
			.toLowerCase()
		let output = cssPropertyName +': '


		if( cssPropertyName.includes( 'shadow' )){

			//  x y blurRadius
			output += '0px 0px calc( var( --size ) * 4 ) '
		}
		output += 'hsl'
		if( typeof objectPropertyValue.from.alpha === 'number' ) output +='a'
		output +='( '
			+ tweenValue( 

				objectPropertyValue.from.hue, 
				objectPropertyValue.to.hue,
				gain
			)
			+', '
			+ tweenValue( 

				objectPropertyValue.from.saturation, 
				objectPropertyValue.to.saturation,
				gain
			)
			+'%, '
			+ tweenValue( 

				objectPropertyValue.from.lightness, 
				objectPropertyValue.to.lightness,
				gain
			)
			+'%'
		if( typeof objectPropertyValue.from.alpha === 'number' ){

			output += ', '+ tweenValue( 

				objectPropertyValue.from.alpha, 
				objectPropertyValue.to.alpha,
				gain
			)
		}
		output += ' ); '
		return output
	}
	let output = ''






	for( let i = 0; i <= 100; i ++ ){

		output += '\n\t'+ i.toString().padStart( 3, ' ' ) +'% { '
		Object.entries( params ).forEach( function( entry ){

			output += composeCssCommand( entry[ 0 ], entry[ 1 ], i )
		})
		output += '}'
	}
	console.log( '\n\n'+ output +'\n\n' )
}




//  Blackswan key-press.

composeCssHslTween({

	backgroundColor: {

		from: {

			hue:          0,
			saturation:  70,
			lightness:    0
		},
		to: {

			hue:          0,
			saturation:  90,
			lightness:   95
		}
	},
	color: {

		from: {

			hue:          0,
			saturation:  10,
			lightness:   50
		},
		to: {

			hue:          0,
			saturation:  90,
			lightness:  100
		}
	},
	boxShadow: {

		from: {

			hue:          0,
			saturation:  90,
			lightness:   90,
			alpha:        0.0
		},
		to: {

			hue:          0,
			saturation:  90,
			lightness:   90,
			alpha:        0.5
		}
	}
})*/




//  Play button pulse.

/*composeCssHslTween({

	fill: {

		from: {
			
			hue:          0,
			saturation:  70,
			lightness:   50,
		},
		to: {

			hue:          0,
			saturation:  90,
			lightness:   95,
		}
	}
})*/





