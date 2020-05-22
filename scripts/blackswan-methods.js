









function riff( delay, addGuitar ){

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






const characterToName = {

	' ': 'space',
	'.': 'period',
	',': 'comma',
	"'": 'quote'
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
		isMajuscule = character.match( /[A-Z]/ )

		if( keyElement instanceof HTMLElement ){
		
			script.set(

				timeStart + i * 0.1,
				function(){ keyElement.classList.add( 'press' )},
				'Type ON: '+ cssName
			)
			if( isMajuscule ){

				const side = Math.random() >= 0.5 ? 'left' : 'right'
				script.set(

					timeStart + i * 0.1,
					function(){ 

						keyboard.classList.add( 'shift' )
						Array
						.from( document.querySelectorAll( '.key-shift-'+ side ))
						.forEach( function( element ){

							element.classList.add( 'press' )
						})
					},
					'shift ON'
				)
				script.set(

					timeStart + i * 0.1 + 0.3,
					function(){ 

						keyboard.classList.remove( 'shift' )
						Array
						.from( document.querySelectorAll( '.key-shift-'+ side ))
						.forEach( function( element ){

							element.classList.remove( 'press' )
						})
					},
					'shift OFF'
				)
			}
			script.set(

				timeStart + i * 0.1 + 0.3,
				function(){ keyElement.classList.remove( 'press' )},
				'Type OFF: '+ cssName
			)
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

	script.add( 0, function(){ keyboard.channelAdd( 'caps-lock', 'blackSwan' )}, 'caps-lock ON' )
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
	script.add( 0, function(){ keyboard.channelRemove( 'caps-lock', 'blackSwan' )}, 'caps-lock OFF' )
}







