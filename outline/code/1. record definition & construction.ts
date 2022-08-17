import { Alge } from 'alge'
import { z } from 'zod'

/**
 * Basic Definition & Construction
 */

{
  const Circle = Alge.record('Circle', {})
  Circle.create()
}

/**
 * Basic Input
 */

{
  const Circle = Alge.record('Circle', {
    radius: z.number(),
  })
  // Circle.create()
  Circle.create({ radius: 1 })
}

/**
 * Input Validation
 */

{
  Alge.record('Circle', {
    radius: z.number().int(),
  })
  // Circle.create({ radius: 1.1 })
}

/**
 * Input Defaults
 */

{
  const Circle = Alge.record('Circle', {
    radius: z.number().int().default(1),
  })
  Circle.create()
  Circle.create({})
  Circle.create({ radius: 2 })
}
