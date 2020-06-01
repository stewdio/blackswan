# blackswan




THE ART

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




VISUAL

- remove the inset shadow on on .key DIVs and instead use a very thin outset dark shadow that can't be seen when in normal mode.  (the main reason now for thiis shadow is for when keys overlap in crazy mode.)
ACTUALLY: maybe need to just have inset shadow in "crazy" mode for when keys really intersect w each other so even near their centers there is visual indication of difference.
- why does "f" key seem to have waaaay offset line halo when in crazy mmode?



CODE

- Button hover / tap on mobile. Looks like OPTION key etc are not engaging w touch?
- Re-confirm yet again that it is 101bpm by eye-testing strenuously ;)




CONTROLS
- should render loop update a URL hash for jumping to that exact spot?
- SVG icons for Play, Pause, Return-to-start buttons.
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

- need ABOUT button / content.
- need favicons
- should visual aesthetic evolve over song to desaturate completely / go high contrast and for orange to become red and match the record's artwork??







