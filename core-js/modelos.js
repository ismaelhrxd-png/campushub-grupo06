// core-js/modelos.js
// Clases del dominio (Unidad 1, S4): constructor, getters y métodos propios.

import { validarUsuario, validarLaboratorio, validarReserva } from './validadores.js';

const aMinutos = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

export class Usuario {
  constructor({ id, nombre, correo, codigo, rol = 'estudiante', password }) {
    Object.assign(this, { id, nombre, correo, codigo, rol, password });
  }

  get esAdmin() {
    return this.rol === 'admin';
  }

  get iniciales() {
    return this.nombre
      .split(' ')
      .filter(Boolean)
      .map((p) => p[0].toUpperCase())
      .slice(0, 2)
      .join('');
  }

  errores() {
    return validarUsuario(this);
  }
}

export class Laboratorio {
  constructor({ id, nombre, sede, capacidad, equipos = [], estado = 'disponible' }) {
    Object.assign(this, { id, nombre, sede, capacidad, equipos, estado });
  }

  get estaDisponible() {
    return this.estado === 'disponible';
  }

  tieneEquipo(equipo) {
    return this.equipos.some((e) => e.toLowerCase() === equipo.toLowerCase());
  }

  errores() {
    return validarLaboratorio(this);
  }
}

export class Reserva {
  constructor({ id, codigo, laboratorioId, usuarioId, fecha, horaInicio, horaFin, motivo, estado = 'pendiente', creadoEn }) {
    Object.assign(this, { id, codigo, laboratorioId, usuarioId, fecha, horaInicio, horaFin, motivo, estado, creadoEn });
  }

  get estaActiva() {
    return this.estado !== 'rechazada';
  }

  duracionHoras() {
    return (aMinutos(this.horaFin) - aMinutos(this.horaInicio)) / 60;
  }

  // Se cruzan si es el mismo laboratorio, el mismo día y los intervalos se solapan
  seCruzaCon(otra) {
    return (
      this.laboratorioId === otra.laboratorioId &&
      this.fecha === otra.fecha &&
      aMinutos(this.horaInicio) < aMinutos(otra.horaFin) &&
      aMinutos(otra.horaInicio) < aMinutos(this.horaFin)
    );
  }

  errores() {
    return validarReserva(this);
  }
}

// Regla de negocio: devuelve la primera reserva ACTIVA (no rechazada) con la que
// se cruza la nueva, o undefined si no hay cruce. Una reserva rechazada no ocupa el laboratorio.
export const buscarCruce = (nueva, existentes) =>
  existentes
    .map((r) => (r instanceof Reserva ? r : new Reserva(r)))
    .find((r) => r.estaActiva && r.id !== nueva.id && nueva.seCruzaCon(r));
