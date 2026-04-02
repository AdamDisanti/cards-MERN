const appName = import.meta.env.VITE_APP_NAME || '143.244.149.236';
const apiPort = import.meta.env.VITE_API_PORT || '5001';

export function buildPath(route: string): string {
  const host = import.meta.env.MODE !== 'development' ? appName : 'localhost';
  return `http://${host}:${apiPort}/${route}`;
}
