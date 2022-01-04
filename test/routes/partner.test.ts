import { test } from 'tap'
import { build } from '../helper'

test('example is loaded', async (t) => {
  const app = await build(t)

  const res = await app.inject({
    url: '/partner/checkuser/?document=06963451702'
  })

  t.equal(res.payload, {"ok":"06963451702"})
})
