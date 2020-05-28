# blackswan




THE ART

- use keyboard as tilted pixel grid for drawing to.

- radial shit? pick a point and then ripple starts from them using radius?

- debug "blindspot" fuction.

- is "blackswan" function nicer with key text visible? or better when whole key vanishes?

- animation needs to end such that looping back to beginning is not visually distracting; so must end with keyboard reassembled and ready.

- NOW WORKS: hover / click on SHIFT, OPTION, CAPS, etc should activate those things just like hitting the real buttons. EXCEPTIONS: caps-lock. does not log to the receipt generator. does this require adding "channels" to every single key?!

- RECEIPT. comp.generateReport() now outputs a receipt of the experience. Need to capture hover events as well tho. Needs more debugging too. 




CODE



CONTROLS

- SVG icons for Play, Pause, Return-to-start buttons.
- finese audio file loading experience for mobile. perhaps while loading audio file start with timeline being 0% width, then use comp.audio.addEventListener( 'progress', ... ) to fill it up all the way?
- mouse events that use location need touch compatibility.




FINISHING

- need FULL SCREEEN button (only the animation? or also the timeline?)
- need ABOUT button / content.
- need favicons
- should visual aesthetic evolve over song to desaturate completely / go high contrast and for orange to become red and match the record's artwork??







