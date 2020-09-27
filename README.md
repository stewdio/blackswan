

<img src="https://raw.githubusercontent.com/stewdio/darkwave/master/media/stewart-smith-black-swan.jpg" title="Black Swan" width="300" height="300">  


Black Swan
========================================================================
This interactive composition for **Black Swan** is a tribute to—and 
birthday present for—[Thom Yorke](https://en.wikipedia.org/wiki/Thom_Yorke) 
and [Stanley Donwood](https://en.wikipedia.org/wiki/Stanley_Donwood) 
who share my birth month of October; the best month. This is also an ode
to [Web browsers](https://en.wikipedia.org/wiki/Web_browser). It was 
created by myself, [Stewart Smith](https://stewartsmith.io), in 
Brooklyn, New York during the 
[COVID-19 pandemic](https://en.wikipedia.org/wiki/COVID-19_pandemic) / 
[America’s descent into fascism](https://duckduckgo.com/?q=America%E2%80%99s+descent+into+fascism) / 
the [Anthropocene](https://en.wikipedia.org/wiki/Anthropocene) 
[climate crisis](https://en.wikipedia.org/wiki/Climate_change). 
“Fucked up”, as it were.  
  
Upon each completion of the song a list of keyboard engagements will 
be displayed under _Receipt_. This includes both the activations 
scripted for the animation as well as your own keystrokes and pointer 
interactions. You are part of the artwork. This is your personal 
receipt for this experience. It is unique and for your eyes only.
    

The music
------------------------------------------------------------------------
Released in July 2006, 
[**The Eraser**](https://en.wikipedia.org/wiki/The_Eraser) is 
[Radiohead](https://en.wikipedia.org/wiki/Radiohead) frontperson 
[Thom Yorke](https://en.wikipedia.org/wiki/Thom_Yorke)’s debut solo 
album, produced by 
[Nigel Godrich](https://en.wikipedia.org/wiki/Nigel_Godrich) and 
featuring visual artwork by 
[Stanley Donwood](https://en.wikipedia.org/wiki/Stanley_Donwood). 
**Black Swan**—the song featured here—is the fourth track from this 
record.

<img src="https://raw.githubusercontent.com/stewdio/darkwave/master/media/thom-yorke-the-eraser@768.jpg" title="Black Swan" width="300" height="300"> 
  
  
**The Eraser** is available for 
[purchase from XL Recordings](https://xlrecordings.com/buy/thomyorke-theeraser) 
in various physical and spectral formats.

[<img 
	src="https://raw.githubusercontent.com/stewdio/darkwave/master/media/various-marks.svg#XL_Recordings" 
	title="XL Recordings" 
	width="200" 
	height="200">](https://xlrecordings.com/buy/thomyorke-theeraser)

Capitalist data brokers are also standing by to exchange your 
virtualized currency for aural stimulation.


[<img 
	src="https://raw.githubusercontent.com/stewdio/darkwave/master/media/various-marks.svg#Spotify" 
	title="Spotify" 
	width="100" 
	height="100">](https://open.spotify.com/album/4QSIeDnAnGag2YZ5DjB2eB)



  
Colphon
------------------------------------------------------------------------





FINISHING
------------------------------------------------------------------------

- Need hand written section titles for “Puchase” and “Colophon” and “Receipt”

- Finish the animation.

- Clean up this READ ME.





THINGS WE MIGHT STILL USE:
------------------------------------------------------------------------


1. Background color flashes

2. ripple

3. sphere = Can we make a sphere out of the keyboard keys? And the key press fires them outward (larger radius) from the sphere?


SUCKED: Analyser node to drive the keyboaord scope







REAMAINING PARTS TO ANIMATE:
------------------------------------------------------------------------



THIRD VERSE
Are insertRiff bits too much? Should use background color flashes instead?
Background dies down to black, pulses back up to red?


BLACK SWAN
Needs a routine different from “fucked up”
Background fades to black and BLACKSWAN lights up?


SPARE PARTS
Needs a routine different from “fucked up”





3:44 – 4:03 BREAK DOWN

Needs “pop corn” routine.
This is the time to bring in multipe keyboards!!
do we glide across one to reveal the other? opacity fade in? replace first w the second by gliding across and first one vanishes behind us?
keys shoud smash and scatter and do “popcorn” routine where they kind bounce up and down? but this needs to fade out to almost no popping by the end.

Should the background slowly fade down and pulse for this shit? So popcorn .engaged is extra bright??










IN GENERAL
------------------------------------------------------------------------

- After the "meeeeee" around 3:00 can soften the landing of those letters?

- The on-release gradient is too pink. Needs to fade to amber or something. Or be bright amber and as looses brightness curve from amber hue to red hue.
maybe amber = 40˚
then tweens down to 0˚

- animation needs to end such that looping back to beginning is not visually distracting; so must end with keyboard reassembled and ready.





BAD BUGS
------------------------------------------------------------------------

- Rewrite fuckedUp to NOT use a toggle. Definitively turn ON or turn OFF. That’s what’s causing shit to stick when the seek window hits it oddly. 'F' key sometimes get engaged after doing a refresh. (Or a seek?) It is engaged by * which means the program is doing it. Seeking to around 1:23.
file:///Users/stewarsm/Documents/Github/blackswan/index.html#1:23


- When loaded on mobile from a scpeific time (say, 1:03)
pressiing play wiill starrt audio but will NOT sync the animationi!




LESSER EVILS
------------------------------------------------------------------------

- TranslateZ *is relative* so need to use calc( var( --size ) * ? ) instead of absolute pixels.


- Can we add an “obvious-release.engaged” that forces transition to none? Will that fiix the spacebar issue post “obvious” routine?

- Need a way to remove .option-lag class from keyboard elements only when all (or maybe just one if they’re all animating at the same speed?) reaches an animationend call back.
In addition to 'animationend' do wee also need 'animationcancel' or similar?

- Caps lock as a true toggle works from keyboard, yet does NOT add a capslock class to the keyboard. why? Also, may need to do a custom no-hover (just mousedown/touchstart) on the capslock key for true toggle via pointers.

- Key press borked on mobile. Looks like maybe touchstart is not writing to the channel? Or touchend / mouseup etc are interfering with each other.

- Re-confirm yet again that it is 101bpm by eye-testing strenuously ;)

- experiment w "maintain perspective" because on entire BODY is too much. main + some of #about is prob fiinie and still looks cool when scrolling. 

- Consider pushing all SVGs into index.html both for quicker load and to make it possible to run from file:/// again.















Kicking the tires
------------------------------------------------------------------------

What’s the current state of the playback queue?  
```javascript
console.log( ...comp.inspect() )

```
How can I see the composition’s entire playback queue?  
```javascript
console.log( ...comp.inspectAll() )

```
  
How can I be sure that the amount of time a queue method is taking up 
is equal to the amount of time I have intended for it to take up?
```javascript
riffHalf( 2, true )
riffHalf( 4, true )

```



  
  
  