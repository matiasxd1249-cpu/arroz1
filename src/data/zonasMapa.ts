import type { Regla } from '@/data/reglas';

export interface ZonaMapa {
  id: 'planta' | 'bodega' | 'vehiculos' | 'oficinas' | 'evacuacion';
  nombre: string;
  descripcion: string;
  reglas: Regla['id'][];
}

export const ZONAS_MAPA: ZonaMapa[] = [
  {
    id: 'planta',
    nombre: 'Planta de producción',
    descripcion: 'Zona demarcada en amarillo y áreas de producción.',
    reglas: ['R1', 'R2', 'R5'],
  },
  {
    id: 'bodega',
    nombre: 'Bodega',
    descripcion: 'Pasillos peatonales en verde y zona de montacargas.',
    reglas: ['R3', 'R4', 'R5'],
  },
  {
    id: 'vehiculos',
    nombre: 'Vehículos y despachos',
    descripcion: 'Transporte y despachos.',
    reglas: [],
  },
  {
    id: 'oficinas',
    nombre: 'Oficinas administrativas',
    descripcion: 'Computador y correo.',
    reglas: [],
  },
  {
    id: 'evacuacion',
    nombre: 'Evacuación y reporte',
    descripcion: 'Punto de encuentro. Aplica a toda la sede.',
    reglas: ['R6', 'R7'],
  },
];
