



function constrain( n, a, b ){

	if( typeof a !== 'number' ) a = 0
	if( typeof b !== 'number' ) b = 1

	const
	min = Math.min( a, b ),
	max = Math.max( a, b )

	return Math.max( min, ( Math.min( max, n )))
}
function lerp( a, b, n ){

	return ( b - a ) * n + a
}
function norm( n, a, b ){

	return ( n - a ) / ( b - a )
}
function createGaussianFunction( mean, standardDeviation, maxHeight ){

	if( typeof mean !== 'number' ) mean = 0
	if( typeof standardDeviation !== 'number' ) standardDeviation = 1
	if( typeof maxHeight !== 'number' ) maxHeight = 1
	return function getNormal( x ){
	
		return maxHeight * Math.pow( Math.E, -Math.pow( x - mean, 2 ) / ( 2 * ( standardDeviation * standardDeviation )))
	}
}
function easeInOutCubic( n ){
	
	return n < 0.5 
		? 4 * n * n * n 
		: 1 - Math.pow( -2 * n + 2, 3 ) / 2
}
function easeOutCubic( n ){
	
	return 1 - Math.pow( 1 - n, 3 )
}




function applyCssClass( cssQuery, className ){

	Array
	.from( document.querySelectorAll( cssQuery ))
	.forEach( function( element ){

		element.classList.add( className )
	})
}
function getCssTranslation( element ){

	const matrix = window.getComputedStyle( element ).transform
	if( matrix === 'none' ) return {

		x: 0,
		y: 0,
		z: 0
	}
	
	const 
	type   = matrix.includes( '3d' ) ? '3d' : '2d',
	values = matrix.match( /matrix.*\((.+)\)/ )[ 1 ].split( ', ' )
	if( type === '2d' ) return {
	
		x: parseFloat( values[ 4 ]),
		y: parseFloat( values[ 5 ]),
		z: 0
	}
	else if( type === '3d' ) return {

		x: parseFloat( values[ 12 ]),
		y: parseFloat( values[ 13 ]),
		z: parseFloat( values[ 14 ])
	}
}







