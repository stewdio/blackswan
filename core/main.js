
//  Copyright © 2020, Stewart Smith. See LICENSE for details.




let 
verbosity = 0,//0.5
timeAsTextPrevious  = '',
userHasInteracted   = false,
hasLoadedEntireSong = false






    /////////////////
   //             //
  //   Helpers   //
 //             //
/////////////////


const
getRandomBetween = function( a, b ){

	if( typeof a !== 'number' ) a = 0
	if( typeof b !== 'number' ) b = 1
	return a + Math.random() * ( b - a )
},
getRandomBetweenEitherSign = function( a, b ){

	const value = getRandomBetween( a, b )
	return Math.random() < 0.5 ? value : -value
},
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


//  Damn you, iOS Safari. Damn you to Hell.
//  This absolutely lowers the quality of the analysis.

const AudioContext = window.AudioContext || window.webkitAudioContext
// if( 
// 	typeof window.AnalyserNode === 'function' && 
// 	typeof window.AnalyserNode.prototype.getFloatTimeDomainData !== 'function' ){
  
// 	const uint8 = new Uint8Array( bufferLength )
// 	window.AnalyserNode.prototype.getFloatTimeDomainData = function( array ){
		
// 		this.getByteTimeDomainData( uint8 )
// 		for( let i = 0, length = array.length; i < length; i ++ ){
		
// 			array[ i ] = ( uint8[ i ] - 128 ) * 0.0078125
// 		}
// 	}
// }


//  Enable function queueing conveniences.

const tasks = {

	setups: new TaskList(),
	setup:  function(){

		tasks.setups.run().clear()
		tasks.update()
	},
	updates: new TaskList(),
	update:  function( t ){

		tasks.updates.run( t )
	}
}
tasks.setups.add( function(){ Mode.switchTo( 'boot' )})
tasks.updates.add( Mode.run )







/*


THIS TURNED OUT TO BE TERRIBLE

let
audioContext,
analyser,
source,
dataArray,
bufferLength

const engageAudio = function(){

	audioContext = new AudioContext()
	
	analyser = audioContext.createAnalyser()
	analyser.smoothingTimeConstant = 0.3
	analyser.fftSize = 32//  As small as we can go, apparently.
	analyser.connect( audioContext.destination )
	bufferLength = analyser.frequencyBinCount
	dataArray = new Uint8Array( bufferLength )	
	
	source = audioContext.createMediaElementSource( comp.audio )
	source.connect( analyser )
}
function analyzeAudio(){
	
	analyser.getByteTimeDomainData( dataArray )
	forEachElement( '.key', function( key ){

		const
		kx = parseFloat( key.getAttribute( 'x-normalized' )),
		ky = parseFloat( key.getAttribute( 'y-normalized' )),
		kr = parseInt( key.getAttribute( 'y' ), 10 )

		// console.log( 'KEY: ', key.getAttribute( 'data-name' ), kx, ky )
		for( let i = 0; i < bufferLength; i ++ ){

			const 
			x0 =   i / bufferLength,
			x1 = ( i + 1 ) / bufferLength,
			y = dataArray[ i ] / 256
			
			//console.log( 'band:', x0, '  volume in this band:', y )
			if( kr < 4 && x0 < kx && kx < x1 ){

				if( ( 1 - ky ) <= y ){

					//key.classList.add( 'engaged' )
					// console.log( '   + ON' )
					key.style.opacity = y
				}
				else {

					key.style.opacity = 0
					//key.classList.remove( 'engaged' )
					// console.log( '   - off' )
				}
			}
		}
	})
}
function getAverageVolume( array ){
	
	// var values = 0
	// var average
	// var length = array.length

	// // get all the frequency amplitudes
	// for( let i = 0; i < length; i ++ ){
		
	// 	values += array[ i ]
	// }
	// average = values / length
	// return average

	array
	.reduce( function( sum, item ){

		return sum + item

	}, 0 ) / array.length
}

*/









    /////////////////////
   //                 //
  //   Composition   //
 //                 //
/////////////////////


//  A compositon (“comp”) is just an Array of execution keyframes
//  with additional properties and methods globbed on.

