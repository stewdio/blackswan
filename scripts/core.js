
//  Copyright © 2020, Stewart Smith. See LICENSE for details.






    ////////////////
   //            //
  //   Script   //
 //            //
////////////////


const script = [{ time: 0, duration: 0 }]
script.time  =  0
script.index =  0
script.endAt = 60
script.playbackSpeed = 1
script.set = function( time, durationInSeconds, action, comment ){

	if( typeof time !== 'number' ) console.error( `A+ for creativity, but “time” ought to be a number.`, time )
	if( typeof durationInSeconds !== 'number' ) console.error( `A+ for creativity, but “durationInSeconds” ought to be a number.`, durationInSeconds )
	script.push({

		time,
		duration: durationInSeconds,
		action,
		comment
	})
	script.sort( function( a, b ){

		return a.time - b.time
	})
	return script
}
script.add = function( durationInBeats, action, comment ){

	if( typeof durationInBeats !== 'number' ) durationInBeats = 1

	let frameIndex = script.length - 1
	while( script[ frameIndex ].duration === 0 && 
		frameIndex > 0 ){

		frameIndex --
	}
	const lastFrame = script[ frameIndex ]
	script.push({

		time: lastFrame.time + lastFrame.duration,
		duration: durationInBeats * script.beat,
		action,
		comment
	})
	return script
}
script.play = function(){

	script.clockMarkLast = performance.now() / 1000
	script.isPlaying = true
	script.isPaused  = false
	audioElement.play()
}
script.pause = function(){

	script.isPlaying = false
	script.isPaused  = true
	audioElement.pause()
}
script.toggle = function(){

	if( script.isPlaying ) script.pause()
	else script.play()
}
script.seek = function( time ){

	script.index = 0
	script.time = time
	while( script.index < script.length &&
		script[ script.index ].time <= script.time ){

		if( typeof script[ script.index ].action === 'function' ){

			script[ script.index ].action()
		}
		script.index ++
	}
	audioElement.currentTime = time
}






    //////////////////
   //              //
  //   Playback   //
 //              //
//////////////////


function render(){

	if( script.isPlaying ){

		const 
		now   = performance.now() / 1000,
		delta = now - script.clockMarkLast
		
		script.time += delta * script.playbackSpeed
		while( script.index < script.length &&
			script[ script.index ].time <= script.time ){

			if( typeof script[ script.index ].action === 'function' ){

				script[ script.index ].action()
			}
			script.index ++
		}
		script.clockMarkLast = now
	}

	const progressElement = document.getElementById( 'progress' )
	progressElement.style.width = ( script.time / script.endAt * 100 ) +'%'


	if( isSeeking !== true ){

		const seekerElement = document.getElementById( 'seeker' )
		seekerElement.style.left = ( script.time / script.endAt * 100 ) +'%'
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
	})
	keyboard = keyboards[ 0 ]



	const 
	timeline = document.getElementById( 'timeline' ),
	seekByGui = function( event ){

		script.seek( event.pageX / timeline.clientWidth * script.endAt )
	},
	updateSeekerFromPointer = function( event ){
		
		isSeeking = true
		
		const 
		timeline  = document.getElementById( 'timeline' ),
		rectangle = timeline.getBoundingClientRect(),
		x = event.clientX - rectangle.left,
		seekerElement = document.getElementById( 'seeker' )

		seekerElement.style.left = x +'px'
	}
	
	timeline.addEventListener( 'mousedown',  seekByGui )
	timeline.addEventListener( 'touchstart', seekByGui )
	timeline.addEventListener( 'touchmove',  seekByGui )
	
	timeline.addEventListener( 'mouseover', updateSeekerFromPointer )
	timeline.addEventListener( 'mousemove', updateSeekerFromPointer )
	timeline.addEventListener( 'mouseout', function(){

		isSeeking = false
	})



	// keyboard.addEventListener( 'mousedown',  script.toggle )
	// keyboard.addEventListener( 'touchstart', script.toggle )


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

	if( event.repeat !== true ){

		if( event.code === 'Space'        ) script.toggle()
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
	// console.log( event.code )
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







