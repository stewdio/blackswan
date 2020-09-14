
//  Copyright © 2020, Stewart Smith. See LICENSE for details.




function reset(){

	Array
	.from( document.querySelectorAll( '.keyboard' ))
	.forEach( function( keyboard ){
	
		keyboard.classList.remove( 

			'caps-lock',
			'push-out',
			'push-in',
			'long-sustain',
			'wtf',
			'crazy',
			'surf-rider'
		)
	})

	Array
	.from( document.querySelectorAll( '.key' ))
	.forEach( function( key ){

		function getRandomBetween( a, b ){

			const 
			range = b - a,
			r = Math.random() * range

			return a + r
		}

		key.classList.remove( 
		
			'press', 
			'black', 
			'wtf',
			'blank'//  A clone for “dead” but intended to be added / removed at random.
		)
		key.style.transform  = 'none'
		key.style.visibility = 'visible'
		if( !key.style.getPropertyValue( '--tx' )){
		
			key.style.setProperty( '--tx', getRandomBetween( -100, 100 ) +'px' )
			key.style.setProperty( '--ty', getRandomBetween( -100, 100 ) +'px' )
			key.style.setProperty( '--tz', getRandomBetween( -100, 100 ) +'px' )
			key.style.setProperty( '--rx', getRandomBetween( -1, 1 ))
			key.style.setProperty( '--ry', getRandomBetween( -1, 1 ))
			key.style.setProperty( '--rz', getRandomBetween( -1, 1 ))
		}
	})
}
function applyCssClass( cssQuery, className ){

	Array
	.from( document.querySelectorAll( cssQuery ))
	.forEach( function( element ){

		element.classList.add( className )
	})
}








function riff( durationInBeats, drumSolo, addLastHit, debug ){

	if( typeof durationInBeats !== 'number' ) durationInBeats = 4
	if( typeof drumSolo !== 'boolean' ) drumSolo = false
	if( typeof addLastHit !== 'boolean' ) addLastHit = true
	
	const 
	timeStart = comp.findLastBeat(),
	hit = function( durationToOccupy, cssName, durationVisible ){

		if( typeof durationVisible !== 'number' ) durationVisible = durationToOccupy
		insert(

			timeMark,
			comp.beatsPerSecond * durationToOccupy,
			function(){ keyEngage( cssName )},
			'Riff. Hit ON: '+ cssName
		)
		insert(

			timeMark + comp.beatsPerSecond * durationVisible * 15/16,
			0,
			function(){ keyDisengage( cssName )},
			'Riff. Hit OFF: '+ cssName
		)
		timeMark += comp.beatsPerSecond * durationToOccupy
	}

	let timeMark = timeStart

	hit( 2/4, ' ', 1/4 )
	hit( 2/4, ' '  )

	if( durationInBeats > 1 ){
	
		hit( 1/4, '.' )
		hit( 2/4, ' '  )
		
		if( durationInBeats > 2 ){

			hit( 2/4, 'tab'    )
			hit( 2/4, '.' )

			if( durationInBeats > 3 ){
			
				hit( 1/4, ' '  )
				hit( 1/4, '.' )
				hit( 2/4, ' '  )
			}

			if( addLastHit ) hit( 1/4, ' ', 1/8 )
			else append( 1/4 )
		}
		else append( 1/4 )
	}
	if( drumSolo !== true ){

		insert( 

			timeStart + comp.beatsPerSecond * 0/8,
			comp.beatsPerSecond * 2/8,
			function(){ keyEngage( 'option-left' )},
			'Riff. Guitar ON.'
		)
		insert( 

			timeStart + comp.beatsPerSecond * 2/8, 
			0,//comp.beatsPerSecond * 1/4,
			function(){ keyDisengage( 'option-left' )},
			'Riff. Guitar ON.'
		)
		insert( 

			timeStart + comp.beatsPerSecond * 4/8, 
			comp.beatsPerSecond * 2/8,
			function(){ keyEngage( 'option-left' )},
			'Riff. Guitar ON.'
		)
		insert(

			timeStart + comp.beatsPerSecond * 8/8,
			0,//comp.beatsPerSecond * 4/8,
			function(){ keyDisengage( 'option-left' )},
			'Riff. Guitar OFF.'
		)
	}
	if( debug ) assessDuration( timeStart, comp.findLastBeat(), 'Riff', durationInBeats )
}




