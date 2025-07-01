export class Envio {
    id: number;
    usuario_id: number;
    origen: string;
    destino: string;
    peso: number;
    alto: number;
    ancho: number;
    largo: number;
    peso_utilizado: number;
    valor_cotizado: number;
    estado: string;
    creado_en: Date;
  
    constructor(data: Partial<Envio> = {}) {
      this.id = data.id ?? 0;
      this.usuario_id = data.usuario_id ?? 0;
      this.origen = data.origen ?? '';
      this.destino = data.destino ?? '';
      this.peso = Number(data.peso ?? 0);
      this.alto = Number(data.alto ?? 0);
      this.ancho = Number(data.ancho ?? 0);
      this.largo = Number(data.largo ?? 0);
      this.peso_utilizado = Number(data.peso_utilizado ?? 0);
      this.valor_cotizado = Number(data.valor_cotizado ?? 0);
      this.estado = data.estado ?? '';
      this.creado_en = data.creado_en ? new Date(data.creado_en) : new Date();
    }
  }
  