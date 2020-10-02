
//  Copyright © 2020, Stewart Smith. See LICENSE for details.






    /////////////////
   //             //
  //   Helpers   //
 //             //
/////////////////


function reset(){

	document
	.querySelector( 'main' )
	.classList
	.remove( 

		'tilted',
		'spin'
	)

	forEachElement( 

		'.keyboards-rotator, .keyboards-translator',
		resetElement
	)

	forEachElement( 

		'.keyboard', 
		function( el ){

			el.statesReset()
			el.classList.remove( 

				'capslock',
				'long-sustain',
				'push-out',
				'push-in',
				'tilt-complete',
				'popcorn',
				'popcorn-dead'
			)
			resetElement( el )
		}
	)
	forEachElement( 

		'.key', 
		function( el ){

			el.locksReset()
			el.classList.remove( 
			
				'engage', 
				'disengaging',
				'happening',
				'blindspot',
				'not-obvious',

				'black', 
				'wtf',
				'blank'//  A clone for “dead” but intended to be added / removed at random.
			)
			resetElement( el )
		}
	)
	Mode.switchTo( 'idle' )
	


	tasks.updates.remove( ripple )
}
function resetElement( el ){
			
	el.style.transition = 'none'
	el.style.animation = 'none'
	setTimeout( function(){

		el.removeAttribute( 'style' )				
		el.style.removeProperty( 'transition' )
		// visibility?
	})
}
function boot(){

	reset()
	forEachElement( '.key', function( key ){

		'tx ty tz'
		.split( ' ' )
		.forEach( function( name ){

			key.setAttribute( name, getRandomBetween( -22, 22 ))
		})

		'rx ry rz'
		.split( ' ' )
		.forEach( function( name ){

			key.setAttribute( name, getRandomBetween( -1, 1 ))
		})
	})
}
function changeKeyboardState( stateName, addOrRemove, description ){

	const actionName = 'state'+ addOrRemove.charAt( 0 ).toUpperCase() + addOrRemove.slice( 1 )
	append( 

		0, 
		function(){ 

			forEachElement( 

				'.keyboard', 
				function( element ){

					if( typeof element[ actionName ] === 'function') element[ actionName ]( stateName )
					else console.warn( `Tried to apply state “${ stateName }” to a keyboard but ${ actionName } did not exist.`, element )
				}
			)
		}, 
		description
	)
}
function capslockOn(){

	changeKeyboardState( 'capslock', 'add', 'Caps-lock ON.' )
}
function capslockOff(){

	changeKeyboardState( 'capslock', 'remove', 'Caps-lock OFF.' )
}
function pushOutOn(){

	changeKeyboardState( 'push-out', 'add', 'Push-out ON.' )
}
function pushOutOff(){

	changeKeyboardState( 'push-out', 'remove', 'Push-out OFF.' )
}
function dimmerOn(){

	append( 0, function(){

		document
		.getElementById( 'fullscreen-container' )
		.classList
		.add( 'dim' )
	})
}
function dimmerOff(){

	append( 0, function(){
		
		document
		.getElementById( 'fullscreen-container' )
		.classList
		.remove( 'dim' )
	})
}
function tiltedOn(){

	append( 0, function(){
	
		document
		.querySelector( 'main' )
		.classList
		.add( 'tilted' )
	})
}
function tiltedOff(){

	append( 0, function(){
	
		document
		.querySelector( 'main' )
		.classList
		.remove( 'tilted' )
	})
}






    ///////////////
   //           //
  //   Riffs   //
 //           //
///////////////


const
insertHit = function( timeCursor, durationToOccupy, keyName, durationVisible ){
	
	if( typeof durationVisible !== 'number' ) durationVisible = durationToOccupy
	insert(

		timeCursor,
		0,//comp.beatsPerSecond * durationToOccupy,
		function(){ keyEngage( keyName )},
		'Hit ON: '+ keyName
	)
	insert(

		timeCursor + comp.beatsPerSecond * durationVisible * 15/16,
		0,
		function(){ keyDisengage( keyName )},
		'Hit OFF: '+ keyName
	)
},
insertRiffBeat = function( timeStart, durationInBeats, skipLastHit ){

	if( typeof durationInBeats !== 'number' ) durationInBeats = 4
	let timeCursor = timeStart
	;[
		[
			[ 2/4, 'space', 1/4 ],
			[ 2/4, 'space'  ]
		],
		[
			[ 1/4, 'period' ],
			[ 2/4, 'space'  ],
			
		],
		[
			[ 2/4, 'tab'    ],
			[ 2/4, 'period' ],			
		],
		[
			[ 1/4, 'space'  ],
			[ 1/4, 'period' ],
			[ 2/4, 'space'  ]
		]
	]
	.filter( function( item, i ){

		return i < durationInBeats
	})
	.flat()
	.forEach( function( item ){

		insertHit.call( this, timeCursor, ...item )
		timeCursor += item[ 0 ] * comp.beatsPerSecond
	})
	if( !skipLastHit ) insertHit( timeCursor, 1/4, 'space', 1/8 )
},
insertRiffBumpBump = function( timeStart ){

	let timeCursor = timeStart
	;[
		[ 2/4, 'option-left', 1/4 ],
		[ 2/4, 'option-left', 0.4 ]

	].forEach( function( item ){

		insertHit.call( this, timeCursor, ...item )
		timeCursor += item[ 0 ] * comp.beatsPerSecond
	})
},
// insertRiffDim = function( timeStart ){

// 	const el = document.getElementById( 'fullscreen-container' )
// 	console.log( ' dim it at ', timeStart )
// 	insert(
		
// 		timeStart, 
// 		0,
// 		function(){

// 			console.log( 'dim??' )
// 			//el.style.backgroundColor = 'black'
// 			el.classList.add( 'dim' )
// 		},
// 		'Dim Dim'
// 	)
// 	insert(
		
// 		timeStart + comp.beatsPerSecond * 2, 
// 		0,
// 		function(){

