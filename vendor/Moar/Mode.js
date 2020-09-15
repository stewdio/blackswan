
//  Copyright © 2017–2018, 2020 Stewart Smith. See LICENSE for details.




    //////////////
   //          //
  //   Mode   //
 //          //
//////////////


const Mode = function({ name, setup, update, teardown }){

	this.name = name
	this.setup = typeof setup === 'function' ? setup : false
	this.update = typeof update === 'function' ? update : false
	this.teardown = typeof teardown === 'function' ? teardown : false
	Mode.all[ name ] = this
	if( Mode.current.name === undefined ) Mode.current = this
}


Mode.all = {}
Mode.current = {}


Mode.run = function(){

	if( Mode.current && typeof Mode.current.update === 'function' ) Mode.current.update()
}
Mode.switchTo = function( nextMode ){

	if( typeof nextMode === 'string' ) nextMode = Mode.all[ nextMode ]
	if( Mode.current && typeof Mode.current.teardown === 'function' ) Mode.current.teardown()
	if( nextMode instanceof Mode ){

		Mode.current = nextMode
		if( typeof nextMode.setup === 'function' ) nextMode.setup()
	}
}




// export default Mode



