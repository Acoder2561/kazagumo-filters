export interface FilterRoot {
  clear: Clear
  eightD: EightD
  soft: Soft
  speed: Speed
  karaoke: Karaoke
  nightcore: Nightcore
  pop: Pop
  vaporwave: Vaporwave
  bass: Bass
  party: Party
  earrape: Earrape
  equalizer: Equalizer6
  electronic: Electronic
  radio: Radio
  tremolo: Tremolo2
  treblebass: Treblebass
  vibrato: Vibrato
  china: China
  chimpunk: Chimpunk
  darthvader: Darthvader
  daycore: Daycore
  doubletime: Doubletime
  pitch: Pitch
  rate: Rate
  slow: Slow
}

export interface Clear {}

export interface EightD {
  rotation: Rotation
}

export interface Rotation {
  rotationHz: number
}

export interface Soft {
  lowPass: LowPass
}

export interface LowPass {
  smoothing: number
}

export interface Speed {
  timescale: Timescale
}

export interface Timescale {
  speed: number
  pitch: number
  rate: number
}

export interface Karaoke {
  karaoke: Karaoke2
}

export interface Karaoke2 {
  level: number
  monoLevel: number
  filterBand: number
  filterWidth: number
}

export interface Nightcore {
  timescale: Timescale2
}

export interface Timescale2 {
  speed: number
  pitch: number
}

export interface Pop {
  equalizer: Equalizer[]
}

export interface Equalizer {
  band: number
  gain: number
}

export interface Vaporwave {
  equalizer: Equalizer2[]
  timescale: Timescale3
  tremolo: Tremolo
}

export interface Equalizer2 {
  band: number
  gain: number
}

export interface Timescale3 {
  pitch: number
}

export interface Tremolo {
  depth: number
  frequency: number
}

export interface Bass {
  equalizer: Equalizer3[]
}

export interface Equalizer3 {
  band: number
  gain: number
}

export interface Party {
  equalizer: Equalizer4[]
}

export interface Equalizer4 {
  band: number
  gain: number
}

export interface Earrape {
  equalizer: Equalizer5[]
}

export interface Equalizer5 {
  band: number
  gain: number
}

export interface Equalizer6 {
  equalizer: Equalizer7[]
}

export interface Equalizer7 {
  band: number
  gain: number
}

export interface Electronic {
  equalizer: Equalizer8[]
}

export interface Equalizer8 {
  band: number
  gain: number
}

export interface Radio {
  equalizer: Equalizer9[]
}

export interface Equalizer9 {
  band: number
  gain: number
}

export interface Tremolo2 {
  tremolo: Tremolo3
}

export interface Tremolo3 {
  depth: number
  frequency: number
}

export interface Treblebass {
  equalizer: Equalizer10[]
}

export interface Equalizer10 {
  band: number
  gain: number
}

export interface Vibrato {
  vibrato: Vibrato2
}

export interface Vibrato2 {
  depth: number
  frequency: number
}

export interface China {
  timescale: Timescale4
}

export interface Timescale4 {
  speed: number
  pitch: number
  rate: number
}

export interface Chimpunk {
  timescale: Timescale5
}

export interface Timescale5 {
  speed: number
  pitch: number
  rate: number
}

export interface Darthvader {
  timescale: Timescale6
}

export interface Timescale6 {
  speed: number
  pitch: number
  rate: number
}

export interface Daycore {
  equalizer: Equalizer11[]
  timescale: Timescale7
}

export interface Equalizer11 {
  band: number
  gain: number
}

export interface Timescale7 {
  pitch: number
  rate: number
}

export interface Doubletime {
  timescale: Timescale8
}

export interface Timescale8 {
  speed: number
}

export interface Pitch {
  timescale: Timescale9
}

export interface Timescale9 {
  pitch: number
}

export interface Rate {
  timescale: Timescale10
}

export interface Timescale10 {
  rate: number
}

export interface Slow {
  timescale: Timescale11
}

export interface Timescale11 {
  speed: number
  pitch: number
  rate: number
}
