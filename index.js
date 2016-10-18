/**
 * Dependencies
 */

var pheromone = require('pheromone')


/**
 *
 * ρ
 */

module.exports = function(ants) {
  ants.map(ant => {
    transition(ant)
    //local(ant)
  })
  //global()
}


function transition() {
  
}
