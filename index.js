/**
 * Dependencies
 */

var update = require('pheromone')
var exploitation = require('exploitation')
var distance = require('euclidean')


/**
 * Ant Colony System.
 *
 * Examples
 *
 *
 * @return {Function}
 * @api public
 */

module.exports = function(ants, τ = 1, ρ = 0.1, α = 0.1) {
  var pheromones = []
  return function(cb) {
    var {best, length} = step(ants, pheromones, τ, ρ, cb)
    // global update
    best.reduce((r, s) => {
      update(pheromones[r][s], 1 / length, α)
    })
    return best
  }
}


/**
 * Ant Colony System step.
 *
 * A step is when all ants finished a tour.
 *
 * @param {Array} ants
 * @param {Array} pheromones
 * @param {Number} delta
 * @param {Number} ρ (local decay)
 * @param {Function} cb (optional)
 * @return {Object}
 * @api private
 */

function step(ants, pheromones, delta, ρ, cb) {
  var best = []
  var length = 0
  var j = ants.length - 1
  ants.map((k, r) => {
    var visited = []
    visited.push(r)
    var tour = 0
    var transition = exploitation(r, ants)
    while(j--) {
      let s = transition(pheromones, cb)
      visited.push(s)
      tour += distance(ants[r], ants[s])
      // local update
      update(pheromones[r][s], delta, ρ)
    }
    if(tour > length) {
      best = visited
      length = tour
    }
  })
  return {best, length}
}
