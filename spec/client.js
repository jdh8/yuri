import test from 'ava'

import Discord from 'discord.js'
import {KwClient} from '../lib/index.mjs'

test.serial('is exported from index', t => {
  t.not(KwClient, undefined, 'KwClient was not exported correctly!')
})
