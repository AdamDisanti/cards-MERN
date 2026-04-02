export function storeToken(tok: any): void {
  try {
    if (tok?.accessToken) {
      localStorage.setItem('token_data', tok.accessToken);
    } else if (tok?.jwtToken) {
      localStorage.setItem('token_data', tok.jwtToken);
    } else if (typeof tok === 'string' && tok.length > 0) {
      localStorage.setItem('token_data', tok);
    }
  }
  catch (e) {
    console.log(e);
  }
}

export function retrieveToken(): string | null {
  try {
    return localStorage.getItem('token_data');
  }
  catch (e) {
    console.log(e);
    return null;
  }
}
