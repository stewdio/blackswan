/*


some say
bpm = 101

others say
bpm = 102


60 seconds = 102 beats

1 second = 1.7 beats

0.5882352941 seconds = 1 beat



*/



script.beat = 0.5882352941//  What fraction of a second does a beat last for?


window.addEventListener( 'DOMContentLoaded', function(){



	script.set( 0, function(){

		keyboard.switchToMode( 'default' )
		
		Array
		.from( document.querySelectorAll( '.key' ))
		.forEach( function( element ){

			element.classList.remove( 'press', 'black', 'wtf' )
		})

	}, 'Reset!' )


	// script.add( 1 )
	// type( 'this is normal text' )
	// type( 'THIS IS A TEST OF TYPING WITH CAPS' )



	riff( 1, false )
	riff( script.beat / 2, true )
	riff( script.beat / 2, true )

	script.add( 0, function(){ keyboard.switchToMode( 'caps-lock' )}, 'caps-lock ON' )
	fuckedUp()
	script.add( 1 )
	fuckedUp()
	script.add( 1, function(){ keyboard.switchToMode( 'default' )}, 'caps-lock OFF' )


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











	render()
	script.play()
})


/*



What will grow crooked, you can't make straight
It's the price that you gotta pay
Do yourself a favour and pack your bags
Buy a ticket and get on the train
Buy a ticket and get on the train

[Chorus]
'Cause this is fucked up, fucked up
'Cause this is fucked up, fucked up

[Verse 2]
People get crushed like biscuit crumbs
And laid down in the bitumen
You have tried your best to please everyone
But it just isn't happening
No, it just isn't happening

[Chorus]
And it's fucked up, fucked up
And this is fucked up, fucked up
This your blind spot, blind spot
It should be obvious, but it's not

[Verse 3]
You cannot kick-start a dead horse
You just cross yourself and walk away
I don't care what the future holds
'Cause I'm right here, and I'm today
With your fingers you can touch me

[Chorus]
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