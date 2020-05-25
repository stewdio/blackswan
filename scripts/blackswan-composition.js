
//  Copyright © 2020, Stewart Smith. See LICENSE for details.






comp.bpm  = 101
comp.beat = 60 / comp.bpm
comp.audio.src = 'media/blackswan.m4a'




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




window.addEventListener( 'DOMContentLoaded', function(){

	reset()

	comp.set( 0, 0, reset, 'Reset!' )






	//  Intro.
	
	comp.add()
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
	comp.add( 1 )
	type( `It's the price that you gotta pay`, 4.5 )
	riff()
	type( `Do yourself a favour and pack your bags`, 6 )
	type( `Buy a ticket and get on the train`, 5.75 )
	riff()
	type( `Buy a ticket and get on the`, 4 )
	comp.add( 0, function(){

		keyboard.classList.add( 'long-sustain' )
	})
	type( `train`, 3.5, true )//  Extend the TRAAAAAAAIIIIIIINNN
	comp.add( 0, function(){

		keyboard.classList.remove( 'long-sustain' )
	})
	riff()
	riff()


	//  Chorus.

	comp.add( 

		0, 
		function(){ keyboard.channelAdd( 'caps-lock' )}, 
		'Fucked up. Caps-lock ON.' 
	)
	fuckedUp( 2/4 )
	// riff()//  re-write this so can do HALF a riff (2 beats) instead of only 4!
	comp.add( 2 )
	comp.add( 1/4 )
	fuckedUp( 3/4 )
	comp.add(

		0, 
		function(){ keyboard.channelRemove( 'caps-lock' )}, 
		'Fucked up. Caps-lock OFF.' 
	)
	comp.add( 6/4 )
	riff()
	riff()





	blackSwanOn( 2/4 )
	comp.add( 2 )
	comp.add( 1/4 )
	blackSwanOff( 3/4 )
	comp.add( 5/4 )
	riff()
	riff()



/*

	comp.add( 

		0, 
		function(){ keyboard.channelAdd( 'caps-lock' )}, 
		'Fucked up. Caps-lock ON.' 
	)
	fuckedUp( 2/4 )
	// riff()//  re-write this so can do HALF a riff (2 beats) instead of only 4!
	comp.add( 2 )
	comp.add( 1/4 )
	fuckedUp( 3/4 )
	comp.add(

		0, 
		function(){ keyboard.channelRemove( 'caps-lock' )}, 
		'Fucked up. Caps-lock OFF.' 
	)
	comp.add( 5/4 )
	riff()
	riff()
*/



	// comp.add( 1 )
	// type( 'this is normal text' )
	// type( 'THIS IS A TEST OF TYPING WITH CAPS' )
	// applyCssClass( '.key-H', 'press' )
	// applyCssClass( '.key-I', 'press' )





	comp.add( 0, function(){

		//keyboard.classList.add( 'crazy' )
		keyboard.classList.add( 'push-out' )
	})

	type( `People get crushed like biscuit crumbs`, 6 )
	comp.add( 1 )
	type( `and laid down in the bitumen`, 4.5 )
	riff()
	type( `You have tried your best to please everyone`, 6 )
	type( `But it just isn't happening`, 5.75 )
	riff()
	/*
	
	But it just isn't happening
	No, it just isn't happening
	*/







	comp.add( 1, function(){

		//keyboard.classList.add( 'wtf' )
	})

	comp.add( 4, function(){

		document.querySelector( '.key-W' ).classList.add( 'wtf' )
		document.querySelector( '.key-T' ).classList.add( 'wtf' )
		document.querySelector( '.key-F' ).classList.add( 'wtf' )
	})

	// comp.add( 12, function(){

	// 	blowApart()
	// })

	type( 'You cannot kick-start a dead horse' )
	comp.add( 1 )
	type( 'You just cross yourself and walk away' )
	comp.add( 1 )
	type( 'I don\'t care what the future holds' )
	comp.add( 1 )
	type( 'Cause I\'m right here, and I\'m today' )
	comp.add( 1 )
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





