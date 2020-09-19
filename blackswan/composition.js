
//  Copyright © 2020, Stewart Smith. See LICENSE for details.




comp.beatsPerMinute = 101
comp.beatsPerSecond =  60 / comp.beatsPerMinute
Object.assign( comp.audio, {

	src: 'media/thom-yorke-blackswan.m4a',
	volume: 0.2,
	playbackRate: 1//0.25
})




window.addEventListener( 'DOMContentLoaded', function(){

	reset()	




	//  SILENCE

	//  Duration:    1 beat (Now LESS than one beat?!)
	//  Beat range: -1 – 0
	//  Time range:  0:00 – 0:01

	insert( 0, 0, reset, 'Reset!' )
	// append( 0.5 )//  Definitely too fast.
	// append( 0.875 )
	append( 0.95 )
	// append( 1 )
	// append( 1.25 )//  Definitely too slow.




	//  INSTRUMENTAL INTRO
	
	//  Duration    40 beats
	//  Beat range  0 – 39
	//  Time range  0:01 – 0:24
	
	riff( 4, true )
	riff( 4, true )
	riff( 4 )
	riff( 4 )
	riff( 4 )
	riff( 4 )
	riff( 4 )
	riff( 4 )
	riff( 4 )
	riff( 4, false, false )




	//  FIRST VERSE
	
	//  Duration    48 beats
	//  Beat range  40 – 88
	//  Time range  0:24 – 0:52

	//  Felt like we shouldn’t use uppercase in this first verse
	//  as watching every key enter and exit SHIFT mode
	//  just felt too jarring for an introductory experience.

	type(   6,   `what will grow crooked, you can't make straight` )
	append( 1    )
	type(   4.5, `it's the price that you gotta pay` )
	append( 0.5  )
	riff(   4    )
	
	type(   6,   `do yourself a favour and pack your bags` )
	append( 1    )
	type(   4.5, `buy a ticket and get on the train` )
	append( 0.5  )
	riff(   3    )
	
	type(   4,   `buy a ticket and get on the` )
	changeKeyboardState( 'long-sustain', 'add' )
	train(  5    )
	changeKeyboardState( 'long-sustain', 'remove' )
	riff(   4    )
	riff(   4    )




	//  FIRST CHORUS
	
	//  Duration    32 beats
	//  Beat range  89 – 120
	//  Time range  0:52 – 1:11

	capslockOn()
	fuckedUp( 2 )
	append(   2 )
	fuckedUp( 2 )
	append(   2 )
	capslockOff()
	riff(     4 )
	riff(     4 )

	capslockOn()
	fuckedUp( 2 )
	append(   2 )
	fuckedUp( 2 )
	append(   2 )
	capslockOff()
	riff(     4 )
	riff(     4 )




	//  SECOND VERSE
	
	//  Duration    48 beats
	//  Beat range  121 – 168
	//  Time range  1:11 – 1:40

	pushOutOn()//  Redundant, but necessary because seek() only looks behind so far. 
	type(   6,   `People get crushed like biscuit crumbs` )
	append( 1    )
	type(   4.5, `and laid down in the bitumen` )
	append( 0.5  )
	riff(   4    )
	
	type(   6,   `You have tried your best to please everyone` )
	append( 1    )
	type(   4.5, `But it just isn't happening` )
	append( 0.5  )
	riff(   3    )
	
	pushOutOn()//  Redundant, but necessary because seek() only looks behind so far.
	type(   3,   `No, it just isn't` )
	Object.assign( Mode.all.happening, {

		timeStart: comp.findLastBeat(),
		durationInSeconds: comp.beatsPerSecond * 8
	})
	append( 0,    function(){ Mode.switchTo( 'happening' )})
	append( 6    )
	riff(   4    )
	riff(   4    )




	//  SECOND CHORUS

	//  Duration    32 beats
	//  Beat range  169 – 200
	//  Time range  1:40 – 1:59

	pushOutOn()//  Redundant, but necessary because seek() only looks behind so far.
	capslockOn()
	riffedUp( 8 )
	capslockOff()
	riff(     4 )
	riff(     4 )

	capslockOn()
	riffedUp( 8 )
	capslockOff()
	riff(     4 )
	riff(     4 )




	//  CHORUS EXTENDED
	//  (Blindspot and Obvious)

	//  Duration    32 beats
	//  Beat range  201 – 236
	//  Time range  1:59 – 2:18

	pushOutOn()//  Redundant, but necessary because seek() only looks behind so far.
	capslockOn()
	blindSpot( 8 )
	capslockOff()
	riff(      4 )
	riff(      4 )

	capslockOn()
	obvious(   8 )
	riff(      4 )
	capslockOff()
	riff(      4 )




	//  NO IT ISN’T

	//  Duration    32 beats
	//  Beat range  237 – 268
	//  Time range  2:18 – 2:36

//  ripple that shit?????????????

	riff( 4 )
	riff( 4 )
	riff( 4 )
	riff( 4 )
	riff( 4 )
	riff( 4 )
	riff( 4 )
	riff( 4 )




	//  THIRD VERSE
	
	//  Duration    48 beats
	//  Beat range  ?
	//  Time range  2:36 – ?


//  bring in additional keyboards????


	append( 0, function(){ 
		forEachElement( '.keyboard', ( e ) => {

			e.classList.add( 'push-out' )
		})
	})

	type(   6,   `You cannot kick-start a dead horse` )
	append( 1    )
	type(   4.5, `You just cross yourself and walk away` )
	append( 0.5  )
	riff(   4    )
	
	type(   6,   `I don't care what the future holds` )
	append( 1    )
	type(   4.5, `Cause I'm right here, and I'm today` )
	append( 0.5  )
	riff(   3    )
	
	type(   4,   `With your fingers you can touch` )
	type(   5,   `measdfghjkl`, true )
	riff(   4    )
	riff(   4    )




	//  THIRD CHORUS

	//  Duration    ??32 beats
	//  Beat range  ?
	//  Time range  ?

	// I am your black swan, black swan
	// (But I made it to the top, made it to the top)
	// And this is fucked up, fucked up
	// Be your black swan, be your black swan
	// (But I made it to the top, made it to the top)
	// And for spare parts, we're broken up
	// You are fucked up, fucked up
	// This is fucked up, fucked up
	// We are black swans, black swans
	// And for spare parts, we're broken up


	blackSwanOn( 2/4 )
	append( 2 )
	append( 1/4 )
	blackSwanOff( 3/4 )
	append( 5/4 )
	riff( 4 )
	riff( 4 )
	

	// append(  0, 
		
	// 	function(){ keyboard.channelAdd( 'caps-lock' )}, 
	// 	'Fucked up. Caps-lock ON.' 
	// )
	fuckedUp( 2 )
	append(   2 )
	fuckedUp( 2 )
	// append(   0, 
		
	// 	function(){ keyboard.channelRemove( 'caps-lock' )}, 
	// 	'Fucked up. Caps-lock OFF.' 
	// )
	append(  2 )
	riff(    4 )
	riff(    4 )

	//spareParts()


	//  EXTENDED





	//  BREAKDOWN 3:44

	// **** POP CORN !!!
	//  Keys scatter and do popcorn routine!
	//  like the keyboards lay flat and popcorn keys pop and bounce up then fall back down.









	//  FOURTH CHORUS 4:02
	//  ~ 4m

//  **********
//  should this be a slow unroll of all the generated text
//  while chorus plays?

	//  Fucked up, fucked up
	//  Fucked up, fucked up
	//  Black swans, black swans
	//  Spare parts, broken up


	//  EXIT 4:40 - 4:49




/*


Can this type ITSELF???
Ajax load whatever javascript (or HTML, CSS, etc)
and type that out super fast???


*/










	//  we can do grid stuff. big pixel type?

	//		####  #  #   ###  #  #  ####  ###    #  #  ###
	//		###   #  #  #     ###   ###   #  #   #  #  ###
	//		#      ##    ###  #  #  ####  ###     ##   #




	blackSwanOn( 2/4 )
	append( 2 )
	append( 1/4 )
	blackSwanOff( 3/4 )
	append( 5/4 )
	riff( 4 )
	riff( 4 )



	append( 32, function(){

		tasks.updates.add( ripple )
	})
	append( 0, function(){

		tasks.updates.remove( ripple )
	})


	ekg( 1 )
	append( 1 )
	ekg( 1 )
	append( 1 )
	ekg( 1 )
	append( 1 )
	ekg( 1 )

	// append( 0, function(){

	// 	Array
	// 	.from( keyboard.querySelectorAll( '[x="3"]' ))
	// 	.forEach( function( key ){

	// 		key.classList.add( 'press' )
	// 	})
	// })



	append( 4 )



	surfRider()




	// const timeStart = comp[ comp.length - 1 ].time

	// Array
	// .from( keyboard.querySelectorAll( '.key' ))
	// .forEach( function( key, i ){

	// 	insert( timeStart + i * 0.02, 0, function(){ key.classList.add( 'press' )})
	// 	insert( timeStart + 0.5 + i * 0.02, 0, function(){ key.classList.remove( 'press' )})
	// })



	// append( 8, function(){

	// 	keyboard.classList.add( 'wtf' )
	// 	keyboard.classList.add( 'crazy' )
	// })

	// append( 4, function(){

	// 	document.querySelector( '.key-W' ).classList.add( 'wtf' )
	// 	document.querySelector( '.key-T' ).classList.add( 'wtf' )
	// 	document.querySelector( '.key-F' ).classList.add( 'wtf' )
	// })

	append( 16 )
	append( 1, function(){

		//keyboard.classList.add( 'crazy' )
	})
	// append( 2, function(){

	// 	blowApart()
	// })







	//  When a viewer finishes watching the piece
	//  let’s generate a receipt of the typed bits.
	//  This includes the piece itself
	//  but ALSO the viewer’s participation :)

	comp.audio.addEventListener( 'ended', function( event ){

		console.log( 

			'\nGenerate receipt...',
			'\n\n',
			 comp.generateReceipt()
		)		
		comp.pause().seek( 0 )
	})
})







