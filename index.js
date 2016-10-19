/**
 * Dependencies
 */

var update = require('pheromone')
var exploitation = require('exploitation')


/**
 * Ant Colony System.
 *
 *
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
    var {best, length} = step(ants, pheromones, ρ, cb)
    // global update
    best.filter((r, s) => {
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
 * @param {Number} ρ (local decay)
 * @param {Function?} cb
 * @return {Number}
 * @api private
 */

function step(ants, pheromones, ρ, cb) {
  var best = 0
  var length = 0
  var j = ants.length - 1
  ants.map((k, r) => {
    var tour = 0
    var transition = exploitation(r, ants)
    while(j--) {
      let s = transition(pheromones, cb)
      tour += distance
      // local update
      update(pheromones[r][s], delta, ρ)
    }
    return tour
  })
  return best
}
