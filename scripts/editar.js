const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    async function cargarCaso() {
      try {
        const res = await fetch(`http://localhost:3001/api/positivos/${id}`);
        const data = await res.json();

        document.getElementById("id_persona").value = data.id_persona;
        document.getElementById("departamento").value = data.departamento;
        document.getElementById("provincia").value = data.provincia;
        document.getElementById("distrito").value = data.distrito;
        document.getElementById("edad").value = data.edad;
        document.getElementById("sexo").value = data.sexo;
        document.getElementById("ubigeo").value = data.ubigeo;
      } catch (err) {
        alert("Error al cargar los datos.");
      }
    }

    document.getElementById("formEditar").addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = {
        departamento: document.getElementById("departamento").value.toUpperCase(),
        provincia: document.getElementById("provincia").value.toUpperCase(),
        distrito: document.getElementById("distrito").value.toUpperCase(),
        edad: parseInt(document.getElementById("edad").value),
        sexo: document.getElementById("sexo").value.toUpperCase(),
        ubigeo: document.getElementById("ubigeo").value
      };

      try {
        const res = await fetch(`http://localhost:3001/api/positivos/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        if (!res.ok) {
          throw new Error("Error al actualizar");
        }

        alert("¡Registro actualizado!");
        window.location.href = "index.html";
      } catch (err) {
        alert("Error al actualizar el caso: " + err.message);
      }
    });

    cargarCaso();