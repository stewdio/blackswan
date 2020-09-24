
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
			'push-out',
			'push-in',
			'tilt-complete',

			// 'long-sustain',
			// 'wtf',
			// 'crazy',
			// 'surf-rider'
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
		if( !key.style.getPropertyValue( '--tx' )){
		
			key.style.setProperty( '--tx', getRandomBetween( -100, 100 ) +'px' )
			key.style.setProperty( '--ty', getRandomBetween( -100, 100 ) +'px' )
			key.style.setProperty( '--tz', getRandomBetween( -100, 100 ) +'px' )
			key.style.setProperty( '--rx', getRandomBetween( -1, 1 ))
			key.style.setProperty( '--ry', getRandomBetween( -1, 1 ))
			key.style.setProperty( '--rz', getRandomBetween( -1, 1 ))
		}
	})


	Mode.switchTo( 'idle' )

	tasks.updates.remove( ripple )
}
function applyCssClass( cssQuery, className ){

	Array
	.from( document.querySelectorAll( cssQuery ))
	.forEach( function( element ){

		element.classList.add( className )
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

					element[ actionName ]( stateName )
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










function insertHit( timeCursor, durationToOccupy, keyName, durationVisible ){
	
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
}
function insertRiffBeat( timeStart, durationInBeats, skipLastHit ){

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
}
function insertRiffBumpBump( timeStart ){

	let timeCursor = timeStart
	;[
		[ 2/4, 'option-left', 1/4 ],
		[ 2/4, 'option-left', 0.4 ]

	].forEach( function( item ){

		insertHit.call( this, timeCursor, ...item )
		timeCursor += item[ 0 ] * comp.beatsPerSecond
	})
}
function insertRiffDeadOrAlive( timeStart ){

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
}
function insertRiffOptions( timeStart, options ){

	if( options.includes( 'bump-bump' )) insertRiffBumpBump( timeStart )
	if( options.includes( 'dead-or-alive' )) insertRiffDeadOrAlive( timeStart )
}
function appendRiff( durationInBeats, options ){

	if( typeof durationInBeats !== 'number' ) durationInBeats = 4
	if( typeof options !== 'string' ) options = ''
	
	let i = 0
	while( i < durationInBeats ){

		const 
		timeStart = comp.findLastBeat(),
		beatsRemaining = durationInBeats - i,
		beatsThisLoop  = beatsRemaining >= 4
			? 4
			: beatsRemaining

		insertRiffBeat( timeStart, beatsThisLoop, options.includes( 'skip-last-hit' ))
		insertRiffOptions( timeStart, options )
		append( beatsThisLoop )
		i += 4
	}
}
function appendRiffBackside(){


}





function appendRiffedUp( text, options ){

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















function riff( durationInBeats, drumSolo, addLastHit, debug ){

	if( typeof durationInBeats !== 'number' ) durationInBeats = 4
	if( typeof drumSolo !== 'boolean' ) drumSolo = false
	if( typeof addLastHit !== 'boolean' ) addLastHit = true
	
	const 
	timeStart = comp.findLastBeat(),
	hit = function( durationToOccupy, cssName, durationVisible ){

		if( typeof durationVisible !== 'number' ) durationVisible = durationToOccupy
		insert(

			timeMark,
			comp.beatsPerSecond * durationToOccupy,
			function(){ keyEngage( cssName )},
			'Riff. Hit ON: '+ cssName
		)
		insert(

			timeMark + comp.beatsPerSecond * durationVisible * 15/16,
			0,
			function(){ keyDisengage( cssName )},
			'Riff. Hit OFF: '+ cssName
		)
		timeMark += comp.beatsPerSecond * durationToOccupy
	}

	let timeMark = timeStart

	hit( 2/4, 'space', 1/4 )
	hit( 2/4, 'space'  )

	if( durationInBeats > 1 ){
	
		hit( 1/4, 'period' )
		hit( 2/4, 'space'  )
		
		if( durationInBeats > 2 ){

			hit( 2/4, 'tab'    )
			hit( 2/4, 'period' )

			if( durationInBeats > 3 ){
			
				hit( 1/4, 'space'  )
				hit( 1/4, 'period' )
				hit( 2/4, 'space'  )
			}

			if( addLastHit ) hit( 1/4, 'space', 1/8 )
			else append( 1/4 )
		}
		else append( 1/4 )
	}
	if( drumSolo !== true ){

		insert( 

			timeStart + comp.beatsPerSecond * 0/8,
			comp.beatsPerSecond * 2/8,
			function(){ keyEngage( 'option-left' )},
			'Riff. Bass beat ON.'
		)
		insert( 

			timeStart + comp.beatsPerSecond * 2/8, 
			0,//comp.beatsPerSecond * 1/4,
			function(){ keyDisengage( 'option-left' )},
			'Riff. Bass beat OFF.'
		)
		insert( 

			timeStart + comp.beatsPerSecond * 4/8, 
			comp.beatsPerSecond * 2/8,
			function(){ keyEngage( 'option-left' )},
			'Riff. Bass beat ON.'
		)
		insert(

			timeStart + comp.beatsPerSecond * 8/8,
			0,//comp.beatsPerSecond * 4/8,
			function(){ keyDisengage( 'option-left' )},
			'Riff. Bass beat OFF.'
		)
	}
	if( debug ) assessDuration( timeStart, comp.findLastBeat(), 'Riff', durationInBeats )
}




function riffHalf( durationInBeats, debug ){

	if( durationInBeats !== 2 ) console.error( 'Pretty sure this needs 2 beats here.' )

	const 
	timeStart = comp.findLastBeat(),
	hit = function( durationToOccupy, cssName, durationVisible ){

		if( typeof durationVisible !== 'number' ) durationVisible = durationToOccupy
		insert(

			timeMark,
			comp.beatsPerSecond * durationToOccupy,
			function(){ keyEngage( cssName )},
			'Riff. Hit ON: '+ cssName
		)
		insert(

			timeMark + comp.beatsPerSecond * durationVisible * 15/16,
			0,
			function(){ keyDisengage( cssName )},
			'Riff. Hit OFF: '+ cssName
		)
		timeMark += comp.beatsPerSecond * durationToOccupy
	}

	let timeMark = timeStart

	hit( 2/4, 'tab' )
	hit( 2/4, '.' )
	hit( 1/4, 'space' )
	hit( 1/4, '.' )
	hit( 2/4, 'spaces' )

	if( debug ) assessDuration( timeStart, comp.findLastBeat(), 'Riff Half', durationInBeats )
}





function riffedUp( durationInBeats, drumSolo, addLastHit, debug ){

	if( typeof durationInBeats !== 'number' ) durationInBeats = 4
	if( typeof drumSolo !== 'boolean' ) drumSolo = true//false
	if( typeof addLastHit !== 'boolean' ) addLastHit = true
	
	const 
	timeStart = comp.findLastBeat(),
	hit = function( durationToOccupy, cssName, durationVisible ){

		if( typeof durationVisible !== 'number' ) durationVisible = durationToOccupy
		insert(

			timeMark,
			comp.beatsPerSecond * durationToOccupy,
			function(){ keyEngage( cssName )},
			'Riff. Hit ON: '+ cssName
		)
		insert(

			timeMark + comp.beatsPerSecond * durationVisible * 15/16,
			0,
			function(){ keyDisengage( cssName )},
			'Riff. Hit OFF: '+ cssName
		)
		timeMark += comp.beatsPerSecond * durationToOccupy
	}

	let timeMark = timeStart

	hit( 2/4, 'space', 1/4 )
	hit( 2/4, 'space' )
	if( durationInBeats > 1 ){
	
		hit( 1/4, 'period' )
		hit( 2/4, 'space' )
		if( durationInBeats > 2 ){

			hit( 2/4, 'tab' )
			hit( 2/4, 'period' )
			if( durationInBeats > 3 ){
			
				hit( 1/4, 'space' )
				hit( 1/4, 'period' )
				hit( 2/4, 'space' )

				if( durationInBeats > 4 ){
			
					hit( 2/4, 'space', 1/4 )
					hit( 2/4, 'space' )
					if( durationInBeats > 5 ){

						hit( 1/4, 'period' )
						hit( 2/4, 'space' )
					}
					if( durationInBeats > 6 ){

						hit( 2/4, 'tab' )
						hit( 2/4, 'period' )
						if( durationInBeats > 7 ){

							hit( 1/4, 'space' )
							hit( 1/4, 'period' )
							hit( 2/4, 'space' )
							if( addLastHit ) hit( 1/4, 'space', 1/8 )
							else append( 1/4 )
						}
					}
				}
			}
			if( addLastHit ) hit( 1/4, 'space', 1/8 )
			else append( 1/4 )
		}
		else append( 1/4 )
	}


	if( drumSolo !== true ){

		insert( 

			timeStart + comp.beatsPerSecond * 0/8,
			comp.beatsPerSecond * 2/8,
			function(){ keyEngage( 'option-left' )},
			'Riff. Guitar ON.'
		)
		insert( 

			timeStart + comp.beatsPerSecond * 2/8, 
			0,//comp.beatsPerSecond * 1/4,
			function(){ keyDisengage( 'option-left' )},
			'Riff. Guitar ON.'
		)
		insert( 

			timeStart + comp.beatsPerSecond * 4/8, 
			comp.beatsPerSecond * 2/8,
			function(){ keyEngage( 'option-left' )},
			'Riff. Guitar ON.'
		)
		insert(

			timeStart + comp.beatsPerSecond * 8/8,
			0,//comp.beatsPerSecond * 4/8,
			function(){ keyDisengage( 'option-left' )},
			'Riff. Guitar OFF.'
		)
	}

	const
	fuckedUp  = 'fuckedup',
	durationPerCharacter = comp.beatsPerSecond * 2 / fuckedUp.length

	fuckedUp
	.split( '' )
	.forEach( function( letter, i ){

		insert(

			timeStart + durationPerCharacter * i,
			durationPerCharacter,
			function(){ keyToggle( letter.toUpperCase() )},
			'Fucked up: '+ letter
		)
		insert(

			timeStart + comp.beatsPerSecond * 4 + durationPerCharacter * i,
			durationPerCharacter,
			function(){ keyToggle( letter.toUpperCase() )},
			'Fucked up: '+ letter
		)
	})
	if( debug ) assessDuration( 

		timeStart, 
		comp.findLastBeat(), 
		'Riff + FuckedUp', 
		durationInBeats
	)
}








function type( durationInBeats, text, holdUntilDone, debug ){

	if( typeof durationInBeats !== 'number' ) durationInBeats = 6
	text = text.replace( /\s/g, '' )
	if( typeof holdUntilDone !== 'boolean' ) holdUntilDone = false

	const 
	timeStart = comp.findLastBeat(),
	durationPerCharacter = durationInBeats / text.length

	text
	.split( '' )
	.forEach( function( character, i ){

		const 
		//cssName = character.length > 1 ? character : character.toUpperCase(),
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
				'shift ON'
			)
			insert(

				//timeStart + comp.beatsPerSecond * i * durationPerCharacter + durationPerCharacter,//  Is EXACT so can be overridden by a subsequent ON command!
				timeStart + comp.beatsPerSecond * i * durationPerCharacter + durationPerCharacter * 1/2,
				0,
				function(){ keyDisengage( 'shift-'+ side )},
				'shift OFF'
			)
		}
		insert(

			timeStart + comp.beatsPerSecond * i * durationPerCharacter,
			comp.beatsPerSecond * durationPerCharacter,
			function(){ keyEngage( cssName )},
			'Type ON: '+ cssName
		)

		const releaseAfterDuration = holdUntilDone ? 
			durationInBeats * comp.beatsPerSecond :
			comp.beatsPerSecond * i * durationPerCharacter + durationPerCharacter * 15/16
		
		insert(

			timeStart + releaseAfterDuration,
			0,
			function(){ keyDisengage( cssName )},
			'Type OFF: '+ cssName
		)
	})
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






// tasks.setups.add( function(){ Mode.switchTo( 'boot' )})
// tasks.updates.add( Mode.run )











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
function easeInOutCubic( n ){
	
	return n < 0.5 
		? 4 * n * n * n 
		: 1 - Math.pow( -2 * n + 2, 3 ) / 2
}


//  2:18 – 2:36  “NO IT ISN’T”

new Mode({

	name: 'noitisnt',
	setup: function(){
		
		this.move = {

			//      n    tx  ty  tz  rx  ry
			from: [ 0.0,  0, 0,  0,  0,   0 ],
			to:   [ 1.0, -5, 5, -5, 45, -13 ]
		}
		this.orbit = {

			//       n     r
			from: [  0.4, 10, ],
			to:   [  1.0, 30, ]
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


// console.log( elapsedPercent, n1 )
// console.log( mix, tx, ty )

			this.keyboard.style.transition = 'none'
			this.keyboard.style.transform = 
				`translate3d( 

					calc( var( --size ) * ${ tx } ), 
					calc( var( --size ) * ${ ty } ), 
					calc( var( --size ) * ${ tz } )
				) 
				rotateX( ${ rx }deg )
				rotateY( ${ ry }deg )`
		}
		if( comp.audio.currentTime >= this.timeStart + this.durationInSeconds ){

			Mode.switchTo( 'idle' )
		}
	},
	teardown: function(){
	
		const that = this
		this.keyboard.classList.add( 'tilt-complete' )
		this.keyboard.style.transition = 'none'
		setTimeout( function(){

			that.keyboard.style.transform  = ''
		})
	}
})







//  2:58  you can touch meeeeeeeeeeee


function createGaussianFunction( mean, standardDeviation, maxHeight ){

	if( typeof mean !== 'number' ) mean = 0
	if( typeof standardDeviation !== 'number' ) standardDeviation = 1
	if( typeof maxHeight !== 'number' ) maxHeight = 1
	return function getNormal( x ){
	
		return maxHeight * Math.pow( Math.E, -Math.pow( x - mean, 2 ) / ( 2 * ( standardDeviation * standardDeviation )))
	}
}
new Mode({

	name: 'me',
	timeStart: 0,
	durationInSeconds: 0,
	setup: function(){

		//document.querySelector( '.keyboard' ).style.transform = 'rotateX( 45deg )'
		// forEachElement( '.key', function( key ){

		// 	key.classList.add( 'no-backface' )
		// })
		// comp.audio.playbackRate = 0.1
	},
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
				
					// key.style.transform = 'translate3d( 0px, 0px, '+ amp +'px ) rotateY( '+ rotation +'turn )'
					key.style.transform = 'translate3d( 0px, 0px, calc( var( --size ) * '+ amp +' )) rotateY( '+ rotation +'turn )'
					if( rotation > 0.7 ) key.classList.add( 'engaged' )
					if( rotation < 0.3 ) key.classList.remove( 'engaged' )
				}
				else {

					key.style.transform  = ''
				}
			})
		}
		if( comp.audio.currentTime >= this.timeStart + this.durationInSeconds ){

			Mode.switchTo( 'idle' )
		}
	},
	teardown: function(){
	
		forEachElement( '.key', function( key ){

			// key.classList.remove( 'no-backface' )
			key.style.transition = 'none'
			key.style.transform  = ''
			setTimeout( function(){

				key.style.transition = ''
			})
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


function makeFavicon1(){

	reset()
	const keyboard = document.querySelector( '.keyboard' )
	keyboard.classList.add( 'capslock' )
	forEachElement( '.key', function( key ){

		const name = key.getAttribute( 'data-name' )
		if( name === 'B' ){

			key.style.backgroundColor = 'transparent'
			key.style.color = 'black'
			key.style.fontWeight = '900'
		}
		else {

			key.style.visibility = 'hidden'
		}
	})
}






function blowApart(){


	//  For consistency -- 
	//  we need to determine these values AT LOAD TIME
	//  so onSeek we don’t create new values every single seek!!!

	Array
	.from( document.querySelectorAll( '.key' ))
	.forEach( function( element ){

		const
		tx = Math.random() * 60,
		ty = Math.random() * 60,
		tz = Math.random() * 60,
		translate = `translate3d( ${tx}px, ${ty}px, ${tz}px )`,
		rx = Math.random(),
		ry = Math.random(),
		rz = Math.random(),
		rotate = `rotate3d( ${rx}, ${ry}, ${rz}, 180deg )`,
		transform = translate +' '+ rotate

		// console.log( transform )
		element.style.transform = transform
	})
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

// window.setInterval( ripple, 100 )










