/**
 * 3. Record Identity
 */

import { Alge } from 'alge'
import { z } from 'zod'

const Circle = Alge.record('Circle', { radius: z.number().default(0) })
const Square = Alge.record('Square', { size: z.number().default(0) })

/**
 * Type Guards
 */

{
  const circle = Circle.create()
  const square = Square.create()

  // Usefulness comes into play with ADTs
  Circle.is(circle)
  // Circle.is(square)
  // Circle.is('???')
  Circle.is$(circle)
  Circle.is$(square)
  Circle.is$('???')
}

/**
 * Nominal Simulation
 */

{
  const Circle1 = Alge.record('Circle', {})
  const Circle2 = Alge.record('Circle', {})
  const circle2 = Circle2.create()
  Circle1.is(circle2)
}