function riffHalf( durationInBeats, debug ){

	if( durationInBeats !== 2 ) console.error( 'Pretty sure this needs 2 beats here.' )

	const 
	timeStart = comp.findLastBeat(),
	hit = function( durationToOccupy, cssName, durationVisible ){

		if( typeof durationVisible !== 'number' ) durationVisible = durationToOccupy
		insert(

			timeMark,
			comp.beatsPerSecond * durationToOccupy,
			function(){ 

				// const keyElement = document.querySelector( '.key-'+ cssName )
				// key.classList.add( 'press' )
				keyEngage( cssName )
				
				// if( cssName === 'space' ) comp.log( ' ' )
				// else if( cssName === 'period' ) comp.log( key.innerText )
				// else if( cssName === 'tab' ) comp.log( '	' )
				// else comp.log( cssName )
			},
			'Riff. Hit ON: '+ cssName
		)
		insert(

			timeMark + comp.beatsPerSecond * durationVisible * 15/16,
			0,
			function(){ 

				//document.querySelector( '.key-'+ cssName ).classList.remove( 'press' )
				keyDisengage( document.querySelector( '.key-'+ cssName ))
			},
			'Riff. Hit OFF: '+ cssName
		)
		timeMark += comp.beatsPerSecond * durationToOccupy
	}

	let timeMark = timeStart

	hit( 2/4, 'tab'    )
	hit( 2/4, 'period' )
	hit( 1/4, 'space'  )
	hit( 1/4, 'period' )
	hit( 2/4, 'space'  )

	if( debug ) assessDuration( timeStart, comp.findLastBeat(), 'Riff Half', durationInBeats )
}





function riffFuckedUp( durationInBeats, drumSolo, addLastHit, debug ){

	if( typeof durationInBeats !== 'number' ) durationInBeats = 4
	if( typeof drumSolo !== 'boolean' ) drumSolo = false
	if( typeof addLastHit !== 'boolean' ) addLastHit = true
	
	const 
	timeStart = comp.findLastBeat(),
	hit = function( durationToOccupy, cssName, durationVisible ){

		if( typeof durationVisible !== 'number' ) durationVisible = durationToOccupy
		insert(

			timeMark,
			comp.beatsPerSecond * durationToOccupy,
			function(){ keyEngage( cssName )},
			'Riff. Hit ON: '+ cssName
		)
		insert(

			timeMark + comp.beatsPerSecond * durationVisible * 15/16,
			0,
			function(){ keyDisengage( cssName )},
			'Riff. Hit OFF: '+ cssName
		)
		timeMark += comp.beatsPerSecond * durationToOccupy
	}

	let timeMark = timeStart

	hit( 2/4, ' ', 1/4 )
	hit( 2/4, ' '  )
	if( durationInBeats > 1 ){
	
		hit( 1/4, '.' )
		hit( 2/4, ' '  )
		if( durationInBeats > 2 ){

			hit( 2/4, 'tab'    )
			hit( 2/4, '.' )
			if( durationInBeats > 3 ){
			
				hit( 1/4, ' '  )
				hit( 1/4, '.' )
				hit( 2/4, ' '  )
				if( durationInBeats > 4 ){
			
					hit( 2/4, ' ', 1/4 )
					hit( 2/4, ' '  )
					if( durationInBeats > 5 ){

						hit( 1/4, '.' )
						hit( 2/4, ' '  )
					}
				}
			}

			if( addLastHit ) hit( 1/4, ' ', 1/8 )
			else append( 1/4 )
		}
		else append( 1/4 )
	}


	if( drumSolo !== true ){

		insert( 

			timeStart + comp.beatsPerSecond * 0/8,
			comp.beatsPerSecond * 2/8,
			function(){ keyEngage( 'option-left' )},
			'Riff. Guitar ON.'
		)
		insert( 

			timeStart + comp.beatsPerSecond * 2/8, 
			0,//comp.beatsPerSecond * 1/4,
			function(){ keyDisengage( 'option-left' )},
			'Riff. Guitar ON.'
		)
		insert( 

			timeStart + comp.beatsPerSecond * 4/8, 
			comp.beatsPerSecond * 2/8,
			function(){ keyEngage( 'option-left' )},
			'Riff. Guitar ON.'
		)
		insert(

			timeStart + comp.beatsPerSecond * 8/8,
			0,//comp.beatsPerSecond * 4/8,
			function(){ keyDisengage( 'option-left' )},
			'Riff. Guitar OFF.'
		)
	}

	const
	fuckedUp  = 'fuckedup',
	durationPerCharacter = comp.beatsPerSecond * 2 / fuckedUp.length

	fuckedUp
	.split( '' )
	.forEach( function( letter, i ){

		insert(

			timeStart + durationPerCharacter * i,
			durationPerCharacter,
			function(){ keyToggle( letter.toUpperCase() )},
			'Fucked up: '+ letter
		)
		insert(

			timeStart + comp.beatsPerSecond * 4 + durationPerCharacter * i,
			durationPerCharacter,
			function(){ keyToggle( letter.toUpperCase() )},
			'Fucked up: '+ letter
		)
	})


	if( debug ) assessDuration( timeStart, comp.findLastBeat(), 'Riff', durationInBeats )
}












