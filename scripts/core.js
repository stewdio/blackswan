
//  Copyright © 2020, Stewart Smith. See LICENSE for details.




let 
timeAsTextPrevious = '',
userHasPressedPlay = false

const
forEachElement = function( a, b, c ){

	let
	rootElement = document,
	cssQuery = '',
	action = function(){}

	if(

		typeof a === 'string' &&
		typeof b === 'function' &&
		c === undefined
	){
		cssQuery = a
		action = b
	}
	else if(
		
		a instanceof HTMLElement &&
		typeof b === 'string' &&
		typeof c === 'function'
	){
		rootElement = a
		cssQuery = b
		action = c
	}
	else {

		console.error( `Stop makng sense.` )
	}
	Array
	.from( rootElement.querySelectorAll( cssQuery ))
	.forEach( action )
}






    /////////////////////
   //                 //
  //   Composition   //
 //                 //
/////////////////////


//  A compositon (“comp”) is just an Array of execution keyframes
//  with additional properties and methods globbed on.

const comp = Object.assign( [], {
	

	//  KEYFRAME CREATION.
	
	insert: function( time, durationInSeconds, action, comment ){

		if( typeof time !== 'number' ) console.error( `A+ for creativity, but “time” ought to be a number.`, time )
		if( typeof durationInSeconds !== 'number' ) console.error( `A+ for creativity, but “durationInSeconds” ought to be a number.`, durationInSeconds )
		comp.push({

			time,
			duration: durationInSeconds,
			action,
			comment
		})
		comp.sort( function( a, b ){

			return a.time - b.time
		})
		return this
	},
	findLastBeat: function(){

		let frameIndex = comp.length - 1
		while( comp[ frameIndex ].duration === 0 && 
			frameIndex > 0 ){

			frameIndex --
		}
		return comp[ frameIndex ].time + comp[ frameIndex ].duration
	},
	append: function( durationInBeats, action, comment ){

		if( typeof durationInBeats !== 'number' ) durationInBeats = 1
		comp.push({

			time: comp.findLastBeat(),
			duration: durationInBeats * comp.beatsPerSecond,
			action,
			comment
		})
		return this
	},




	//  PLAYBACK CONTROLS.
	
	hasPlayedSome: false,
	audio: new Audio(),
	play: function(){

		comp.hasPlayedSome = true
		comp.isPlaying = true
		comp.isPaused  = false
		comp.audio.play()
		const playPauseButton = document.getElementById( 'play-pause' )
		playPauseButton.classList.add( 'playing' )
		return this
	},
	pause: function(){

		comp.isPlaying = false
		comp.isPaused  = true
		comp.audio.pause()
		const playPauseButton = document.getElementById( 'play-pause' )
		playPauseButton.classList.remove( 'playing' )
		return this
	},
	toggle: function(){

		if( comp.isPlaying ) comp.pause()
		else comp.play()
		return this
	},
	frameIndex: 0,
	seek: function( time ){	

		forEachElement( '.keyboard', ( element ) => {
			
			element.style.setProperty( 'transition', 'none', 'important' )
			element.statesReset()
		})
		forEachElement( '.key', ( element ) => {
			
			element.style.setProperty( 'transition', 'none', 'important' )
			element.locksReset()
		})		
		if( typeof window.reset === 'function' ) window.reset()
		comp.frameIndex = 0
		comp.audio.currentTime = time
		while( comp.frameIndex < comp.length &&
			comp[ comp.frameIndex ].time <= time ){//  time vs comp.audio.currentTime

			const frame = comp[ comp.frameIndex ]
			if( frame.time >= time - 20 &&//  Is 20 seconds enough?!?
				typeof frame.action === 'function' ){

				frame.action()
			}
			comp.frameIndex ++
		}
		setTimeout(() => {

			const action = ( element ) => element.style.transition = ''
			forEachElement( '.keyboard', action )
			forEachElement( '.key', action )
		})
		updateLocationHashFromTime( comp.audio.currentTime )
		return this
	},




	//  INSPECTION & DEBUGGING.
	

	//  Usage: console.log( ...comp.inspect() )

	inspect: function( frameIndex, includeSiblings ){

		if( typeof frameIndex !== 'number' ) frameIndex = comp.frameIndex
		if( typeof includeSiblings !== 'boolean' ) includeSiblings = true

		const frameIndexPadLength = comp.length.toString().length

		function construct( frameIndex, name ){

			const frame = comp[ frameIndex ]
			let output = '\n'
			if( includeSiblings ) output += name.padEnd( 10, ' ' )
			output += '#'+ frameIndex.toString().padStart( frameIndexPadLength, ' ' ) +'  '
			output += '@ '+ frame.time +'s '
			output += 'for '+ frame.duration +'s  '
			output += frame.comment
			//output += frame.action
			return output
		}
		const output = []
		if( includeSiblings && frameIndex > 0 ){

			output.push( construct( comp.frameIndex - 1, 'PREVIOUS' ))
		}
		if( frameIndex < comp.length - 1 ){

			output.push( construct( frameIndex, 'CURRENT' ))
			if( includeSiblings ){

				output.push( construct( frameIndex + 1, 'NEXT' ))
			}
		}
		if( includeSiblings ) output.push( '\n\n' )
		return output
	},


	//  Usage: console.log( ...comp.inspectAll() )

	inspectAll: function(){

		return comp.reduce( function( output, frame, frameIndex ){

			return output.concat( comp.inspect( frameIndex, false ))

		}, [] )

	},


	//  Usage: console.log( comp.logs.join( '' ))

	logs: [],
	log: function( text ){

		this.logs.push( text )
		return this
	},
	generateReceipt: function(){

		const receipt = this.logs.join( '&ZeroWidthSpace;' )
		document.getElementById( 'receipt' ).innerHTML = receipt
		return receipt
	}
})




