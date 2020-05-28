
//  Copyright © 2020, Stewart Smith. See LICENSE for details.




function reset(){

	function getRandomBetween( a, b ){

		const 
		range = b - a,
		r = Math.random() * range

		return a + r
	}

	keyboard.reset()
	keyboard.classList.remove( 

		'caps-lock',
		'push-out',
		'long-sustain',
		'wtf'
	)

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








function riff( durationInBeats, drumSolo, addLastHit ){

	if( typeof durationInBeats !== 'number' ) dudurationInBeats = 4
	if( typeof drumSolo !== 'boolean' ) drumSolo = false
	if( typeof addLastHit !== 'boolean' ) addLastHit = true
	
	const 
	timeStart = findLastBeat(),
	hit = function( durationToOccupy, cssName, durationVisible ){

		if( typeof durationVisible !== 'number' ) durationVisible = durationToOccupy
		insert(

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
		insert(

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

	if( durationInBeats > 1 ){
	
		hit( 1/4, 'period' )
		hit( 2/4, 'space'  )
		
		if( durationInBeats > 2 ){

			hit( 2/4, 'tab'    )
			hit( 2/4, 'period' )

			if( durationInBeats > 3 ){
			
				hit( 1/4, 'space'  )
				hit( 1/4, 'period' )
				hit( 2/4, 'space'  )
			}

			if( addLastHit ) hit( 1/4, 'space', 1/8 )
			else append( 1/4 )
		}
		else append( 1/4 )
	}


	if( drumSolo !== true ){

		const optionKey = keyboard.querySelector( '.key-option-left' )
		insert( 

			timeStart + comp.beat * 0/8,
			comp.beat * 2/8,
			function(){ 

				optionKey.classList.add( 'press' )
				keyboard.classList.add( 'option' )
			},
			'Riff. Guitar ON.'
		)
		insert( 

			timeStart + comp.beat * 2/8, 
			comp.beat * 1/4,
			function(){ 

				optionKey.classList.remove( 'press' )
				keyboard.classList.remove( 'option' )
			},
			'Riff. Guitar ON.'
		)
		insert( 

			timeStart + comp.beat * 4/8, 
			comp.beat * 2/8,
			function(){ 
				
				optionKey.classList.add( 'press' )
				keyboard.classList.add( 'option' )
			},
			'Riff. Guitar ON.'
		)
		insert(

			timeStart + comp.beat * 8/8,
			comp.beat * 2/8,
			function(){ 

				optionKey.classList.remove( 'press' )
				keyboard.classList.remove( 'option' )
			},
			'Riff. Guitar OFF.'
		)
	}
}
function riffHalf( durationInBeats ){

	if( durationInBeats !== 2 ) console.error( 'Pretty sure this needs 2 beats here.' )

	const 
	timeStart = findLastBeat(),
	hit = function( durationToOccupy, cssName, durationVisible ){

		if( typeof durationVisible !== 'number' ) durationVisible = durationToOccupy
		insert(

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
		insert(

			timeMark + comp.beat * durationVisible * 15/16,
			0,
			function(){ document.querySelector( '.key-'+ cssName ).classList.remove( 'press' )},
			'Riff. Hit OFF: '+ cssName
		)
		timeMark += comp.beat * durationToOccupy
	}

	let timeMark = timeStart

	hit( 2/4, 'tab'    )
	hit( 2/4, 'period' )
	hit( 1/4, 'space'  )
	hit( 1/4, 'period' )
	hit( 2/4, 'space'  )
}








const characterToName = {

	' ': 'space',
	'.': 'period',
	',': 'comma',
	"'": 'quote'
}
function type( durationInBeats, text, holdUntilDone ){

	if( typeof durationInBeats !== 'number' ) durationInBeats = 5
	text = text.replace( /\s/g, '' )
	if( typeof holdUntilDone !== 'boolean' ) holdUntilDone = false

	const 
	timeStart = findLastBeat(),
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
				insert(

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
				insert(

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
			insert(

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
			
			insert(

				timeStart + releaseAfterDuration,
				0,
				function(){ keyElement.classList.remove( 'press' )},
				'Type OFF: '+ cssName
			)
		}
	})
}








function train( durationInBeats ){

	// if( durationInBeats !== 4.5 ) console.error( 'Pretty sure this needs 4.5 beats here.' )

	const timeStart = findLastBeat()

	'train'.split( '' )
	.forEach( function( letter, i ){

		const key = keyboard.querySelector( '.key-'+ letter.toUpperCase() )
		insert( 
			
			timeStart + i * 1/8 * comp.beat,
			0,//1/8 * comp.beat,
			function(){ key.classList.add( 'press' )},
			'Train ON: '+ letter
		)
		insert(

			timeStart + comp.beat * 4 + i * 1/8 * comp.beat,
			0,
			function(){ key.classList.remove( 'press' )},
			'Train OFF: '+ letter
		)
	})
	append( durationInBeats )


	const lines = [

		{ xStart: 6, xEnd: 13 },
		{ xStart: 2, xEnd: 12 },
		{ xStart: 7, xEnd: 11 }
	]
	for( let y = 0; y < 3; y ++ ){

		const 
		xRange = lines[ y ].xEnd - lines[ y ].xStart + 1,
		strikes = 3// could be based on xRange instead?
		
		for( let i = 0; i < strikes; i ++ ){

			for( let x = 0; x < xRange; x ++ ){

				const 
				key = keyboard.querySelector( `[x="${ x + lines[ y ].xStart }"][y="${ y + 1 }"]` ),
				timeToShow = timeStart + comp.beat * (

					5/4 + 
					i * xRange * 0.09 +
					x * 1/12 +
					( 2 - y ) * 0.4
				),
				timeToHide = timeToShow + comp.beat * 1/64

				insert(

					timeToShow,
					0,
					function(){ key.classList.add( 'press' )},
					`Train stream ON: x=${x} y=${y} i=${i}`
				)
				insert(

					timeToHide,
					0,
					function(){ key.classList.remove( 'press' )},
					`Train stream OFF: x=${x} y=${y} i=${i}`
				)
			}	
		}
	}






// Y x=6 y=1
// S x=2 y=2
// M x=7 y=3



	/*

    TyuIop[]\
Asdfghjkl;'RETURN
      Nm,./SHIFT



	*/

}








function fuckedUp( durationInBeats ){

	if( typeof durationInBeats !== 'number' ) durationInBeats = 2/4

	const 
	fuckedUp = 'fuckedup'.split( '' ),
	durationPerCharacter = durationInBeats / fuckedUp.length 

	fuckedUp.forEach( function( letter, i ){

		append(

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

	append( 0, function(){ keyboard.channelAdd( 'caps-lock', 'blackSwan' )}, 'caps-lock ON' )
	text.forEach( function( letter, i ){

		append(

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

	append( 0, function(){ keyboard.channelAdd( 'caps-lock', 'blackSwan' )}, 'caps-lock ON' )
	text.forEach( function( letter, i ){

		append(

			durationPerCharacter * i,
			function(){
		
				const key = document.querySelector( '.key-'+ letter.toUpperCase() )
				key.classList.remove( 'black' )
			},
			'Black OFF: '+ letter
		)
	})
	append( 0, function(){ keyboard.channelRemove( 'caps-lock', 'blackSwan' )}, 'caps-lock OFF' )
}




function blindspot( durationInBeats ){

	if( typeof durationInBeats !== 'number' ) durationInBeats = 2

	const 
	timeStart = findLastBeat(),
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

			insert(
				
				timeStart + comp.beat * x * durationPerKey,
				durationPerKey,
				function(){

					key.classList.add( 'press' )
				},
				'Blindspot.'
			)
			insert(
				
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

	const 
	text      = ` ASDFT6YJM .;' `,
	// text      = ` ASDR5THNKL;' `,
	timeStart = findLastBeat(),
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
		insert(

			timeStart + i * durationPerCharacter * comp.beat,
			durationPerCharacter,
			function(){

				key.classList.add( 'press' )
			}
		)
		insert(

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




