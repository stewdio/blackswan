
//  Copyright © 2020, Stewart Smith. See LICENSE for details.





function reset(){

	keyboard.reset()
	keyboard.classList.remove( 

		'caps-lock',
		'push-out',
		'long-sustain',
		'wtf'
	)

	function getRandomBetween( a, b ){

		const 
		range = b - a,
		r = Math.random() * range

		return a + r
	}


	Array
	.from( document.querySelectorAll( '.key' ))
	.forEach( function( element ){

		element.classList.remove( 'press', 'black', 'wtf' )
		element.style.transform = 'none'
		
		element.style.setProperty( '--tx', getRandomBetween( -100, 100 ) +'px' )
		element.style.setProperty( '--ty', getRandomBetween( -100, 100 ) +'px' )
		element.style.setProperty( '--tz', getRandomBetween( -100, 100 ) +'px' )

		element.style.setProperty( '--rx', getRandomBetween( -1, 1 ))
		element.style.setProperty( '--ry', getRandomBetween( -1, 1 ))
		element.style.setProperty( '--rz', getRandomBetween( -1, 1 ))
	})
}
function applyCssClass( cssQuery, className ){

	Array
	.from( document.querySelectorAll( cssQuery ))
	.forEach( function( element ){

		element.classList.add( className )
	})
}




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
			function(){ 

				const key = document.querySelector( '.key-'+ cssName )
				key.classList.add( 'press' )
				
				if( cssName === 'space' ) comp.log( ' ' )
				else if( cssName === 'period' ) comp.log( key.innerText )
				else if( cssName === 'tab' ) comp.log( '	' )
				else comp.log( cssName )
			},
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
						comp.log( 'Shift' )
					},
					'shift ON'
				)
				comp.set(

					//timeStart + comp.beat * i * durationPerCharacter + durationPerCharacter,//  Is EXACT so can be overridden by a subsequent ON command!
					timeStart + comp.beat * i * durationPerCharacter + durationPerCharacter * 1/2,
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
			comp.set(

				timeStart + comp.beat * i * durationPerCharacter,
				durationPerCharacter,
				function(){ 

					keyElement.classList.add( 'press' )
					comp.log( keyElement.innerText )
				},
				'Type ON: '+ cssName
			)

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
function blackSwanOn( durationInBeats ){

	if( typeof durationInBeats !== 'number' ) durationInBeats = 2/4

	const 
	text = [ ...new Set( 'blackswan'.split( '' ))],
	durationPerCharacter = durationInBeats / text.length 

	comp.add( 0, function(){ keyboard.channelAdd( 'caps-lock', 'blackSwan' )}, 'caps-lock ON' )
	text.forEach( function( letter, i ){

		comp.add(

			durationPerCharacter * i,
			function(){
		
				const key = document.querySelector( '.key-'+ letter.toUpperCase() )
				key.classList.add( 'black' )
			},
			'Black ON: '+ letter
		)
	})
}
function blackSwanOff( durationInBeats ){

	if( typeof durationInBeats !== 'number' ) durationInBeats = 2/4

	const 
	text = [ ...new Set( 'blackswan'.split( '' ))],
	durationPerCharacter = durationInBeats / text.length 

	comp.add( 0, function(){ keyboard.channelAdd( 'caps-lock', 'blackSwan' )}, 'caps-lock ON' )
	text.forEach( function( letter, i ){

		comp.add(

			durationPerCharacter * i,
			function(){
		
				const key = document.querySelector( '.key-'+ letter.toUpperCase() )
				key.classList.remove( 'black' )
			},
			'Black OFF: '+ letter
		)
	})
	comp.add( 0, function(){ keyboard.channelRemove( 'caps-lock', 'blackSwan' )}, 'caps-lock OFF' )
}




function blindspot( durationInBeats ){

	if( typeof durationInBeats !== 'number' ) durationInBeats = 2

	let frameIndex = comp.length - 1
	while( comp[ frameIndex ].duration === 0 && 
		frameIndex > 0 ){

		frameIndex --
	}

	const 
	lastFrame = comp[ frameIndex ],
	timeStart = lastFrame.time + lastFrame.duration,
	durationPerKey = durationInBeats / 14

	Array
	.from( document.querySelectorAll( '.key' ))
	.forEach( function( key ){

		if( key.innerText.length > 0 && 
			key.classList.contains( 'word' ) !== true &&
			key.classList.contains( 'arrow' ) !== true &&
			'blindspot'.indexOf( key.innerText ) < 0 ){

			const 
			x = +key.getAttribute( 'x' ),
			y = +key.getAttribute( 'y' )

			comp.set(
				
				timeStart + comp.beat * x * durationPerKey,
				durationPerKey,
				function(){

					key.classList.add( 'press' )
				},
				'Blindspot.'
			)
			comp.set(
				
				timeStart + durationInBeats + comp.beat * x * durationPerKey,
				durationPerKey,
				function(){

					key.classList.remove( 'press' )
				},
				'Blindspot.'
			)
		}
	})
}




function ekg( durationInBeats ){//  Jed reference.

	if( typeof durationInBeats !== 'number' ) durationInBeats = 1

	let frameIndex = comp.length - 1
	while( comp[ frameIndex ].duration === 0 && 
		frameIndex > 0 ){

		frameIndex --
	}

	const 
	text      = ` ASDFT6YJM .;' `,
	// text      = ` ASDR5THNKL;' `,
	lastFrame = comp[ frameIndex ],
	timeStart = lastFrame.time + lastFrame.duration,
	durationPerCharacter = durationInBeats / text.length

	text.split( '' ).forEach( function( character, i ){

		let cssName = character.toUpperCase()
		if( character === ' ' ){

			if( i === 0 ) cssName = 'caps-lock'
			else if( i === text.length - 1 ) cssName = 'return'
			else cssName = 'command-right'
		}
		else if( character === '.' ){

			cssName = 'period'
		}
		else if( character === ';' ){

			cssName = 'semicolon'
		}
		else if( character === "'" ){

			cssName = 'quote'
		}
		const key = keyboard.querySelector( '.key-'+ cssName )
		comp.set(

			timeStart + i * durationPerCharacter * comp.beat,
			durationPerCharacter,
			function(){

				key.classList.add( 'press' )
			}
		)
		comp.set(

			timeStart + durationInBeats / 2 + i * durationPerCharacter * comp.beat,
			durationPerCharacter,
			function(){

				key.classList.remove( 'press' )
			}
		)
	})
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