//  Comp audio-specific.

comp.audio.pause()
comp.audio.addEventListener( 'canplaythrough', function( event ){

	console.log( '\n\n\nCAN PLAY THROUGH', event )


	//  Why would we need this next line of code?!
	//  If the user has tapped the LOAD-PLAY button
	//  then we have requested to play the audio
	//  but it may not have been loaded yet.

	// if( comp.isPlaying ) comp.play()
/*






	if( userHasPressedPlay &&//  Some platform require user interaction before playback is allowed.
		( 
			comp.isPlaying ||//  If we were seeking from a paused state then don’t autoplay.
			comp.hasPlayedSome !== true//  If this is a virgin play canplaythrough then autoplay.
		)) comp.play()
		*/
})
/*comp.audio.addEventListener( 'progress', function( event ){

	let loadedLengthInSeconds = 0
	for( 

		let 
		i = 0, 
		totalChunks = this.buffered.length; 
		
		i < totalChunks; 
		i ++ ){

		loadedLengthInSeconds += this.buffered.end( i ) - this.buffered.start( i )
	}

	const loadedNormalized = loadedLengthInSeconds / this.duration
	
	console.log( '\n\n\nloadedLengthInSeconds', loadedLengthInSeconds )
	console.log( 'this.duration', this.duration )
	console.log( 'loadedNormalized', loadedNormalized )
	console.log( 'event', event )

	//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

	//  add loading animation routine here.
	//  pie chart behind the icon / on the circle?

	//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


	if( loadedNormalized === 1 ){

		controlsEnable()
		document
		.getElementById( 'button-load' )
		.style
		.display = 'none'
	}
})*/


//  CONVENIENCE METHODS

//  In the interest of our *-composition.js code
//  being as cleanly elegible as possible,
//  let’s avoid having to prefix every call to 
//  “insert” or “append” with a “comp.”, eh?

const
insert = comp.insert.bind( comp ),
append = comp.append.bind( comp )






    ///////////////////
   //               //
  //   Time URLs   //
 //               //
///////////////////


//  Enable linking directly to a moment on the timeline.
//  http://stewartsmith.io/blackswan/#1:23
//  http://stewartsmith.io/blackswan/#83

