
//  Copyright © 2020, Stewart Smith. See LICENSE for details.




comp.audio.src = 'media/blackswan.m4a'
// comp.audio.playbackRate = 0.5
comp.bpm  = 101
comp.beat = 60 / comp.bpm





window.addEventListener( 'DOMContentLoaded', function(){

	reset()	




	//  SILENCE

	//  Duration:   1 beat
	//  Beat range: 0 – 1
	//  Time range: 0:00 – 0:01

	insert( 0, 0, reset, 'Reset!' )
	append( 0.9 )




	//  INSTRUMENTAL INTRO
	
	//  Duration    40 beats
	//  Beat range  1 – 40
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
	
	//  Duration    47.5 beats  ←── wtf?!
	//  Beat range  41 – 88
	//  Time range  0:24 – 0:52

	type(     6, `What will grow crooked, you can't make straight` )
	append(   0.75 )
	type(     4.5, `It's the price that you gotta pay` )
	append(   0.5 )
	riff(     4 )
	type(     5.75, `Do yourself a favour and pack your bags` )
	riffHalf( 2 )
	type(     4, `Buy a ticket and get on the train` )
	riff(     4 )
	type(     3, `Buy a ticket and get on the` )
	append(   0, function(){ keyboard.classList.add( 'long-sustain' )})
	train(    5 )
	append(   0, function(){ keyboard.classList.remove( 'long-sustain' )})
	riff(     4 )
	riff(     4 )




	//  FIRST CHORUS
	
	//  Duration    27.75 beats  ←── wtf?!?!?!?!
	//  Beat range  
	//  Time range  0:52

	append(   0, 
		
		function(){ keyboard.channelAdd( 'caps-lock' )}, 
		'Fucked up. Caps-lock ON.' 
	)
	fuckedUp( 0.5 )
	append(   2 )
	append(   0.25 )
	fuckedUp( 0.75 )
	append(   0, 
		
		function(){ keyboard.channelRemove( 'caps-lock' )}, 
		'Fucked up. Caps-lock OFF.' 
	)
	append(  1.5 )
	riff(    4 )
	riff(    4 )
	append(  0, 
		
		function(){ keyboard.channelAdd( 'caps-lock' )}, 
		'Fucked up. Caps-lock ON.' 
	)
	fuckedUp( 0.5 )
	append(   2 )
	append(   0.25 )
	fuckedUp( 0.75 )
	append(   0, 
		
		function(){ keyboard.channelRemove( 'caps-lock' )}, 
		'Fucked up. Caps-lock OFF.' 
	)
	append(  1.25 )
	riff(    4 )
	riff(    4 )




	//  SECOND VERSE

	

	append( 0, function(){ keyboard.classList.add( 'push-out' )})
	type(   6, `People get crushed like biscuit crumbs` )
	append( 1 )
	type(   4.5,  `and laid down in the bitumen` )
	riff(   4 )
	type(   6, `You have tried your best to please everyone` )
	type(   5.75, `But it just isn't happening` )
	riff(   4 )
	type(   4, `No, it just isn't` )
	append( 0, function(){ keyboard.classList.add( 'long-sustain' )})
	type(   3.5, `happening` )
	append( 0, function(){ keyboard.classList.remove( 'long-sustain' )})
	riff( 4 )
	riff( 4 )




	//  SECOND CHORUS

	//  Duration    27.75 beats  ←── wtf?!?!?!?!
	//  Beat range  
	//  Time range  ??

	append(   0, 
		
		function(){ keyboard.channelAdd( 'caps-lock' )}, 
		'Fucked up. Caps-lock ON.' 
	)
	fuckedUp( 0.5 )
	append(   2 )
	append(   0.25 )
	fuckedUp( 0.75 )
	append(   0, 
		
		function(){ keyboard.channelRemove( 'caps-lock' )}, 
		'Fucked up. Caps-lock OFF.' 
	)
	append(  1.5 )
	riff(    4 )
	riff(    4 )
	append(  0, 
		
		function(){ keyboard.channelAdd( 'caps-lock' )}, 
		'Fucked up. Caps-lock ON.' 
	)
	fuckedUp( 0.5 )
	append(   2 )
	append(   0.25 )
	fuckedUp( 0.75 )
	append(   0, 
		
		function(){ keyboard.channelRemove( 'caps-lock' )}, 
		'Fucked up. Caps-lock OFF.' 
	)
	append(  1.25 )
	riff(    4 )
	riff(    4 )






	//  we can do grid stuff. big pixel type?

	//		####  #  #   ###  #  #  ####  ###    #  #  ###
	//		###   #  #  #     ###   ###   #  #   #  #  ###
	//		#      ##    ###  #  #  ####  ###     ##   #




/// ~ 1:44

	blackSwanOn( 2/4 )
	append( 2 )
	append( 1/4 )
	blackSwanOff( 3/4 )
	append( 5/4 )
	riff( 4 )
	riff( 4 )


// ~ 2:00

	blindspot( 4 )


	append( 4 )


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

		// keyboard.classList.add( 'wtf' )
		// keyboard.classList.add( 'crazy' )
	// })

	// append( 4, function(){

	// 	document.querySelector( '.key-W' ).classList.add( 'wtf' )
	// 	document.querySelector( '.key-T' ).classList.add( 'wtf' )
	// 	document.querySelector( '.key-F' ).classList.add( 'wtf' )
	// })

	// append( 12, function(){

	// 	blowApart()
	// })



	insert( 156.7, comp.beat )



	//  Third verse.

	type( 6, 'You cannot kick-start a dead horse' )
	append( 1 )
	type( 4.5, 'You just cross yourself and walk away' )
	riff()
	type( 6, 'I don\'t care what the future holds' )
	type( 5.75, 'Cause I\'m right here, and I\'m today' )
	riff( 4 )
	type( 4, 'With your fingers you can touch' )
	append( 0, function(){

		keyboard.classList.add( 'long-sustain' )
	})
	type( 3.5, `measdfghjkl`, true )
	append( 0, function(){

		keyboard.classList.remove( 'long-sustain' )
	})
	riff( 4 )
	riff( 4 )




	//  Third chorus.

	blackSwanOn( 2/4 )
	append( 2 )
	append( 1/4 )
	blackSwanOff( 3/4 )
	append( 5/4 )
	riff( 4 )
	riff( 4 )


	append( 

		0, 
		function(){ keyboard.channelAdd( 'caps-lock' )}, 
		'Fucked up. Caps-lock ON.' 
	)
	fuckedUp( 2/4 )
	// riff()//  re-write this so can do HALF a riff (2 beats) instead of only 4!
	append( 2 )
	append( 1/4 )
	fuckedUp( 3/4 )
	append(

		0, 
		function(){ keyboard.channelRemove( 'caps-lock' )}, 
		'Fucked up. Caps-lock OFF.' 
	)
	append( 6/4 )
	riff( 4 )
	riff( 4 )
})




/*


What will grow crooked, you can't make straight
It's the price that you gotta pay
Do yourself a favour and pack your bags
Buy a ticket and get on the train
Buy a ticket and get on the train

'Cause this is fucked up, fucked up
'Cause this is fucked up, fucked up

--------

People get crushed like biscuit crumbs
And laid down in the bitumen
You have tried your best to please everyone
But it just isn't happening
No, it just isn't happening

And it's fucked up, fucked up
And this is fucked up, fucked up
This your blind spot, blind spot
It should be obvious, but it's not


----

You cannot kick-start a dead horse
You just cross yourself and walk away
I don't care what the future holds
'Cause I'm right here, and I'm today
With your fingers you can touch me


----

I am your black swan, black swan
(But I made it to the top, made it to the top)
And this is fucked up, fucked up
Be your black swan, be your black swan
(But I made it to the top, made it to the top)
And for spare parts, we're broken up
You are fucked up, fucked up
This is fucked up, fucked up
We are black swans, black swans
And for spare parts, we're broken up


*/





