const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('apiSolar', {
  calcularTiempoPurificacion: (radiacionUV) => {
    if (radiacionUV >= 6) return 6; // Soleado (6 horas)
    if (radiacionUV >= 3) return 12; // Nublado (12 horas)
    return 0; // Sin radiación suficiente
  }
})