function type( durationInBeats, text, holdUntilDone, debug ){

	if( typeof durationInBeats !== 'number' ) durationInBeats = 6
	text = text.replace( /\s/g, '' )
	if( typeof holdUntilDone !== 'boolean' ) holdUntilDone = false

	const 
	timeStart = comp.findLastBeat(),
	durationPerCharacter = durationInBeats / text.length

	text.split( '' ).forEach( function( character, i ){

		const 
		cssName = character.length > 1 ? character : character.toUpperCase(),
		isMajuscule = character.match( /[A-Z]/ )


		if( isMajuscule ){

			const side = Math.random() >= 0.5 ? 'left' : 'right'
			insert(

				timeStart + comp.beatsPerSecond * i * durationPerCharacter,
				0,
				function(){ keyEngage( 'shift'+ side )},
				'shift ON'
			)
			insert(

				//timeStart + comp.beatsPerSecond * i * durationPerCharacter + durationPerCharacter,//  Is EXACT so can be overridden by a subsequent ON command!
				timeStart + comp.beatsPerSecond * i * durationPerCharacter + durationPerCharacter * 1/2,
				0,
				function(){ keyDisengage( 'shift'+ side )},
				'shift OFF'
			)
		}
		insert(

			timeStart + comp.beatsPerSecond * i * durationPerCharacter,
			comp.beatsPerSecond * durationPerCharacter,
			function(){ keyEngage( cssName )},
			'Type ON: '+ cssName
		)

		const releaseAfterDuration = holdUntilDone ? 
			durationInBeats * comp.beatsPerSecond :
			comp.beatsPerSecond * i * durationPerCharacter + durationPerCharacter * 15/16
		
		insert(

			timeStart + releaseAfterDuration,
			0,
			function(){ keyDisengage( cssName )},
			'Type OFF: '+ cssName
		)
	})
	if( debug ) assessDuration( timeStart, comp.findLastBeat(), `Type (${ text })`, durationInBeats )
}








function train( durationInBeats, debug ){

	// if( durationInBeats !== 4.5 ) console.error( 'Pretty sure this needs 4.5 beats here.' )

	const timeStart = comp.findLastBeat()

	'train'.split( '' )
	.forEach( function( letter, i ){

		insert( 
			
			timeStart + i *1/4 * comp.beatsPerSecond,
			0,//1/8 * comp.beatsPerSecond,
			function(){ keyEngage( letter.toUpperCase() )},
			'Train ON: '+ letter
		)
		insert(

			timeStart + comp.beatsPerSecond * 4 + i * 1/8 * comp.beatsPerSecond,
			0,
			function(){ keyDisengage( letter.toUpperCase() )},
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
				key = document.querySelector( `[x="${ x + lines[ y ].xStart }"][y="${ y + 1 }"]` ),
				name = key.getAttribute( 'data-name' )
				timeToShow = timeStart + comp.beatsPerSecond * (

					5/4 + 
					i * xRange * 0.09 +
					x * 1/12 +
					( 2 - y ) * 0.4
				),
				timeToHide = timeToShow + comp.beatsPerSecond * 1/64

				insert(

					timeToShow,
					0,
					function(){ keyEngage( name )},
					`Train stream ON: x=${x} y=${y} i=${i}`
				)
				insert(

					timeToHide,
					0,
					function(){ keyDisengage( name )},
					`Train stream OFF: x=${x} y=${y} i=${i}`
				)
			}	
		}
	}
	if( debug ) assessDuration( timeStart, comp.findLastBeat(), 'Traaaaiiiin', durationInBeats )
}








