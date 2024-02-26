const timeouts: { [id: string]: any } = {};

export function delay(id: string, cb: () => void, delay = 300) {
  clearTimeout(timeouts[id]);
  timeouts[id] = setTimeout(cb, delay);
}