// 			console.log( 'dim OFF' )
// 			// el.style.backgroundColor = ''
// 			el.classList.remove( 'dim' )
// 		},
// 		'Dim Dim'
// 	)
// },
insertRiffDeadOrAlive = function( timeStart ){

	let timeCursor = timeStart
	;[
		[ 1/2, 'arrow-left'  ],
		[ 1/2, 'arrow-down'  ],
		[ 1/2, 'arrow-up'    ],
		[ 2/2, 'arrow-right' ]

	].forEach( function( item ){

		insertHit.call( this, timeCursor, ...item )
		timeCursor += item[ 0 ] * comp.beatsPerSecond
	})
},
insertRiffOptions = function( timeStart, options ){

	if( options.includes( 'bump-bump' )) insertRiffBumpBump( timeStart )
	if( options.includes( 'dim' )) insertRiffDim( timeStart )
	if( options.includes( 'dead-or-alive' )) insertRiffDeadOrAlive( timeStart )
},
insertRiff = function( timeStart, durationInBeats, options ){

	if( typeof timeStart !== 'number' ) timeStart = comp.findLastBeat()
	if( typeof durationInBeats !== 'number' ) durationInBeats = 4
	if( typeof options !== 'string' ) options = ''
	
	let 
	timeCursor = timeStart,
	i = 0
	
	while( i < durationInBeats ){

		const 
		beatsRemaining = durationInBeats - i,
		beatsThisLoop  = beatsRemaining >= 4
			? 4
			: beatsRemaining

		insertRiffBeat( timeCursor, beatsThisLoop, options.includes( 'skip-last-hit' ))
		insertRiffOptions( timeCursor, options )
		timeCursor += beatsThisLoop * comp.beatsPerSecond
		i += 4
	}
},
appendRiff =function( durationInBeats, options ){

	insertRiff( comp.findLastBeat(), durationInBeats, options )
	append( durationInBeats )
},
appendRiffBackside = function(){

	let timeCursor = comp.findLastBeat()
	;[//  Only TWO beats long.

		[ 2/4, 'tab'    ],
		[ 2/4, 'period' ],
		[ 1/4, 'space'  ],
		[ 1/4, 'period' ],
		[ 2/4, 'spaces' ]

	].forEach( function(){

		insertHit.call( this, timeCursor, ...item )
		timeCursor += item[ 0 ] * comp.beatsPerSecond
	})
},
appendRiffedUp = function( text, options ){

	if( typeof options !== 'string' ) options = ''
	if( typeof text !== 'string' ) text = 'fuckedup'

	const durationPerCharacter = comp.beatsPerSecond * 2 / text.length
	let timeStart = comp.findLastBeat()

	text
	.split( '' )
	.forEach( function( letter, i ){

		insert(

			timeStart + durationPerCharacter * i,
			0,
			function(){ keyToggle( letter.toUpperCase() )},
			'Riffed up: '+ letter
		)
		insert(

			timeStart + comp.beatsPerSecond * 4 + durationPerCharacter * i,
			0,
			function(){ keyToggle( letter.toUpperCase() )},
			'Riffed up: '+ letter
		)
	})
	for( let i = 0; i < 2; i ++ ){

		timeStart = comp.findLastBeat()
		if( options.includes( 'riff' )) insertRiffBeat( timeStart, 4, options.includes( 'skip-last-hit' ))	
		insertRiffOptions( timeStart, options )
		append( 4 )
	}
}






    //////////////
   //          //
  //   Type   //
 //          //
//////////////

const
insertType = function( timeStart, durationInBeats, text, holdUntilDone ){

	if( typeof durationInBeats !== 'number' ) durationInBeats = 6
	text = text.replace( /\s/g, '' )
	if( typeof holdUntilDone !== 'boolean' ) holdUntilDone = false

	const 
	durationPerCharacter = durationInBeats / text.length

	text
	.split( '' )
	.forEach( function( character, i ){

		const 
		cssName = characterToKeyName[ character ]
			? characterToKeyName[ character ]
			: character.toUpperCase(),
		isMajuscule = character.match( /[A-Z]/ )

		if( isMajuscule ){

			const side = Math.random() >= 0.5 ? 'left' : 'right'
			insert(

				timeStart + comp.beatsPerSecond * i * durationPerCharacter,
				0,
				function(){ keyEngage( 'shift-'+ side )},
				'insertType() ON: Shift'
			)
			insert(

				timeStart + comp.beatsPerSecond * i * durationPerCharacter + durationPerCharacter * 1/2,
				0,
				function(){ keyDisengage( 'shift-'+ side )},
				'insertType() OFF: Shift'
			)
		}
		insert(

			timeStart + comp.beatsPerSecond * i * durationPerCharacter,
			0,
			function(){ keyEngage( cssName )},
			'insertType() ON: '+ cssName
		)
		
		const releaseAfterDuration = holdUntilDone ? 
			durationInBeats * comp.beatsPerSecond :
			comp.beatsPerSecond * i * durationPerCharacter + durationPerCharacter * 15/16
		
		insert(

			timeStart + releaseAfterDuration,
			0,
			function(){ keyDisengage( cssName )},
			'insertType() OFF: '+ cssName
		)
	})
},
appendType = function( durationInBeats, text, holdUntilDone, debug ){

	insertType( comp.findLastBeat(), ...arguments )
	append( durationInBeats )
	if( debug ) assessDuration( timeStart, comp.findLastBeat(), `Type (${ text })`, durationInBeats )
}

















//  0:45

function train( durationInBeats, debug ){

	const 
	timeStart = comp.findLastBeat(),
	action = function( timeMark, durationInBeatsPerCharacter ){

		if( typeof durationInBeatsPerCharacter !== 'number' ){

			durationInBeatsPerCharacter = 1/16
		}
		return function( name, i ){

			if( name.length === 1 ) name = name.toUpperCase()
			insert( 
				
				timeMark + durationInBeatsPerCharacter * comp.beatsPerSecond * i,
				0,
				function(){ 

					// console.log( 'ON:  name', name )
					keyEngage( name )
				},
				'Traaaaiiiin ON: '+ name
			)
			insert(

				timeMark + durationInBeatsPerCharacter * comp.beatsPerSecond * ( i + 8 ),
				0,
				function(){ keyDisengage( name )},
				'Traaaaiiiin OFF: '+ name
			)
			return name
		}
	},
	beat = comp.beatsPerSecond

	changeKeyboardState( 'long-sustain', 'add' )
	

	insertType( timeStart, beat / 8, 'tr' )


	'567890'
	.split( '' )
	.concat( 
	
		'minus',
		'equal',
		'delete'
	)
	.map( action( timeStart + beat * 0.50 ))
	
	.map( action( timeStart + beat * 1.50 ))
	.map( action( timeStart + beat * 2.50 ))
	.map( action( timeStart + beat * 3.50, 1/32 ))


	'tyuiop'
	.split( '' )
	.concat( 
	
		'bracket-open',
		'bracket-close',
		'slash-backward'
	)
	.map( action( timeStart + beat * 0.25 ))
	
	.map( action( timeStart + beat * 1.00 ))
	.map( action( timeStart + beat * 2.00 ))
	.map( action( timeStart + beat * 3.00 ))

	.map( action( timeStart + beat * 4.00, 1/32 ))


	'asdfghjkl'
	.split( '' )
	.concat( 

		'semicolon',
		'quote',
		'return'
	)
	.map( action( timeStart ))
	.map( action( timeStart + beat * 4.50, 1/32 ))


	'nm'
	.split( '' )
	.concat( 

		'comma',
		'period',
		'slash-forward',
		'shift-right'
	)
	.map( action( timeStart + beat * 5.00, 1/32 ))


	append( durationInBeats )
	changeKeyboardState( 'long-sustain', 'remove' )
	if( debug ) assessDuration( 

		timeStart, 
		comp.findLastBeat(), 
		'Traaaaiiiin', 
		durationInBeats
	)
}




function fuckedUp( durationInBeats, debug ){

	if( typeof durationInBeats !== 'number' ) durationInBeats = 2/4

	const 
	timeStart = comp.findLastBeat(),
	fuckedUp  = 'fuckedup',
	durationPerCharacter = durationInBeats / fuckedUp.length

	fuckedUp
	.split( '' )
	.forEach( function( letter, i ){

		append(

			durationPerCharacter,
			function(){ keyToggle( letter.toUpperCase() )},
			'Fucked up: '+ letter
		)
	})
	if( debug ) assessDuration( timeStart, comp.findLastBeat(), 'Fucked up', durationInBeats )
}




//  1:32-ish

