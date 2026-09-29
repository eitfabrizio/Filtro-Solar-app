const pantallaLogin = document.getElementById('pantallaLogin');
const inputNombre = document.getElementById('inputNombre');
const btnAcceder = document.getElementById('btnAcceder');

const uvRange = document.getElementById('uvRange');
const uvVal = document.getElementById('uvVal');
const btnIniciar = document.getElementById('btnIniciar');
const btnSiguiente = document.getElementById('btnSiguiente');
const agua = document.getElementById('agua');
const sol = document.getElementById('sol');
const tituloExplicacion = document.getElementById('tituloExplicacion');
const cuerpoExplicacion = document.getElementById('cuerpoExplicacion');

let pasoActual = 0;
let dialogoSecuencia = [];
let nombreUsuario = "Investigador";

// Pool de diálogos aleatorios por fase para evitar repeticiones repetitivas
const poolDialogos = {
  fase1: [
    "Física Cuántica y Óptica: Hola {nombre}, has configurado el espectro en un Índice UV de {uv}. En este instante, los fotones viajan en longitudes de onda del espectro UV-A (315-400 nm). Las ondas electromagnéticas atraviesan la pared plástica de la botella, transfiriendo energía pura al ecosistema molecular de la muestra.",
    "Dinámica de Fotones Atmosféricos: Saludos, {nombre}. Al fijar la potencia lumínica en un Índice UV de {uv}, habilitas un bombardeo masivo de radiación electromagnética UV-A. Esta energía lumínica es capturada por los cromóforos internos del agua, sentando las bases cinéticas de la foto-desinfección.",
    "Módulo de Radiación UV-A: Confirmado el Índice UV en nivel {uv}, {nombre}. La energía de estos fotones solares no es retenida por la capa de ozono (a diferencia de los rayos UV-C), penetrando libremente el envase transparente para iniciar la transferencia de carga cuántica."
  ],
  fase2: [
    "Mecánica Orgánica y Turbidez: Analiza la densidad visual del fluido, {nombre}. La turbidez del agua bloquea mecánicamente los rayos del sol por un proceso llamado 'Dispersión Óptica'. Si el lodo supera los 30 NTU, actúa como un escudo balístico protegiendo los patógenos; por ende, se requiere un filtrado de sólidos previo.",
    "Análisis de Dispersión Lumínica: Observa el estado marrón de la botella, {nombre}. Las partículas en suspensión provocan una dispersión y absorción prematura de la luz. Este fenómeno físico reduce drásticamente la irradiancia neta del proceso, demandando una purificación previa por decantación.",
    "Obstrucción por Sólidos Suspendidos: {nombre}, la opacidad del fluido representa un obstáculo crítico en la trayectoria fotónica. Los microorganismos se ocultan detrás de micropartículas de arcilla, disminuyendo la penetración de las ondas UV-A en las capas profundas de la botella."
  ],
  fase3: [
    "Fotoquímica Dinámica: {nombre}, los rayos solares UV-A interactúan con el oxígeno disuelto en el agua (O₂), excitando sus electrones y gatillando la formación de 'Especies Reactivas de Oxígeno' (ERO) como el peróxido de hidrógeno y radicales libres. Estos compuestos oxidantes rompen las estructuras protectoras externas de las bacterias.",
    "Producción de Oxidantes Celulares: Al recibir la radiación, {nombre}, ocurre una reacción catalítica con el oxígeno molecular del fluido. Se generan oxidantes intracelulares altamente nocivos que atacan de manera inmediata las membranas y paredes celulares de los agentes patógenos suspendidos.",
    "Módulo de Estrés Oxidativo: {nombre}, la absorción fotónica altera el equilibrio químico del agua, desatando un estrés oxidativo sistémico. Las moléculas resultantes (ERO) actúan como agentes destructivos exógenos, perforando la envoltura lipídica celular de bacterias y parásitos."
  ],
  fase4: [
    "Biología Molecular y Mutación: Los fotones de rango ultravioleta penetran directo al núcleo de patógenos como E. coli o Vibrio cholerae. {nombre}, la radiación altera los enlaces químicos de su material genético, induciendo la formación de dímeros de timina estables. Esto causa un daño mutagénico irreversible en su ADN, anulando su capacidad de reproducción.",
    "Inactivación del Código Genético: Una vez dentro del citoplasma, la luz altera la secuencia de polimerización del ácido nucleico del microbio. {nombre}, las bases nitrogenadas se fusionan erróneamente de forma cruzada, provocando la muerte reproductiva del patógeno al congelar su replicación celular.",
    "Destrucción del ADN Microbiano: {nombre}, la energía fotónica destruye los puentes de hidrógeno del material cromosómico bacteriano. Al desconfigurar permanentemente su plano molecular, los patógenos son incapaces de dividirse o colonizar un tracto digestivo humano."
  ]
};

