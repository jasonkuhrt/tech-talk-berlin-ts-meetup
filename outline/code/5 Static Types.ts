/**
 * 5. Static Types
 */

import { Alge } from 'alge'
import { z } from 'zod'

const Shape = Alge.data('Shape', {
  Circle: {
    radius: z.number().default(0),
  },
  Square: {
    size: z.number().default(0),
  },
})

/**
 * ADT Inference
 */

type Shape = Alge.Infer<typeof Shape>
type _ = Shape['*'] | Shape['Circle'] | Shape['Square']

const circle = Shape.Circle.create()
const square = Shape.Square.create()
const shapes = [...[circle], ...[square]]

{
  const circles = shapes.filter(
    (shape: Shape['*']): shape is Shape['Circle'] => shape._tag === 'Circle'
  )
}

/**
 * Tidy Namespace Pattern
 */

namespace Shape {
  export type Circle = Shape['Circle']
  export type Square = Shape['Square']
  export type $Any = Shape['*']
}

{
  const circles = shapes.filter(
    (shape: Shape.$Any): shape is Shape.Circle => shape._tag === 'Circle'
  )
}

/**
 * Record Inference
 */

const Circle = Alge.record('Circle', { radius: z.number().default(0) })
type Circle = Alge.InferRecord<typeof Circle>
