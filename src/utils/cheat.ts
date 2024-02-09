export function genCheatStr(arr: string[]): string {
  let template = ``
  arr.forEach((value) => {
    template += value + '\n'
  })
  return template
}

export function genCount(count: number, len = 4): string {
  let str = count.toString(16)
  if (str.length < len) {
    const differ = len - str.length
    let prefix = ''
    for (let i = 0; i < differ; i++) {
      prefix += '0'
    }
    str = prefix + str
  }
  return str.toUpperCase()
}

export function genBox(box: number, start = '0020', step = 8): string {
  let num = parseInt(start, 16)
  const count = box - 1
  for (let i = 0; i < count; i++) {
    num += step
  }
  return genCount(num)
}

export function parseCheat(str: string): CheatConfig[] {
  const regex = /\[(.*?)\]\s*([\s\S]*?)(?=\n\n|\n?$)/g
  const cheats = [] as CheatConfig[]
  let match

  while ((match = regex.exec(str)) !== null) {
    const title = match[1]
    const code = match[2].trim()

    cheats.push({ title: `[${title}]`, code })
  }

  return cheats
}
