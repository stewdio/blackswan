# blackswan



- maybe use audioElement.currentTime to drive the timing instead of performance.now???

- mouse events that use location need touch compatibility.

- rewrite "blackswan" routine to use duration.

- re-write riff() so can do HALF a riff (2 beats) instead of always 4 beats!


- PLAY button needs to slowly pulse orange when isPlaying === false
then NOT be orange when playing (to be less distracting while animation is rolling.)
make SVG play icon / pause icon. switch between when toggled. 
shoud #seeker always be orange? or should be full white whille progress is slightly dimmer?

- Arrow buttons. use SVG icons instead?

- Buttons for Delete, Tab, Return, Shift, Caps, Control Option, Command... add icons??
or better to leave blank / labels only as-is?
remove labels alltogether for ghost keys?? (makes it less OS specific.)
TESTING NOW. seems nicer when these keys are totally blank.

- add transtion CSS to #progress and #seeker so that shit is smooooooove.
actually this requires deeper investigation...

- it should actually output the text somewhere. even if just in the console. like a receipt of thex experience you can take with you. this can INCLUDE user input too.
so maybe capture key.classList.add('press') and :hover events behind a logging function.
this logging function should assess whether shift / caps / option etc is pressed and retrieve appropriate symbol by diong a querySelector on the key itself!





