document.getElementById("buscarPorIdForm").addEventListener("submit", async function (e) {
  e.preventDefault(); // Evita que recargue la página

  const id = document.getElementById("buscarIdInput").value.trim();
  if (id === "") return alert("Por favor, ingresa un ID");

  try {
    const response = await fetch(`http://localhost:3001/api/positivos/${id}`);
    if (!response.ok) {
      throw new Error("No se encontró el caso");
    }

    const caso = await response.json();

    // Mostrar el resultado
    document.getElementById("resultadoId").innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Caso ID: ${caso.id_persona}</h5>
          <p class="card-text">
            <strong>Departamento:</strong> ${caso.departamento}<br>
            <strong>Provincia:</strong> ${caso.provincia}<br>
            <strong>Distrito:</strong> ${caso.distrito}<br>
            <strong>Edad:</strong> ${caso.edad}<br>
            <strong>Sexo:</strong> ${caso.sexo}<br>
            <strong>Fecha Resultado:</strong> ${new Date(caso.fecha_resultado).toISOString().split("T")[0]}
          </p>
        </div>
      </div>
    `;
  } catch (err) {
    document.getElementById("resultadoId").innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
  }
});