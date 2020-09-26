

![Blackswan](./media/stewart-smith-blackswan.jpg "Blackswan")  

Blackswan
========================================================================

A browser-based music video for Thom Yorke’s song of the same name.
Song by Thom Yorke, Nigel Godrich, et al.
Artwork inspired by Stanley Donwood.
Concept and animation by Stewart Smith.  







THINGS WE MIGHT STILL USE:
------------------------------------------------------------------------


1. Background color flashes

2. ripple

3. sphere = Can we make a sphere out of the keyboard keys? And the key press fires them outward (larger radius) from the sphere?


SUCKED: Analyser node to drive the keyboaord scope







REAMAINING PARTS TO ANIMATE:
------------------------------------------------------------------------


2:18 – 2:36  “NO IT ISN’T”

Must add more text typing.



THIRD VERSE

Needs some more background riff pizzazz.



BLACK SWAN

Needs a routine different from “fucked up”


SPARE PARTS

Needs a routine different from “fucked up”



3:44 – 4:03 BREAK DOWN

Needs “pop corn” routine.
This is the time to bring in multipe keyboards!!
do we glide across one to reveal the other? opacity fade in? replace first w the second by gliding across and first one vanishes behind us?
keys shoud smash and scatter and do “popcorn” routine where they kind bounce up and down? but this needs to fade out to almost no popping by the end. s


RECEIPT GENERATION

how? where? 

“Scroll down for more info” should appear at the end. 
Perhaps the generated receipt appears under that??? Or further down the page?????






BUGS
------------------------------------------------------------------------

- Should “blind spot” actually flip the keys instead of just turn them off? r maybe fade out / fade back in?

- The un-flip after "obvious" has lost is CSS transition. 

- The keyboard blow apart should have a full keyboard element rotation!


- After the "meeeeee" around 3:00 can soften the landing of those letters?





  

IN GENERAL
------------------------------------------------------------------------


- The on-release gradient is too pink. Needs to fade to amber or something. Or be bright amber and as looses brightness curve from amber hue to red hue.
maybe amber = 40˚
then tweens down to 0˚

- animation needs to end such that looping back to beginning is not visually distracting; so must end with keyboard reassembled and ready.




CODE
------------------------------------------------------------------------

- TranslateZ *is relative* so need to use calc( var( --size ) * ? ) instead of absolute pixels.

- Rewrite fuckedUp to NOT use a toggle. Definitively turn ON or turn OFF. That’s what’s causing shit to stick when the seek window hits it oddly. 'F' key sometimes get engaged after doing a refresh. (Or a seek?) It is engaged by * which means the program is doing it. Seeking to around 1:23.
file:///Users/stewarsm/Documents/Github/blackswan/index.html#1:23

- Can we add an “obvious-release.engaged” that forces transition to none? Will that fiix the spacebar issue post “obvious” routine?

- Need a way to remove .option-lag class from keyboard elements only when all (or maybe just one if they’re all animating at the same speed?) reaches an animationend call back.
In addition to 'animationend' do wee also need 'animationcancel' or similar?

- Caps lock as a true toggle works from keyboard, yet does NOT add a capslock class to the keyboard. why? Also, may need to do a custom no-hover (just mousedown/touchstart) on the capslock key for true toggle via pointers.

- Key press borked on mobile. Looks like maybe touchstart is not writing to the channel? Or touchend / mouseup etc are interfering with each other.

- Re-confirm yet again that it is 101bpm by eye-testing strenuously ;)

- experiment w "maintain perspective" because on entire BODY is too much. main + some of #about is prob fiinie and still looks cool when scrolling. 




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
- Pick or create a LICENSE !
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



How to: Run this from your Mac desktop
------------------------------------------------------------------------
Sadly, you cannot just drag and drop the `index.html` file onto a 
browser window to view this application from your own 
[Macintosh](https://www.apple.com/macos/) desktop. You’ll need to spin
up a server and view the application from a URL like 
[http://localhost:8000/](http://localhost:8000/) instead. But don’t 
worry—that’s easy!  

1. Open the **Terminal** application. (Just hit ⌘ + Spacebar, then type
“terminal” to search for it on your Mac. Once found, hit Enter to open 
it.)

2. Type `cd `&nbsp;(yes, with that space after it), then drag and drop this
whole code package folder that you’ve downloaded onto the **Terminal** 
window—it will fill in the folder’s full path address for you. 
(You’ll see something like `cd ~/YourName/Downloads/cornell-torus/`.) 
Now hit Enter to tell **Terminal** it must `c`hange `d`irectories to 
that folder.

3. Paste this into **Terminal**, then hit Enter: 
`python -m SimpleHTTPServer 8000`. You are now running a web server on 
port `8000`. (You could instead use a different number to listen on a 
different port. This is handy if you need many servers running at once;
each will need to listen to a different port.)

4. Now you can visit this website at 
[http://localhost:8000](http://localhost:8000) and everything should be 
fine 👍  

When you’re ready to shut down the server, go back to **Terminal**  and
tap Control + C. That’s all!  
  
For more information on running a barebones local server, (including 
Python 3 commands) see Mozilla’s
[Set up a local testing server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server)
article.  
  
  
  