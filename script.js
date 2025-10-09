async function obtenerDatosAPI() {
  try {
    // 🔹 Consultamos datos reales de especies marinas (WoRMS API)
    const tortugasResp = await fetch("https://www.marinespecies.org/rest/AphiaRecordsByName/Turtle?like=true&marine_only=true");
    const delfinesResp = await fetch("https://www.marinespecies.org/rest/AphiaRecordsByName/Dolphin?like=true&marine_only=true");
    const tiburonesResp = await fetch("https://www.marinespecies.org/rest/AphiaRecordsByName/Shark?like=true&marine_only=true");

    if (!tortugasResp.ok || !delfinesResp.ok || !tiburonesResp.ok) {
      throw new Error("Error al conectar con la API");
    }

    const tortugas = await tortugasResp.json();
    const delfines = await delfinesResp.json();
    const tiburones = await tiburonesResp.json();

    // 🔹 Creamos un resumen simple: cuántas especies encontró
    const especies = [
      { nombre: "Tortuga (Turtle)", cantidad: tortugas.length },
      { nombre: "Delfín (Dolphin)", cantidad: delfines.length },
      { nombre: "Tiburón (Shark)", cantidad: tiburones.length },
    ];

    return { especies };
  } catch (error) {
    alert("No se pudo conectar con la API. Se mostrarán datos locales.");
    console.error("Error al cargar API:", error);
    return null;
  }
}

// 🔹 Función para crear gráficos (misma que ya tenías)
function crearGrafico(id, tipo, etiquetas, datos, etiquetaDatos, colores) {
  return new Chart(document.getElementById(id), {
    type: tipo,
    data: {
      labels: etiquetas,
      datasets: [{
        label: etiquetaDatos,
        data: datos,
        backgroundColor: colores,
        borderColor: "#333",
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: {
          display: true,
          text: etiquetaDatos,
          font: { size: 16, weight: "bold" }
        }
      },
      scales: tipo === "bar" ? {
        y: { beginAtZero: true }
      } : {}
    }
  });
}

// 🔹 Cargar datos
async function cargarDatos() {
  const datosAPI = await obtenerDatosAPI();

  // Si la API no responde, usamos datos locales
  const especies = datosAPI?.especies || [
    { nombre: "Tortuga Verde", cantidad: 120 },
    { nombre: "Delfín Mular", cantidad: 80 },
    { nombre: "Tiburón Blanco", cantidad: 40 }
  ];

  crearGrafico(
    "grafico1", "bar",
    especies.map(e => e.nombre),
    especies.map(e => e.cantidad),
    "Cantidad de especies (API WoRMS)",
    ["#4CAF50", "#2196F3", "#FF5722"]
  );

  crearGrafico(
    "grafico2", "pie",
    especies.map(e => e.nombre),
    especies.map(e => e.cantidad),
    "Distribución de especies",
    ["#4CAF50", "#2196F3", "#FF5722"]
  );
}

cargarDatos();
