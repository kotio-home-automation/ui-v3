export const config = {
  port: parseInt(process.env.PORT || '3000'),
  useFake: process.env.USE_FAKE === 'true' || false,

  apis: {
    dirigera: process.env.API_DIRIGERA_BASE || 'http://localhost:8000',
    tellstick: process.env.API_TELLSTICK_BASE || 'http://localhost:5001/tellstick',
    ruuvitag: process.env.API_RUUVITAG_BASE || 'http://locahost:3102/ruuvitag',
    tapoCamera: process.env.API_TAPO_CAMERA_BASE || 'http://localhost:5020/privacy',
  },
} as const
