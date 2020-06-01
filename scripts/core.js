
//  Copyright © 2020, Stewart Smith. See LICENSE for details.






    /////////////////////
   //                 //
  //   Composition   //
 //                 //
/////////////////////


const comp = [{ time: 0, duration: 0 }]
Object.assign( comp, {

	frameIndex: 0,
	audio: new Audio(),
	logs: [],
	play: function(){

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
	seek: function( time ){	

		keyboard.style.setProperty( 'transition', 'none', 'important' )
		Array
		.from( document.querySelectorAll( '.key' ))
		.forEach( function( key ){

			key.style.setProperty( 'transition', 'none', 'important' )
		})
		
		if( typeof window.reset === 'function' ) window.reset()
		comp.frameIndex = 0
		comp.audio.currentTime = time
		while( comp.frameIndex < comp.length &&
			comp[ comp.frameIndex ].time <= comp.audio.currentTime ){

			const frame = comp[ comp.frameIndex ]
			if( frame.time >= comp.audio.currentTime - 20 &&//  Is 20 seconds enough?!?
				typeof frame.action === 'function' ){

				frame.action()
			}
			comp.frameIndex ++
		}
		
		setTimeout( function(){

			keyboard.style.transition = ''
			Array
			.from( document.querySelectorAll( '.key' ))
			.forEach( function( key ){

				key.style.transition = ''
			})
		})
		return this
	},
	report: function( frameIndex, includeSiblings ){

		if( typeof frameIndex !== 'number' ) frameIndex = comp.frameIndex
		if( typeof includeSiblings !== 'boolean' ) includeSiblings = true

		function construct( frameIndex, name ){

			const frame = comp[ frameIndex ]
			let output = '\n'
			if( includeSiblings ) output += name.padEnd( 10, ' ' )
			output += '#'+ frameIndex +'  '
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
	reportAll: function(){

		//  Usage: console.log( ...comp.reportAll() )
		
		return comp.reduce( function( output, frame, frameIndex ){

			output.concat( frameIndex, false )

		}, [] )

	},
	log: function( text ){

		if( text.length === 1 ) this.logs.push( text )
		else this.logs.push( `\n<${ text.toUpperCase() }>\n` )
		return this
	},
	generateReceipt: function(){

		return this.logs.join( '' )
	}
})
comp.audio.pause()
Object.assign( comp.audio, {

	preload: 'auto',
	playbackRate: 1.0,
	volume: 1
	// volume: 0.4
})






    /////////////////
   //             //
  //   Compose   //
 //             //
/////////////////


function insert( time, durationInSeconds, action, comment ){

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
}
function findLastBeat(){

	let frameIndex = comp.length - 1
	while( comp[ frameIndex ].duration === 0 && 
		frameIndex > 0 ){

		frameIndex --
	}
	return comp[ frameIndex ].time + comp[ frameIndex ].duration
}
function append( durationInBeats, action, comment ){

	if( typeof durationInBeats !== 'number' ) durationInBeats = 1
	comp.push({

		time: findLastBeat(),
		duration: durationInBeats * comp.beat,
		action,
		comment
	})
	return this
}






    ///////////////
   //           //
  //   Debug   //
 //           //
///////////////


function formatTime( timeInSeconds, includeMillis ){

	if( typeof includeMillis !== 'boolean' ) includeMillis = false

	const 
	minutes = Math.floor( timeInSeconds / 60 ),
	seconds = Math.floor( timeInSeconds - minutes * 60 ),
	millis  = Math.round((( timeInSeconds % 60 ) - seconds ) * 1000 ) / 1000,
	output  = minutes.toString() +':'+ 
		seconds.toString().padStart( 2, '0' )

	if( includeMillis ){
		
		return output +'.'+ millis.toString().substr( 2 ).padStart( 4, '0' )
	}
	return output
}
function assessDuration( timeStart, timeEnd, name, expectedBeats ){

	if( typeof name !== 'string' ) name = 'Untitled'

	const
	durationInSeconds = timeEnd - timeStart,
	durationInBeats = Math.round( durationInSeconds / comp.beat * 1000000 ) / 1000000,
	looksGoodToMe = durationInBeats === expectedBeats

	console.log( 

		'\n'+
		 formatTime( timeStart, true ) +' to '+
		 formatTime( timeEnd, true ) +' is '+
		 formatTime( durationInSeconds, true ) +' ('+
		 durationInBeats +' beats) for “'+
		 name +'”  '+
		 ( looksGoodToMe ? '👍' : '❌❌❌ ⚠️  EXPECTED '+ expectedBeats +' beats!' ) +
		 '\n\n'
	)
	return { durationInSeconds, durationInBeats }
}






    //////////////////
   //              //
  //   Playback   //
 //              //
//////////////////


function render(){

	if( comp.isPlaying ){

		while( comp.frameIndex < comp.length &&
			comp[ comp.frameIndex ].time <= comp.audio.currentTime ){

			if( typeof comp[ comp.frameIndex ].action === 'function' ){

				comp[ comp.frameIndex ].action()
			}
			comp.frameIndex ++
		}
	}

	const
	timelineElement      = document.getElementById( 'timeline' ),
	progressElement      = document.getElementById( 'progress' ),
	progressClockElement = document.getElementById( 'progress-clock' ),
	progressMinutes      = Math.floor( comp.audio.currentTime / 60 ),
	progressSeconds      = Math.floor( comp.audio.currentTime - ( progressMinutes * 60 )),
	//progressXConstrained = Math.min( Math.max( progressElement.offsetWidth, 60 ), timelineElement.offsetWidth )
	progressX = progressElement.offsetWidth
	
	progressElement.style.width = ( comp.audio.currentTime / comp.audio.duration * timelineElement.offsetWidth ) +'px'
	progressClockElement.style.left = progressX +'px'
	progressClockElement.innerText = 
		progressMinutes +':'+ 
		progressSeconds.toString().padStart( 2, '0' )

	requestAnimationFrame( render )
}







function toggleFullscreen(){
	
	let elem = document.getElementById( 'fullscreen-container' )

	elem.requestFullscreen = elem.requestFullscreen || elem.mozRequestFullscreen
	|| elem.msRequestFullscreen || elem.webkitRequestFullscreen;

	if( !document.fullscreenElement ){
	
		elem.requestFullscreen().then({}).catch(err => {
		alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
		});
	}
	else {
	
		if( document.exitFullscreen ) document.exitFullscreen()
	}
}


let 
keyboards,
keyboard,
isSeeking = false

window.addEventListener( 'DOMContentLoaded', function(){

	keyboards = Array.from( document.querySelectorAll( '.keyboard' ))
	keyboards.forEach( function( keyboard ){

		Object.assign( keyboard, {

			channels: {},
			channelAdd: function( cssName, requesterName ){

				if( keyboard.channels[ cssName ] === undefined ){

					keyboard.channels[ cssName ] = {}
				}
				keyboard.channels[ cssName ][ requesterName ] = true
				keyboard.classList.add( cssName )
			},
			channelRemove: function( cssName, requesterName ){

				if( keyboard.channels[ cssName ] === undefined ){

					keyboard.channels[ cssName ] = {}
				}
				if( keyboard.channels[ cssName ][ requesterName ]){

					delete keyboard.channels[ cssName ][ requesterName ]
				}
				if( Object.keys( keyboard.channels[ cssName ]).length === 0 ){

					keyboard.classList.remove( cssName )
				}
			},
			reset: function(){
				
				Object.keys( keyboard.channels ).forEach( function( cssName ){

					Object.keys( keyboard.channels[ cssName ]).forEach( function( requesterName ){

						keyboard.classList.remove( cssName )
						delete keyboard.channels[ cssName ][ requesterName ]
					})
				})
			}
		})
		
		Array
		.from( document.querySelectorAll( '.row' ))
		.forEach( function( row, y ){

			Array
			.from( row.querySelectorAll( '.key' ))
			.forEach( function( key, x ){

				key.setAttribute( 'x', x )
				key.setAttribute( 'y', y )
			})
		})
	})
	keyboard = keyboards[ 0 ]




	const
	controlsActivator = document.getElementById( 'controls-activator' ),
	controls = document.getElementById( 'controls' ),
	timeline = document.getElementById( 'timeline' ),
	seekByGui = function( event ){

		const 
		timeline  = document.getElementById( 'timeline' ),
		rectangle = timeline.getBoundingClientRect(),
		x = event.clientX - rectangle.left
		
		comp.seek( x / timeline.clientWidth * comp.audio.duration )
	},
	updateSeekerFromPointer = function( event ){
		
		const 
		timeline  = document.getElementById( 'timeline' ),
		rectangle = timeline.getBoundingClientRect(),
		x = event.clientX - rectangle.left

		if( x >= 0 && x <= rectangle.width ){

			const
			seekerElement = document.getElementById( 'seeker-head' ),
			seekerClockElement = document.getElementById( 'seeker-clock' ),
			seekerTime = x / rectangle.width * comp.audio.duration,
			seekerMinutes = Math.floor( seekerTime / 60 ),
			seekerSeconds = Math.floor( seekerTime - ( seekerMinutes * 60 ))

			seekerElement.style.left = x +'px'
			seekerClockElement.style.left = x +'px'
			seekerClockElement.innerText = 
				seekerMinutes +':'+ 
				seekerSeconds.toString().padStart( 2, '0' )
		}
	}
	


	
	controlsActivator.addEventListener( 'mouseover', function(){

		controls.classList.add( 'show' )
	})
	controlsActivator.addEventListener( 'mouseleave', function(){

		controls.classList.remove( 'show' )
	})




	timeline.addEventListener( 'mousedown',  seekByGui )
	timeline.addEventListener( 'touchstart', seekByGui )
	timeline.addEventListener( 'touchmove',  seekByGui )
	
	timeline.addEventListener( 'mouseover', updateSeekerFromPointer )
	timeline.addEventListener( 'mousemove', updateSeekerFromPointer )

	const playPauseElement = document.getElementById( 'play-pause' )
	playPauseElement.addEventListener( 'mousedown',  comp.toggle )
	const returnToStartElement = document.getElementById( 'return-to-start' )
	returnToStartElement.addEventListener( 'mousedown', function(){

		comp.seek( 0 )//.play()
	})

	const toggleFullscreenEl = document.getElementById( 'toggle-fullscreen' )
	toggleFullscreenEl.addEventListener( 'mousedown', toggleFullscreen )



/*


ok.... we need to fix this:
on mobile
user has to hit play button BEFORE we can load the file!
so 'canplaythrough' will never get fired ahead of time. 

do we hide the timeline instead?
or use it as a loader progress bar?


*/





	comp.audio.addEventListener( 'canplaythrough', function( event ){

		// let duration = audioElement.duration;
		// The duration variable now holds the duration (in seconds) of the audio clip 
		// console.log( 'shit loaded', event )
		const controlsElement = document.getElementById( 'controls' )
		// controlsElement.classList.add( 'show' )
	})
	comp.audio.addEventListener( 'ended', function( event ){

		console.log( 

			'\nGenerate receipt...',
			'\n\n',
			 comp.generateReceipt()
		)		
		comp.pause().seek( 0 )
	})


	render()
})


















    /////////////////////////
   //                     //
  //    Audience input   //
 //                     //
/////////////////////////


function modifyClassList( cssQuery, addOrRemove, classToAddOrRemove ){

	if( typeof classToAddOrRemove !== 'string' ) classToAddOrRemove = 'press'
	Array
	.from( document.querySelectorAll( cssQuery ))
	.forEach( function( element ){

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

	// CapsLock:     'caps-lock',
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
function addChannelToggles( key, cssName, side ){

	const channel = 'user pointer '+ side
	key.addEventListener( 'mouseover', function(){

		keyboard.channelAdd( cssName, channel )
	})
	key.addEventListener( 'mousedown', function(){

		keyboard.channelAdd( cssName, channel )
	})
	key.addEventListener( 'mouseout', function(){

		keyboard.channelRemove( cssName, channel )
	})
	key.addEventListener( 'mouseup', function(){

		keyboard.channelRemove( cssName, channel )
	})
}
window.addEventListener( 'keydown', function( event ){

	if( event.code === 'Space' ) comp.toggle()
	if( event.repeat !== true ){

		if( event.code === 'ShiftLeft'    ) keyboard.channelAdd( 'shift',   'user keyboard left'  )
		if( event.code === 'ShiftRight'   ) keyboard.channelAdd( 'shift',   'user keyboard right' )
		if( event.code === 'ControlLeft'  ) keyboard.channelAdd( 'control', 'user keyboard left'  )
		if( event.code === 'ControlRight' ) keyboard.channelAdd( 'control', 'user keyboard right' )
		if( event.code === 'AltLeft'      ) keyboard.channelAdd( 'option',  'user keyboard left'  )
		if( event.code === 'AltRight'     ) keyboard.channelAdd( 'option',  'user keyboard right' )
		if( event.code === 'MetaLeft'     ) keyboard.channelAdd( 'command', 'user keyboard left'  )
		if( event.code === 'MetaRight'    ) keyboard.channelAdd( 'command', 'user keyboard right' )

		const cssQuery = eventCodeToCssQuery[ event.code ]
		if( event.code === 'CapsLock' ){

			keyboard.classList.add( 'caps-lock' )
		}
		else if( cssQuery !== undefined ){

			modifyClassList( '.key-'+ cssQuery, 'add' )
		}
		else if( !!event.key.match( /[A-Z]|[0-9]/i )){

			const keyElement = document.querySelector( '.key-'+ event.key.toUpperCase() )
			if( keyElement instanceof HTMLElement ) keyElement.classList.add( 'press' )
		}
	}
	comp.log( event.code.startsWith( 'Key' ) ? event.key : event.code )
})
window.addEventListener( 'keyup', function( event ){
	
	if( event.code === 'ShiftLeft'    ) keyboard.channelRemove( 'shift',   'user keyboard left'  )
	if( event.code === 'ShiftRight'   ) keyboard.channelRemove( 'shift',   'user keyboard right' )
	if( event.code === 'ControlLeft'  ) keyboard.channelRemove( 'control', 'user keyboard left'  )
	if( event.code === 'ControlRight' ) keyboard.channelRemove( 'control', 'user keyboard right' )
	if( event.code === 'AltLeft'      ) keyboard.channelRemove( 'option',  'user keyboard left'  )
	if( event.code === 'AltRight'     ) keyboard.channelRemove( 'option',  'user keyboard right' )
	if( event.code === 'MetaLeft'     ) keyboard.channelRemove( 'command', 'user keyboard left'  )
	if( event.code === 'MetaRight'    ) keyboard.channelRemove( 'command', 'user keyboard right' )

	const cssQuery = eventCodeToCssQuery[ event.code ]
	if( event.code === 'CapsLock' ){

		keyboard.classList.remove( 'caps-lock' )
	}
	else if( cssQuery !== undefined ){

		modifyClassList( '.key-'+ cssQuery, 'remove' )
	}
	else if( !!event.key.match( /[A-Z]|[0-9]/i )){

		const keyElement = document.querySelector( '.key-'+ event.key.toUpperCase() )
		if( keyElement instanceof HTMLElement ) keyElement.classList.remove( 'press' )
	}
})
window.addEventListener( 'DOMContentLoaded', function(){

	function addChannelTogglesGeneric( cssQuery, cssName, side ){

		Array
		.from( document.querySelectorAll( cssQuery ))
		.forEach( function( key ){

			addChannelToggles( key, cssName, side )
		})
	}
	addChannelTogglesGeneric( '.key-shift-left',    'shift',   'left'  )
	addChannelTogglesGeneric( '.key-shift-right',   'shift',   'right' )
	addChannelTogglesGeneric( '.key-control-left',  'control', 'left'  )
	addChannelTogglesGeneric( '.key-control-right', 'control', 'right' )
	addChannelTogglesGeneric( '.key-option-left',   'option',  'left'  )
	addChannelTogglesGeneric( '.key-option-right',  'option',  'right' )
	addChannelTogglesGeneric( '.key-command-left',  'command', 'left'  )
	addChannelTogglesGeneric( '.key-command-right', 'command', 'right' )
})