new Mode({

	name: 'happening',
	timeStart: 0,
	durationInSeconds: 0,
	setup: function(){

		const 
		that = this,
		text = 'hapening',//  Not it’s just a single P here.
		gap  = comp.beatsPerSecond * 2 / text.length,
		durationSeconds = comp.beatsPerSecond * 4.5

		this.group = text
		.split( '' )
		.map( function( character, i ){

			const delay = i * gap
			return {

				name: character,
				timeStart: that.timeStart + delay,
				durationSeconds: durationSeconds,// - delay,
				hasEngaged: false,
				hasDisengaged: false,

				tx: 0,//randomWithinRangeEitherSign( 10, 20 ),
				ty: 0,//randomWithinRangeEitherSign( 10, 20 ),
				tz: getRandomBetween( 400, 500 ),


				//  Technically these should be normalized
				//  such that the vector length === 1.
				//  But the browser will fix this for us. 

				rx: getRandomBetweenEitherSign(),
				ry: getRandomBetweenEitherSign(),
				rz: 0//getRandomBetweenEitherSign()

				// rx: getRandomBetweenEitherSign(),
				// ry: 10 + Math.floor( Math.random( 7 )),
				// rz: 0
			}
		})
	},
	update: function(){
		
		if( comp.isPlaying ){

			const that = this
			this.group
			.forEach( function( item, i ){

				const 
				elapsedSeconds = comp.audio.currentTime - item.timeStart,
				elapsedPercent = Math.max(

					0,
					Math.min(

						1,
						elapsedSeconds / item.durationSeconds,
					)
				),
				sine = Math.sin( elapsedPercent * Math.PI ),
				angle = elapsedPercent,
				[ tx, ty, tz ] = [

					item.tx,
					item.ty,
					item.tz
				
				].map( function( value ){

					return value * sine
				})
				
				if( elapsedPercent > 0 && item.hasEngaged === false ){

					item.hasEngaged = true
					keyEngage( item.name.toUpperCase() )
				}
				// if( elapsedPercent >= 0.5 && item.hasDisengaged === false ){
				if( elapsedPercent >= 0.9999 && item.hasDisengaged === false ){

					item.hasDisengaged = true
					keyDisengage( item.name.toUpperCase() )
				}
				forEachElement(

					'.key-'+ item.name.toUpperCase(),
					function( element ){

						// element.style.boxShadow = `
						// 	0 0 calc( var( --size ) * 2 * ${( 1 - sine * 0.8 )} ) white,
						// 	0 0 calc( var( --size ) * 4 * ${( 1 - sine * 0.8 )} ) white`

						element.style.transform = 
							`translate3d( ${tx}px, ${ty}px, ${tz}px )`+
							`rotate3d( ${item.rx}, ${item.ry}, ${item.rz}, ${angle}turn )`

						// element.style.transform = `
						// 	translate3d( ${ tx }px, ${ ty }px, ${ tz }px )
						// 	rotateX( ${ item.rx * elapsedPercent * 360 }deg )
						// 	rotateY( ${ item.ry * elapsedPercent * 360 }deg )`
					}
				)
			})
		}
		if( comp.audio.currentTime >= this.timeStart + this.durationInSeconds ){

			Mode.switchTo( 'idle' )
		}
	},
	teardown: function(){
	
		this.group
		.forEach( function( character, i ){

			forEachElement(

				'.key-'+ character.name.toUpperCase(),
				function( element ){

					element.style.transition = 'none'
					element.style.transform  = ''
					// element.style.boxShadow  = ''

					setTimeout( function(){

						element.style.transition = ''
					})
				}
			)
		})
	}
})











function blindSpot( durationInBeats, debug ){

	if( typeof durationInBeats !== 'number' ) durationInBeats = 8
	
	const 
	timeStart = comp.findLastBeat(),
	text = 'blindspot',
	durationPerCharacter = ( comp.beatsPerSecond * 2 ) / text.length

	text
	.split( '' )
	.forEach( function( letter, i ){

		insert(

			timeStart + durationPerCharacter * i,
			0,
			function(){

				forEachElement( 

					'.key-'+ letter.toUpperCase(),
					function( key ){

						key.classList.add( 'blindspot' )
					}
				 )
			},
			'Blind spot ON: '+ letter.toUpperCase()
		)
		insert(

			timeStart + comp.beatsPerSecond * 4 + durationPerCharacter * i,
			0,
			function(){ 

				forEachElement( 

					'.key-'+ letter.toUpperCase(),
					function( key ){

						key.classList.remove( 'blindspot' )
					}
				 )				
			},
			'Blind spot OFF: '+ letter.toUpperCase()
		)
	})
	insertRiffBeat( timeStart, 4 )
	insertRiffBeat( timeStart + 4 * comp.beatsPerSecond, 4 )
	append( durationInBeats )
	if( debug ) assessDuration( timeStart, comp.findLastBeat(), 'Blind spot', durationInBeats )
}





function obvious( durationInBeats, debug ){

	//  yes, type out the words/
	//  but at the same time flip all the tiles over
	//  except for 'obvious'

	const 
	timeStart = comp.findLastBeat(),
	text = 'OBVIOUS'.split( '' )

	forEachElement(

		'.key',
		function( element ){

			if( text.includes( element.getAttribute( 'data-name' )) === false ){
				const x = parseFloat( element.getAttribute( 'x' ))
				insert( 

					timeStart + x * 0.07,
					0,
					function(){

						element.classList.add( 'not-obvious' )
					}
				)
				insert( 

					timeStart + comp.beatsPerSecond * 6 + x * 0.07,
					0,
					function(){

						const cleanup = function(){

							// console.log( 'finished cleanup', element.getAttribute( 'data-name' ), element.classList )
							element.removeEventListener( 'transitionend', cleanup )
							element.classList.remove( 'not-obvious-release' )
						}
						element.addEventListener( 'transitionend', cleanup )
						element.classList.add( 'not-obvious-release' )
						element.classList.remove( 'not-obvious' )
					}
				)
			}
		}
	)
	insert(

		timeStart + comp.beatsPerSecond * 3,
		0,
		function(){

			forEachElement( '.keyboard', ( e ) => { e.classList.remove( 'push-out' )})
		}
	)
	insert(

		timeStart + comp.beatsPerSecond * 6,
		0,
		function(){

			forEachElement( '.keyboard', ( e ) => { e.classList.add( 'push-out' )})
		}
	)
	const durationPerCharacter = comp.beatsPerSecond / ( text.length + 2 )
	text
	.forEach( function( character, i ){

		insert( 

			timeStart + comp.beatsPerSecond * 4 + durationPerCharacter * i,
			0,
			function(){

				keyEngage( character.toUpperCase() )
			}
		)
		insert(

			timeStart + comp.beatsPerSecond * 5 + durationPerCharacter * i,
			0,
			function(){

				keyDisengage( character.toUpperCase() )
			}
		)
	})
	append( durationInBeats )
	if( debug ) assessDuration( timeStart, comp.findLastBeat(), 'Obvious', durationInBeats )
}












//  2:18 – 2:36  “NO IT ISN’T”

