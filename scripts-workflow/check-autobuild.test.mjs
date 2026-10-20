import assert from 'node:assert/strict'
import { test } from 'node:test'
import { completeVersion, installerNames } from './check-autobuild.mjs'

const version = '2.5.9+autobuild.1019.a298150'
const assets = installerNames(version).map((name) => ({ name }))

test('complete installers skip rebuilding without latest.json, including on later days', () => {
  assert.equal(completeVersion(assets, '2.5.9', 'a298150'), version)
})

test('missing either macOS installer still requires a build', () => {
  for (const arch of ['aarch64', 'x64']) {
    const partial = assets.filter(
      ({ name }) => name !== `Clash.Verge.Rhine_${version}_${arch}.dmg`,
    )
    assert.equal(completeVersion(partial, '2.5.9', 'a298150'), null)
  }
})

test('mixed dates cannot disguise an incomplete release', () => {
  const mixed = assets.slice(1).concat({
    name: installerNames('2.5.9+autobuild.1020.a298150')[0],
  })
  assert.equal(completeVersion(mixed, '2.5.9', 'a298150'), null)
})

test('new source or package version requires a build', () => {
  assert.equal(completeVersion(assets, '2.5.9', 'bbbbbbb'), null)
  assert.equal(completeVersion(assets, '2.6.0', 'a298150'), null)
})

test('upstream filenames and updater metadata do not count as Rhine installers', () => {
  const upstream = assets.map(({ name }) => ({
    name: name.replace('.Rhine', ''),
  }))
  assert.equal(
    completeVersion([...upstream, { name: 'latest.json' }], '2.5.9', 'a298150'),
    null,
  )
})
