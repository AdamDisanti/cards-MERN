export function buildPath(route: string): string {
  if (import.meta.env.MODE !== 'development') {
    return '/' + route;
  }
  else {
    return 'http://localhost:5001/' + route;
  }
}