function noitisnt( timeStart, durationInBeats ){

	let timeCursor = timeStart
	timeCursor += 0.25


	//  Notice, no captial letters here.
	//  The Shift key flash is too distracting at this point
	//  in the subtle ease-in to the keyboard breakup.

	insertType( timeCursor, 1.25, 'no it isnt', false )
	timeCursor += 1.25
	insertType( timeCursor, 1.00, 'but it isnt', false )
	timeCursor += 1.25
	insertType( timeCursor, 3.00, 'but it isnt woa this is from stew', false )
	timeCursor += 2.25
	insertType( timeCursor, 1.50, 'self unemployed', false )
	timeCursor += 1.50
	insertType( timeCursor, 3.00, 'but its too much fun to stop.', false )
	timeCursor += 2.25


	//  But by here the keyboard is an exploded nebula
	//  so it’s ok to flash it up.

	insertType( timeCursor, 3.50, 'Much love to Pilot and Atlas.', false )
	timeCursor += 2.50
	insertType( timeCursor, 3.25, 'Much love to Meredith, Charlie, and Dexter.', false )
	timeCursor += 2.50
	insertType( timeCursor, 3.00, 'What do you sing here, Thom?', true )
	timeCursor += 2.25
	insertType( timeCursor, 3.00, 'Now lets get back to it, eh.', true )
}
new Mode({

	name: 'noitisnt',
	setup: function(){
		
		const 
		that = this,
		keyboardWidth = 99,
		beatToNorm = function( beats ){

			return beats / that.durationInBeats
		},
		keyboardsTranslator  = document.querySelector( '.keyboards-translator' ),
		keyboardsRotator     = document.querySelector( '.keyboards-rotator' ),
		moveKeys = function(){

			const that = this
			forEachElement( '.key', function( key ){

				const [ tx, ty, tz ] = 'tx ty tz'
				.split( ' ' )
				.map( function( attribute ){

					// console.log( attribute, parseFloat( key.getAttribute( attribute )) )
					return lerp(

						0, 
						parseFloat( key.getAttribute( attribute )), 
						that.n
					)
				})

				const [ rx, ry, rz ] = 'rx ry rz'
				.split( ' ' )
				.map( function( attribute ){

					return parseFloat( key.getAttribute( attribute ))
				})

				key.style.transition = 'none'
				key.style.transform = `translate3d( 

					calc( var( --size ) * ${ tx } ), 
					calc( var( --size ) * ${ ty } ), 
					calc( var( --size ) * ${ tz } )
				)
				rotate3d( ${ rx }, ${ ry }, ${ rz }, ${ that.n * 45 }deg )`
			})
		}
			
		keyboardsRotator.style.transform = `rotate3d( 0, 0, 0, 0turn )`
		this.tweens = [


			//  Explode the keys out.

			new TWEEN.Tween({ n: 0 })
				.to({ n: 1 }, beatToNorm( 24 ))
				.easing( TWEEN.Easing.Cubic.InOut )
				.onUpdate( moveKeys )
				.start( 0 ),


			//  Translate the keyboard.

			new TWEEN.Tween({ 

					tx: 0,
					ty: 0,
					tz: 0
				})
				.to({ 

					tx: -5,
					ty:  5,
					tz: -5

				}, beatToNorm( that.durationInBeats - 8 ))
				.easing( TWEEN.Easing.Cubic.InOut )
				.onUpdate( function(){

					keyboardsTranslator.style.transform = `
						translate3d(
							calc( var( --size ) * ${ this.tx } ), 
							calc( var( --size ) * ${ this.ty } ), 
							calc( var( --size ) * ${ this.tz } )
						)`
				})
				.start( beatToNorm( 8 )),


			//  Rotate the keyboard.

			new TWEEN.Tween({ 

					rx: 0,
					ry: 0
				})
				.to({ 

					rx:   45,
					ry: -373

				}, beatToNorm( that.durationInBeats - 12 ))
				.easing( TWEEN.Easing.Cubic.InOut )
				.onUpdate( function(){

					keyboardsRotator.style.transform = `
						rotateX( ${ this.rx }deg )
						rotateY( ${ this.ry }deg )`
				})
				.onComplete( function(){

					document
					.querySelector( 'main' )
					.classList
					.add( 'tilted' )
				})
				.start( beatToNorm( 12 )),


			//  Contract the keys in.

			new TWEEN.Tween({ n: 1 })
				.to({ n: 0 }, beatToNorm( 1 ))
				.easing( TWEEN.Easing.Cubic.InOut )
				.onUpdate( moveKeys )
				.start( beatToNorm( that.durationInBeats - 1 ))

		]
		document.querySelector( 'main' ).classList.add( 'spin' )
	},
	update: function(){
		
		if( comp.isPlaying ){

			const
			elapsedSeconds = comp.audio.currentTime - this.timeStart,
			elapsedPercent = elapsedSeconds / this.durationInSeconds

			this.tweens
			.forEach( function( tween ){

				tween.update( elapsedPercent )
			})
		}
		if( comp.audio.currentTime >= this.timeStart + this.durationInSeconds ){

			Mode.switchTo( 'idle' )
		}
	},
	teardown: function(){

		const 
		that = this,
		keyboardsTranslator  = document.querySelector( '.keyboards-translator' ),
		keyboardsRotator     = document.querySelector( '.keyboards-rotator' )

		keyboardsTranslator.style.transition = 'none'
		keyboardsRotator.style.transition = 'none'
		setTimeout( function(){

			keyboardsTranslator.style.removeProperty( 'transform' )
			keyboardsTranslator.style.removeProperty( 'transition' )

			keyboardsRotator.style.removeProperty( 'transform' )
			keyboardsRotator.style.removeProperty( 'transition' )
		})

		forEachElement( '.key', function( key ){

			key.style.transition = 'none'
			setTimeout( function(){

				key.style.removeProperty( 'transform' )
				key.style.removeProperty( 'transition' )
			})
		})
		document
		.querySelector( 'main' )
		.classList
		.remove( 'spin' )
	}
})






new Mode({

	name: 'dimmerOn',
	setup:  function(){

		this.el = document.getElementById( 'fullscreen-container' )
		this.el.classList.remove( 'dim' )
	},
	update: function(){
		
		if( comp.isPlaying ){

			const
			elapsedSeconds = comp.audio.currentTime - this.timeStart,		
			elapsedPercent = elapsedSeconds / this.durationInSeconds

			// this.el.style.backgroundColor = `hsl( 0, 90%, ${ 40 - elapsedPercent * 30 }% )`
		}
		if( comp.audio.currentTime >= this.timeStart + this.durationInSeconds ){

			Mode.switchTo( 'idle' )
		}
	},
	teardown: function(){
	
		this.el.style.backgroundColor = ''
		// this.el.classList.add( 'dim' )
	}
})





//  2:58  you can touch meeeeeeeeeeee

new Mode({

	name: 'me',
	setup:  function(){

		this.el = document.getElementById( 'fullscreen-container' )
		this.el.classList.remove( 'dim' )
	},
	update: function(){
		
		if( comp.isPlaying ){

			const
			elapsedSeconds = comp.audio.currentTime - this.timeStart,
			elapsedPercent = elapsedSeconds / this.durationInSeconds,
			elapsedX3 = elapsedPercent * 3 - 1,
			gaus = createGaussianFunction( elapsedX3, 0.1, 1 ),
			lightnessGain = constrain( norm( elapsedPercent, 0.2, 0.4 ), 0, 1 )

			// this.el.style.backgroundColor = `hsl( 0, 90%, ${ 10 + lightnessGain * 30 }% )`
			forEachElement( '.key', function( key, i ){

				const 
				x = parseFloat( key.getAttribute( 'x-normalized' )),
				amp = 80 * gaus( x ) * elapsedX3 * ( 0.2 + 0.8 * x ),
				rotation = x < elapsedX3
					? gaus( x )
					: 0

				if( amp > 0.5 ){

					key.style.transform = 'translate3d( 0px, 0px, calc( var( --size ) * '+ amp +' )) rotateY( '+ rotation +'turn )'
					if( rotation > 0.7 ) key.classList.add( 'engaged' )
					if( rotation < 0.3 ) key.classList.remove( 'engaged' )
				}
				else key.style.transform  = ''
			})
		}
		if( comp.audio.currentTime >= this.timeStart + this.durationInSeconds ){

			Mode.switchTo( 'idle' )
		}
	},
	teardown: function(){
	
		this.el.style.backgroundColor = ''
		forEachElement( '.key', function( key ){

			key.style.transition = 'none'
			key.style.transform  = ''
			setTimeout( function(){

				key.style.transition = ''
			})
		})
	}
})













