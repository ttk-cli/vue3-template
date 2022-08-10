import presetRemToPx from '@unocss/preset-rem-to-px'
import { defineConfig, Preset, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetUno(),
    presetIcons({
      prefix: '',
      extraProperties: {
        display: 'inline-block',
        cursor: 'pointer',
        'font-size': '20px',
      },
    }),
    presetRemToPx({
      baseFontSize: 4,
    }) as Preset,
  ],
})