function fuckedUp( durationInBeats, debug ){

	if( typeof durationInBeats !== 'number' ) durationInBeats = 2/4

	const 
	timeStart = comp.findLastBeat(),
	fuckedUp  = 'fuckedup',
	durationPerCharacter = durationInBeats / fuckedUp.length

	fuckedUp
	.split( '' )
	.forEach( function( letter, i ){

		append(

			durationPerCharacter,
			function(){ keyToggle( letter.toUpperCase() )},
			'Fucked up: '+ letter
		)
	})
	if( debug ) assessDuration( timeStart, comp.findLastBeat(), 'Fucked up', durationInBeats )
}





function blackSwanOn( durationInBeats, debug ){

	if( typeof durationInBeats !== 'number' ) durationInBeats = 2/4

	const 
	timeStart = comp.findLastBeat(),
	text = [ ...new Set( 'blackswan'.split( '' ))],
	durationPerCharacter = durationInBeats / text.length 

	append( 0, function(){ keyboard.channelAdd( 'caps-lock', 'blackSwan' )}, 'caps-lock ON' )
	text.forEach( function( letter, i ){

		append(

			durationPerCharacter,
			function(){
		
				const key = document.querySelector( '.key-'+ letter.toUpperCase() )
				key.classList.add( 'black' )
			},
			'Black ON: '+ letter
		)
	})
	if( debug ) assessDuration( timeStart, comp.findLastBeat(), 'Black swan ON', durationInBeats )
}
function blackSwanOff( durationInBeats, debug ){

	if( typeof durationInBeats !== 'number' ) durationInBeats = 2/4

	const 
	timeStart = comp.findLastBeat(),
	text = [ ...new Set( 'blackswan'.split( '' ))],
	durationPerCharacter = durationInBeats / text.length 

	append( 0, function(){ keyboard.channelAdd( 'caps-lock', 'blackSwan' )}, 'caps-lock ON' )
	text.forEach( function( letter, i ){

		append(

			durationPerCharacter,
			function(){
		
				const key = document.querySelector( '.key-'+ letter.toUpperCase() )
				key.classList.remove( 'black' )
			},
			'Black OFF: '+ letter
		)
	})
	append( 0, function(){ keyboard.channelRemove( 'caps-lock', 'blackSwan' )}, 'caps-lock OFF' )
	if( debug ) assessDuration( timeStart, comp.findLastBeat(), 'Black swan OFF', durationInBeats )
}




function blindspotOLD( durationInBeats, debug ){

	if( typeof durationInBeats !== 'number' ) durationInBeats = 2

	const 
	timeStart = comp.findLastBeat(),
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
				
				timeStart + comp.beatsPerSecond * x * durationPerKey,
				comp.beatsPerSecond * durationPerKey,
				function(){

					//key.classList.add( 'press' )
					keyEngage( key )
				},
				'Blindspot.'
			)
			insert(
				
				timeStart + durationInBeats + comp.beatsPerSecond * x * durationPerKey,
				0,//comp.beatsPerSecond * durationPerKey,
				function(){

					//key.classList.remove( 'press' )
					keyDisengage( key )
				},
				'Blindspot.'
			)
		}
	})
	if( debug ) assessDuration( timeStart, comp.findLastBeat(), 'Blind spot', durationInBeats )
}



function blindspot(){

	// 'blindspot'.split()
	// should keys dissolve? fall into distance? flip over to blank side?
}




function surfRider( durationInBeats ){

	const 
	timeStart = comp.findLastBeat()

	insert(

		timeStart,
		0,
		function(){
	
			keyboard.classList.add( 'surf-rider' )
		}
	)



	// assessDuration( timeStart, comp.findLastBeat(), 'Blind spot', durationInBeats )
}










