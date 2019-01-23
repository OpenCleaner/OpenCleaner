import { join } from 'path'
import { app } from 'electron'
import { watchFile } from 'fs'

export default function enableHotReload(): void {
  watchFile(join(process.cwd(), 'app/background.js'), () => {
    app.relaunch()
    app.exit(0)
  })
}
