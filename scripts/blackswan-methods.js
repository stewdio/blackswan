









function riff( addGuitar, addLastHit ){

	if( addLastHit === undefined ) addLastHit === true 
	const timeStart = script[ script.length - 1 ].time
	let timeMark = timeStart


	function hit( durationToOccupy, cssName, durationVisible ){

		if( typeof durationVisible !== 'number' ) durationVisible = 1/4
		script.set(

			timeMark,
			function(){ document.querySelector( '.key-'+ cssName ).classList.add( 'press' )},
			'Riff. Turn ON: '+ cssName
		)
		script.set(

			timeMark + script.beat * durationVisible * 0.9,
			function(){ document.querySelector( '.key-'+ cssName ).classList.remove( 'press' )},
			'Riff. Turn OFF: '+ cssName
		)
		timeMark += script.beat * durationToOccupy
	}


	hit( 2/4, 'space'  )
	hit( 2/4, 'space'  )
	hit( 1/4, 'period' )
	hit( 2/4, 'space', 2/4 )
	
	hit( 2/4, 'tab'    )
	hit( 2/4, 'period' )
	hit( 1/4, 'space'  )
	hit( 1/4, 'period' )
	hit( 2/4, 'space', 2/4 )
	
	if( addLastHit ){
		
		hit( 1/4, 'space', 1/8 )
		script.add( script.beat * 1/4 )//  Register that last beat to the outside world.
	}
	else script.add( script.beat * 1/4 )//  Does this need to be 2/4 ??




	if( addGuitar ){

		script.set( timeStart + script.beat * 0/8, function(){

			document.querySelector( '.keyboard' ).classList.add( 'option' )
		})
		script.set( timeStart + script.beat * 2/8, function(){

			document.querySelector( '.keyboard' ).classList.remove( 'option' )
		})
		script.set( timeStart + script.beat * 4/8, function(){

			document.querySelector( '.keyboard' ).classList.add( 'option' )
		})
		script.set( timeStart + script.beat * 8/8, function(){

			document.querySelector( '.keyboard' ).classList.remove( 'option' )
		})
	}
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







