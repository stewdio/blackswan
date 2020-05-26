
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
	set: function( time, durationInSeconds, action, comment ){

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
	add: function( durationInBeats, action, comment ){

		if( typeof durationInBeats !== 'number' ) durationInBeats = 1

		let frameIndex = comp.length - 1
		while( comp[ frameIndex ].duration === 0 && 
			frameIndex > 0 ){

			frameIndex --
		}
		const lastFrame = comp[ frameIndex ]
		comp.push({

			time: lastFrame.time + lastFrame.duration,
			duration: durationInBeats * comp.beat,
			action,
			comment
		})
		return this
	},
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

		comp.frameIndex = 0
		comp.audio.currentTime = time
		while( comp.frameIndex < comp.length &&
			comp[ comp.frameIndex ].time <= comp.audio.currentTime ){

			if( typeof comp[ comp.frameIndex ].action === 'function' ){

				comp[ comp.frameIndex ].action()
			}
			comp.frameIndex ++
		}
		return this
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
comp.audio.playbackRate = 1.0
comp.audio.volume = 0.4








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
	const progressElement = document.getElementById( 'progress' )
	progressElement.style.width = ( comp.audio.currentTime / comp.audio.duration * 100 ) +'%'
	if( isSeeking !== true ){

		const seekerElement = document.getElementById( 'seeker' )
		seekerElement.style.left = ( comp.audio.currentTime / comp.audio.duration * 100 ) +'%'
	}
	requestAnimationFrame( render )
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

		if( x <= rectangle.right ){

			isSeeking = true

			const
			seekerElement = document.getElementById( 'seeker' ),
			clockElement  = document.getElementById( 'clock' ),
			time = x / rectangle.width * comp.audio.duration,
			minutes = Math.floor( time / 60 ),
			seconds = Math.floor( time - ( minutes * 60 ))

			seekerElement.style.left = x +'px'
			clock.innerText = minutes +':'+ seconds.toString().padStart( 2, '0' )
		}
	}
	
	timeline.addEventListener( 'mousedown',  seekByGui )
	timeline.addEventListener( 'touchstart', seekByGui )
	timeline.addEventListener( 'touchmove',  seekByGui )
	
	timeline.addEventListener( 'mouseover', updateSeekerFromPointer )
	timeline.addEventListener( 'mousemove', updateSeekerFromPointer )
	timeline.addEventListener( 'mouseout', function(){

		isSeeking = false
	})


	const playPauseElement = document.getElementById( 'play-pause' )
	playPauseElement.addEventListener( 'mousedown',  comp.toggle )
	const returnToStartElement = document.getElementById( 'return-to-start' )
	returnToStartElement.addEventListener( 'mousedown', function(){

		comp.seek( 0 )//.play()
	})



	comp.audio.addEventListener( 'loadeddata', function( event ){

		// let duration = audioElement.duration;
		// The duration variable now holds the duration (in seconds) of the audio clip 
		// console.log( 'shit loaded', event )
		const controlsElement = document.getElementById( 'controls' )
		controlsElement.classList.add( 'show' )
	})
	comp.audio.addEventListener( 'ended', function( event ){

		console.log( 'Generate receipt...' )
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
window.addEventListener( 'keydown', function( event ){

	if( event.code === 'Space' ) comp.toggle()
	if( event.repeat !== true ){

		if( event.code === 'ShiftLeft'    ) keyboard.channelAdd( 'shift',   'user left'  )
		if( event.code === 'ShiftRight'   ) keyboard.channelAdd( 'shift',   'user right' )
		if( event.code === 'ControlLeft'  ) keyboard.channelAdd( 'control', 'user left'  )
		if( event.code === 'ControlRight' ) keyboard.channelAdd( 'control', 'user right' )
		if( event.code === 'AltLeft'      ) keyboard.channelAdd( 'option',  'user left'  )
		if( event.code === 'AltRight'     ) keyboard.channelAdd( 'option',  'user right' )
		if( event.code === 'MetaLeft'     ) keyboard.channelAdd( 'command', 'user left'  )
		if( event.code === 'MetaRight'    ) keyboard.channelAdd( 'command', 'user right' )

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
	
	if( event.code === 'ShiftLeft'    ) keyboard.channelRemove( 'shift',   'user left'  )
	if( event.code === 'ShiftRight'   ) keyboard.channelRemove( 'shift',   'user right' )
	if( event.code === 'ControlLeft'  ) keyboard.channelRemove( 'control', 'user left'  )
	if( event.code === 'ControlRight' ) keyboard.channelRemove( 'control', 'user right' )
	if( event.code === 'AltLeft'      ) keyboard.channelRemove( 'option',  'user left'  )
	if( event.code === 'AltRight'     ) keyboard.channelRemove( 'option',  'user right' )
	if( event.code === 'MetaLeft'     ) keyboard.channelRemove( 'command', 'user left'  )
	if( event.code === 'MetaRight'    ) keyboard.channelRemove( 'command', 'user right' )

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







