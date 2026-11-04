// core-js/estadisticas.js
// Estadísticas con funciones de orden superior, Map, Set y closures (Unidad 1, S2, S4, S5).

// Reservas por estado con reduce: el valor inicial es un objeto con los tres
// estados en cero, así el resultado siempre trae todas las claves.
export const reservasPorEstado = (reservas) =>
  reservas.reduce(
    (acc, r) => ({ ...acc, [r.estado]: (acc[r.estado] ?? 0) + 1 }),
    { pendiente: 0, aprobada: 0, rechazada: 0 }
  );

// Ocupación por laboratorio con Map: laboratorioId -> horas aprobadas
export const ocupacionPorLaboratorio = (reservas, horasDe) => {
  const mapa = new Map();
  reservas
    .filter((r) => r.estado === 'aprobada')
    .forEach((r) => mapa.set(r.laboratorioId, (mapa.get(r.laboratorioId) ?? 0) + horasDe(r)));
  return mapa;
};

// Sedes únicas con Set
export const sedesUnicas = (laboratorios) => [...new Set(laboratorios.map((l) => l.sede))];

// Ranking de laboratorios más reservados con sort y operador spread.
// Devuelve [{ laboratorioId, total }, ...] de mayor a menor.
export const rankingLaboratorios = (reservas) => {
  const conteo = new Map();
  reservas.forEach((r) => conteo.set(r.laboratorioId, (conteo.get(r.laboratorioId) ?? 0) + 1));
  return [...conteo]
    .map(([laboratorioId, total]) => ({ laboratorioId, total }))
    .sort((a, b) => b.total - a.total || a.laboratorioId - b.laboratorioId);
};

// Generador de códigos con closure: el contador queda "encerrado" y no se puede
// modificar desde fuera. generadorCodigos() -> RES-0001, RES-0002, ...
export const generadorCodigos = (prefijo = 'RES', inicio = 0) => {
  let contador = inicio;
  return () => {
    contador += 1;
    return `${prefijo}-${String(contador).padStart(4, '0')}`;
  };
};

// Para continuar la numeración a partir de las reservas existentes
export const generadorDesde = (reservas, prefijo = 'RES') => {
  const maximo = reservas.reduce((max, r) => {
    const n = Number(String(r.codigo ?? '').split('-')[1]);
    return Number.isFinite(n) && n > max ? n : max;
  }, 0);
  return generadorCodigos(prefijo, maximo);
};
