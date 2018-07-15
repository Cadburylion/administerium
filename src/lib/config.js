export function baseURL() {
  let hostname = window.location.hostname;
  switch (hostname) {
    case 'localhost':
      return 'http://localhost:8080';
    default:
      return `https://${hostname}`;
  }
}
