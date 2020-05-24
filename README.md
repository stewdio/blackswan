# blackswan




THE ART

- use keyboard as tilted pixel grid for drawing to.

- 'BIG press': the .press class on a .key but modifier on .keyboard that causes keys to fly up into air. ease-out.

- re-write riff() so can do HALF a riff (2 beats) instead of always 4 beats!

- animation needs to end such that looping back to beginning is not visually distracting; so must end with keyboard reassembled and ready.

- it should actually output the text somewhere. even if just in the console. like a receipt of thex experience you can take with you. this can INCLUDE user input too.
so maybe capture key.classList.add('press') and :hover events behind a logging function.
this logging function should assess whether shift / caps / option etc is pressed and retrieve appropriate symbol by diong a querySelector on the key itself!

- maybe cannot use translate() for hover because conflicts with later crazy transformations. (is that why it blinks rapidly on mouse over??)



CONTROLS

- mouse events that use location need touch compatibility.
- SVG icons for Play, Pause, Return-to-start buttons.
- shoud #seeker always be orange? or should be full white whille progress is slightly dimmer?


FINISHING

- need FULL SCREEEN button (only the animation? or also the timeline?)
- need ABOUT button / content.
- need favicons
- should visual aesthetic evolve over song to desaturate completely / go high contrast and for orange to become red and match the record's artwork??







