import presetRemToPx from '@unocss/preset-rem-to-px'
import { defineConfig, Preset, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetUno(),
    presetIcons(),
    presetRemToPx({
      baseFontSize: 4,
    }) as Preset,
  ],
})