//  3:44 – 4:03

new Mode({

	name: 'popcorn',
	setup:  function(){

		// console.log('~~~~~~~~~~ POPCORN TIME')

		const 
		that = this,
		beatToNorm = function( beats ){

			return beats / that.durationInBeats
		},
		keyboardsTranslator = document.querySelector( '.keyboards-translator' ),
		keyboardsRotator    = document.querySelector( '.keyboards-rotator' ),
		keyboard = document.querySelector( '.keyboard' ),
		keyboardWidth = 99//  `calc( var( --size ) * ${ keyboardWidth })`

		let
		translation = getCssTranslation( keyboardsTranslator )


		//  Now we can zero out the translation on our original keyboard
		//  and further prep for running in a series.
		//  Remove our “tilt-complete” CSS class
		//  as we’re about to move things manually.

		// tiltedOff()
		keyboard.classList.add( 'popcorn' )
		keyboard.isOriginal = true
		keyboard.index = 0
		this.keyboards = [ keyboard ]


		//  Create our clone keyboard.
		//  This will clone all the HTMLElement bits of it
		//  but *NOT* the raw properties we’ve globbed on
		//  so we’ll need to do that for each clone.
		
		for( let i = 0; i < 2; i ++ ){

			const clone = keyboard.cloneNode( true )
			clone.isClone = true
			clone.index = i + 1
			appendKeyAbilitiesToAllKeys( clone )
			appendKeyboardAbilitiesTo( clone )
			keyboard.parentNode.appendChild( clone )
			clone.style.opacity = 0
			setTimeout( function(){

				clone.style.transform = `translate3d( calc( var( --size ) * ${ keyboardWidth * ( i + 1 )} ), 0, 0 )`
			})
			this.keyboards.push( clone )
		}




		//  Setup our tweens.

		this.keyboardOffsets = 0
		this.tweens = [


			//  Rotate the keyboards into place.

			new TWEEN.Tween({ 

				rx:  45,
				ry: -13,
				rz:   0
			})
			.to({ 

				rx:  80,
				ry:   0,
				rz: -90

			}, beatToNorm( 16 ))
			.easing( TWEEN.Easing.Cubic.InOut )
			.onUpdate( function(){

				keyboardsRotator.style.transform = `
					rotateX( ${ this.rx }deg )
					rotateY( ${ this.ry }deg )
					rotateZ( ${ this.rz }deg )`
			})
			.start( beatToNorm( 0 )),


			//  Raise up the camera high.

			new TWEEN.Tween({ tz: -5 })
			.to({ tz: -50 }, beatToNorm( 8 ))
			.easing( TWEEN.Easing.Cubic.InOut )
			.onUpdate( function(){

				translation = getCssTranslation( keyboardsTranslator )
				keyboardsTranslator.style.transform = `
					translate3d( 
				 		${ translation.x }px,
				 		${ translation.y }px,
				 		calc( var( --size ) * ${ this.tz } )
				 	)`
				 translation = getCssTranslation( keyboardsTranslator )
			})
			.start( beatToNorm( 0 )),


			//  Fade in our keyboard clones.

			new TWEEN.Tween({ opacity: 0 })
			.to({ opacity: 1 }, beatToNorm( 6 ))
			.easing( TWEEN.Easing.Cubic.In )
			.onUpdate( function(){

				that.keyboards[ 1 ].style.opacity = this.opacity
			})
			.start( beatToNorm( 8 )),
			
			new TWEEN.Tween({ opacity: 0 })
			.to({ opacity: 1 }, beatToNorm( 6 ))
			.easing( TWEEN.Easing.Cubic.In )
			.onUpdate( function(){

				that.keyboards[ 2 ].style.opacity = this.opacity
			})
			.start( beatToNorm( 12 )),


			//  Now pull the camera down close to the keyboards.

			new TWEEN.Tween({ tz: -50 })
			.to({ tz: -2 }, beatToNorm( 12 ))
			.easing( TWEEN.Easing.Cubic.InOut )
			.onStart( function(){

				document
				.querySelector( 'main' )
				.classList
				.remove( 'tilted' )
			})
			.onUpdate( function(){

				translation = getCssTranslation( keyboardsTranslator )
				keyboardsTranslator.style.transform = `
					translate3d( 
				 		${ translation.x }px,
				 		${ translation.y }px,
				 		calc( var( --size ) * ${ this.tz } )
				 	)`
				 translation = getCssTranslation( keyboardsTranslator )
			})
			.start( beatToNorm( 8 ))
		]




		    ////////////////
		   //            //
		  //   Glide!   //
		 //            //
		////////////////


		this.messagesReady = []
		this.messagesSpent = [ '', '', '' ]

		const
		keyboardGlide = function(){

			// if( this.n > 0 && this.n < 1 ){

				translation = getCssTranslation( keyboardsTranslator )
				keyboardsTranslator.style.transform = `
					translate3d( 
						calc( var( --size ) * ${ this.tx } ),
						${ translation.y }px,
						${ translation.z }px
					)`
				translation = getCssTranslation( keyboardsTranslator )


				//  Do we need to pick a keyboard up from behind us
				//  and lay it down at the head of the line?

				if( this.tx + that.keyboardOffsets * keyboardWidth <= 
					keyboardWidth * -1.5 ){


					// console.log( '██████████████████████ New keyboard', Math.random() )

					that.keyboardOffsets ++
					forEachElement( '.keyboard', function( keyboard ){

						keyboard.classList.remove( 'fade-in')
					})
					that.keyboards[ 0 ].style.transform = `
						translate3d( calc( var( --size ) * ${( that.keyboardOffsets + 2 ) * keyboardWidth } ), 0, 0 )`
					// that.keyboards[ 0 ].classList.add( 'fade-in' )
					that.keyboards.push( that.keyboards.shift())

					that.keyboards
					.forEach( function( keyboard, i ){

						keyboard.index = i
					})


					//  Do we have messages to erase?

					if( that.messagesSpent.length ){

						const message = that.messagesSpent.shift()
						if( message.length ){
						
							drawGlyph( glyphs[ message[ 0 ]], { 

								rootElement: that.keyboards[ 2 ],
								offset: 4,
								shouldErase: true
							})
							drawGlyph( glyphs[ message[ 1 ]], { 

								rootElement: that.keyboards[ 2 ],
								offset: 11,
								shouldErase: true
							})
						}
					}


					//  Do we have messages to draw?

					if( that.messagesReady.length ){

						const message = that.messagesReady.shift()
						drawGlyph( glyphs[ message[ 0 ]], {

							rootElement: that.keyboards[ 2 ],
							offset: 4
						})
						drawGlyph( glyphs[ message[ 1 ]], {

							rootElement: that.keyboards[ 2 ],
							offset: 11
						})
						that.messagesSpent.push( message )
					}
					else {

						that.messagesSpent.push( '' )
					}
				}
			// }
		}

		var 
		glideCursorInBeats = 13,
		glideCursorX = -5,//translation.x / window.size,
		glideSpeed = 49.5//  1 beat = 1/2 keyboard.









		// console.log( 'PRIOR TO TWEEN CREATION translation', translation )

		function createGlideTween( 

			cursorInBeats, 
			segmentDurationInBeats,
			fromX,
			tweenMethod,
			description ){

			const toX = fromX - segmentDurationInBeats * glideSpeed * (

				tweenMethod === TWEEN.Easing.Linear.None
					? 1 : 1/4
			)
			that.tweens.push(

				new TWEEN.Tween(

					{ n: 0, tx: fromX }
				)
				.to(

					{ n: 1, tx: toX },
					beatToNorm( segmentDurationInBeats )
				)
				.easing( tweenMethod )
				.onStart( function(){

					// console.log( '\n\n\n\nSTARTED!', description )
					translation = getCssTranslation( keyboardsTranslator )
					// console.log( 'translation', translation, '\n\n\n\n' )
				})
				.onUpdate( keyboardGlide )
				.onComplete( function(){

					//  The fact that this would print for ever is very alarming to me.
					// console.log( 'FINISHED w GLIDE TWEEN', description )
				})
				.start( beatToNorm( cursorInBeats ))
			)
			return {

				glideCursorX: toX,
				glideCursorInBeats: cursorInBeats + segmentDurationInBeats
			}
		}

		var { glideCursorInBeats, glideCursorX } = createGlideTween( 
 
			glideCursorInBeats,
			8,
			glideCursorX,
			TWEEN.Easing.Cubic.In,
			'Ramp it up.'
		)
		var { glideCursorInBeats, glideCursorX } = createGlideTween( 

			glideCursorInBeats,
			56,
			glideCursorX,
			TWEEN.Easing.Linear.None,
			'Keep it steady'
		)
		var { glideCursorInBeats, glideCursorX } = createGlideTween( 

			glideCursorInBeats,
			16,
			glideCursorX,
			TWEEN.Easing.Cubic.Out,
			'Slow it down.'
		)



		//  Angle shit so we can see the text better.

		this.tweens.push(

			new TWEEN.Tween({ 

				rx:  80,
				ry:   0,
				rz: -90
			})
			.to({ 

				rx:  60,
				ry:   0,
				rz: -90

			}, beatToNorm( 16 ))
			.easing( TWEEN.Easing.Cubic.InOut )
			.onUpdate( function(){

				keyboardsRotator.style.transform = `
					rotateX( ${ this.rx }deg )
					rotateY( ${ this.ry }deg )
					rotateZ( ${ this.rz }deg )`
			})
			.start( beatToNorm( 24 ))
		)



		//  Now put it back.

		this.tweens.push(

			new TWEEN.Tween({ 

				rx:  60,
				ry:   0,
				rz: -90
			})
			.to({ 

				rx:  80,
				ry:   0,
				rz: -90

			}, beatToNorm( 16 ))
			.easing( TWEEN.Easing.Cubic.InOut )
			.onUpdate( function(){

				keyboardsRotator.style.transform = `
					rotateX( ${ this.rx }deg )
					rotateY( ${ this.ry }deg )
					rotateZ( ${ this.rz }deg )`
			})
			.start( beatToNorm( 64 ))
		)





		//  Rotate back into place.

		this.tweens.push(

			new TWEEN.Tween({ 

				rx:  80,
				ry:   0,
				rz: -90
			})
			.to({ 

				rx: 0,
				ry: 0,
				rz: 0

			}, beatToNorm( 16 ))
			.easing( TWEEN.Easing.Cubic.InOut )
			.onUpdate( function(){

				keyboardsRotator.style.transform = `
					rotateX( ${ this.rx }deg )
					rotateY( ${ this.ry }deg )
					rotateZ( ${ this.rz }deg )`
			})
			.start( 1 - beatToNorm( 24 ))
		)



		//  Fade keyboard clones out.

		this.tweens.push(

			new TWEEN.Tween({ opacity: 1 })
			.to({ opacity: 0 }, beatToNorm( 6 ))
			.easing( TWEEN.Easing.Cubic.In )
			.onUpdate( function(){

				that.keyboards[ 2 ].style.opacity = this.opacity
			})
			.start( 1 - beatToNorm( 22 ))
		)
		this.tweens.push(
			
			new TWEEN.Tween({ opacity: 1 })
			.to({ opacity: 0 }, beatToNorm( 6 ))
			.easing( TWEEN.Easing.Cubic.In )
			.onUpdate( function(){

				that.keyboards[ 1 ].style.opacity = this.opacity
			})
			.start( 1 - beatToNorm( 20 ))
		)




		//  x

		this.tweens.push(

			new TWEEN.Tween({ 

				tx: ( glideCursorX % keyboardWidth ),// * -1,
				ty: 5,
				tz: 2
			})
			.to({ 

				tx: 0,
				ty: 0,
				tz: 0 

			}, beatToNorm( 4 ))
			.easing( TWEEN.Easing.Cubic.InOut )
			.onStart( function(){

				// console.log( 'ABOUT TO TRANSLATE BACK INTO PLACE' )
				// console.log( 'glideCursorX', glideCursorX )
				// console.log( 'keyboardWidth', keyboardWidth )
				// console.log( 'glideCursorX % keyboardWidth', glideCursorX % keyboardWidth )

				translation = getCssTranslation( keyboardsTranslator )
				// console.log( '!! translation', translation )


				that.keyboards
				.forEach( function( keyboard, i ){

					// console.log( keyboard.isOriginal, i, i * keyboardWidth, keyboard )

					keyboard.style.transform = `
					translate3d( 
				 		calc( var( --size ) * ${ i * keyboardWidth } ),
				 		0px,
				 		0px
				 	)`

				 	const t = getCssTranslation( keyboard )
				 	// console.log( 'keyboard', i, t )
				})
			})
			.onUpdate( function(){

				// console.log( this.tx )
				keyboardsTranslator.style.transform = `
					translate3d( 
				 		calc( var( --size ) * ${ this.tx } ),
				 		calc( var( --size ) * ${ this.ty } ),
				 		calc( var( --size ) * ${ this.tz } )
				 	)`
				translation = getCssTranslation( keyboardsTranslator )
			})
			.start( 1 - beatToNorm( 20 ))
			// .start( 1 - beatToNorm( 12 ))
		)
	},
	update: function(){
		
		if( comp.isPlaying ){

			const
			elapsedSeconds = comp.audio.currentTime - this.timeStart,
			elapsedPercent = elapsedSeconds / this.durationInSeconds

			this.tweens
			.forEach( function( tween ){

				tween.update( elapsedPercent )
			})
		}
		if( comp.audio.currentTime >= this.timeStart + this.durationInSeconds ){

			Mode.switchTo( 'idle' )
		}
	},
	teardown: function(){
	
		const that = this

		// console.log(

		// 	'\n\n\n   TURNING OFF “POPCORN”',
		// 	'\nthis.keyboards[ 0 ].styletransform', this.keyboards[ 0 ].style.transform,
		// 	'\n'
		// )

		const 
		keyboardsTranslator = document.querySelector( '.keyboards-translator' ),
		keyboardsRotator = document.querySelector( '.keyboards-rotator' ),
		keyboard = this.keyboards[ 0 ]

		this.tweens
		.forEach( TWEEN.remove )

		while( this.keyboards.length > 1 ){

			const clone = this.keyboards[ this.keyboards.length - 1 ]
			clone.parentNode.removeChild( clone )
			this.keyboards.pop()
		}


		keyboardsTranslator.style.transition = 'none'
		keyboardsRotator.style.transition = 'none'
		keyboard.style.transition = 'none'
		keyboard.classList.remove( 

			'popcorn',
			'fade-in'
		)
		setTimeout( function(){

			keyboardsTranslator.style.removeProperty( 'transform' )
			keyboardsTranslator.style.removeProperty( 'transition' )

			keyboardsRotator.style.removeProperty( 'transform' )
			keyboardsRotator.style.removeProperty( 'transition' )

			keyboard.style.removeProperty( 'transform' )
			keyboard.style.removeProperty( 'transition' )
		})
	}
})
