const
timeToText = function( timeInSeconds, includeMillis ){

	if( typeof timeInSeconds !== 'number' ) timeInSeconds = comp.audio.currentTime
	if( typeof includeMillis !== 'boolean' ) includeMillis = false

	const
	minutes = Math.floor( timeInSeconds / 60 ),
	seconds = Math.floor( timeInSeconds - minutes * 60 ),
	millis  = Math.round((( timeInSeconds % 60 ) - seconds ) * 1000 ) / 1000,
	text    = minutes.toString() +':'+ seconds.toString().padStart( 2, '0' )

	if( includeMillis ){
		
		return text +'.'+ millis.toString().substr( 2 ).padStart( 4, '0' )
	}
	return text
},
timeFromText = function( text ){

	if( text.length > 0 ){

		const textSplit = text.split( ':' )
		if( textSplit.length < 3 ){

			const 
			isUsefulTimeUnit = function( n ){

				return isNaN( n ) === false && 
					( typeof n === 'number' || n instanceof Number ) &&
					n !==  Infinity &&
					n !== -Infinity
			},
			units = textSplit.reduce( function( units, unitAsString ){

				const unitAsNumber = parseFloat( unitAsString )
				if( isUsefulTimeUnit( unitAsNumber )) units.push( unitAsNumber )
				return units

			}, [])

			if( units.length > 0 && units.length < 3 ){

				let time = 0
				if( units.length === 1 ) time = units[ 0 ]
				if( units.length === 2 ){

					time = units[ 0 ] * 60 + units[ 1 ]
				}
				return time
			}
		}
	}
	return false
},
seekByLocationHash = function(){

	const time = timeFromText( document.location.hash.substr( 1 ))
	if( time !== false ) setTimeout( comp.seek.bind( this, time ))
},
updateLocationHashFromTime = function(){

	const timeAsText = timeToText()
	history.replaceState( {}, 'Black Swan '+ timeAsText, '#'+ timeAsText )
}




    //////////////////
   //              //
  //   Controls   //
 //              //
//////////////////


let 
controlsShouldHide = false,
interfaceIdleSince = Date.now(),
controlsShouldHideAfterSeconds = 2

const
controlsDisable = function(){

	controlsHide()
	setTimeout( function(){

		document
		.getElementById( 'controls-activator' )
		.style
		.display = 'none'
	
	}, 500 )
},
controlsEnable = function(){

	controlsHide()
	document
	.getElementById( 'controls-activator' )
	.style
	.display = 'block'
	controlsShouldHide = false
	setTimeout( controlsShow )	
},
controlsHide = function(){

	document
	.getElementById( 'controls' )
	.classList
	.remove( 'show' )
},
controlsShow = function(){

	document
	.getElementById( 'controls' )
	.classList
	.add( 'show' )
}






    ////////////////////
   //                //
  //   Fullscreen   //
 //                //
////////////////////


const 
fullscreenButtonHide = function(){

	document
	.getElementById( 'button-fullscreen' )
	.style
	.display = 'none'
	
	document
	.getElementById( 'timeline' )
	.style
	.gridColumn = '3 / 5'
},
fullscreenButtonShow = function(){

	document
	.getElementById( 'button-fullscreen' )
	.style
	.display = 'block'
	
	document
	.getElementById( 'timeline' )
	.style
	.gridColumn = '3 / 4'
},
fullscreenDetect = function(){

	const el = document.getElementById( 'fullscreen-container' )
	el.requestFullscreen = 
		el.requestFullscreen || 
		el.mozRequestFullscreen ||
		el.msRequestFullscreen || 
		el.webkitRequestFullscreen

	return typeof el.requestFullscreen === 'function'
},
fullscreenToggle = function(){
	
	if( fullscreenDetect() ){

		const el = document.getElementById( 'fullscreen-container' )
		if( document.fullscreenElement === null ){

			el.requestFullscreen()
			controlsShouldHide = true
		}
		else if( document.exitFullscreen ) document.exitFullscreen()
	}
}







    //////////////////
   //              //
  //   Playback   //
 //              //
//////////////////


