
//  Copyright © 2020, Stewart Smith. See LICENSE for details.






    /////////////////
   //             //
  //   Helpers   //
 //             //
/////////////////


function reset(){

	Array
	.from( document.querySelectorAll( '.keyboard' ))
	.forEach( function( keyboard ){
	
		keyboard.statesReset()
		keyboard.classList.remove( 

			'capslock',
			'long-sustain',
			'push-out',
			'push-in',
			'tilt-complete'
		)
	})

	Array
	.from( document.querySelectorAll( '.key' ))
	.forEach( function( key ){

		key.locksReset()
		key.classList.remove( 
		
			'engage', 
			'disengaging',
			'happening',
			'blindspot',
			'not-obvious',

			'black', 
			'wtf',
			'blank'//  A clone for “dead” but intended to be added / removed at random.
		)
		// key.style.transform  = 'none'
		//key.style.visibility = 'visible'
		key.style.visibility = ''
	})


	Mode.switchTo( 'idle' )

	tasks.updates.remove( ripple )
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
function tiltCompleteOn(){

	changeKeyboardState( 'tilt-complete', 'add', 'Tilt-complete ON.' )
}
function tiltCompleteOff(){

	changeKeyboardState( 'tilt-complete', 'remove', 'Tilt-complete OFF.' )
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
	action = function( timeMark ){

		return function( name, i ){

			if( name.length === 1 ) name = name.toUpperCase()
			insert( 
				
				timeMark + 1/16 * comp.beatsPerSecond * i,
				0,
				function(){ 

					// console.log( 'ON:  name', name )
					keyEngage( name )
				},
				'Traaaaiiiin ON: '+ name
			)
			insert(

				timeMark + 1/16 * comp.beatsPerSecond * ( i + 10 ),
				0,
				function(){ keyDisengage( name )},
				'Traaaaiiiin OFF: '+ name
			)
			return name
		}
	},
	delayBetween = comp.beatsPerSecond *  3/4

	changeKeyboardState( 'long-sustain', 'add' )

	'tyuiop'
	.split( '' )
	.concat( 
	
		'bracket-open',
		'bracket-close',
		'slash-backward'
	)
	.map( action( timeStart ))
	.map( action( timeStart + delayBetween * 2.5 ))
	.map( action( timeStart + delayBetween * 5 ))

	'asdfghjkl'
	.split( '' )
	.concat( 

		'semicolon',
		'quote',
		'return'
	)
	.map( action( timeStart + delayBetween * 1 ))
	.map( action( timeStart + delayBetween * 4 ))

	'nm'
	.split( '' )
	.concat( 

		'comma',
		'period',
		'slash-forward',
		'shift-right'
	)
	.map( action( timeStart + delayBetween * 2 ))
	.map( action( timeStart + delayBetween * 3.5 ))
	.map( action( timeStart + delayBetween * 6 ))

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
				tz: getRandomBetween( 300, 600 ),


				//  Technically these should be normalized
				//  such that the vector length === 1.
				//  But the browser will fix this for us. 

				rx: getRandomBetweenEitherSign(),
				ry: getRandomBetweenEitherSign(),
				rz: getRandomBetweenEitherSign()
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
					// keyEngage( item.name.toUpperCase() )
				}
				// if( elapsedPercent >= 0.5 && item.hasDisengaged === false ){
				if( elapsedPercent >= 0.9999 && item.hasDisengaged === false ){

					item.hasDisengaged = true
					// keyDisengage( item.name.toUpperCase() )
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
	insert( 

		timeStart + durationInBeats * comp.beatsPerSecond,
		0,
		function(){

			forEachElement( 

				'.keyboard', 
				function( keyboard ){

					keyboard.classList.add( 'tilt-complete' )
				}
			)
		}
	)
}
new Mode({

	name: 'noitisnt',
	setup: function(){
		
		this.move = {

			//      n    tx  ty  tz  rx  ry
			// from: [ 0.0,  0, 0,  0,  0,   0 ],
			// to:   [ 1.0, -5, 5, -5, 45, -13 ]

			from: [ 0.3,  0, 0,  0,  0,    0 ],
			to:   [ 1.0, -5, 5, -5, 45, -373 ]
		}
		this.orbit = {

			//       n    r
			from: [  0.4, 10, ],
			to:   [  1.0, 30, ]
		}
		this.explode = {

			//      n
			from: [ 0.10 ],
			to:   [ 0.90 ]
		}
		this.cohese = {

			//      n
			from: [ 0.90 ],
			to:   [ 0.99 ]
		}
		this.keyboard = document.querySelector( '.keyboard' )
		this.keyboard.classList.remove( 'tilt-complete' )
	},
	update: function(){
		
		if( comp.isPlaying ){

			const
			elapsedSeconds = comp.audio.currentTime - this.timeStart,
			elapsedPercent = elapsedSeconds / this.durationInSeconds

			const
			n1 = easeInOutCubic( constrain( norm( elapsedPercent, this.move.from[ 0 ], this.move.to[ 0 ]))),
			x1 = lerp( this.move.from[ 1 ], this.move.to[ 1 ], n1 ),
			y1 = lerp( this.move.from[ 2 ], this.move.to[ 2 ], n1 ),
			z1 = lerp( this.move.from[ 3 ], this.move.to[ 3 ], n1 ),
			rx = lerp( this.move.from[ 4 ], this.move.to[ 4 ], n1 ),
			ry = lerp( this.move.from[ 5 ], this.move.to[ 5 ], n1 )

			// const
			// n2 = constrain( norm( elapsedPercent, this.orbit.from[ 0 ], this.orbit.to[ 0 ])),
			// radius = lerp( this.orbit.from[ 1 ], this.orbit.to[ 1 ], n2 ),
			// x2 = Math.cos( n2 * Math.PI * 2 ) * radius,
			// y2 = Math.sin( n2 * Math.PI * 2 ) * radius

			// const 
			// mix = constrain( norm( elapsedPercent, this.orbit.from[ 0 ], this.move.to[ 0 ])),
			// tx = lerp( x1, x2, mix ),
			// ty = lerp( y1, y2, mix ),
			// tz = z1

			const
			tx = x1,
			ty = y1,
			tz = z1

			this.keyboard.style.transition = 'none'
			this.keyboard.style.transform = 
				`translate3d( 

					calc( var( --size ) * ${ tx } ), 
					calc( var( --size ) * ${ ty } ), 
					calc( var( --size ) * ${ tz } )
				)
				rotateX( ${ rx }deg )
				rotateY( ${ ry }deg )`
		



			//  Blow apart and then come back together.

			const
			explodeGain = norm( elapsedPercent, this.explode.from[ 0 ], this.explode.to[ 0 ]),
			coheseGain  = norm( elapsedPercent, this.cohese.from[ 0 ], this.cohese.to[ 0 ])

			let gain = constrain( explodeGain )
			if( coheseGain >= 0 ){

				gain = 1 - constrain( coheseGain )
			}
			gain = easeInOutCubic( gain )

			if( coheseGain <= 1 ){
			
				forEachElement( '.key', function( key ){

					const [ tx, ty, tz ] = 'tx ty tz'
					.split( ' ' )
					.map( function( attribute ){

						return lerp(

							0, 
							parseFloat( key.getAttribute( attribute )), 
							gain
						)
					})

					const [ rx, ry, rz ] = 'rx ry rz'
					.split( ' ' )
					.map( function( attribute ){

						return parseFloat( key.getAttribute( attribute ))
					})

					// console.log( 'tx', tx, 'ty', ty, 'tz', tz )

					key.style.transition = 'none'
					key.style.transform = `translate3d( 

						calc( var( --size ) * ${ tx } ), 
						calc( var( --size ) * ${ ty } ), 
						calc( var( --size ) * ${ tz } )
					)
					rotate3d( ${ rx }, ${ ry }, ${ rz }, ${ gain * 45 }deg )`
				})
			}
		}
		if( comp.audio.currentTime >= this.timeStart + this.durationInSeconds ){

			Mode.switchTo( 'idle' )
		}
	},
	teardown: function(){
	

		console.log( 'ENDED!' )

		const that = this
		this.keyboard.style.transition = 'none'
		setTimeout( function(){

			that.keyboard.style.transform  = ''
			that.keyboard.style.transition = ''
		})

		forEachElement( '.key', function( key ){

			key.style.transition = 'none'
			setTimeout( function(){

				key.style.transform  = ''
				key.style.transition = ''
			})
		})
	}
})







//  2:58  you can touch meeeeeeeeeeee

new Mode({

	name: 'me',
	timeStart: 0,
	durationInSeconds: 0,
	setup:  function(){},
	update: function(){
		
		if( comp.isPlaying ){

			const
			elapsedSeconds = comp.audio.currentTime - this.timeStart,
			elapsedPercent = elapsedSeconds / this.durationInSeconds,
			elapsedX3 = elapsedPercent * 3 - 1,
			gaus = createGaussianFunction( elapsedX3, 0.1, 1 )

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

		const that = this
		this.keyboards = [ 

			document.querySelector( '.keyboard' )
		]

		//  Remove our “tilt-complete” CSS class
		//  as we’re about to move things manually.

		this.keyboards[ 0 ].classList.remove( 'tilt-complete' )
		this.keyboards[ 0 ].classList.add( 'push-out' )
		this.keyboards[ 0 ].isOriginal = true


		//  Create our clone keyboard.
		//  This will clone all the HTMLElement bits of it
		//  but *NOT* the raw properties we’ve globbed on
		//  so we’ll need to do that for each clone.
		
		for( let i = 0; i < 2; i ++ ){

			const clone = this.keyboards[ 0 ].cloneNode( true )
			clone.style.left = `calc( var( --size ) * ${ 99 * ( i + 1 )} )`
			clone.style.opacity = 0
			clone.isClone = true
			appendKeyAbilitiesToAllKeys( clone )
			appendKeyboardAbilitiesTo( clone )
			this.keyboards[ 0 ].parentNode.appendChild( clone )
			this.keyboards.push( clone )
		}



		const 
		keyboardsTranslation = document.querySelector( '.keyboards-translation' ),
		keyboardsRotation = document.querySelector( '.keyboards-rotation' )
		
		keyboardsTranslation.style.transform = `
			translate3d(
		 		calc( var( --size ) * ${ -5 } ), 
		 		calc( var( --size ) * ${  5 } ), 
		 		calc( var( --size ) * ${ -5 } )
		 	)`



		//  Setup our tweens.

		this.offset = 0
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

				}, 0.5 )
				.easing( TWEEN.Easing.Cubic.InOut )
				.onUpdate( function(){

					keyboardsRotation.style.transform = `
						rotateX( ${ this.rx }deg )
						rotateY( ${ this.ry }deg )
						rotateZ( ${ this.rz }deg )`
				})
				.start( 0 ),


			//  Push keyboards forward.

			new TWEEN.Tween({ 

					tx:  -5,
					ty:   5,
					tz:  -5
				})
				.to({ 

					tx:  0,//10,
					ty:  0,//50,
					tz: 600

				}, 0.8 )
				.easing( TWEEN.Easing.Cubic.InOut )
				.onUpdate( function(){

					// console.log( 'z:', this.tz, '  offset:', that.offset )
					if( this.tz - that.offset > 99 ){

						that.offset += 99

						const translation = getCssTranslation( keyboardsTranslation )


						console.log( 'bumped offset up!!!!!!!!!', translation )
						
						

						that.keyboards.push( that.keyboards.shift())
						that.keyboards
						.forEach( function( keyboard ){

							keyboard.style.transform = `
								translate3d( calc( var( --size ) * ${ -this.offset * 3 } ), 0, 0 )`
						})
					}
					keyboardsTranslation.style.transform = `
						translate3d( 

					 		calc( var( --size ) * ${ this.tx } ), 
					 		calc( var( --size ) * ${ this.ty } ), 
					 		calc( var( --size ) * ${ this.tz } )
					 	)`
				})
				.start( 0.2 ),


			//  Fade in our keyboard clones.

			new TWEEN.Tween({ opacity: 0 })
				.to({ opacity: 1 }, 0.1 )
				.onUpdate( function(){

					that.keyboards[ 1 ].style.opacity = this.opacity
					that.keyboards[ 2 ].style.opacity = this.opacity
				})
				.start( 0 )


		]
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


			const rect = this.keyboards[ 0 ].getBoundingClientRect()
			// console.log( 'left edge?', Math.round( rect.left ))
			// if( rect.left < -1000 ){

				// this.offset += 99
			// }
 



 // https://zellwk.com/blog/css-translate-values-in-javascript/

			const style  = window.getComputedStyle( this.keyboards[ 1 ])
			const matrix = style.transform
			
			//const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')
			// console.log( 'matrix', matrix )


			/*


			if any keyboard is “too close”
			then we need to fade it out
			once opacity = 0%, move it “to the right” by 99*size
			then face opacity back up to 100%




			*/
		}
		if( comp.audio.currentTime >= this.timeStart + this.durationInSeconds ){

			Mode.switchTo( 'idle' )
		}
	},
	teardown: function(){
	
		const that = this

		const 
		keyboardsTranslation = document.querySelector( '.keyboards-translation' ),
		keyboardsRotation = document.querySelector( '.keyboards-rotation' )

		this.tweens
		.forEach( TWEEN.remove )

		while( this.keyboards.length > 1 ){

			const clone = this.keyboards[ this.keyboards.length - 1 ]
			clone.parentNode.removeChild( clone )
			this.keyboards.pop()
		}


		keyboardsTranslation.style.transform = ''
		keyboardsRotation.style.transform = ''

		this.keyboards[ 0 ].transition = 'none'
		this.keyboards[ 0 ].transform = ''
		setTimeout( function(){

			that.keyboards[ 0 ].style.transition = ''
		})
	}
})




















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







