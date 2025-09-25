// Datos de ejemplo (puedes conectarlo luego a APIs o archivos JSON)
const especies = ["Tortugas", "Delfines", "Tiburones"];
const cantidades = [34, 12, 7];

// Gráfico de barras
new Chart(document.getElementById("grafico1"), {
  type: "bar",
  data: {
    labels: especies,
    datasets: [{
      label: "Cantidad de Avistamientos",
      data: cantidades,
      backgroundColor: ["#4CAF50", "#2196F3", "#FF5722"]
    }]
  }
});

// Gráfico circular
new Chart(document.getElementById("grafico2"), {
  type: "pie",
  data: {
    labels: especies,
    datasets: [{
      label: "Distribución",
      data: cantidades,
      backgroundColor: ["#4CAF50", "#2196F3", "#FF5722"]
    }]
  }
});