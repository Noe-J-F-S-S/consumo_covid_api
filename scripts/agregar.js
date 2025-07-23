document.getElementById('form-covid').addEventListener('submit', async function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = {};
      formData.forEach((value, key) => data[key] = value);

      try {
        const res = await fetch('http://localhost:3001/api/positivos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const resultado = await res.json();
        document.getElementById('mensaje').innerHTML = `
          <div class="alert alert-success">Registro agregado correctamente con ID ${resultado.id_persona}</div>
        `;
        this.reset();
      } catch (error) {
        console.error('Error:', error);
        document.getElementById('mensaje').innerHTML = `
          <div class="alert alert-danger">Error al agregar el registro</div>
        `;
      }
    });