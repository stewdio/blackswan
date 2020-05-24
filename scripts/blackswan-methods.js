
//  Copyright © 2020, Stewart Smith. See LICENSE for details.






function riff( drumSolo, addLastHit ){

	if( typeof drumSolo !== 'boolean' ) drumSolo = false
	if( typeof addLastHit !== 'boolean' ) addLastHit = true
	
	let frameIndex = comp.length - 1
	while( comp[ frameIndex ].duration === 0 && 
		frameIndex > 0 ){

		frameIndex --
	}
	
	const 
	lastFrame = comp[ frameIndex ],
	timeStart = lastFrame.time + lastFrame.duration,
	hit = function( durationToOccupy, cssName, durationVisible ){

		if( typeof durationVisible !== 'number' ) durationVisible = durationToOccupy
		comp.set(

			timeMark,
			comp.beat * durationToOccupy,
			function(){ document.querySelector( '.key-'+ cssName ).classList.add( 'press' )},
			'Riff. Hit ON: '+ cssName
		)
		comp.set(

			timeMark + comp.beat * durationVisible * 15/16,
			0,
			function(){ document.querySelector( '.key-'+ cssName ).classList.remove( 'press' )},
			'Riff. Hit OFF: '+ cssName
		)
		timeMark += comp.beat * durationToOccupy
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
	else comp.add( 1/4 )


	if( drumSolo !== true ){

		comp.set( 

			timeStart + comp.beat * 0/8,
			comp.beat * 2/8,
			function(){ keyboard.classList.add( 'option' )},
			'Riff. Guitar ON.'
		)
		comp.set( 

			timeStart + comp.beat * 2/8, 
			comp.beat * 1/4,
			function(){ keyboard.classList.remove( 'option' )},
			'Riff. Guitar ON.'
		)
		comp.set( 

			timeStart + comp.beat * 4/8, 
			comp.beat * 2/8,
			function(){ keyboard.classList.add( 'option' )},
			'Riff. Guitar ON.'
		)
		comp.set(

			timeStart + comp.beat * 8/8,
			comp.beat * 2/8,
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
	if( typeof durationInBeats !== 'number' ) durationInBeats = 5
	if( typeof holdUntilDone !== 'boolean' ) holdUntilDone = false

	let frameIndex = comp.length - 1
	while( comp[ frameIndex ].duration === 0 && 
		frameIndex > 0 ){

		frameIndex --
	}

	const 
	lastFrame = comp[ frameIndex ],
	timeStart = lastFrame.time + lastFrame.duration,
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
		
			comp.set(

				timeStart + comp.beat * i * durationPerCharacter,
				durationPerCharacter,
				function(){ keyElement.classList.add( 'press' )},
				'Type ON: '+ cssName
			)
			if( isMajuscule ){

				const side = Math.random() >= 0.5 ? 'left' : 'right'
				comp.set(

					timeStart + comp.beat * i * durationPerCharacter,
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
				comp.set(

					timeStart + comp.beat * i * durationPerCharacter + durationPerCharacter,//  Is EXACT so can be overridden by a subsequent ON command!
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
				durationInBeats * comp.beat :
				comp.beat * i * durationPerCharacter + durationPerCharacter * 15/16			
			
			comp.set(

				timeStart + releaseAfterDuration,
				0,
				function(){ keyElement.classList.remove( 'press' )},
				'Type OFF: '+ cssName
			)
		}
	})
}




function fuckedUp( durationInBeats ){

	if( typeof durationInBeats !== 'number' ) durationInBeats = 2/4

	const 
	fuckedUp = 'fuckedup'.split( '' ),
	durationPerCharacter = durationInBeats / fuckedUp.length 

	fuckedUp.forEach( function( letter, i ){

		comp.add(

			durationPerCharacter * i,
			function(){
		
				const key = document.querySelector( '.key-'+ letter.toUpperCase() )
				if( key.classList.contains( 'press' )){

					key.classList.remove( 'press' )
				}
				else key.classList.add( 'press' )
			},
			'Fucked up: '+ letter
		)
	})
}
function blackSwanOn(){

	comp.add( 0, function(){ keyboard.channelAdd( 'caps-lock', 'blackSwan' )}, 'caps-lock ON' )
	;[ ...new Set( 'blackswan'.split( '' ))]
	.forEach( function( letter, i ){

		comp.add(

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

		comp.add(
		
			0.2,	
			function(){
		
				const key = document.querySelector( '.key-'+ letter.toUpperCase() )
				key.classList.remove( 'black' )

			},
			'Black OFF: '+ letter
		)
	})
	comp.add( 0, function(){ keyboard.channelRemove( 'caps-lock', 'blackSwan' )}, 'caps-lock OFF' )
}




function blowApart(){


	//  For consistency -- 
	//  we need to determine these values AT LOAD TIME
	//  so onSeek we don’t create new values every single seek!!!

	Array
	.from( document.querySelectorAll( '.key' ))
	.forEach( function( element ){

		const
		tx = Math.random() * 60,
		ty = Math.random() * 60,
		tz = Math.random() * 60,
		translate = `translate3d( ${tx}px, ${ty}px, ${tz}px )`,
		rx = Math.random(),
		ry = Math.random(),
		rz = Math.random(),
		rotate = `rotate3d( ${rx}, ${ry}, ${rz}, 180deg )`,
		transform = translate +' '+ rotate

		// console.log( transform )
		element.style.transform = transform
	})
}




