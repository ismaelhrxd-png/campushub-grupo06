# CampusHub – Proyecto Integral de JavaScript Avanzado

Curso: JavaScript Avanzado (100000SI56) – UTP

## Integrantes

| Integrante | Usuario de GitHub |
|---|---|
| Ismael Huaranga Rodríguez Enriquez | _(completar)_ |
| _(completar)_ | _(completar)_ |
| _(completar)_ | _(completar)_ |

## Dominio elegido

CampusHub Labs (caso base): catálogo = laboratorios, transacción = reservas.
Regla de negocio mínima: no se cruzan dos reservas del mismo laboratorio en el mismo horario.

## Uso de IA

_(Declarar aquí si se usó código generado con IA. Cada integrante debe poder explicarlo línea por línea.)_

## Estructura

```
campushub-grupoNN/
├── core-js/          núcleo JS reutilizable (Unidad 1)
├── api-mock/         json-server + db.json (avances 1–4)
├── angular-admin/    panel del administrador (avance 1)
├── react-estudiante/ portal del estudiante (avances 2 y 3)
├── vue-kiosko/       kiosko de disponibilidad (avance 4)
├── next-publico/     página pública SSR (avance 4)
└── api-express/      backend real con JWT (avance 5)
```

## Cómo ejecutar

### core-js (pruebas)

```bash
cd core-js
node --test
```

### api-mock (puerto 3000)

```bash
cd api-mock
npm install
npm run api
```

Endpoints del avance 1: `GET/POST /laboratorios`, `GET/PUT/DELETE /laboratorios/:id`,
`GET/POST /reservas`, `DELETE /reservas/:id`.

Usuarios de prueba: `admin1@utp.edu.pe` / `admin123` y `u20231234@utp.edu.pe` / `est123`.

### angular-admin (puerto 4200) – pendiente

```bash
cd angular-admin
npm install
npm start
```

## Avances

| Avance | Semana | Estado | Etiqueta |
|---|---|---|---|
| 1 – core-js, API simulada y panel Angular | 13 | En curso (core-js y api-mock listos) | `avance-1` |
| 2 – Portal React con Hooks | 14 | Pendiente | `avance-2` |
| 3 – React + API (Fetch, Axios, Alova) | 15 | Pendiente | `avance-3` |
| 4 – Kiosko Vue y Next.js SSR | 16 | Pendiente | `avance-4` |
| 5 – Express + JWT e integración final | 17 | Pendiente | `avance-5` |
