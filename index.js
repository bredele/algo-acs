/**
 * Dependencies
 */

var update = require('pheromone')
var exploitation = require('exploitation')
var eulidean = require('euclidean')


/**
 * Ant Colony System.
 *
 * Examples:
 *
 * @param {Array} ants
 * @param {Number} β importance pheromone over distance
 * @param {Number} τ initial pheromone deposit
 * @param {Number} ρ local decay
 * @param {Number} α global decay
 * @param {Function} distance
 * @return {Function}
 * @api public
 */

module.exports = function(ants, β = 2, τ = 1, ρ = 0.1, α = 0.1, distance = euclidean) {
  var pheromones = []
  return function(cb) {
    var {best, length} = step(ants, pheromones, τ, ρ, β, distance, cb)
    // global update
    best.reduce((r, s) => {
      pheromones[r][s] += update(pheromones[r][s], 1 / length, α)
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
 * @param {Number} β
 * @param {Function} distance
 * @param {Function} cb (optional)
 * @return {Object}
 * @api private
 */

function step(ants, pheromones, delta, ρ, β, distance, cb) {
  var best = []
  var length = 0
  var j = ants.length - 1
  ants.map((k, r) => {
    var visited = []
    visited.push(r)
    var tour = 0
    var transition = exploitation(r, ants, β, distance)
    while(j--) {
      let s = transition(pheromones, cb)
      visited.push(s)
      tour += distance(ants[r], ants[s])
      // local update
      pheromones[r][s] += update(pheromones[r][s], delta, ρ)
    }
    if(tour > length) {
      best = visited
      length = tour
    }
  })
  return {best, length}
}
