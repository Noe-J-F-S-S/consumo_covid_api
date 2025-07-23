let currentPage = 1;
const limit = 50;
let currentSearch = ''; // NUEVO: Guarda el término de búsqueda
let currentFilterType = 'departamento'; // NUEVO: Guarda el tipo de filtro actual

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      cargarCasos();
    }
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    currentPage++;
    cargarCasos();
  });

  document.getElementById("filterType").addEventListener("change", (e) => {
    currentFilterType = e.target.value;
    currentPage = 1;
    cargarCasos();
  });

  // NUEVO: Detectar cambios en el input de búsqueda
  document.getElementById("searchInput").addEventListener("input", (e) => {
    currentSearch = e.target.value.trim();
    currentPage = 1; // Reinicia a la primera página cuando se busca
    cargarCasos();
  });

  cargarCasos();
});

async function cargarCasos() {
  try {
    const offset = (currentPage - 1) * limit;

    // Construir la URL con parámetros
    let url = `http://localhost:3001/api/positivos?limit=${limit}&offset=${offset}`;
    if (currentSearch !== '') {
      url += `&search=${encodeURIComponent(currentSearch)}&filterType=${currentFilterType}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    const casos = data.resultados;

    const tbody = document.getElementById('tbody-casos');
    tbody.innerHTML = "";

    casos.forEach(caso => {
      const fila = `
        <tr>
          <td>${caso.id_persona}</td>
          <td>${new Date(caso.fecha_resultado).toLocaleDateString('es-PE')}</td>
          <td>${caso.departamento}</td>
          <td>${caso.provincia}</td>
          <td>${caso.distrito}</td>
          <td>${caso.edad}</td>
          <td>${caso.metododx}</td>
          <td>${caso.sexo}</td>
          <td>${caso.ubigeo}</td>
          <td>
            <a href="editar.html?id=${caso.id_persona}" class="btn btn-sm btn-warning">Editar</a>
          </td> 
          <td>
            <button class="btn btn-danger btn-sm" onclick="eliminarCaso(${caso.id_persona})">Eliminar</button>
          </td>
        </tr>
      `;
      tbody.insertAdjacentHTML('beforeend', fila);
    });

    document.getElementById("pageNumber").textContent = `Página ${currentPage}`;
    document.getElementById("pageNumber").textContent = `Página ${currentPage} - Mostrando ${casos.length} de ${data.total} resultados`;
  } catch (err) {
    console.error('Error al cargar casos:', err);
  }
}

async function eliminarCaso(id) {
  const confirmar = confirm(`¿Estás seguro de eliminar el caso con ID ${id}?`);
  if (!confirmar) return;

  try {
    const response = await fetch(`http://localhost:3001/api/positivos/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert("Registro eliminado correctamente");
      cargarCasos(); // Recarga la tabla
    } else {
      alert("Error al eliminar el registro");
    }
  } catch (err) {
    console.error("Error al eliminar:", err);
    alert("Error del servidor");
  }
}