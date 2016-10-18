/**
 * Dependencies
 */

var pheromone = require('pheromone')
var exploration = require('exploration')


/**
 *
 * ρ
 */

module.exports = function(ants) {
  var length = ants.length - 1
  //var pheromones = init(length)
  var τ = 1
  // step
  return function(cb) {
    ants.map((ant, idx) => {
      var tour = 0
      var transition = exploration(ants, pheromones, idx, beta)
      while(length--) {
        let id = transition(function(start, end, pheromone) {
          var distance = euclidean(start, end)
          tour += distance
          return distance
        })
        tour += length
        local(idx, id)
      }
    })
    global(pheromones)
  }
}