// Función para obtener un elemento aleatorio de un array
function obtenerAleatorio(array) {
  const indice = Math.floor(Math.random() * array.length);
  return array[indice];
}

function calcularTiempoPurificacionLocal(radiacionUV) {
  if (radiacionUV >= 6) return 6;  // Soleado pleno (6 horas según la OMS)
  if (radiacionUV >= 3) return 12; // Nublado intermedio (12 horas / 2 días)
  return 0; // Insuficiente
}

btnAcceder.addEventListener('click', () => {
  if (inputNombre.value.trim() !== "") {
    nombreUsuario = inputNombre.value.trim();
  }
  pantallaLogin.style.opacity = '0';
  setTimeout(() => { pantallaLogin.style.display = 'none'; }, 500);

  tituloExplicacion.textContent = "Inicialización del Sistema";
  cuerpoExplicacion.innerHTML = `¡Hola, ${nombreUsuario}! He cargado el entorno gráfico avanzado en alta resolución.<br><br>Regula el deslizador de radiación ultravioleta a la izquierda para calibrar los sensores ópticos. Cuando la irradiancia deseada esté lista, presiona **"Cargar Secuencia Analítica"** para activar las fases detalladas.`;
});

uvRange.addEventListener('input', () => {
  const uv = parseInt(uvRange.value);
  uvVal.textContent = uv;
  const escala = 1 + (uv * 0.08);
  const brillo = uv * 14;
  sol.style.transform = `scale(${escala})`;
  sol.style.boxShadow = `0 0 ${brillo}px ${brillo/2}px #f59e0b`;
});

