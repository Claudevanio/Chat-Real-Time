import io from 'socket.io-client';

class Ws {
  socket = io(import.meta.env.VITE_BASE_URL);
  events = new Map();

  constructor() {
    this.socket.onAny((eventName, ...args) => {
      const eventHandler = this.events.get(eventName);
      if (!eventHandler) return;
      eventHandler(...args);
    });
  }

  on(event, handler) {
    if (this.events.has(event)) {
      throw new Error(`Já existe listener para ${event}`);
    }

    this.events.set(event, handler);

    return () => {
      this.off(event);
    };
  }

  off(event) {
    this.events.delete(event);
  }

  send(event, ...args) {
    this.socket.emit(event, ...args);
  }
}

export const ws = new Ws();
