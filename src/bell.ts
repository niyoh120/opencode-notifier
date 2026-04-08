let lastBellTime = 0
const BELL_DEBOUNCE_MS = 500

export function ringBell(now: number = Date.now()): Promise<void> {
  if (!process.stdout.isTTY) {
    return Promise.resolve()
  }

  if (now - lastBellTime < BELL_DEBOUNCE_MS) {
    return Promise.resolve()
  }

  lastBellTime = now

  return new Promise((resolve) => {
    process.stdout.write("\x07", () => {
      resolve()
    })
  })
}

export function resetBellState(): void {
  lastBellTime = 0
}