function insertRowStream( timeStart, keyboard, rowIndex, engageDelay ){

	let timeCursor = timeStart
	if( keyboard instanceof HTMLElement !== true ){

		keyboard = document.querySelector( '.keyboard' )
	}
	if( typeof rowIndex !== 'number' ) rowIndex = 1
	if( typeof engageDelay !== 'number' ) engageDelay = 0.01

	Array
	.from( 

		keyboard
		.querySelectorAll( `.key[y='${ rowIndex }']` )
	)
	.forEach( function( key, i ){

		timeCursor += i * engageDelay
		insert(

			timeCursor,
			0,
			function(){

				key.engage()
			}
		)
		insert(

			timeCursor + 1,
			0,
			function(){

				key.disengage()
			}
		)
	})
	return timeCursor
}
function insertRowStreamAllKeyboards( timeStart, rowIndex ){

	let timeCursor = timeStart
	Array
	.from(

		document
		.querySelectorAll( `.keyboard` )
	)
	.sort( function( a, b ){

		// console.log( getCssTranslation( a ).x, getCssTranslation( b ).x )
		return (

			getCssTranslation( a ).x - getCssTranslation( b ).x
		)
	})
	.forEach( function( keyboard, i ){

		// console.log( keyboard, i )
		timeCursor = insertRowStream( timeCursor, keyboard, rowIndex )
	})
}
function insertStreamFun( timeStart ){

	insert( 

		timeStart,
		0,
		function(){

			for( let i = 0; i < 5; i ++ ){

				insertRowStreamAllKeyboards( 

					timeStart + i * 1,
					i
				)
			}
		}
	)
}