function render(){

	const
	time = comp.audio.currentTime,
	timeAsText = timeToText( time )

	if( comp.isPlaying ){

		while( comp.frameIndex < comp.length &&
			comp[ comp.frameIndex ].time <= time ){

			if( typeof comp[ comp.frameIndex ].action === 'function' ){

				comp[ comp.frameIndex ].action()
			}
			comp.frameIndex ++
		}
	}

	const
	timelineElement = document.getElementById( 'timeline' ),
	progressElement = document.getElementById( 'progress' ),
	progressClockElement = document.getElementById( 'progress-clock' ),
	//progressXConstrained = Math.min( Math.max( progressElement.offsetWidth, 60 ), timelineElement.offsetWidth )
	progressX = progressElement.offsetWidth
	
	progressElement.style.width = ( time / comp.audio.duration * timelineElement.offsetWidth ) +'px'
	progressClockElement.style.left = progressX +'px'

	if( timeAsText !== timeAsTextPrevious ){

		if( timeAsTextPrevious !== '' && time !== 0 ) updateLocationHashFromTime()
		timeAsTextPrevious = timeAsText
		progressClockElement.innerText = timeAsText
	}


	if( comp.hasPlayedSome && 
		Date.now() - interfaceIdleSince >= controlsShouldHideAfterSeconds * 1000 ){

		controlsShouldHide = true
		controlsHide()
	}




	requestAnimationFrame( render )
}




    ///////////////
   //           //
  //   Debug   //
 //           //
///////////////


function assessDuration( timeStart, timeEnd, name, expectedBeats ){

	if( typeof name !== 'string' ) name = 'Untitled'

	const
	durationInSeconds = timeEnd - timeStart,
	durationInBeats = Math.round( durationInSeconds / comp.beatsPerSecond * 1000000 ) / 1000000,
	looksGoodToMe = durationInBeats === expectedBeats

	console.log( 

		'\n'+
		 timeToText( timeStart, true ) +' to '+
		 timeToText( timeEnd, true ) +' is '+
		 timeToText( durationInSeconds, true ) +' ('+
		 durationInBeats +' beats) for “'+
		 name +'”  '+
		 ( looksGoodToMe ? '👍' : '❌❌❌ ⚠️  EXPECTED '+ expectedBeats +' beats!' ) +
		 '\n\n'
	)
	return { durationInSeconds, durationInBeats }
}






    //////////////
   //          //
  //   Keys   //
 //          //
//////////////