function ekg( durationInBeats ){//  Jed reference.

	if( typeof durationInBeats !== 'number' ) durationInBeats = 1

	const 
	text      = ` ASDFT6YJM .;' `,
	// text      = ` ASDR5THNKL;' `,
	timeStart = comp.findLastBeat(),
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
		const key = document.querySelector( '.key-'+ cssName )
		insert(

			timeStart + i * durationPerCharacter * comp.beatsPerSecond,
			comp.beatsPerSecond * durationPerCharacter,
			function(){

				//key.classList.add( 'press' )
				keyEngage( key )
			}
		)
		insert(

			timeStart + durationInBeats / 2 + i * durationPerCharacter * comp.beatsPerSecond,
			0,// durationPerCharacter,
			function(){

				//key.classList.remove( 'press' )
				keyDisengage( key )
			}
		)
	})
	// assessDuration( timeStart, comp.findLastBeat(), 'EKG', durationInBeats )
}




//  From a default state
//  remove the labels from all keys
//  aside from the keys for B, L, A, C, K, S, W, and N.

function makePosterArt1(){

	reset()
	keyboard.classList.add( 'caps-lock' )

	const keysToRemain = 
	'BLACKSWAN'.split( '' )
	.map( function( letter ){

		return 'key-'+ letter
	})

	keyboard.querySelectorAll( '.key' )
	.forEach( function( key ){

		const found = keysToRemain.some( e => Array.from( key.classList ).includes( e ))
		if( !found ) key.classList.add( 'blank' )
	})
}


//  From a default state
//  highlight all the keys for B, L, A, C, K, S, W, and N.

function makePosterArt2(){

	reset()
	keyboard.classList.add( 'caps-lock' )

	const keysToRemain = 
	'BLACKSWAN'.split( '' )
	.map( function( letter ){

		return 'key-'+ letter
	})

	keyboard.querySelectorAll( '.key' )
	.forEach( function( key ){

		key.classList.add( 'blank' )
		const found = keysToRemain.some( e => Array.from( key.classList ).includes( e ))
		if( found ){

			//key.classList.add( 'press' )
			keyEngage( key )
		}
	})
}


//  From a default state
//  remove all keys
//  aside from the keys for B, L, A, C, K, S, W, and N.

function makePosterArt3(){

	reset()
	keyboard.classList.add( 'caps-lock' )

	const keysToRemain = 
	'BLACKSWAN'.split( '' )
	.map( function( letter ){

		return 'key-'+ letter
	})

	keyboard.querySelectorAll( '.key' )
	.forEach( function( key ){

		const found = keysToRemain.some( e => Array.from( key.classList ).includes( e ))
		if( !found ) key.style.visibility = 'hidden'
	})
}



function makePosterArt4(){

	reset()
	keyboard.classList.add( 'caps-lock' )

	const keysToRemain = 
	'BLACKSWANFUCKEDUP'.split( '' )
	.map( function( letter ){

		return 'key-'+ letter
	})

	keyboard.querySelectorAll( '.key' )
	.forEach( function( key ){

		const found = keysToRemain.some( e => Array.from( key.classList ).includes( e ))
		if( !found ) key.style.visibility = 'hidden'
	})

	const fuckedUpkeysToRemain = 
	'FUCKEDUP'.split( '' )
	.map( function( letter ){

		return 'key-'+ letter
	})

	keyboard.querySelectorAll( '.key' )
	.forEach( function( key ){

		const found = fuckedUpkeysToRemain.some( e => Array.from( key.classList ).includes( e ))
		if( found ){

			//key.classList.add( 'press' )
			keyEngage( key )
		}
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











function ripple( x, y ){

	// if( typeof x !== 'number' ) x = 0.2
	// if( typeof y !== 'number' ) y = 0.5

	if( typeof x !== 'number' ) x = Math.sin( performance.now() / 1000 )
	if( typeof y !== 'number' ) y = Math.sin( performance.now() / 100000 )


	forEachElement( '.key', function( key ){

		const distance = Math.sqrt(
			
			Math.pow( x - parseFloat( key.getAttribute( 'x-normalized' )), 2 ) +
			Math.pow( y - parseFloat( key.getAttribute( 'y-normalized' )), 2 )
		)
		//console.log( key.getAttribute( 'data-name' ), distance )

		key.style.transform = 'translate3d( 0px, 0px, '+ 
			( Math.sin( distance ) * 100 )
			+'px )'
	})
}

window.setInterval( ripple, 100 )










