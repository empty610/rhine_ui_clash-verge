import { execFileSync } from 'node:child_process'
import { appendFileSync, readFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

export function installerNames(version) {
  const prefix = `Clash.Verge.Rhine_${version}`
  return [
    ...['x64', 'arm64'].flatMap((arch) => [
      `${prefix}_${arch}-setup.exe`,
      `${prefix}_${arch}_fixed_webview2-setup.exe`,
    ]),
    ...['aarch64', 'x64'].map((arch) => `${prefix}_${arch}.dmg`),
    ...['amd64', 'arm64', 'armhf'].map((arch) => `${prefix}_${arch}.deb`),
    ...['x86_64', 'aarch64', 'armhfp'].map(
      (arch) => `Clash.Verge.Rhine-${version}-1.${arch}.rpm`,
    ),
  ]
}

export function completeVersion(assets, baseVersion, commit) {
  const names = new Set(assets.map((asset) => asset.name))
  for (const name of names) {
    const version = name.match(
      /^Clash\.Verge\.Rhine_(.+\+autobuild\.\d{4}\.[a-f0-9]+)_x64-setup\.exe$/,
    )?.[1]
    if (
      version?.startsWith(`${baseVersion}+autobuild.`) &&
      version.endsWith(`.${commit}`) &&
      installerNames(version).every((installer) => names.has(installer))
    ) {
      return version
    }
  }
  return null
}

function main() {
  const run = (command, args) =>
    execFileSync(command, args, { encoding: 'utf8' }).trim()
  const currentVersion = JSON.parse(
    readFileSync('package.json', 'utf8'),
  ).version
  const baseVersion = currentVersion.split(/[+-]/)[0]
  const fullCommit = run('bash', [
    'scripts-workflow/get_latest_tauri_commit.bash',
  ])
  const commit = run('git', ['rev-parse', '--short', fullCommit])
  const date = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date())
  const monthDay = ['month', 'day']
    .map((type) => date.find((part) => part.type === type).value)
    .join('')
  const version = `${baseVersion}+autobuild.${monthDay}.${commit}`
  let publishedVersion = null
  if (process.env.FORCE_BUILD !== 'true') {
    // API failures must fail this check rather than trigger expensive rebuilds.
    const releases = JSON.parse(
      run('gh', [
        'api',
        '--paginate',
        '--slurp',
        `repos/${process.env.GITHUB_REPOSITORY}/releases?per_page=100`,
      ]),
    ).flat()
    const release = releases.find(
      (item) => item.tag_name === process.env.TAG_NAME,
    )
    publishedVersion = completeVersion(
      release?.assets ?? [],
      baseVersion,
      commit,
    )
  }
  const shouldRun = publishedVersion === null
  console.log(
    publishedVersion
      ? `All installers already exist for ${publishedVersion}; skipping build.`
      : `Building ${version}: forced build or missing current installers.`,
  )
  appendFileSync(
    process.env.GITHUB_OUTPUT,
    `should_run=${shouldRun}\nlast_tauri_commit=${commit}\nautobuild_version=${version}\n`,
  )
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  main()
}
