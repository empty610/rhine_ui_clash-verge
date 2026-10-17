# Clash Verge Rhine Edition

A local Windows desktop edition of Clash Verge Rev, with a new flat visual design inspired by the warm neutral palette, technical typography, archive numbering and amber accents of [RhineLabUI](https://github.com/LBEILC/RhineLabUI). This is an independent custom edition, not an official Rhine Lab, Arknights or Clash Verge release.

The UI is built into the Tauri executable. The application retains the Rust backend, Mihomo core, profile management, proxy selection, rules, connection viewer and log viewer. No local web server, Node.js or Rust toolchain is needed to run the delivered Windows application. WebView2 is required.

The visual system uses local system fonts, CSS and small original SVG graphics. There are no new runtime dependencies, 3D scenes, remote fonts or animated backgrounds. Secondary routes load on demand. Optional diagnostic home cards are disabled by default and can be enabled in the home settings. The existing lightweight mode is enabled after two minutes in the background.

The sidebar monogram uses fixed SVG geometry for consistent alignment. The home schematic is a 32-second flat SVG sequence with smoothly morphing nested contours and a breathing rim. The spacecraft's nose becomes the orbital focus as its exhaust fades; rings expand around that shared moving center before the planet and satellite arrive. The same ring paths gradually deform back into the contours. Occluded contours are reconstructed as complete paths. It contains no numeric labels, embedded media, audio, blur filters, or raster textures. It pauses when out of view, when the document is hidden, or when the window loses focus, and is disabled by reduced-motion preferences. No animation timers, JavaScript frame loops, image sequences, or additional runtime dependencies are used.

Configuration is isolated under `%APPDATA%\io.github.clash-verge-rhine.desktop`. The custom URI scheme is `clash-rhine`. Automatic upstream application updates are disabled so an official update cannot replace this design. Core updates remain available. The upstream privileged service and system proxy are system resources; do not run another Clash client at the same time.

Setting the process environment variable `CLASH_RHINE_PREVIEW=1` launches the same native executable in a UI inspection mode with a separate `io.github.clash-verge-rhine.preview` configuration directory. It skips core startup, service access, system proxy writes, startup-task changes and hotkey registration. Proxy controls are locked. This mode is for inspecting the design while another client is running; it is not a proxy session.

## Build

From PowerShell, enter the repository, run `. ..\Enter-BuildEnvironment.ps1`, then `pnpm run web:build` and `cargo build --release --locked -p clash-verge`. First-time setup also requires `pnpm install --frozen-lockfile` and `pnpm run prebuild x86_64-pc-windows-msvc`.

The environment helper is specific to this computer. On another Windows x64 computer, use an MSVC developer shell with the Windows SDK, the Rust toolchain specified in `rust-toolchain.toml`, Node.js and the pnpm version in `package.json` available on PATH. Run the same install, prebuild and build commands. The dependency lockfiles are included.

Run `pwsh -File scripts\package-rhine.ps1` to assemble the application in the sibling `Clash-Verge-Rhine-Windows-x64` folder. The packaging script requires PowerShell 7.

The app executable is `target\release\clash-verge.exe`. It must be distributed with the `resources` directory and the `verge-mihomo.exe` / `verge-mihomo-alpha.exe` sidecars. Keep the GPL-3.0 license and corresponding modified source available when redistributing.

## Credits

- Application and backend: [Clash Verge Rev](https://github.com/clash-verge-rev/clash-verge-rev), GPL-3.0-only; copyright and license notices retained.
- Proxy core: [Mihomo](https://github.com/MetaCubeX/mihomo), GPL-3.0.
- Visual reference: [RhineLabUI](https://github.com/LBEILC/RhineLabUI). Its source, logos and media are not bundled; this edition uses original CSS, layout and SVG graphics.