const 
appendLockAbilitiesTo = function( object ){

	Object.assign( object, {

		locks: {},
		locksReset: function(){
			
			Object.keys( object.locks )
			.forEach( function( requestor ){
	
				delete object.locks[ requestor ]
			})
		},
		lockAdd: function( requestor ){

			object.locks[ requestor ] = true
		},
		lockRemove: function( requestor ){

			delete object.locks[ requestor ]
		}
	})
},
appendKeyAbilitiesTo = function( keyElement ){

	appendLockAbilitiesTo( keyElement )
	Object.assign( keyElement, {

		keyboard: keyElement.closest( '.keyboard' ),
		engage: function( requestor ){


			


			if( typeof requestor !== 'string' ) requestor = '*'
			this.lockAdd( requestor )
			this.classList.add( 'engaged' )
			this.classList.remove( 'disengaging' )
			const name = this.getAttribute( 'data-name' )
			


console.log( 'keyName:', name, '\trequestor:', requestor )

			if( name.length > 1 ){
				
				if( name === 'delete' ) comp.log( '⌫'  )
				if( name === 'return' ) comp.log( '\n' )
				if( name === 'tab'    ) comp.log( '\t' )
				const keyboardTagName = name.split( '-' )[ 0 ]
				if([ 

					// 'capslock', 
					'shift', 
					'control', 
					'option', 
					'command' 

				].includes( keyboardTagName )){

					this.keyboard.classList.add( keyboardTagName )
					this.keyboard.stateAdd( keyboardTagName, requestor )
				}
/*


must write a separate mini-toggle-routine here that 
turns capslock on OR off depending on current state.
(fine for mouse over instead of mousdown for that?)

*/



			}
			else comp.log( this.innerText )
		},
		disengage: function( requestor ){

			if( typeof requestor !== 'string' ) requestor = '*'
			this.lockRemove( requestor )
			if( Object.keys( this.locks ).length === 0 ){

				this.classList.remove( 'engaged' )
				const listener = keyElement
				.addEventListener( 'animationend', function( event ){

					keyElement.removeEventListener( 'animationend', listener )
					keyElement.classList.remove( 'disengaging' )
				})
				this.classList.add( 'disengaging' )
				const name = this.getAttribute( 'data-name' )
				if( name.length > 1 ){





///  4%^&$%^&$%^&$%^&$%&^*(&^%$#%^&*()^%$#@%^&*()&^%$&*())4%^&$%^&$%^&$%^&$%&^*(&^%$#%^&*()^%$#@%^&*()&^%$&*()


					const keyboardTagName = name.split( '-' )[ 0 ]
					if([ 

						// 'capslock',// @#@$##@$#@#@ this needs to come out!
						'shift',
						'control',
						'option',
						'command'

					].includes( keyboardTagName )){

						this.keyboard.stateRemove( keyboardTagName, requestor )
						if( !this.keyboard.states[ keyboardTagName ]){

							this.keyboard.classList.add( keyboardTagName )
						}
					}
				}
			}
		},
		toggle: function( requestor ){

			if( this.classList.contains( 'engaged' )){

				this.disengage( requestor )
			}
			else {

				this.engage( requestor )
			}
		}
	})
	keyElement.addEventListener( 'touchstart', function(){

		keyElement.engage( 'user touch' )
	})
	keyElement.addEventListener( 'touchend', function(){

		keyElement.disengage( 'user touch' )
	})
	keyElement.addEventListener( 'mouseenter', function(){

		keyElement.engage( 'user mouse' )
	})
	keyElement.addEventListener( 'mouseleave', function(){

		keyElement.disengage( 'user mouse' )
	})
},
appendKeyAbilitiesToAllKeys = function(){

	forEachElement( '.key', appendKeyAbilitiesTo )
}


//  While the above facilitates object-specific 
//  engage() and disengage() actions,
//  eg. keyElement.engage( 'user mouse' ),
//  these global methods will engage or disengage
//  ALL keys of the same name,
//  ie. if multiple keyboards exist,
//  which is intended for use by the user typing
//  or the composition executing.
//  eg. keyEngage( 'A', 'user keyboard' ).

const
keyEngage = function( keyName, requestor ){

	if( typeof keyName !== 'string' ) return null
	forEachElement(

		'[data-name="'+ keyName +'"]', 
		( element ) => element.engage( requestor )
	)
},
keyDisengage = function( keyName, requestor ){

	if( typeof keyName !== 'string' ) return null
	forEachElement(

		'[data-name="'+ keyName +'"]', 
		( element ) => element.disengage( requestor )
	)
},
keyToggle = function( keyName, requestor ){

	if( typeof keyName !== 'string' ) return null
	forEachElement(

		'[data-name="'+ keyName +'"]', 
		( element ) => element.toggle( requestor )
	)
}






    ///////////////////
   //               //
  //   Keyboards   //
 //               //
///////////////////


let 
keyboards,
keyboard