btnIniciar.addEventListener('click', () => {
  const uv = parseInt(uvRange.value);
  pasoActual = 0;
  
  const particulas = document.querySelectorAll('.particula');
  particulas.forEach(p => { p.style.opacity = '0.8'; p.style.transform = 'scale(1)'; });
  agua.style.background = "#4a2f13"; 
  
  uvRange.disabled = true;
  btnIniciar.disabled = true;

  const horasTotales = calcularTiempoPurificacionLocal(uv);

  // Selección de diálogos aleatorios para evitar duplicidad fija
  const txtFase1 = obtenerAleatorio(poolDialogos.fase1).replace("{nombre}", nombreUsuario).replace("{uv}", uv);
  const txtFase2 = obtenerAleatorio(poolDialogos.fase2).replace("{nombre}", nombreUsuario);
  const txtFase3 = obtenerAleatorio(poolDialogos.fase3).replace("{nombre}", nombreUsuario);
  const txtFase4 = obtenerAleatorio(poolDialogos.fase4).replace("{nombre}", nombreUsuario);

  // Lógica del Hotfix de Sinergia Térmica y Datos Correctos de la OMS
  let textoFase5 = "";
  if (uv <= 2) {
    textoFase5 = `Termodinámica y Sinergia: ${nombreUsuario}, dado que el Índice UV configurado es crítico (${uv}), la irradiancia infrarroja paralela es insuficiente. Al no lograr calentar el agua por encima del umbral de los 50°C, la sinergia térmica es CERO. El proceso de desinfección fotónica queda inhabilitado por falta de energía cinética acumulada.`;
  } else if (uv >= 3 && uv <= 5) {
    textoFase5 = `Termodinámica y Sinergia: ${nombreUsuario}, con un Índice UV moderado (${uv}), la temperatura del fluido se eleva sutilmente sin alcanzar el óptimo térmico de 50°C. La sinergia es muy baja, lo que fuerza al protocolo a requerir un tiempo de exposición extendido de hasta ${horasTotales} horas (2 días continuos) para completar la inactivación bacteriana por acumulación lineal.`;
  } else {
    textoFase5 = `¡Sinergia Térmica Detectada! ${nombreUsuario}, al operar en un Índice UV alto de ${uv}, los rayos infrarrojos elevan de manera constante la temperatura interna del agua por encima de los 50°C. Esta combinación debilita térmicamente las envolturas celulares de los patógenos, permitiendo que la luz UV-A penetre y rompa el ADN hasta 3 veces más rápido, fijando el tiempo final en solo ${horasTotales} horas consecutivas de sol.`;
  }

  dialogoSecuencia = [
    {
      titulo: "Fase 1: Configuración Fotónica Atmosférica",
      cuerpo: txtFase1,
      accionVisual: () => {}
    },
    {
      titulo: "Fase 2: El Fenómeno de Dispersión por Turbidez",
      cuerpo: txtFase2,
      accionVisual: () => {}
    },
    {
      titulo: "Fase 3: Generación de Estrés Oxidativo Molecular",
      cuerpo: txtFase3,
      accionVisual: () => { 
        if (uv >= 3) {
          agua.style.background = "#2d4436"; // El agua se aclara a un tono intermedio verdoso
          const p = document.querySelectorAll('.particula');
          if(p.length > 0) p[0].style.opacity = '0';
          if(p.length > 1) p[1].style.opacity = '0';
        }
      }
    },
    {
      titulo: "Fase 4: Destrucción por Mutación del Ácido Nucleico",
      cuerpo: txtFase4,
      accionVisual: () => {
        if (uv >= 6) {
          agua.style.background = "#1b365d"; // Se limpia a un azul profundo
          const p = document.querySelectorAll('.particula');
          if(p.length > 2) p[2].style.opacity = '0';
        }
      }
    },
    {
      titulo: "Fase 5: Análisis de Sinergia Térmica",
      cuerpo: textoFase5,
      accionVisual: () => {}
    },
    {
      titulo: "Fase 6: Dictamen Estadístico del Ensayo",
      cuerpo: uv <= 2 
        ? `Fallo Crítico del Ensayo: Con una dosis fotónica insuficiente de nivel ${uv}, la irradiancia neta no superó los mínimos exigidos por las guías científicas mundiales. ${nombreUsuario}, la carga microbiológica activa se mantiene intacta. El agua representa un peligro inmediato de infección gastrointestinal.`
        : `Certificación del Ensayo: ${nombreUsuario}, bajo un índice de radiación UV de nivel ${uv}, la dosis acumulada superó de forma segura el mínimo de 555 Wh/m² estipulado por la OMS. Se ha logrado una reducción de patógenos del 99.99%. El agua es microbiológicamente apta para consumo humano.`,
      accionVisual: () => {
        if (uv >= 3) {
          agua.style.background = "#0284c7"; // Azul cristalino brillante
          const p = document.querySelectorAll('.particula');
          p.forEach(part => part.style.opacity = '0'); 
        }
        uvRange.disabled = false;
        btnIniciar.disabled = false;
        btnSiguiente.disabled = true;
      }
    }
  ];

  renderizarPaso();
  btnSiguiente.disabled = false;
});

btnSiguiente.addEventListener('click', () => {
  pasoActual++;
  if (pasoActual < dialogoSecuencia.length) {
    renderizarPaso();
  }
});

function renderizarPaso() {
  const datosPaso = dialogoSecuencia[pasoActual];
  tituloExplicacion.textContent = datosPaso.titulo;
  cuerpoExplicacion.innerHTML = datosPaso.cuerpo;
  datosPaso.accionVisual();

  if (pasoActual === dialogoSecuencia.length - 1) {
    btnSiguiente.disabled = true;
  }
}