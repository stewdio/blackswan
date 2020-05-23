
//  Copyright © 2020, Stewart Smith. See LICENSE for details.






function riff( drumSolo, addLastHit ){

	if( typeof drumSolo !== 'boolean' ) drumSolo = false
	if( typeof addLastHit !== 'boolean' ) addLastHit = true
	
	let frameIndex = script.length - 1
	while( script[ frameIndex ].duration === 0 && 
		frameIndex > 0 ){

		frameIndex --
	}
	
	const 
	lastFrame = script[ frameIndex ],
	timeStart = lastFrame.time + lastFrame.duration,
	hit = function( durationToOccupy, cssName, durationVisible ){

		if( typeof durationVisible !== 'number' ) durationVisible = durationToOccupy
		script.set(

			timeMark,
			script.beat * durationToOccupy,
			function(){ document.querySelector( '.key-'+ cssName ).classList.add( 'press' )},
			'Riff. Hit ON: '+ cssName
		)
		script.set(

			timeMark + script.beat * durationVisible * 15/16,
			0,
			function(){ document.querySelector( '.key-'+ cssName ).classList.remove( 'press' )},
			'Riff. Hit OFF: '+ cssName
		)
		timeMark += script.beat * durationToOccupy
	}

	let timeMark = timeStart

	hit( 2/4, 'space', 1/4 )
	hit( 2/4, 'space'  )
	hit( 1/4, 'period' )
	hit( 2/4, 'space'  )
	
	hit( 2/4, 'tab'    )
	hit( 2/4, 'period' )
	hit( 1/4, 'space'  )
	hit( 1/4, 'period' )
	hit( 2/4, 'space'  )

	if( addLastHit ) hit( 1/4, 'space', 1/8 )
	else script.add( 1/4 )


	if( drumSolo !== true ){

		script.set( 

			timeStart + script.beat * 0/8,
			script.beat * 2/8,
			function(){ keyboard.classList.add( 'option' )},
			'Riff. Guitar ON.'
		)
		script.set( 

			timeStart + script.beat * 2/8, 
			script.beat * 1/4,
			function(){ keyboard.classList.remove( 'option' )},
			'Riff. Guitar ON.'
		)
		script.set( 

			timeStart + script.beat * 4/8, 
			script.beat * 2/8,
			function(){ keyboard.classList.add( 'option' )},
			'Riff. Guitar ON.'
		)
		script.set(

			timeStart + script.beat * 8/8,
			script.beat * 2/8,
			function(){ keyboard.classList.remove( 'option' )},
			'Riff. Guitar OFF.'
		)
	}
}






const characterToName = {

	' ': 'space',
	'.': 'period',
	',': 'comma',
	"'": 'quote'
}
function type( text, durationInBeats, holdUntilDone ){

	text = text.replace( /\s/g, '' )
	if( typeof durationInBeats !== 'number' ) durationInBeats = 6
	if( typeof holdUntilDone !== 'boolean' ) holdUntilDone = false

	let frameIndex = script.length - 1
	while( script[ frameIndex ].duration === 0 && 
		frameIndex > 0 ){

		frameIndex --
	}

	const 
	timeStart = script[ frameIndex ].time,
	durationPerCharacter = durationInBeats / text.length

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

				timeStart + script.beat * i * durationPerCharacter,
				durationPerCharacter,
				function(){ keyElement.classList.add( 'press' )},
				'Type ON: '+ cssName
			)
			if( isMajuscule ){

				const side = Math.random() >= 0.5 ? 'left' : 'right'
				script.set(

					timeStart + script.beat * i * durationPerCharacter,
					durationPerCharacter,
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

					timeStart + script.beat * i * durationPerCharacter + durationPerCharacter,//  Is EXACT so can be overridden by a subsequent ON command!
					0,
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

			const releaseAfterDuration = holdUntilDone ? 
				durationInBeats * script.beat :
				script.beat * i * durationPerCharacter + durationPerCharacter * 15/16			
			
			script.set(

				timeStart + releaseAfterDuration,
				0,
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