const
appendKeyboardAbilitiesTo = function( keyboardElement ){


	//  do we use addTagAbilitiesTo ??
	//  or does keyboard need its own custom shit???

	Object.assign( keyboardElement, {

		states: {},
		statesReset: function(){
			
			Object.keys( keyboardElement.states )
			.forEach( function( stateName ){
	
				delete keyboardElement.states[ stateName ]
			})
		},
		stateAdd: function( stateName, requestor ){

			console.log( 'stateName:', stateName, '\t requestor:', requestor )

			if( keyboardElement.states[ stateName ] === undefined ){

				keyboardElement.states[ stateName ] = {}
			}
			keyboardElement.states[ stateName ][ requestor ] = true
			keyboardElement.classList.add( stateName )
		},
		stateRemove: function( stateName, requestor ){

			if( keyboardElement.states[ stateName ] === undefined ){

				keyboardElement.states[ stateName ] = {}
			}
			delete keyboardElement.states[ stateName ][ requestor ]
			if( Object.keys( keyboardElement.states[ stateName ]).length === 0 ){




				keyboardElement.classList.remove( stateName )
				if( stateName === 'option' ){

					console.log( ' THIS IS WHERE I SHOULD DO option-lag')
					// for each option-able key
					// listen for animation end?
					//  then remove

					keyboardElement.classList.add( 'option-lag' )
					setTimeout( function(){

						keyboardElement.classList.remove( 'option-lag' )

					}, comp.beatsPerSecond )//  Does this need to be variable??
				}
			}
		}
	})
	

	//  While we’re here,
	//  let’s implement a grid structure
	//  onto this keyboard’s keys.

	const 
	keyboardBounds = keyboardElement.getBoundingClientRect(),
	xMin = keyboardBounds.left,
	xMax = keyboardBounds.right,
	yMin = keyboardBounds.top,
	yMax = keyboardBounds.bottom,
	xRange = xMax - xMin,
	yRange = yMax - yMin

	// console.log( 'xRange:', xRange, '\t yRange:', yRange )

	forEachElement( keyboardElement, '.row', ( row, y ) => {

		forEachElement( row, '.key', ( key, x ) => {

			key.setAttribute( 'x', x )
			key.setAttribute( 'y', y )

			const 
			keyBounds = key.getBoundingClientRect(),
			xCenter = keyBounds.left + ( keyBounds.right - keyBounds.left ) / 2,
			yCenter = keyBounds.top + ( keyBounds.bottom - keyBounds.top ) / 2,
			xNormalized = ( xCenter - xMin ) / xRange,
			yNormalized = ( yCenter - yMin ) / yRange

			// console.log( key.getAttribute( 'data-name' ))
			// console.log( 'keyBounds.left:', keyBounds.left, '\t keyBounds.right:', keyBounds.right )
			// console.log( '#', x, 'xCenter:', xCenter, '\t yCenter', yCenter )

			// console.log( 'xNormalized:', xNormalized, '\t yNormalized:', yNormalized )

			key.setAttribute( 'x-normalized', xNormalized )
			key.setAttribute( 'y-normalized', yNormalized )
		})
	})

/*
	//  Modifier keys require more setup than normal keys.
	//  CHECK IT OUT: This is an *inversion* of .forEach() logic!
	//  Notice here how we transform a function *statement*
	//  into a function *expression* by prefixing it
	//  with a tilde (~). This allows us to invoke it immediately:
	//  https://en.wikipedia.org/wiki/Immediately_invoked_function_expression
	//  Additionally, because we name the function 
	// (rather than assign a lambda function
	//  to a variable name, ie. “const λ = function(){…}”)
	//  we can access the function from *within itself*
	//  which means it can *return itself* and we can 
	//  call it repeatedly via function chaining:
	//  https://en.wikipedia.org/wiki/Method_chaining
	
	~function λ( cssQuery, cssName, side ){

		Array
		.from( keyboardElement.querySelectorAll( cssQuery ))
		.forEach( function( keyElement ){

			const tagName = 'user pointer '+ side
			keyElement.addEventListener( 'touchstart', function(){

				keyboardElement.stateAdd( cssName, tagName )
			})
			keyElement.addEventListener( 'touchend', function(){

				keyboardElement.stateRemove( cssName, tagName )
			})
			keyElement.addEventListener( 'mouseenter', function(){

				keyboardElement.stateAdd( cssName, tagName )
			})
			keyElement.addEventListener( 'mouseleave', function(){

				keyboardElement.stateRemove( cssName, tagName )
			})
		})
		return λ
	}
	( '.key-shift-left',    'shift',   'left'  )
	( '.key-shift-right',   'shift',   'right' )
	( '.key-control-left',  'control', 'left'  )
	( '.key-control-right', 'control', 'right' )
	( '.key-option-left',   'option',  'left'  )
	( '.key-option-right',  'option',  'right' )
	( '.key-command-left',  'command', 'left'  )
	( '.key-command-right', 'command', 'right' )
	*/
},
appendKeyboardAbilitiesToAllKeyboards = function(){

	forEachElement( '.keyboard', appendKeyboardAbilitiesTo )
},



