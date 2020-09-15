
//  Copyright © 2016–2018, 2020 Stewart Smith. See LICENSE for details.




    ///////////////
   //           //
  //   Tasks   //
 //           //
///////////////


const TaskList = function(){

	function isValid( x ){

		return typeof x === 'function'
	}
	let isPaused = false
	this.find = function( x ){

		if( typeof x === 'number' ){

			x %= this.length
			if( x < 0 ) x = this.length + x
			return this[ x ]
		}
		if( isValid( x )){

			const index = this.indexOf( x )
			if( index >= 0 ) return index
		}
		return undefined
	}
	this.add = function( taskToAdd ){

		if( isValid( taskToAdd )){

			this.push( taskToAdd )
			return this
		}
		return false
	}
	this.remove = function( taskToFind ){

		const index = this.find( taskToFind )
		if( index !== undefined ){

			this.splice( index, 1 )
			return this
		}
		return false
	}
	this.clear = function(){

		this.splice( 0, this.length )
		return this
	}
	this.after = function( taskToFind ){

		const index = this.find( taskToFind )
		if( index !== undefined ){

			this.splice( index, 0, this.pop() )
			return this
		}
		return false
	}
	this.before = function( taskToFind ){

		const index = this.find( taskToFind )
		if( index !== undefined ){

			this.splice( index - 1, 0, this.pop() )
			return this
		}
		return false
	}
	this.run = function( t ){

		if( isPaused === false ){
		
			this.forEach( function( task ){

				if( isValid( task )) task( t )
			})
		}
		return this
	}
	this.pause = function(){

		isPaused = true
		return this
	}
	this.play = function(){

		isPaused = false
		return true
	}
	this.inspect = function(){

		console.log( this.reduce( function( a, e, i ){

			return a +'\n////////////  TASK '+ i +'  ////////////\n'+ e.toString() +'\n'
		
		}, '' ))
		return this
	}
}
TaskList.prototype = Object.create( Array.prototype )
TaskList.prototype.constructor = Array.prototype


TaskList.test = function(){ 

	const
	a = function(){ console.log( 'A' )},
	b = function(){ console.log( 'B' )},
	c = function(){ console.log( 'C' )},
	tasks = new TaskList()


	//  Will output B, A, C.

	tasks
		.add( a )
		.add( b ).before( a )
		.add( c )
		.run()


	//  Will output 2.

	console.log( tasks.find( c ))


	//  Will output “function(){ console.log( 'C' )}”.

	console.log( tasks.find( 2 ))


	//  Will output 2.

	console.log( tasks.find( tasks.find( 2 )))


	//  Will output “function(){ console.log( 'C' )}”.

	console.log( tasks.find( tasks.find( c )))


	//  Will output “function(){ console.log( 'C' )}” four times.

	console.log(
	
		tasks.find( -1 ),
		tasks.find(  2 ),
		tasks.find(  5 ),
		tasks.find( -7 )
	)
}




/*  PRACTICAL USAGE:


const setupTasks = new TaskList()
document.addEventListener( 'DOMContentLoaded', function(){

	setupTasks.run().clear()
	update()
})


const updateTasks = new TaskList()
function update(){

	updateTasks.run()
	render()
}


*/




// export default TaskList