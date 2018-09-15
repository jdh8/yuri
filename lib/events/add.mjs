export function addEvents (client, events) {
  if (!Array.isArray(events)) events = Object.values(events)
  for (const {name, event} of events) {
    client.on(name, event)
  }
}
