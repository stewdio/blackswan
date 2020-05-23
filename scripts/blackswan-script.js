



script.bpm   = 101
script.beat  = 60 / script.bpm
script.endAt = 4 * 60 + 50
// script.playbackSpeed = 0.25


const audioElement = new Audio( 'media/blackswan.m4a' )
audioElement.playbackRate = script.playbackSpeed




function reset(){

	audioElement.play()
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

	script.set( 0, reset, 'Reset!' )


	//  Intro.
	
	script.add( script.beat * 7/8 )
	riff( false )
	riff( false )
	riff( true )
	riff( true )
	riff( true )
	riff( true )
	riff( true )
	riff( true )
	riff( true )
	riff( true, false )


	//  First verse.

	type( `What will grow crooked, you can't make straight` )
	type( `It's the price that you gotta pay` )
	riff( true )
	type( `Do yourself a favour and pack your bags` )
	type( `Buy a ticket and get on the train` )
	type( `Buy a ticket and get on the train` )//  EXTEND 'train'
	riff( true )
	riff( true )


	//  Chorus.

	script.add( 0, function(){ keyboard.channelAdd( 'caps-lock', 'fuckedUp' )}, 'caps-lock ON' )
	fuckedUp()
	script.add( 1 )
	fuckedUp()
	script.add( 1, function(){ keyboard.channelRemove( 'caps-lock', 'fuckedUp' )}, 'caps-lock OFF' )







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