const glyphs = {

' ':`





`,

A:`
███
█ █
█ █
███
█ █
`,
B:`
███
█ █
██ 
█ █
███
`,
C:`
███
█
█
█
 ██
`,
D:`
██ 
█ █
█ █
█ █
██ 
`,
E:`
███
█
███
█
███
`,
F:`
███
█
█
███
█
`,
//G
//H
//I
//J
K:`
█ █
█ █
██
█ █
█ █
`,
L:`
█
█
█
█
███
`,
//M
N:`
██ 
█ █
█ █
█ █
█ █
`,
//O
P:`
███
█ █
█ █
███
█
`,
//Q
R:`
███
█ █
█ █
██
█ █
`,
S:`
███
█  
███
  █
███
`,
T:`
███
 █ 
 █
 █
 █
`,
U:`
█ █
█ █
█ █
█ █
 ██
`,
//V
W:`
██
  █
 █ 
  █
██
`,//  yikes. W is the W-orst.
//X
//Y
//Z
}

function composeStringOfGlyphs( text ){

	return (

		text
		.split( '' )
		.reduce( function( lines, character ){

			glyphs[ character.toUpperCase() ]
			.split( '\n' )
			.forEach( function( c, i ){

				lines[ i ] += c.padEnd( 4 )
			})
			return lines
		
		}, new Array( 7 ).fill( '' ))
		.join( '\n' )
	)
}

console.log( 

	'\n\n\n',
	 composeStringOfGlyphs( 'BLACK SWAN' ),
	'\n\nFriday, 02 October 2020.',
	'\n\nLive: https://stewartsmith.io/blackswan',
	'\nRepo: https://github.com/stewdio/blackswan',
	'\n\n\n\n\n'
)



//  Highest “reliable” offset is 11.
//  Lowest “reliable” offset is 5.


/*



drawGlyphMessage(){
	
	//  Start on the most distant keyboard,
	//  keyboards[ 2 ]




	//  Each time a keyboard gets 
	//  shuffled to the head of the line,
	//  shift a message off the stack
	//  and write it to that keyboard
	//  until there are no messages left.

	queuedMessages = [

		[ 'FU' ],
		[ 'CK' ],
		[ 'ED' ],
		[ 'UP' ]
	]

	queuedMessages = [

		[ 'BL' ],
		[ 'CK' ],
		[ 'SW' ],
		[ 'AN' ]
	]
	queuedMessages = [

		[ 'SP' ],
		[ 'AR' ],
		[ 'EP' ],
		[ 'AR' ],
		[ 'TS' ]
	]
}


drawGlyph( glyphs.F, { offset:  5 })
drawGlyph( glyphs.U, { offset: 11 })
drawGlyph( glyphs.C, { offset:  5 })
drawGlyph( glyphs.K, { offset: 11 })
drawGlyph( glyphs.E, { offset:  5 })
drawGlyph( glyphs.D, { offset: 11 })
drawGlyph( glyphs.U, { offset:  5 })
drawGlyph( glyphs.P, { offset: 11 })





*/


function drawGlyph( glyph, params ){

	if( typeof glyph !== 'string' ){

		console.warn( 'Hey! That’s not a glyph!!', glyph, params )
		return
	}

	if( params === undefined ) params = {}
	if( params.rootElement === undefined ) params.rootElement = document.body
	if( typeof params.offset !== 'number' ) params.offset = 7
	if( typeof params.shouldErase !== 'boolean' ) params.shouldErase = !!params.shouldErase

	glyph
	.substring( 1, glyph.length - 1 )
	.split( '\n' )
	.forEach( function( row, r ){

		row
		.split( '' )
		.forEach( function( column, c ){

			const
			x = params.offset - r,
			y = c

			if( column === '█' ){
				
				forEachElement(

					params.rootElement,
					`.key[x='${ x }'][y='${ y }']`,
					function( key ){

						if( params.shouldErase ){

							key.style.transition = 'none'
							key.style.animation = 'none'
							key.disengage( 'drawGlyph' )
							setTimeout( function(){

								key.style.removeProperty( 'transition' )
								key.style.removeProperty( 'animation' )
							})
						}
						else key.engage( 'drawGlyph' )
					}
				)
			}
		})
	})
}














function blackSwanOn( durationInBeats, debug ){

	if( typeof durationInBeats !== 'number' ) durationInBeats = 2/4

	const 
	timeStart = comp.findLastBeat(),
	text = [ ...new Set( 'blackswan'.split( '' ))],
	durationPerCharacter = durationInBeats / text.length 

	append( 0, function(){ forEachElement( '.keyboard', (e)=>{e.stateAdd( 'capslock' )})}, 'caps-lock ON' )
	text.forEach( function( letter, i ){

		append(

			durationPerCharacter,
			function(){
		
				//const key = document.querySelector( '.key-'+ letter.toUpperCase() )
				//key.classList.add( 'black' )
				forEachElement( '.key-'+ letter.toUpperCase(), function( e ){

					e.classList.add( 'black' )
				})
			},
			'Black ON: '+ letter
		)
	})
	if( debug ) assessDuration( timeStart, comp.findLastBeat(), 'Black swan ON', durationInBeats )
}
function blackSwanOff( durationInBeats, debug ){

	if( typeof durationInBeats !== 'number' ) durationInBeats = 2/4

	const 
	timeStart = comp.findLastBeat(),
	text = [ ...new Set( 'blackswan'.split( '' ))],
	durationPerCharacter = durationInBeats / text.length 

	append( 0, function(){ forEachElement( '.keyboard', (e)=>{e.stateAdd( 'capslock' )})}, 'caps-lock ON' )
	text.forEach( function( letter, i ){

		append(

			durationPerCharacter,
			function(){
		
				// const key = document.querySelector( '.key-'+ letter.toUpperCase() )
				// key.classList.remove( 'black' )
				forEachElement( '.key-'+ letter.toUpperCase(), function( e ){

					e.classList.remove( 'black' )
				})
			},
			'Black OFF: '+ letter
		)
	})
	append( 0, function(){ forEachElement( '.keyboard', (e)=>{e.stateRemove( 'capslock' )})}, 'caps-lock OFF' )
	if( debug ) assessDuration( timeStart, comp.findLastBeat(), 'Black swan OFF', durationInBeats )
}




