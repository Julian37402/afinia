import { Injectable } from '@angular/core';
import { ChatMessage, Person } from './models';

const mins = (m: number) => new Date(Date.now() - m * 60000).toISOString();

/**
 * Datos de DEMOSTRACIÓN para la presentación visual.
 * No provienen del backend. Los puntos de integración reales son:
 *   GET /match/potential · POST /match/swipe · GET /match/my-matches · GET|POST /match/{id}/messages
 */
@Injectable({ providedIn: 'root' })
export class DemoDataService {
  query = '';
  minAffinity = 0;
  onlyOnline = false;

  queue: Person[] = [
    { id: 'p1', name: 'Valentina', age: 22, city: 'Villavicencio, Meta', affinity: 92, online: true, tone: 0, likesYou: true,
      bio: 'Amante de los atardeceres llaneros, el buen café y los viajes improvisados. Siempre con la cámara a la mano.',
      interests: ['Viajes', 'Música', 'Naturaleza', 'Fotografía'] },
    { id: 'p2', name: 'Mateo', age: 24, city: 'Villavicencio, Meta', affinity: 87, online: false, tone: 5, likesYou: true,
      bio: 'Amante de la naturaleza, la buena música y las nuevas aventuras. Siempre buscando conocer personas increíbles.',
      interests: ['Viajes', 'Deportes', 'Música', 'Cine'] },
    { id: 'p3', name: 'Sofía', age: 21, city: 'Acacías, Meta', affinity: 90, online: true, tone: 1,
      bio: 'Estudiante de diseño. Me gusta bailar joropo, dibujar y las tardes de lluvia con libros.',
      interests: ['Arte', 'Baile', 'Lectura', 'Café'] },
    { id: 'p4', name: 'Camilo', age: 26, city: 'Bogotá, D.C.', affinity: 81, online: true, tone: 3,
      bio: 'Ingeniero de software, ciclista de fin de semana y fanático de la cocina colombiana.',
      interests: ['Tecnología', 'Ciclismo', 'Cocina', 'Café'] },
    { id: 'p5', name: 'Isabella', age: 23, city: 'Granada, Meta', affinity: 78, online: false, tone: 2,
      bio: 'Veterinaria en formación. Mis perros son mi mundo; también amo el yoga y los planes tranquilos.',
      interests: ['Mascotas', 'Yoga', 'Naturaleza'] },
    { id: 'p6', name: 'Santiago', age: 27, city: 'Cumaral, Meta', affinity: 74, online: true, tone: 4,
      bio: 'Músico y profe de guitarra. Busco a alguien con quien compartir canciones y rutas en moto.',
      interests: ['Música', 'Viajes', 'Videojuegos'] },
  ];

  matches: Person[] = [
    { id: 'm1', name: 'Daniela', age: 23, city: 'Villavicencio, Meta', affinity: 84, online: true, tone: 1,
      bio: 'Fotógrafa y amante del cine independiente.', interests: ['Fotografía', 'Cine', 'Café'] },
    { id: 'm2', name: 'Andrés', age: 26, city: 'Villavicencio, Meta', affinity: 81, online: false, tone: 3,
      bio: 'Entrenador personal. Los domingos son de ciclovía.', interests: ['Deportes', 'Ciclismo', 'Cocina'] },
    { id: 'm3', name: 'Laura', age: 22, city: 'Restrepo, Meta', affinity: 89, online: true, tone: 4,
      bio: 'Bailarina de joropo y profe de primaria.', interests: ['Baile', 'Música', 'Naturaleza'] },
    { id: 'm4', name: 'Paula', age: 24, city: 'Villavicencio, Meta', affinity: 76, online: false, tone: 2,
      bio: 'Chef en formación. Experimento con sabores del Llano.', interests: ['Cocina', 'Viajes', 'Lectura'] },
  ];

  favorites = new Set<string>();
  likesSent = 12;
  unread: Record<string, number> = { m1: 2, m3: 1 };

