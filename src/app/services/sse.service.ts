// src/app/services/sse.service.ts
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SseService {
  constructor(private zone: NgZone) {}

  getShipmentStatus(url: string): Observable<string> {
    return new Observable(observer => {
      const eventSource = new EventSource(url);

      eventSource.onmessage = (event) => {
        this.zone.run(() => {
          observer.next(event.data);
        });
      };

      eventSource.onerror = (error) => {
        this.zone.run(() => {
          eventSource.close();
          observer.error(error);
        });
      };
    });
  }
}
