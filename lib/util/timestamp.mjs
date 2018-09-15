export function timestamp (text) {
  const time = new Date()
  return `[${
    time.getHours() < 10
    ? `0${time.getHours()}`
    : time.getHours()
  }:${
    time.getMinutes() < 10
    ? `0${time.getMinutes()}`
    : time.getMinutes()
  }:${
    time.getSeconds() < 10
    ? `0${time.getSeconds()}`
    : time.getSeconds()
  } ${text}]`
}
