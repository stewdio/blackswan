





    ////////////////
   //            //
  //   Script   //
 //            //
////////////////


const script = [{ time: 0 }]
script.time  = 0
script.index = 0
script.set = function( timeAbsolute, action, comment ){

	script.push({

		time: timeAbsolute,
		action,
		comment
	})
	script.sort( function( a, b ){

		return a.time - b.time
	})
	return script
}
script.add = function( timeRelative, action, comment ){

	script.push({

		time: script[ script.length - 1 ].time + timeRelative,
		action,
		comment
	})
	return script
}
script.play = function(){

	script.clockMarkLast = performance.now() / 1000
	script.isPlaying = true
	script.isPaused  = false
}
script.pause = function(){

	script.isPlaying = false
	script.isPaused  = true
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
		
		script.time += delta
		while( script.index < script.length &&
			script[ script.index ].time <= script.time ){

			if( typeof script[ script.index ].action === 'function' ){

				script[ script.index ].action()
			}
			script.index ++
		}
		script.clockMarkLast = now
	}
	requestAnimationFrame( render )
}





let 
keyboards,
keyboard

window.addEventListener( 'DOMContentLoaded', function(){

	keyboards = Array.from( document.querySelectorAll( '.keyboard' ))
	keyboards.forEach( function( keyboard ){

		keyboard.switchToMode = function( mode ){

			keyboard.classList.remove( 'default', 'shift', 'option', 'shift-option', 'caps-lock' )
			keyboard.classList.add( mode )
		}
	})
	keyboard = keyboards[ 0 ]
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

		if( event.code === 'Space' ){

			if( script.isPlaying ) script.pause()
			else script.play()
		}

		if( event.key === 'Shift'   ) keyboard.switchToMode( 'shift'   )
		if( event.key === 'Control' ) keyboard.switchToMode( 'control' )
		if( event.key === 'Alt'     ) keyboard.switchToMode( 'option'  )
		if( event.key === 'Meta'    ) keyboard.switchToMode( 'command' )

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
	console.log( event.code )
})
window.addEventListener( 'keyup', function( event ){


	if( event.key === 'Shift'   ||
		event.key === 'Control' ||
		event.key === 'Alt'     ||
		event.key === 'Meta'    ) keyboard.switchToMode( 'default' )

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