keyboardStateAdd = function( stateName, requestor ){

	forEachElement( 

		'.keyboard', 
		( element ) => element.stateAdd( stateName, requestor )
	)
},
keyboardStateRemove = function( stateName, requestor ){

	forEachElement( 

		'.keyboard', 
		( element ) => element.stateRemove( stateName, requestor )
	)
},
keyboardStatesReset = function(){

	forEachElement( '.keyboard', element.statesReset )
}









window.addEventListener( 'DOMContentLoaded', function(){


	//  Setup all keys to engage or disengage
	//  in response to both
	//  the programmed composition
	//  as well as any user input.

	appendKeyAbilitiesToAllKeys()
	appendKeyboardAbilitiesToAllKeyboards()






	const updateInterfaceIdleSince = function(){

		interfaceIdleSince = Date.now()
		controlsShow()
	}
	window.addEventListener( 'keydown',    updateInterfaceIdleSince )
	window.addEventListener( 'touchstart', updateInterfaceIdleSince )
	window.addEventListener( 'mousemove',  updateInterfaceIdleSince )
	window.addEventListener( 'scroll',     updateInterfaceIdleSince )






	

	//  Enable control panel reveal when in fullscreen mode.

	const
	controlsActivator = document.getElementById( 'controls-activator' ),
	controls = document.getElementById( 'controls' )

	controlsActivator.addEventListener( 'mouseover', function(){

		controls.classList.add( 'show' )
	})
	controlsActivator.addEventListener( 'mouseleave', function(){

		if( controlsShouldHide ) controls.classList.remove( 'show' )
	})


	//  Enable manual seeking along the timeline.

	const
	timelineElement = document.getElementById( 'timeline' ),
	getInteractionCoordinates = function( event, pageOrClient ){

		if( typeof pageOrClient !== 'string' ) pageOrClient = 'client'//page
		if( event.changedTouches && 
			event.changedTouches.length ) return {

			x: event.changedTouches[ 0 ][ pageOrClient +'X' ],
			y: event.changedTouches[ 0 ][ pageOrClient +'Y' ]
		}
		return {

			x: event[ pageOrClient +'X' ],
			y: event[ pageOrClient +'Y' ]
		}
	},
	seekByGui = function( event ){

		event.preventDefault()

		const 
		rectangle = timelineElement.getBoundingClientRect(),
		x = getInteractionCoordinates( event ).x - rectangle.left
		
		comp.seek( x / timelineElement.clientWidth * comp.audio.duration )
	},
	updateSeekerFromPointer = function( event ){
		
		event.preventDefault()

		const 
		rectangle = timelineElement.getBoundingClientRect(),
		x = getInteractionCoordinates( event ).x - rectangle.left

		if( x >= 0 && x <= rectangle.width ){

			const
			seekerEl      = document.getElementById( 'seeker-head' ),
			seekerClockEl = document.getElementById( 'seeker-clock' ),
			// seekerTime    = x / rectangle.width * comp.audio.duration,
			seekerTime    = x / timelineElement.clientWidth * comp.audio.duration,
			seekerMinutes = Math.floor( seekerTime / 60 ),
			seekerSeconds = Math.floor( seekerTime - ( seekerMinutes * 60 ))

			seekerEl.style.left = ( x - 1 ) +'px'
			seekerClockEl.style.left = x +'px'
			seekerClockEl.innerText = 
				seekerMinutes +':'+ 
				seekerSeconds.toString().padStart( 2, '0' )
		}
	}


	timelineElement.addEventListener( 'touchstart', updateSeekerFromPointer )
	timelineElement.addEventListener( 'touchmove',  updateSeekerFromPointer )
	timelineElement.addEventListener( 'touchend',   seekByGui )
	timelineElement.addEventListener( 'mousedown',  seekByGui )
	timelineElement.addEventListener( 'mouseover',  updateSeekerFromPointer )
	timelineElement.addEventListener( 'mousemove',  updateSeekerFromPointer )

	

	//  Enable PLAY / PAUSE toggle.

	const playPauseElement = document.getElementById( 'play-pause' )
	playPauseElement.addEventListener( 'mousedown',  function(){

		userHasPressedPlay = true
		comp.toggle()
	})


	//  Enable RESTART button

	const restartElement = document.getElementById( 'button-restart' )
	restartElement.addEventListener( 'mousedown', function(){

		comp.seek( 0 )//.play()
	})


	//  Handle FULLSCREEN abilities.

	if( fullscreenDetect() ){
	
		fullscreenButtonShow()
		const buttonFullscreenElement = document.getElementById( 'button-fullscreen' )
		buttonFullscreenElement.addEventListener( 'mousedown', fullscreenToggle )
	}
	else fullscreenButtonHide()

	

	seekByLocationHash()
	

	//  If a viewer clicks on the LOAD button
	//  it will attempt to play --
	//  which on mobile means it will load first.

	document
	.getElementById( 'button-load' )
	.addEventListener( 'mousedown', function(){

		userHasPressedPlay = true


		//  Hide this “load” button
		//  and enable the regular playback controls.
		//  NOTE: WHAT WE *SHOULD* DO HERE
		//  IS BEGIN A LOADING ANIMATION
		//  THAT IS LATER DISABLED BY "CANPLAYTHROUGH" EVENT.

		document
		.getElementById( 'button-load' )
		.style
		.display = 'none'

		controlsEnable()


		//  This will set isPlaying to true
		//  among other things.

		comp.play()
	})






	window.addEventListener( 'keydown', function( event ){

		if( event.repeat !== true ){
		
			//const name = !!event.key.match( /^[A-Z]|[0-9]$/i )
			const name = event.key.length == 1
				? event.key.toUpperCase()
				: eventCodeToCssQuery[ event.code ]

			keyEngage( name, 'user keyboard' )
			if( event.code === 'Space' ){

				event.preventDefault()
				comp.toggle()
			}
		}
	})
	window.addEventListener( 'keyup', function( event ){
		
		//const name = !!event.key.match( /[A-Z]|[0-9]/i )
		const name = event.key.length == 1
			? event.key.toUpperCase()
			: eventCodeToCssQuery[ event.code ]

		keyDisengage( name, 'user keyboard' )
	})




	//  Kick off the render loop.

	render()
})






    ////////////////////////
   //                    //
  //    Participation   //
 //                    //
