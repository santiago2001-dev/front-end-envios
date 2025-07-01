import { Component, Input, OnDestroy, OnInit, NgZone, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-track-shipment',
  templateUrl: './track-shipment.component.html',
  styleUrls: ['./track-shipment.component.css']
})
export class TrackShipmentComponent implements OnInit, OnDestroy {
  @Input() shipmentId!: number;
  @Output() cerrarModal = new EventEmitter<void>();

  estados: string[] = ['En espera', 'En camino', 'Entregado'];
  currentEstado: string = 'Obteniendo estado...';
  sse: EventSource | null = null;
  visible: boolean = false;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    if (this.shipmentId) {
      this.abrirSeguimiento();
    }
  }

  abrirSeguimiento(): void {
    this.visible = true;

    fetch(`https://envios.devinovate.online/api/shipments/${this.shipmentId}`)
      .then((res) => res.json())
      .then((data) => {
        this.ngZone.run(() => {
          this.currentEstado = data.estado || 'En espera';
        });
      })
      .catch(() => {
        this.ngZone.run(() => {
          this.currentEstado = 'En espera';
        });
      });

    this.sse = new EventSource(`https://envios.devinovate.online/api/shipments/events/${this.shipmentId}`);
    this.sse.onmessage = (event) => {
      this.ngZone.run(() => {
        this.currentEstado = event.data;
      });
    };

    this.sse.onerror = (error) => {
      console.error('Error SSE:', error);
    };
  }

  cerrar(): void {
    this.visible = false;
    if (this.sse) {
      this.sse.close();
      this.sse = null;
    }
    this.cerrarModal.emit(); // Notifica al padre que debe desmontar el componente
  }

  ngOnDestroy(): void {
    this.cerrar();
  }

  get progressPercent(): number {
    const index = this.estados.indexOf(this.currentEstado);
    return ((index + 1) / this.estados.length) * 100;
  }
}
