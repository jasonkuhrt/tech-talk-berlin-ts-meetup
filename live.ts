import { Alge } from 'alge'

const Circle1 = Alge.record('Circle', {})
const Circle2 = Alge.record('Circle', {})

const circle1 = Circle1.create()
const circle2 = Circle2.create()

Circle1.is(circle2)