const comp = Object.assign( [], {
	

	//  KEYFRAME CREATION.
	
	insert: function( timeInSeconds, durationInSeconds, action, comment ){

		if( typeof timeInSeconds !== 'number' ) console.error( `A+ for creativity, but “time” ought to be a number.`, time )
		if( typeof durationInSeconds !== 'number' ) console.error( `A+ for creativity, but “durationInSeconds” ought to be a number.`, durationInSeconds )
		comp.push({

			time:     timeInSeconds,
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
		;[

			'play-pause',
			'title',
			'instructions'
		
		].forEach( function( elementName ){

			const element = document.getElementById( elementName )
			if( element instanceof HTMLElement ){

				element.classList.add( 'playing' )
			}
		})
		return this
	},
	pause: function(){

		comp.isPlaying = false
		comp.isPaused  = true
		comp.audio.pause()
		;[

			'play-pause',
			'title',
			'instructions'
		
		].forEach( function( elementName ){

			const element = document.getElementById( elementName )
			if( element instanceof HTMLElement ){

				element.classList.remove( 'playing' )
			}
		})
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
			if( frame.time >= time - 30 &&//  Is 30 seconds enough?!?
				typeof frame.action === 'function' ){

				frame.action( frame.time )
			}
			comp.frameIndex ++
		}
		setTimeout(() => {

			const action = ( element ) => element.style.transition = ''
			forEachElement( '.keyboard', action )
			forEachElement( '.key', action )
		})
		// updateLocationHashFromTime( comp.audio.currentTime )
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

		const 
		receiptContent = this.logs.join( '&ZeroWidthSpace;' ),
		receiptContentEl = document.getElementById( 'receipt-content' )

		receiptContentEl.innerHTML = receiptContent
		receiptContentEl.classList.add( 'show' )
		return receiptContent
	}
})




//  Comp audio-specific.

// comp.audio.pause()
// audioElement.addEventListener('loadeddata', () => {
//   let duration = audioElement.duration;
//   // The duration variable now holds the duration (in seconds) of the audio clip 
// })
/*
comp.audio.addEventListener( 

	'loadeddata',
	 function( event ){

	 	console.log( '\n\n\nEVENT: loadeddata, event' )
	 	console.log( 'buffered', comp.audio.buffered )


	 	const b = comp.audio.buffered

	 	for( let i = 0; i < b.length; i ++ ){

	 		console.log( i, b[ i ], b.start( i ), b.end( i ))
	 	}


	 	if( b.length === 1 ){
		
			// only one range?! so it’s all or nothing.

			if( b.start( 0 ) === 0 && 
				b.end( 0 ) === comp.audio.duration ){
				
				// The one range starts at the beginning and ends at
				// the end of the video, so the whole thing is loaded

				console.log( 'ENTIRE THING IS LOADED!' )
				hasLoadedEntireSong = true
			}
		}
	}
)*/
/*
comp.audio.addEventListener( 'canplaythrough', function( event ){

	console.log( '\n\n\nEVENT: canplaythrough', event )


	//  Why would we need this next line of code?!
	//  If the user has tapped the LOAD-PLAY button
	//  then we have requested to play the audio
	//  but it may not have been loaded yet.

	// if( comp.isPlaying ) comp.play()
	
	// if( userHasInteracted &&//  Some platform require user interaction before playback is allowed.
	// 	( 
	// 		comp.isPlaying ||//  If we were seeking from a paused state then don’t autoplay.
	// 		comp.hasPlayedSome !== true//  If this is a virgin play canplaythrough then autoplay.
	// 	)) comp.play()
	
})*/

function onAudioLoadProgress( event ){

	const 
	a = comp.audio,
	b = a.buffered

	if( b.length === 1 ){
		
		// only one range?! so it’s all or nothing.

		if( b.start( 0 ) === 0 && 
			b.end( 0 ) === comp.audio.duration ){
			
			// The one range starts at the beginning and ends at
			// the end of the video, so the whole thing is loaded

			// console.log( 'ENTIRE THING IS LOADED!' )
			hasLoadedEntireSong = true
		}
	}



	//  Remove all “loaded” DOM elements.

	const timeline = document
		.getElementById( 'timeline' )
	Array.from(
	
		timeline
		.querySelectorAll( '.loaded' )
	
	).forEach( function( child ){

		// console.log( 'child?', child )
		// console.log( 'child.parentNode?', child.parentNode )
		// child.parentNode.remove( child )
		child.remove()
	})


	//  Iterate througn each buffer chunk.

	let loadedLengthInSeconds = 0
	for( 

		let 
		i = 0, 
		totalChunks = b.length; 
		
		i < totalChunks; 
		i ++ ){

		const chunkDuration = b.end( i ) - b.start( i )
		loadedLengthInSeconds += chunkDuration

		const loadedEl = document.createElement( 'div' )
		loadedEl.classList.add( 'loaded' )
		loadedEl.style.left  = ( b.start( i ) / a.duration * 100 ) +'%'
		loadedEl.style.width = ( chunkDuration / a.duration * 100 ) +'%'
		timeline.prepend( loadedEl )

		if( verbosity >= 0.4 ) console.log(

			'\n\n\nLoad buffer', i, 
			'\nFrom', b.start( i ),
			'\n  to', b.end( i ),
			'\nDuration', b.end( i ) - b.start( i ),
			'\n\n\n'
		)
	}

	const loadedNormalized = loadedLengthInSeconds / a.duration
	
	if( verbosity >= 0.4 ){

		console.log( '\n\n\nEVENT', event )
		console.log( 'loadedLengthInSeconds', loadedLengthInSeconds )
		console.log( 'this.duration', a.duration )
		console.log( 'loadedNormalized', loadedNormalized )	
	}
	

	//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

	//  add loading animation routine here.
	//  pie chart behind the icon / on the circle?

	//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


	// if( loadedNormalized === 1 ){

	// 	controlsEnable()
	// 	document
	// 	.getElementById( 'button-load' )
	// 	.style
	// 	.display = 'none'
	// }
}
comp.audio.addEventListener( 'loadeddata', onAudioLoadProgress )
comp.audio.addEventListener( 'progress', onAudioLoadProgress )
comp.audio.addEventListener( 'canplaythrough', onAudioLoadProgress )




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

	const 
	hash = document.location.hash.substr( 1 ),
	time = timeFromText( hash )

	if( time !== false ) setTimeout( comp.seek.bind( this, time ))

	//  Ug. Read this:
	//  https://support.google.com/chrome/thread/11993079?hl=en
	
	// else {

	// 	const element = document.getElementById( hash )
	// 	console.log( 'scrll to????', element )

	// 	//  iOS Safari does not yet support element.scrollIntoView().
	// 	if( element ) window.scrollTo({

	// 		top: element.getBoundingClientRect().top,
	// 		behavior: 'smooth'
	// 	})
	// }
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
controlsShouldHideAfterSeconds = 3

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
controlsEnable = function( enableButDoNotShow ){

	controlsHide()
	document
	.getElementById( 'controls-activator' )
	.style
	.display = 'block'
	controlsShouldHide = false
	if( enableButDoNotShow !== true ) setTimeout( controlsShow )
},
controlsHide = function(){

	document
	.getElementById( 'controls' )
	.classList
	.remove( 'show' )

	document
	.getElementById( 'timeline' )
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


let 
mouseIdleSince = Date.now(),
mouseShouldHideAfterSeconds = 2

function render(){

	if( window.stats !== undefined ) stats.update()


	//  This will correspond perfectly to our CSS variable --size
	//  which is either 1wh * 0.8 or 1vh * 0.8.
	//  Note that the actual value can therefore change
	//  at any moment if the window is resized by the user!

	window.size = window.innerWidth / window.innerHeight < 1
		? window.innerWidth  * 0.008
		: window.innerHeight * 0.008


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

		// if( timeAsTextPrevious !== '' && time !== 0 ) updateLocationHashFromTime()
		timeAsTextPrevious = timeAsText
		progressClockElement.innerText = timeAsText
	}


	if( comp.hasPlayedSome && 
		Date.now() - interfaceIdleSince >= controlsShouldHideAfterSeconds * 1000 ){

		controlsShouldHide = true
		controlsHide()
	}


	//  Hide the mouse cursor when it’s idle within the MAIN area.
	//  This will only work AFTER a first mouse interaction.
	// (Browser security thing?)

	if( Date.now() - mouseIdleSince >= 
		mouseShouldHideAfterSeconds * 1000 ){

		document
		.querySelector( 'main' )
		.style
		.cursor = 'none'
	}

	tasks.update( time )
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
characterToKeyName = {

	'`' : 'backtick',
	'-' : 'minus',
	'=' : 'equal',
	'\t': 'tab',
	'[' : 'bracket-open',
	']' : 'bracket-close',
	'\\': 'slash-backward',
	';' : 'semicolon',
	'\'': 'quote',
	'\n': 'return',
	'\r': 'return',
	',' : 'comma',
	'.' : 'period',
	'/' : 'slash-forward',
	' ' : 'space'
},
eventCodeToKeyName = {

	Backquote:    'backtick',
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
},
appendLockAbilitiesTo = function( object ){

	Object.assign( object, {

		locks: {},
		locksReset: function(){
			
			Object.keys( object.locks )
			.forEach( function( requestor ){
	
				delete object.locks[ requestor ]
			})
			this.classList.remove( 'engaged', 'disengaging' )
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
			


			if( verbosity >= 0.5 ) console.log( '🔣 Key engaged:', name, '\trequestor:', requestor )

			if( name.length > 1 ){
				
				if( name === 'delete' ) comp.log( '⌫'  )
				if( name === 'return' ) comp.log( '\n' )
				if( name === 'tab'    ) comp.log( '\t' )
				if( name === 'period' ) comp.log( '.' )
				if( name === 'space'  ) comp.log( ' ' )
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
					comp.log( `&lt;${ keyboardTagName.toUpperCase() }&gt;` )
				}
/*
s

must write a separate mini-toggle-routine here that 
turns capslock on OR off depending on current state.
(fine for mouse over instead of mousdown for that?)

*/



			}
			else comp.log( this.innerText )
		},
		disengage: function( requestor ){

			if( typeof requestor !== 'string' ) requestor = '*'


			if( verbosity >= 0.6 ) console.log( '🔣 Key disengaged:', name, '\trequestor:', requestor )

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
appendKeyAbilitiesToAllKeys = function( rootElement ){

	if( rootElement instanceof HTMLElement !== true ) rootElement = document.body
	forEachElement( rootElement, '.key', appendKeyAbilitiesTo )
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
		function( element ){

			if( typeof element.engage === 'function' ) element.engage( requestor )
			else console.warn( 'Tried to call .engage() on a key that didn’t support it!', keyName, requestor )
		}
	)
},
keyDisengage = function( keyName, requestor ){

	if( typeof keyName !== 'string' ) return null
	forEachElement(

		'[data-name="'+ keyName +'"]', 
		function( element ){

			if( typeof element.disengage === 'function' ) element.disengage( requestor )
			else console.warn( 'Tried to call .disengage() on a key that didn’t support it!', keyName, requestor )
		}
	)
},
keyToggle = function( keyName, requestor ){

	if( typeof keyName !== 'string' ) return null
	forEachElement(

		'[data-name="'+ keyName +'"]', 
		function( element ){

			if( typeof element.toggle === 'function' ) element.toggle( requestor )
			else console.warn( 'Tried to call .toggle() on a key that didn’t support it!', keyName, requestor )
		}
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

			if( verbosity > 0.3 ) console.log( '⌨️ Keyboard state added:', stateName, '\t requestor:', requestor )

			if( keyboardElement.states[ stateName ] === undefined ){

				keyboardElement.states[ stateName ] = {}
			}
			keyboardElement.states[ stateName ][ requestor ] = true
			keyboardElement.classList.add( stateName )
		},
		stateRemove: function( stateName, requestor ){

			if( verbosity >= 0.4 ) console.log( '⌨️ Keyboard state removed:', stateName, '\t requestor:', requestor )

			if( keyboardElement.states[ stateName ] === undefined ){

				keyboardElement.states[ stateName ] = {}
			}
			delete keyboardElement.states[ stateName ][ requestor ]
			if( Object.keys( keyboardElement.states[ stateName ]).length === 0 ){




				keyboardElement.classList.remove( stateName )
				if( stateName === 'option' ){

					//console.log( ' THIS IS WHERE I SHOULD DO option-lag')
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





new Mode({

	name: 'idle',
	setup: function(){
	
		//  add the class name
	},
	update: function( time ){
	
		//  draw based on comp.audio.currentTime
	},
	teardown: function(){
	
		//  take away the class name
	}
})






window.addEventListener( 'DOMContentLoaded', function(){


	//  Ug. iOS Safari. Again.
	//  It places an “Action Bar” at the bottom of the screen
	//  which entirely covers content there
	//  but does not update the viewport’s “vh” variable.
	//  So we need to do this ourselves.
	//  https://css-tricks.com/the-trick-to-viewport-units-on-mobile/

	// function rescaleViewportHeight(){

	// 	document
	// 	.documentElement
	// 	.style
	// 	.setProperty( '--vh', `${ window.innerHeight * 0.01 }px` )
	// }
	// rescaleViewportHeight()
	// window.addEventListener( 

	// 	'resize',
	// 	rescaleViewportHeight
	// )


	//  We’d like to hide the play controls
	//  when the user hasn’t done anything
	//  in a while. 

	const updateInterfaceIdleSince = function(){

		interfaceIdleSince = Date.now()
		controlsShow()
	}
	window.addEventListener( 'keydown',    updateInterfaceIdleSince )
	window.addEventListener( 'touchstart', updateInterfaceIdleSince )
	window.addEventListener( 'mousemove',  updateInterfaceIdleSince )
	window.addEventListener( 'scroll',     updateInterfaceIdleSince )


	//  We want to hide the mouse cursor in the MAIN area
	//  when the mouse is not in use for a while.
	// (Handled in our render loop.)
	//  Then reveal it when it moves again:

	document
	.querySelector( 'main' )
	.addEventListener( 'mousemove', function(){

		mouseIdleSince = Date.now()
		this.style.cursor = ''	
	})


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
		x = getInteractionCoordinates( event ).x - rectangle.left,
		n = x / timelineElement.clientWidth * comp.audio.duration,
		buffered = comp.audio.buffered

		if( verbosity >= 0.4 ) console.log( 'seeking n', n )
		if( verbosity >= 0.4 ) console.log( 'buffered.length', buffered.length )

		let thisChunkHasLoaded = false
		for( 

			let 
			i = 0, 
			totalChunks = buffered.length;			
			i < totalChunks; 
			i ++ ){

			if( buffered.start( i ) <= n &&
				n <= buffered.end( i )){

				if( verbosity >= 0.7 ) console.log( 'HAS LOADED!', n, 'chunk start', buffered.start( i ), 'chunk end', buffered.end( i ))
				thisChunkHasLoaded = true
				break
			}
			if( n < buffered.start( i )){

				if( verbosity >= 0.7 ) console.log( 'n < buffered.start( i )', n, buffered.start( i ))
				break
			}
		}
		if( verbosity >= 0.7 ) console.log( 'thisChunkHasLoaded', thisChunkHasLoaded ) 
		if( thisChunkHasLoaded ){

			comp.seek( n )
		}
	},
	updateSeekerFromPointer = function( event ){
		
		event.preventDefault()

		timelineElement
		.classList
		.add( 'show' )

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
	},
	hideSeeker = function(){

		timelineElement
		.classList
		.remove( 'show' )
	}


	timelineElement.addEventListener( 'touchstart', updateSeekerFromPointer )
	timelineElement.addEventListener( 'touchmove',  updateSeekerFromPointer )
	timelineElement.addEventListener( 'touchend',   seekByGui )
	timelineElement.addEventListener( 'mousedown',  seekByGui )
	timelineElement.addEventListener( 'mouseover',  updateSeekerFromPointer )
	timelineElement.addEventListener( 'mousemove',  updateSeekerFromPointer )
	
	timelineElement.addEventListener( 'touchend',   hideSeeker )
	timelineElement.addEventListener( 'mouseleave', hideSeeker )

	

	//  Enable PLAY / PAUSE toggle.

	const playPauseElement = document.getElementById( 'play-pause' )
	playPauseElement.addEventListener( 'mousedown',  function(){

		userHasInteracted = true
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
	

	

	//  Setup all keys to engage or disengage
	//  in response to both
	//  the programmed composition
	//  as well as any user input.

	appendKeyAbilitiesToAllKeys()
	appendKeyboardAbilitiesToAllKeyboards()

	window.addEventListener( 'keydown', function( event ){

		if( event.repeat !== true ){
		
			const name = (

				event.code.startsWith( 'Key' ) || 
				event.code.startsWith( 'Digit' )
			)
			? event.key.toUpperCase()
			: eventCodeToKeyName[ event.code ]
			keyEngage( name, 'user keyboard' )
			if([
				
				'Tab',
				'Backspace',
				'Enter',
				'Space',
				'ArrowUp',
				'ArrowRight',
				'ArrowDown',
				'ArrowLeft'

				].includes( event.code )){

				event.preventDefault()
			}
			if( event.code === 'Space' ) comp.toggle()
		}
	})
	window.addEventListener( 'keyup', function( event ){
		
		const name = (

			event.code.startsWith( 'Key' ) || 
			event.code.startsWith( 'Digit' )
		)
		? event.key.toUpperCase()
		: eventCodeToKeyName[ event.code ]
		keyDisengage( name, 'user keyboard' )
	})


	//  Execute any other setup tasks
	//  that have been queued with tasks.setups.add( ƒ… )

	tasks.setup()


	//  Setup the Statistics measurement tool
	//  if we’ve loaded the Stats code.

	if( typeof window.Stats === 'function' ){

		window.stats = new Stats()
		stats.showPanel( 0 )//  0: fps, 1: ms, 2: mb, 3+: custom
		
		document
		.querySelector( 'main' )
		.appendChild( stats.dom )
	}


	//  Kick off the render loop.

	render()


	//  Roll that beautiful bean footage.

	controlsEnable( true )
	setTimeout( controlsShow, comp.beatsPerSecond * 2 * 1000 )
})







