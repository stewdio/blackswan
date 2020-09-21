

![Blackswan](./media/stewart-smith-blackswan.jpg "Blackswan")  

Blackswan
========================================================================

A browser-based music video for Thom Yorke’s song of the same name.
Song by Thom Yorke, Nigel Godrich, et al.
Artwork inspired by Stanley Donwood.
Concept and animation by Stewart Smith.  


  

THE ART
------------------------------------------------------------------------

— Make TOUCH ME. should be an entire keyboard ripple from left to right.

- Make BLACK SWAN.

- Make SPARE PARTS.

- Make NOT IT ISN’T. 3:44 until 4:02 keys shoud smash and scatter and do “popcorn” routine where they kind bounce up and down? but this needs to fade out to almost no popping by the end. 


- The on-release gradient is too pink. Needs to fade to amber or something. Or be bright amber and as looses brightness curve from amber hue to red hue.
maybe amber = 40˚
then tweens down to 0˚

- needs to get cray after second chorus; rainbow bouncing keys and shit.

- use keyboard as tilted pixel grid for drawing to.

- radial shit? pick a point and then ripple starts from them using radius?

- animation needs to end such that looping back to beginning is not visually distracting; so must end with keyboard reassembled and ready.

- ERASE GUY scatters the keys. should red fade to white and then “eraser guy” comes in and commands all the keys to fly away, like commanding the flood waters to recede? he fails. the shit comes back.

- RECEIPT. comp.generateReceipt() now outputs a receipt of the experience. Need to capture hover events as well tho. Needs more debugging too. auto downloads as text file when song ends? Does Capslock log to receipts?

THIS SHOULD SHOW UP BEFORE THE SONG IS OVER AS AN OVERLAY DIV!!!!!!!!

- Can we make a sphere out of the keyboard keys? And the key press fires them outward (larger radius) from the sphere?





CODE
------------------------------------------------------------------------

- 'F' key sometimes get engaged after doing a refresh. (Or a seek?) It is engaged by * which means the program is doing it. Seeking to around 1:23.
file:///Users/stewarsm/Documents/Github/blackswan/index.html#1:23
Rewrite fuckedUp to NOT use a toggle. Definitively turn ON or turn OFF. That’s what’s causing shit to stick when the seek window hits it oddly. 


—Can we add an “obvious-release.engaged” that forces transition to none? Will that fiix the spacebar issue post “obvious” routine?

- Need a way to remove .option-lag class from keyboard elements only when all (or maybe just one if they’re all animating at the same speed?) reaches an animationend call back.
In addition to 'animationend' do wee also need 'animationcancel' or similar?

- Caps lock as a true toggle works from keyboard, yet does NOT add a capslock class to the keyboard. why? Also, may need to do a custom no-hover (just mousedown/touchstart) on the capslock key for true toggle via pointers.

- Key press borked on mobile. Looks like maybe touchstart is not writing to the channel? Or touchend / mouseup etc are interfering with each other.

- Re-confirm yet again that it is 101bpm by eye-testing strenuously ;)

- experiment w "maintain perspective" because on entire BODY is too much. main + some of #about is prob fiinie and still looks cool when scrolling. 

- Receipt does not seem to record Shift OFF.




CONTROLS
------------------------------------------------------------------------

- Hitting spacebar to play should also remove the load play button and enable controls.

- I hate not being able to full-screen BEFORE hitting play when freshly loaded. maybe kill the central play button.

- style the new LOAD button. pulses like regular play butto, maybe an ease-in-out slow bounce and glow?? fade out on hide(). size needs to be BIG. and maybe relative to viewport size. 

- need a progress bar or pie chart or something on new LOAD button. 

- When loaded on mobile from a scpeific time (say, 1:03)
pressiing play wiill starrt audio but will NOT sync the animationi!





FINISHING
------------------------------------------------------------------------
- need site preview image / poster image. makePosterArt() `./media/stewart-smith-blackswan.jpg`
- need favicons based on poster image.
- Consider pushing all SVGs into index.html both for quicker load and to make it possible to run from file:/// again.
- Need hand written section titles for “Puchase” and “Colophon”?





Kicking the tires
------------------------------------------------------------------------

What’s the current state of the playback queue?  
```javascript
console.log( ...comp.report() )

```
How can I see the composition’s entire playback queue?  
```javascript
console.log( ...comp.reportAll() )

```
  
How can I be sure that the amount of time a queue method is taking up 
is equal to the amount of time I have intended for it to take up?
```javascript
riffHalf( 2, true )
riffHalf( 4, true )

```