function surfRider( durationInBeats ){

	const 
	timeStart = comp.findLastBeat()

	insert(

		timeStart,
		0,
		function(){
	
			//keyboard.classList.add( 'surf-rider' )
		}
	)



	// assessDuration( timeStart, comp.findLastBeat(), 'Blind spot', durationInBeats )
}










function ekg( durationInBeats ){//  Jed reference.

	if( typeof durationInBeats !== 'number' ) durationInBeats = 1

	const 
	text      = ` ASDFT6YJM .;' `,
	// text      = ` ASDR5THNKL;' `,
	timeStart = comp.findLastBeat(),
	durationPerCharacter = durationInBeats / text.length

	text.split( '' ).forEach( function( character, i ){

		let cssName = character.toUpperCase()
		if( character === ' ' ){

			if( i === 0 ) cssName = 'caps-lock'
			else if( i === text.length - 1 ) cssName = 'return'
			else cssName = 'command-right'
		}
		else if( character === '.' ){

			cssName = 'period'
		}
		else if( character === ';' ){

			cssName = 'semicolon'
		}
		else if( character === "'" ){

			cssName = 'quote'
		}
		const key = document.querySelector( '.key-'+ cssName )
		insert(

			timeStart + i * durationPerCharacter * comp.beatsPerSecond,
			comp.beatsPerSecond * durationPerCharacter,
			function(){

				//key.classList.add( 'press' )
				keyEngage( key )
			}
		)
		insert(

			timeStart + durationInBeats / 2 + i * durationPerCharacter * comp.beatsPerSecond,
			0,// durationPerCharacter,
			function(){

				//key.classList.remove( 'press' )
				keyDisengage( key )
			}
		)
	})
	// assessDuration( timeStart, comp.findLastBeat(), 'EKG', durationInBeats )
}







function ripple( x, y ){

	// if( typeof x !== 'number' ) x = 0.2
	// if( typeof y !== 'number' ) y = 0.5

	if( typeof x !== 'number' ) x = Math.sin( performance.now() / 1000 )
	if( typeof y !== 'number' ) y = Math.sin( performance.now() / 100000 )


	forEachElement( '.key', function( key ){

		const distance = Math.sqrt(
			
			Math.pow( x - parseFloat( key.getAttribute( 'x-normalized' )), 2 ) +
			Math.pow( y - parseFloat( key.getAttribute( 'y-normalized' )), 2 )
		)
		//console.log( key.getAttribute( 'data-name' ), distance )

		const
		sine = Math.sin( distance ),
		sign = Math.sign( sine )

		key.style.transform = 'translate3d( 0px, 0px, '+ 
			Math.pow( sine * 20, 2 )
			+'px )'
	})
}
//  window.setInterval( ripple, 100 )
//    OR
//  tasks.updates.add( ripple )

















    /////////////////
   //             //
  //   Posters   //
 //             //
/////////////////


//  From a default state
//  remove the labels from all keys
//  aside from the keys for B, L, A, C, K, S, W, and N.

function makePosterArt1(){

	reset()
	const keyboard = document.querySelector( '.keyboard' )
	keyboard.classList.add( 'capslock' )

	const keysToRemain = 
	'BLACKSWAN'.split( '' )
	.map( function( letter ){

		return 'key-'+ letter
	})

	keyboard.querySelectorAll( '.key' )
	.forEach( function( key ){

		const found = keysToRemain.some( e => Array.from( key.classList ).includes( e ))
		if( !found ) key.classList.add( 'blank' )
	})
}


//  From a default state
//  highlight all the keys for B, L, A, C, K, S, W, and N.

function makePosterArt2(){

	reset()
	const keyboard = document.querySelector( '.keyboard' )
	keyboard.classList.add( 'capslock' )

	const keysToRemain = 
	'BLACKSWAN'.split( '' )
	.map( function( letter ){

		return 'key-'+ letter
	})

	keyboard.querySelectorAll( '.key' )
	.forEach( function( key ){

		key.classList.add( 'blank' )
		const found = keysToRemain.some( e => Array.from( key.classList ).includes( e ))
		if( found ){

			//key.classList.add( 'press' )
			keyEngage( key.getAttribute( 'data-name' ) )
		}
	})
}


//  From a default state
//  remove all keys
//  aside from the keys for B, L, A, C, K, S, W, and N.

function makePosterArt3(){

	reset()
	const keyboard = document.querySelector( '.keyboard' )
	keyboard.classList.add( 'capslock' )

	const keysToRemain = 
	'BLACKSWAN'.split( '' )
	.map( function( letter ){

		return 'key-'+ letter
	})

	keyboard.querySelectorAll( '.key' )
	.forEach( function( key ){

		const found = keysToRemain.some( e => Array.from( key.classList ).includes( e ))
		if( !found ) key.style.visibility = 'hidden'
	})
}


//  From a default state
//  remove all keys
//  aside from the keys for B, L, A, C, K, S, W, N,
//  and F, U, C, K, E, D, and P.
//  Highlight the keys for “FUCKEDUP”.

function makePosterArt4(){

	reset()
	const keyboard = document.querySelector( '.keyboard' )
	keyboard.classList.add( 'capslock' )

	const keysToRemain = 
	'BLACKSWANFUCKEDUP'.split( '' )
	.map( function( letter ){

		return 'key-'+ letter
	})

	keyboard.querySelectorAll( '.key' )
	.forEach( function( key ){

		const found = keysToRemain.some( e => Array.from( key.classList ).includes( e ))
		if( !found ) key.style.visibility = 'hidden'
	})

	const fuckedUpkeysToRemain = 
	'FUCKEDUP'.split( '' )
	.map( function( letter ){

		return 'key-'+ letter
	})

	keyboard.querySelectorAll( '.key' )
	.forEach( function( key ){

		const found = fuckedUpkeysToRemain.some( e => Array.from( key.classList ).includes( e ))
		if( found ){

			//key.classList.add( 'press' )
			keyEngage( key.getAttribute( 'data-name' ))
		}
	})
}


//  From a default state
//  remove all keys
//  aside from the key for B.
//  Remove its background.
//  Change the color and weight of the text.

function makeFavicon1(){

	reset()
	const keyboard = document.querySelector( '.keyboard' )
	keyboard.classList.add( 'capslock' )
	forEachElement( '.key', function( key ){

		const name = key.getAttribute( 'data-name' )
		if( name === 'B' ){

			key.style.backgroundColor = 'transparent'
			key.style.color = 'white'
			key.style.fontWeight = '700'
		}
		else {

			key.style.visibility = 'hidden'
		}
	})
}







