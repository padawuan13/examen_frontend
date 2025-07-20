const { createApp } = Vue;

createApp({
  data() {
    return {
      pestana: 'notas',
      nota1: '',
      nota2: '',
      nota3: '',
      asistencia: '',
      resultado: '',
      aprobado: false,
      mensajeError: '',
      registro: {
        nombre: '',
        correo: '',
        pass1: '',
        pass2: ''
      },
      errores: {
        nombre: '',
        correo: '',
        pass1: '',
        pass2: ''
      }
    };
  },
  methods: {
    calcularPromedio() {
      this.mensajeError = '';
      let errores = [];

      if (this.nota1 < 10 || this.nota1 > 70) errores.push("Nota 1 debe estar entre 10 y 70");
      if (this.nota2 < 10 || this.nota2 > 70) errores.push("Nota 2 debe estar entre 10 y 70");
      if (this.nota3 < 10 || this.nota3 > 70) errores.push("Nota 3 debe estar entre 10 y 70");
      if (this.asistencia < 0 || this.asistencia > 100) errores.push("La asistencia debe estar entre 0% y 100%");

      if (errores.length > 0) {
        this.mensajeError = errores.join(" | ");
        this.resultado = '';
        this.aprobado = false;
        return;
      }

      const promedio = (
        this.nota1 * 0.35 +
        this.nota2 * 0.35 +
        this.nota3 * 0.30
      ).toFixed(2);

      if (promedio >= 40 && this.asistencia >= 80) {
        this.resultado = `Promedio: ${promedio} - ¡Aprobado! 🎉`;
        this.aprobado = true;
      } else {
        this.resultado = `Promedio: ${promedio} - Reprobado 😔`;
        this.aprobado = false;
      }
    },

    validarRegistro() {
      this.resetErrores();
      let valido = true;

      // Validar nombre (solo texto)
      const soloTexto = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
      if (!this.registro.nombre) {
        this.errores.nombre = 'El campo nombre es requerido';
        valido = false;
      } else if (!soloTexto.test(this.registro.nombre.trim())) {
        this.errores.nombre = 'El nombre solo debe contener letras';
        valido = false;
      }

      // Validar correo
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.registro.correo || !emailRegex.test(this.registro.correo)) {
        this.errores.correo = 'Formato de correo no válido';
        valido = false;
      }

      // Validar contraseñas
      if (!this.registro.pass1) {
        this.errores.pass1 = 'El campo contraseña es requerido';
        valido = false;
      }

      if (!this.registro.pass2) {
        this.errores.pass2 = 'El campo repetir contraseña es requerido';
        valido = false;
      } else if (this.registro.pass1 !== this.registro.pass2) {
        this.errores.pass2 = 'Las contraseñas no coinciden';
        valido = false;
      }

      if (valido) {
        alert("El registro se ha realizado correctamente 🎉");
      }
    },

    resetErrores() {
      this.errores = {
        nombre: '',
        correo: '',
        pass1: '',
        pass2: ''
      };
    }
  }
}).mount('#app');
