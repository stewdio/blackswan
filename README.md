# blackswan




THE ART

- should period key be WHITE instead of currently blue? (wanted to give it a slightly diff flavor than the amber color cause it sticks out to me aurally.)

- "traaaaaiiin" needs some work!

- "happennnnniiiiiing" sucks.

- "blindspot" sucks.

- is "blackswan" function nicer with key text visible? or better when whole key vanishes?

- needs to get cray after second chorus; rainbow bouncing keys and shit.

- use keyboard as tilted pixel grid for drawing to.

- radial shit? pick a point and then ripple starts from them using radius?

- animation needs to end such that looping back to beginning is not visually distracting; so must end with keyboard reassembled and ready.

- NOW WORKS: hover / click on SHIFT, OPTION, CAPS, etc should activate those things just like hitting the real buttons. EXCEPTIONS: caps-lock. does not log to the receipt generator. does this require adding "channels" to every single key?!

- RECEIPT. comp.generateReport() now outputs a receipt of the experience. Need to capture hover events as well tho. Needs more debugging too. auto downloads as text file when song ends?




CODE

- Button hover / tap on mobile. Looks like OPTION key etc are not engaging w touch?




CONTROLS

- SVG icons for Play, Pause, Return-to-start buttons.
- finese audio file loading experience for mobile. perhaps while loading audio file start with timeline being 0% width, then use comp.audio.addEventListener( 'progress', ... ) to fill it up all the way?
- mouse events that use location need touch compatibility.




FINISHING

- need FULL SCREEEN button (only the animation? or also the timeline? timeline hides except on hover?)
- auto-sizing of keyboard so it fits nicely within viewport. relationship scale matters. give it thought.
- need ABOUT button / content.
- need favicons
- should visual aesthetic evolve over song to desaturate completely / go high contrast and for orange to become red and match the record's artwork??