////////////////////////


function modifyClassList( cssQuery, addOrRemove, classToAddOrRemove ){

	if( typeof classToAddOrRemove !== 'string' ) classToAddOrRemove = 'press'
	forEachElement( cssQuery, ( element ) => {

		element.classList[ addOrRemove ]( classToAddOrRemove )
	})
}
const eventCodeToCssQuery = {

	Backquote:    'tick',
	Minus:        'minus',
	Equal:        'equal',
	Backspace:    'delete',
	
	Tab:          'tab',
	BracketLeft:  'bracket-open',
	BracketRight: 'bracket-close',
	Backslash:    'slash-backward',

	CapsLock:     'capslock',
	Semicolon:    'semicolon',
	Quote:        'quote',
	Enter:        'return',

	ShiftLeft:    'shift-left',
	Comma:        'comma',
	Period:       'period',
	Slash:        'slash-forward',
	ShiftRight:   'shift-right',

	ControlLeft:  'control',
	AltLeft:      'option-left',
	MetaLeft:     'command-left',
	Space:        'space',
	MetaRight:    'command-right',
	AltRight:     'option-right',
	ArrowLeft:    'arrow-left',
	ArrowUp:      'arrow-up',
	ArrowDown:    'arrow-down',
	ArrowRight:   'arrow-right'
}












