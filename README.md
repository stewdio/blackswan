# blackswan




THE ART

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

- RECEIPT. comp.generateReport() now outputs a receipt of the experience. Need to capture hover events as well tho. Needs more debugging too. auto downloads as text file when song ends?




VISUAL




CODE

- Button hover / tap on mobile. Looks like OPTION key etc are not engaging w touch?
- Re-confirm yet again that it is 101bpm by eye-testing strenuously ;)




CONTROLS
- should render loop update a URL hash for jumping to that exact spot?
history.replaceState(undefined, undefined, "#hash_value")
history.replaceState({page: 3}, "title 3", "?page=3")
https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_replaceState().C2.A0method


- finese audio file loading experience for mobile. perhaps while loading audio file start with timeline being 0% width, then use comp.audio.addEventListener( 'progress', ... ) to fill it up all the way?
- mouse events that use location need touch compatibility.
function onTouchMove( event ) {

					var x, y;

					if ( event.changedTouches ) {

						x = event.changedTouches[ 0 ].pageX;
						y = event.changedTouches[ 0 ].pageY;

					} else {

						x = event.clientX;
						y = event.clientY;

					}

					mouse.x = ( x / window.innerWidth ) * 2 - 1;
					mouse.y = - ( y / window.innerHeight ) * 2 + 1;

					checkIntersection();

				}



FINISHING

- finish ERASE content.
- need ABOUT content.
- need favicons.
- need site preview image / poster image.






