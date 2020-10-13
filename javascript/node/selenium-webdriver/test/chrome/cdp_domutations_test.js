// Licensed to the Software Freedom Conservancy (SFC) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The SFC licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

'use strict'

const assert = require('assert')
const chrome = require('../../chrome')
const test = require('../../lib/test')

test.suite(
    function (env) {
      let driver

      before(async function() {
        driver = await env
            .builder()
            .build()
      })
      after(() => driver.quit())

      describe('JS DOM events', function() {
        it('calls the event listener on dom mutations', async function() {
          const cdpConnection = await driver.createCDPConnection('page')
          driver.logMutationEvents(cdpConnection, async function(event) {
            assert.equal(event['attribute_name'], 'style')
            assert.equal(event['current_value'], '')
            assert.equal(event['old_value'], 'display:none;')
          })

          await driver.get(test.Pages.dynamicPage)

          let element = driver.findElement({id: 'reveal'})
          await element.click()
        })
      })
    }, { browsers: ['chrome'] }
)
