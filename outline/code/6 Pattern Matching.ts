/**
 * 6. Pattern Matching
 */

import { Alge } from 'alge'
import { z } from 'zod'

const Shape = Alge.data('Shape', {
  Circle: {
    radius: z.number().default(13),
  },
  Square: {
    size: z.number().default(13),
  },
})

const circle = Shape.Circle.create()
const square = Shape.Square.create()
const shape = Math.random() > 0.5 ? circle : square

/**
 * Tag Matchers
 */

Alge.match(shape)
  .Circle((circle) => `Got a circle of radius ${circle.radius}!`)
  .Square((square) => `Got a square of size ${square.size}!`)
  .done()

/**
 * Data Matchers
 */

Alge.match(shape)
  .Circle({ radius: 13 }, () => `Got an unlucky circle!`)
  .Square({ size: 13 }, () => `Got an unlucky square!`)
  .else({ ok: true })

/**
 * Mixing Matchers
 */

Alge.match(shape)
  .Circle({ radius: 13 }, () => `Got an unlucky circle!`)
  .Circle((circle) => `Got a circle of radius ${circle.radius}!`)
  .Square({ size: 13 }, () => `Got an unlucky square!`)
  .Square((square) => `Got a square of size ${square.size}!`)
  .done()

/**
 * Done Versus Else
 */

Alge.match(shape)
  .Circle((circle) => `Got a circle of radius ${circle.radius}!`)
  .else(null)

Alge.match(shape)
  .Circle((circle) => `Got a circle of radius ${circle.radius}!`)
  .else(() => (Math.random() > 0.5 ? 1 : 2))
