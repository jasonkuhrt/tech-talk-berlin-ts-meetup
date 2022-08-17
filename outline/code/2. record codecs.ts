/**
 * 2. Record Codecs
 */

import { Alge } from 'alge'
import { z } from 'zod'

/**
 * Definition
 */

const Circle = Alge.record('Circle')
  .schema({ radius: z.number() })
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
  .done()

/**
 * Usage
 */

{
  Circle.to.graphic(Circle.create({ radius: 1 }))
  Circle.to.graphic(Circle.create({ radius: 2 }))
  Circle.from.graphic(`(---|1)`)
  Circle.from.graphic(`(---|2)`)
  Circle.from.graphic(`()`)
}

/**
 * JSON
 */

{
  Circle.to.json(Circle.create({ radius: 1 }))
  Circle.to.json(Circle.create({ radius: 2 }))
  Circle.from.json('{"_tag":"Circle","radius":1}')
}

/**
 * Or Throw
 */

{
  Circle.from.graphicOrThrow('()')
}
