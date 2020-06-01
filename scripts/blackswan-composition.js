
//  Copyright © 2020, Stewart Smith. See LICENSE for details.




comp.audio.src = 'media/blackswan.m4a'
// comp.audio.playbackRate = 0.5
comp.bpm  = 101
comp.beat = 60 / comp.bpm





window.addEventListener( 'DOMContentLoaded', function(){

	reset()	




	//  SILENCE

	//  Duration:    1 beat
	//  Beat range: -1 – 0
	//  Time range:  0:00 – 0:01

	insert( 0, 0, reset, 'Reset!' )
	append( 0.9 )




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

	type(   6,   `What will grow crooked, you can't make straight` )
	append( 1    )
	type(   4.5, `It's the price that you gotta pay` )
	append( 0.5  )
	riff(   4    )
	
	type(   6,   `Do yourself a favour and pack your bags` )
	append( 1    )
	type(   4.5, `Buy a ticket and get on the train` )
	append( 0.5  )
	riff(   3    )
	
	type(   4,   `Buy a ticket and get on the` )
	append( 0,    function(){ keyboard.classList.add( 'long-sustain' )})
	train(  5    )
	append( 0,    function(){ keyboard.classList.remove( 'long-sustain' )})
	riff(   4    )
	riff(   4    )




	//  FIRST CHORUS
	
	//  Duration    32 beats
	//  Beat range  89 – 120
	//  Time range  0:52 – 1:11

	append(   0, function(){ keyboard.channelAdd( 'caps-lock' )}, 'Fucked up. Caps-lock ON.' )
	fuckedUp( 2 )
	append(   2 )
	fuckedUp( 2 )
	append(   2 )
	append(   0, function(){ keyboard.channelRemove( 'caps-lock' )}, 'Fucked up. Caps-lock OFF.' )
	riff(     4 )
	riff(     4 )

	append(   0, function(){ keyboard.channelAdd( 'caps-lock' )}, 'Fucked up. Caps-lock ON.' )
	fuckedUp( 2 )
	append(   2 )
	fuckedUp( 2 )
	append(   2 )
	append(   0, function(){ keyboard.channelRemove( 'caps-lock' )}, 'Fucked up. Caps-lock OFF.' )
	riff(     4 )
	riff(     4 )




	//  SECOND VERSE
	
	//  Duration    48 beats
	//  Beat range  121 – 168
	//  Time range  1:11 – 1:40

	append( 0, function(){ keyboard.classList.add( 'push-out' )})

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
	
	type(   4,   `No, it just isn't` )
	append( 0,    function(){ keyboard.classList.add( 'long-sustain' )})
	type(   5,   `happening`, true )
	append( 0,    function(){ keyboard.classList.remove( 'long-sustain' )})
	riff(   4    )
	riff(   4    )




	//  SECOND CHORUS

	//  Duration    32 beats
	//  Beat range  169 – 200
	//  Time range  1:40 – 1:59

	append(   0, function(){ keyboard.channelAdd( 'caps-lock' )}, 'Fucked up. Caps-lock ON.' )
	fuckedUp( 2 )
	append(   2 )
	fuckedUp( 2 )
	append(   2 )
	append(   0, function(){ keyboard.channelRemove( 'caps-lock' )}, 'Fucked up. Caps-lock OFF.' )
	riff(     4 )
	riff(     4 )
	
	append(   0, function(){ keyboard.channelAdd( 'caps-lock' )}, 'Fucked up. Caps-lock ON.' )
	fuckedUp( 2 )
	append(   2 )
	fuckedUp( 2 )
	append(   2 )
	append(   0, function(){ keyboard.channelRemove( 'caps-lock' )}, 'Fucked up. Caps-lock OFF.' )
	riff(     4 )
	riff(     4 )




	//  CHORUS EXTENDED

	//  Duration    ? beats
	//  Beat range  201 – ?
	//  Time range  1:59 – ?


	blindspot( 4 )
	append( 6 )
	//obvious()




	//  we can do grid stuff. big pixel type?

	//		####  #  #   ###  #  #  ####  ###    #  #  ###
	//		###   #  #  #     ###   ###   #  #   #  #  ###
	//		#      ##    ###  #  #  ####  ###     ##   #



// 2:17 no it isn’t


/// ~ 1:44

	blackSwanOn( 2/4 )
	append( 2 )
	append( 1/4 )
	blackSwanOff( 3/4 )
	append( 5/4 )
	riff( 4 )
	riff( 4 )


// ~ 2:00



// ~ 2:03

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



	// append( 1 )
	// type( 'this is normal text' )
	// type( 'THIS IS A TEST OF TYPING WITH CAPS' )
	// applyCssClass( '.key-H', 'press' )
	// applyCssClass( '.key-I', 'press' )


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

		keyboard.classList.add( 'crazy' )
	})
	// append( 2, function(){

	// 	blowApart()
	// })



	insert( 156.7, comp.beat )






	//  THIRD VERSE
	
	//  Duration    48 beats
	//  Beat range  ?
	//  Time range  2:36 – ?


	append( 0, function(){ keyboard.classList.add( 'push-out' )})

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
	append( 0,    function(){ keyboard.classList.add( 'long-sustain' )})
	type(   5,   `measdfghjkl`, true )
	append( 0,    function(){ keyboard.classList.remove( 'long-sustain' )})
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
	

	append(  0, 
		
		function(){ keyboard.channelAdd( 'caps-lock' )}, 
		'Fucked up. Caps-lock ON.' 
	)
	fuckedUp( 2 )
	append(   2 )
	fuckedUp( 2 )
	append(   0, 
		
		function(){ keyboard.channelRemove( 'caps-lock' )}, 
		'Fucked up. Caps-lock OFF.' 
	)
	append(  2 )
	riff(    4 )
	riff(    4 )

	//spareParts()


	//  EXTENDED

	//  BREAKDOWN

	//  FOURTH CHORUS
	//  ~ 4m


	//  EXIT


})







