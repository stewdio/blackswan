

let 
clock = 0
lastPerformanceMark = -1,
isRunning = true,
script = [{

	time: 0
}],
scriptIndex = 0




script.set = function( timeAbsolute, action, comment ){

	script.push({

		time: timeAbsolute,
		action,
		comment
	})
	script = script.sort( function( a, b ){

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




function render(){

	if( isRunning ){

		const 
		now   = performance.now(),
		delta = now - lastPerformanceMark
		
		clock += delta
		
		const seconds = clock / 1000
		while( scriptIndex < script.length &&
			script[ scriptIndex ].time <= seconds ){

			if( typeof script[ scriptIndex ].action === 'function' ){

				// console.log(

				// 	( new Date ).getSeconds(),
				// 	Math.round( seconds ),
				// 	script[ scriptIndex ].time,
				// 	script[ scriptIndex ].comment
				// )
				script[ scriptIndex ].action()
			}
			scriptIndex ++
		}
		lastPerformanceMark = now
	}
	requestAnimationFrame( render )
}





const characterToName = {

	' ': 'space',
	'.': 'period',
	',': 'comma',
	"'": 'quote-single'
}




function riff( addGuitar, delay ){

	if( typeof delay !== 'number' ) delay = 0
	const timeStart = script[ script.length - 1 ].time + delay
	let timeMark = timeStart

	const unit = script.beat//0.15
	const beat = script.beat


	function press( delay, cssName ){

		if( typeof delay !== 'number' ) delay = 0
		timeMark += delay
		script.set(

			timeMark,
			function(){ document.querySelector( '.key-'+ cssName ).classList.add( 'press' )},
			'Type ON: '+ cssName
		)
		script.set(

			timeMark + beat * 0.45,
			function(){ document.querySelector( '.key-'+ cssName ).classList.remove( 'press' )},
			'Type ON: '+ cssName
		)
		timeMark += delay
	}





	if( addGuitar ){

		script.set( timeMark, function(){

			document.querySelector( '.keyboard' ).classList.add( 'option' )
		})
		script.set( timeMark + beat / 3, function(){

			document.querySelector( '.keyboard' ).classList.remove( 'option' )
		})
	}
	if( addGuitar ){

		script.set( timeMark + beat / 2, function(){

			document.querySelector( '.keyboard' ).classList.add( 'option' )
		})
		script.set( timeMark + beat / 2 + beat / 3, function(){

			document.querySelector( '.keyboard' ).classList.remove( 'option' )
		})
	}
	press( 0, 'space' )
	press( beat / 2, 'space' )
	press( beat / 8, 'period' )
	press( beat / 4, 'space' )
	
	press( beat / 4, 'tab' )
	press( beat / 2, 'period' )
	press( beat / 4, 'space' )
	press( beat / 8, 'period' )
	press( beat / 8, 'space' )
}




function type( text ){

	const timeStart = script[ script.length - 1 ].time
	text.split( '' ).forEach( function( character, i ){

		if( characterToName[ character ] !== undefined ){

			character = characterToName[ character ]
		}

		const 
		cssName = character.length > 1 ? character : character.toUpperCase(),
		keyElement = document.querySelector( '.key-'+ cssName ),
		// isLetter = character.match( /[a-z]/i ),
		// isMajuscule = isLetter && character === character.toUpperCase()
		isMajuscule = character.match( /[A-Z]/ )

		if( keyElement instanceof HTMLElement ){
		
			script.set(

				timeStart + i * 0.1,
				function(){ keyElement.classList.add( 'press' )},
				'Type ON: '+ cssName
			)
			if( isMajuscule ){

				script.set(

					timeStart + i * 0.1,
					function(){ keyboard.classList.add( 'shift' )},
					'shift ON'
				)
			}
			script.set(

				timeStart + i * 0.1 + 0.3,
				function(){ keyElement.classList.remove( 'press' )},
				'Type OFF: '+ cssName
			)
			if( isMajuscule ){

				script.set(

					timeStart + i * 0.1 + 0.3,
					function(){ keyboard.classList.remove( 'shift' )},
					'shift OFF'
				)
			}
		}
	})
}




function fuckedUp(){

	'fuckedup'.split( '' ).forEach( function( letter, i ){

		script.add(

			0.2,
			function(){
		
				const key = document.querySelector( '.key-'+ letter.toUpperCase() )
				if( key.classList.contains( 'press' )){

					key.classList.remove( 'press' )
				}
				else key.classList.add( 'press' )
			},
			letter
		)
	})
}
function blackSwanOn(){

	script.add( 0, function(){ keyboard.switchToMode( 'caps-lock' )}, 'caps-lock ON' )
	;[ ...new Set( 'blackswan'.split( '' ))]
	.forEach( function( letter, i ){

		script.add(

			0.2,
			function(){
		
				const key = document.querySelector( '.key-'+ letter.toUpperCase() )
				key.classList.add( 'black' )

			},
			'Black ON: '+ letter
		)
	})
}
function blackSwanOff(){

	;[ ...new Set( 'blackswan'.split( '' ))]
	.forEach( function( letter, i ){

		script.add(
		
			0.2,	
			function(){
		
				const key = document.querySelector( '.key-'+ letter.toUpperCase() )
				key.classList.remove( 'black' )

			},
			'Black OFF: '+ letter
		)
	})
	script.add( 0, function(){ keyboard.switchToMode( 'default' )}, 'caps-lock OFF' )
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
window.addEventListener( 'keydown', function( event ){

	if( !!event.key.match( /[A-Z]|[0-9]/i )){

		const keyElement = document.querySelector( '.key-'+ event.key.toUpperCase() )
		if( keyElement instanceof HTMLElement ) keyElement.classList.add( 'press' )
	}
	// console.log( '>', event.code, clock, event )
	// console.log( 'event.ctrlKey', event.ctrlKey )
	// console.log( 'event.shiftKey', event.shiftKey )
	// console.log( 'event.altKey', event.altKey )
	// console.log( 'event.metaKey', event.metaKey )
})
window.addEventListener( 'keyup', function( event ){

	if( !!event.key.match( /[A-Z]|[0-9]/i )){

		const keyElement = document.querySelector( '.key-'+ event.key.toUpperCase() )
		if( keyElement instanceof HTMLElement ) keyElement.classList.remove( 'press' )
	}
})





