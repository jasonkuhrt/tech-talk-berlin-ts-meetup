/**
 * 4. ADTs
 */

import { Alge } from 'alge'
import { z } from 'zod'

const Circle = Alge.record('Circle', { radius: z.number().default(0) })
const Square = Alge.record('Square', { size: z.number().default(0) })

/**
 * Definition
 */

Alge.data('Shape', {
  Circle: {
    radius: z.number().default(0),
  },
  Square: {
    size: z.number().default(0),
  },
})

Alge.data('Shape').record(Circle).record(Square).done()

Alge.data('Shape')
  .record('Circle')
  .schema({
    radius: z.number().default(0),
  })
  .record('Square')
  .schema({
    size: z.number().default(0),
  })
  .done()

/**
 * Construction
 */

const Shape = Alge.data('Shape').record(Circle).record(Square).done()
const circle = Shape.Circle.create()
const square = Shape.Square.create()

/**
 * Identity
 */

Shape.Circle.is(circle)
Shape.Circle.is(square)
// Shape.Circle.is('x')

Shape.Circle.is$(circle)
Shape.Circle.is$(square)
Shape.Circle.is$('x')

const shapes = [...[circle], ...[square]]
// Problem 1: Leak _tag detail
// Problem 2: Not a type guard
const circles1 = shapes.filter((shape) => shape._tag === 'Circle')
const circles2 = shapes.filter(Shape.Circle.is)

{
  /**
   * Codec Definition
   */

  const Shape = Alge.data('Shape')
    .record('Circle')
    .schema({
      radius: z.number().default(0),
    })
    .codec(`graphic`, {
      to: (circle) => `(---|${circle.radius})`,
      from: (graphic) => {
        const match = graphic.match(/\(---\|(\d+)\)/)
        if (!match) return null
        const [_, radius] = match
        return {
          radius: Number(radius),
        }
      },
    })
    .record('Square')
    .schema({
      size: z.number().default(0),
    })
    .codec(`graphic`, {
      to: (square) => `[${square.size}]`,
      from: (graphic) => {
        const match = graphic.match(/\[(\d+)\]/)
        if (!match) return null
        const [_, size] = match
        return {
          size: Number(size),
        }
      },
    })
    .codec(`somethingElse`, {
      to: (circle) => `todo`,
      from: (graphic) => ({ radisu: 0 }),
    })
    .done()

  /**
   * Codec Usage
   */

  // Just like records before
  Shape.Circle.to.graphic(Shape.Circle.create({ radius: 1 }))
  Shape.Circle.to.graphic(Shape.Circle.create({ radius: 2 }))
  Shape.Circle.from.graphic(`(---|1)`)
  Shape.Circle.from.graphic(`(---|2)`)
  Shape.Circle.from.graphic(`()`)

  // !! Whoops there is a bug in the static types   (>.<)
  Shape.Square.to.graphic(Shape.Square.create({ size: 1 }))
  Shape.Square.to.graphic(Shape.Square.create({ size: 2 }))
  Shape.Square.from.graphic(`[11]`)
  Shape.Square.from.graphic(`[]`)

  // Common codecs become generally available on ADT.
  const circleOrSquare = Math.random() > 0.5 ? circle : square
  const circleOrSquareString = Shape.to.graphic(circleOrSquare)
  Shape.from.graphic(circleOrSquareString)

  // Non-common codecs do not.
  Shape.Square.from.somethingElse
  // Shape.Circle.from.somethingElse
  // Shape.from.somethingElse
}
