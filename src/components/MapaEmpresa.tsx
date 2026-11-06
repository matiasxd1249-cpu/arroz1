import { useState } from 'react';
import { ArrowLeft, X, HardHat, Forklift, Truck, Monitor, Siren, type LucideIcon } from 'lucide-react';
import TarjetaRegla from '@/components/TarjetaRegla';
import { reglaPorId } from '@/data/reglas';
import { ZONAS_MAPA, type ZonaMapa } from '@/data/zonasMapa';

interface MapaEmpresaProps {
  onVolver: () => void;
}

type ColorZona = 'amarillo' | 'verde' | 'rojo' | 'azul' | 'azulClaro';

const iconoZona: Record<ZonaMapa['id'], LucideIcon> = {
  planta: HardHat,
  bodega: Forklift,
  vehiculos: Truck,
  oficinas: Monitor,
  evacuacion: Siren,
};

const colorZona: Record<ZonaMapa['id'], ColorZona> = {
  planta: 'amarillo',
  bodega: 'verde',
  vehiculos: 'azul',
  oficinas: 'azulClaro',
  evacuacion: 'rojo',
};

const estilosZona: Record<ColorZona, { boton: string; icono: string }> = {
  amarillo: { boton: 'bg-amarillo-claro border-amarillo', icono: 'bg-amarillo text-azulo' },
  verde: { boton: 'bg-verde-claro border-verde', icono: 'bg-verde text-white' },
  rojo: { boton: 'bg-rojo-claro border-rojo', icono: 'bg-rojo text-white' },
  azul: { boton: 'bg-hueso border-azulo', icono: 'bg-azulo text-white' },
  azulClaro: { boton: 'bg-white border-azulo-claro', icono: 'bg-azulo-claro text-white' },
};

export default function MapaEmpresa({ onVolver }: MapaEmpresaProps) {
  const [zonaAbierta, setZonaAbierta] = useState<ZonaMapa | null>(null);

  const zona = (id: ZonaMapa['id']) => ZONAS_MAPA.find((z) => z.id === id)!;

  return (
    <div className="flex flex-col gap-4">
      {zonaAbierta ? (
        <PanelZona zona={zonaAbierta} onCerrar={() => setZonaAbierta(null)} />
      ) : (
        <>
          <p className="text-sm text-azulo/70">Toca una zona para ver las normas que aplican ahí.</p>
          <div className="flex flex-col gap-3">
            <BotonZona zona={zona('planta')} className="min-h-[136px]" onAbrir={setZonaAbierta} />
            <BotonZona zona={zona('bodega')} className="min-h-[120px]" onAbrir={setZonaAbierta} />
            <div className="grid grid-cols-2 gap-3">
              <BotonZona zona={zona('vehiculos')} className="min-h-[156px]" onAbrir={setZonaAbierta} />
              <BotonZona zona={zona('oficinas')} className="min-h-[156px]" onAbrir={setZonaAbierta} />
            </div>
            <BotonZona zona={zona('evacuacion')} className="min-h-[104px]" onAbrir={setZonaAbierta} />
          </div>
        </>
      )}

      <button
        onClick={onVolver}
        className="flex items-center justify-center gap-2 w-full min-h-[56px] rounded-2xl bg-azulo text-white font-bold text-base hover:bg-azulo-claro"
      >
        <ArrowLeft className="w-5 h-5" /> Volver a Consultar norma
      </button>
    </div>
  );
}

interface BotonZonaProps {
  zona: ZonaMapa;
  className: string;
  onAbrir: (zona: ZonaMapa) => void;
}

function BotonZona({ zona, className, onAbrir }: BotonZonaProps) {
  const Icono = iconoZona[zona.id];
  const estilo = estilosZona[colorZona[zona.id]];
  return (
    <button
      onClick={() => onAbrir(zona)}
      aria-label={`Ver normas de ${zona.nombre}`}
      className={`flex flex-col items-center justify-center gap-2 w-full rounded-2xl p-3 border-2 ${estilo.boton} ${className} hover:brightness-95 active:scale-[0.98] transition-transform`}
    >
      <span className={`grid place-items-center w-12 h-12 rounded-xl ${estilo.icono}`}>
        <Icono className="w-7 h-7" strokeWidth={2.2} />
      </span>
      <span className="text-base font-bold text-azulo text-center leading-tight">{zona.nombre}</span>
    </button>
  );
}

interface PanelZonaProps {
  zona: ZonaMapa;
  onCerrar: () => void;
}

function PanelZona({ zona, onCerrar }: PanelZonaProps) {
  const estilo = estilosZona[colorZona[zona.id]];
  const normas = zona.reglas.map((id) => reglaPorId(id)).filter((r) => r !== undefined);

  return (
    <div className={`rounded-3xl border-2 ${estilo.boton} p-5 animate-slide-up`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold text-azulo leading-tight">{zona.nombre}</h2>
          <p className="mt-2 text-base text-azulo/80">{zona.descripcion}</p>
        </div>
        <button
          onClick={onCerrar}
          aria-label="Cerrar zona"
          className="shrink-0 grid place-items-center w-10 h-10 rounded-full bg-white/70 text-azulo hover:bg-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {normas.length === 0 ? (
          <p className="rounded-2xl bg-white/70 p-4 text-base text-azulo/80">
            Todavía no hay normas cargadas para esta zona.
          </p>
        ) : (
          normas.map((r) => <TarjetaRegla key={r.id} regla={r} />)
        )}
      </div>

      <button
        onClick={onCerrar}
        className="mt-5 w-full min-h-[56px] rounded-2xl bg-azulo text-white font-bold text-base hover:bg-azulo-claro"
      >
        Volver al mapa
      </button>
    </div>
  );
}