  private threads: Record<string, ChatMessage[]> = {
    m1: [
      { id: 'a1', fromMe: true, text: '¡Hola Daniela! Vi que también te gusta la fotografía 📷', at: mins(1500) },
      { id: 'a2', fromMe: false, text: '¡Hola! Sí, ayer salí a fotografiar el atardecer', at: mins(1440) },
      { id: 'a3', fromMe: false, text: 'Me encantan tus fotos 😍', at: mins(1420) },
    ],
    m2: [
      { id: 'b1', fromMe: false, text: 'Qué bueno el match, ¿cómo vas?', at: mins(2900) },
      { id: 'b2', fromMe: true, text: 'Muy bien, ¿y tú? ¿Ciclovía este domingo?', at: mins(2880), read: true },
      { id: 'b3', fromMe: false, text: '¿Nos vemos este finde?', at: mins(1380) },
    ],
    m3: [
      { id: 'c1', fromMe: true, text: 'Me encantó tu foto bailando joropo 💃', at: mins(4400), read: true },
      { id: 'c2', fromMe: false, text: 'Gracias por el match 💕', at: mins(4300) },
    ],
    m4: [],
  };

  // ───── Descubrir ─────
  get filteredQueue(): Person[] {
    const q = this.query.trim().toLowerCase();
    return this.queue.filter(p =>
      p.affinity >= this.minAffinity &&
      (!this.onlyOnline || p.online) &&
      (!q || [p.name, p.city, ...p.interests].some(t => t.toLowerCase().includes(q))));
  }

  /** Devuelve el perfil con el que se produjo match (si lo hubo). */
  like(p: Person): Person | null {
    this.removeFromQueue(p);
    this.likesSent++;
    if (!p.likesYou) return null;
    const m: Person = { ...p, id: 'm-' + p.id };
    this.matches.unshift(m);
    this.threads[m.id] = [{ id: 'n' + Date.now(), fromMe: false, text: '¡Hola! 👋 ¿Cómo estás?', at: new Date().toISOString() }];
    this.unread[m.id] = 1;
    return m;
  }
  pass(p: Person) { this.removeFromQueue(p); }
  toggleFavorite(p: Person) { this.favorites.has(p.id) ? this.favorites.delete(p.id) : this.favorites.add(p.id); }
  private removeFromQueue(p: Person) { this.queue = this.queue.filter(x => x.id !== p.id); }

  // ───── Matches / chat ─────
  get filteredMatches(): Person[] {
    const q = this.query.trim().toLowerCase();
    return this.matches.filter(p => !q || [p.name, p.city, ...p.interests].some(t => t.toLowerCase().includes(q)));
  }
  person(id: string): Person | undefined { return this.matches.find(m => m.id === id); }
  messages(id: string): ChatMessage[] { return this.threads[id] ?? []; }
  lastMessage(id: string): ChatMessage | undefined { const t = this.messages(id); return t[t.length - 1]; }

  get conversations(): Person[] {
    return this.matches.filter(m => this.messages(m.id).length)
      .sort((a, b) => (this.lastMessage(b.id)!.at).localeCompare(this.lastMessage(a.id)!.at));
  }
  get unreadTotal(): number { return Object.values(this.unread).reduce((a, b) => a + b, 0); }

  send(id: string, text: string) {
    const t = text.trim();
    if (!t) return;
    (this.threads[id] ??= []).push({ id: 'u' + Date.now(), fromMe: true, text: t, at: new Date().toISOString(), read: false });
  }
  markRead(id: string) { delete this.unread[id]; }

  get averageAffinity(): number {
    const all = [...this.matches, ...this.queue];
    return all.length ? Math.round(all.reduce((s, p) => s + p.affinity, 0) / all.length) : 0;
  }

  // ───── Utilidades de presentación ─────
  timeLabel(iso: string): string {
    const d = new Date(iso), now = new Date();
    const days = Math.floor((new Date(now.toDateString()).getTime() - new Date(d.toDateString()).getTime()) / 864e5);
    if (days <= 0) return d.toLocaleTimeString('es-CO', { hour: 'numeric', minute: '2-digit' });
    if (days === 1) return 'Ayer';
    if (days < 7) return d.toLocaleDateString('es-CO', { weekday: 'short' }).replace('.', '').replace(/^./, c => c.toUpperCase());
    return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short' });
  }
}
