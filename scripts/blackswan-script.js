
//  Copyright © 2020, Stewart Smith. See LICENSE for details.






script.bpm   = 101
script.beat  = 60 / script.bpm
script.endAt = 4 * 60 + 50
// script.playbackSpeed = 0.25



const audioElement = new Audio( 'media/blackswan.m4a' )
audioElement.pause()
audioElement.playbackRate = script.playbackSpeed
audioElement.volume = 0.4



function reset(){

	// audioElement.play()
	keyboard.reset()
	keyboard.classList.remove( 'wtf' )

	Array
	.from( document.querySelectorAll( '.key' ))
	.forEach( function( element ){

		element.classList.remove( 'press', 'black', 'wtf' )
	})
}
function applyCssClass( cssQuery, className ){

	Array
	.from( document.querySelectorAll( cssQuery ))
	.forEach( function( element ){

		element.classList.add( className )
	})
}




window.addEventListener( 'DOMContentLoaded', function(){

	script.set( 0, 0, reset, 'Reset!' )


	//  Intro.
	
	script.add()
	riff( true )
	riff( true )
	riff()
	riff()
	riff()
	riff()
	riff()
	riff()
	riff()
	riff( false, false )


	//  First verse.

	type( `What will grow crooked, you can't make straight`, 6 )
	script.add( 1 )
	type( `It's the price that you gotta pay`, 5 )
	riff()
	type( `Do yourself a favour and pack your bags`, 6 )
	type( `Buy a ticket and get on the train`, 5 )
	riff()
	type( `Buy a ticket and get on the`, 4 )
	type( `train`, 4, true )//  Extend the TRAAAAAAAIIIIIIINNN
	riff()
	riff()


	//  Chorus.

	script.add( 

		0, 
		function(){ keyboard.channelAdd( 'caps-lock' )}, 
		'Fucked up. Caps-lock ON.' 
	)
	fuckedUp( 2/4 )
	// riff()//  re-write this so can do HALF a riff (2 beats) instead of only 4!
	script.add( 2 )
	script.add( 1/4 )
	fuckedUp( 3/4 )
	script.add(

		0, 
		function(){ keyboard.channelRemove( 'caps-lock' )}, 
		'Fucked up. Caps-lock OFF.' 
	)
	script.add( 5/4 )
	riff()
	riff()





	script.add( 

		0, 
		function(){ keyboard.channelAdd( 'caps-lock' )}, 
		'Fucked up. Caps-lock ON.' 
	)
	fuckedUp( 2/4 )
	// riff()//  re-write this so can do HALF a riff (2 beats) instead of only 4!
	script.add( 2 )
	script.add( 1/4 )
	fuckedUp( 3/4 )
	script.add(

		0, 
		function(){ keyboard.channelRemove( 'caps-lock' )}, 
		'Fucked up. Caps-lock OFF.' 
	)
	script.add( 5/4 )
	riff()
	riff()




	// script.add( 1 )
	// type( 'this is normal text' )
	// type( 'THIS IS A TEST OF TYPING WITH CAPS' )
	// applyCssClass( '.key-H', 'press' )
	// applyCssClass( '.key-I', 'press' )







	script.add( 1 )
	blackSwanOn()
	script.add( 1 )
	blackSwanOff()

	script.add( 1 )
	type( 'People get crushed like biscuit crumbs' )


	script.add( 1, function(){

		keyboard.classList.add( 'wtf' )
	})

	script.add( 1, function(){

		document.querySelector( '.key-W' ).classList.add( 'wtf' )
		document.querySelector( '.key-T' ).classList.add( 'wtf' )
		document.querySelector( '.key-F' ).classList.add( 'wtf' )
	})



	type( 'People get crushed like biscuit crumbs' )
	script.add( 1 )
	type( 'You cannot kick-start a dead horse' )
	script.add( 1 )
	type( 'You just cross yourself and walk away' )
	script.add( 1 )
	type( 'I don\'t care what the future holds' )
	script.add( 1 )
	type( 'Cause I\'m right here, and I\'m today' )
	script.add( 1 )
	type( 'With your fingers you can touch me' )
})




/*


What will grow crooked, you can't make straight
It's the price that you gotta pay
Do yourself a favour and pack your bags
Buy a ticket and get on the train
Buy a ticket and get on the train

'Cause this is fucked up, fucked up
'Cause this is fucked up, fucked up

People get crushed like biscuit crumbs
And laid down in the bitumen
You have tried your best to please everyone
But it just isn't happening
No, it just isn't happening

And it's fucked up, fucked up
And this is fucked up, fucked up
This your blind spot, blind spot
It should be obvious, but it's not

You cannot kick-start a dead horse
You just cross yourself and walk away
I don't care what the future holds
'Cause I'm right here, and I'm today
With your fingers you can touch me

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





