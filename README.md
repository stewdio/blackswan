

![Blackswan](./media/stewart-smith-blackswan.jpg "Blackswan")  

Blackswan
========================================================================

A browser-based music video for Thom Yorke’s song of the same name.
Song by Thom Yorke, Nigel Godrich, et al.
Artwork inspired by Stanley Donwood.
Concept and animation by Stewart Smith.  

  
  

THE ART
------------------------------------------------------------------------

- "traaaaaiiin" needs some work!

- "happennnnniiiiiing" sucks.

- FUUUUUUUUUCK how to not have the on-release animation play when an option’d key releases?!??!

- "blindspot" sucks.

- is "blackswan" function nicer with key text visible? or better when whole key vanishes?

- needs to get cray after second chorus; rainbow bouncing keys and shit.

- use keyboard as tilted pixel grid for drawing to.

- radial shit? pick a point and then ripple starts from them using radius?

- animation needs to end such that looping back to beginning is not visually distracting; so must end with keyboard reassembled and ready.

- ERASE GUY scatters the keys. should red fade to white and then “eraser guy” comes in and commands all the keys to fly away, like commanding the flood waters to recede? he fails. the shit comes back.

- NOW WORKS: hover / click on SHIFT, OPTION, CAPS, etc should activate those things just like hitting the real buttons. EXCEPTIONS: caps-lock. does not log to the receipt generator. does this require adding "channels" to every single key?!

- RECEIPT. comp.generateReceipt() now outputs a receipt of the experience. Need to capture hover events as well tho. Needs more debugging too. auto downloads as text file when song ends?
THIS SHOULD SHOW UP BEFORE THE SONG IS OVER AS AN OVERLAY DIV!!!!!!!!

- Can we make a sphere out of the keyboard keys? And the key press fires them outward (larger radius) from the sphere?




CODE
------------------------------------------------------------------------

- Hover for DEAD keys doesnt use HSL tween for some reason. fix!!
This is a result of the animation keyframes attached to it.
Could this be the final straw for argument that keyframe on-release animation should NOT be attached to .key but instead manually attached to .key-armed and then removed when animation completes?

- Key press borked on mobile. Looks like maybe touchstart is not writing to the channel? Or touchend / mouseup etc are interfering with each other.

- Re-confirm yet again that it is 101bpm by eye-testing strenuously ;)

- experiment w "maintain perspective" because on entire BODY is too much. main + some of #about is prob fiinie and still looks cool when scrolling. 

- Receipt does not seem to record Shift OFF.

- Receipt does not record FUCKED UP and possibly other methods....



CONTROLS
------------------------------------------------------------------------

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



