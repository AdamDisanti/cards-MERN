const app_name = '143.244.149.236';

export function buildPath(route: string): string {
  if (import.meta.env.MODE !== 'development') {
    return 'http://' + app_name + ':5001/' + route;
  }
  else {
    return 'http://localhost:5001/' + route;
  }
}




