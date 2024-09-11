import { Cookies } from 'react-cookie';
import { IncomingMessage } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';

class TokenService {
  private static instance: TokenService;
  private cookies: Cookies;

  private constructor() {
    this.cookies = new Cookies();
  }

  static getInstance(): TokenService {
    if (!TokenService.instance) {
      TokenService.instance = new TokenService();
    }
    return TokenService.instance;
  }

  setToken(token: string): void {
    this.cookies.set('token', token, { path: '/', maxAge: 86400 }); // 1 día
  }

  getToken(): string | null {
    return this.cookies.get('token') || null;
  }

  clearToken(): void {
    this.cookies.remove('token', { path: '/' });
  }

  // Método para inicializar cookies en el servidor
  static initServerSide(req: IncomingMessage & { cookies: NextApiRequestCookies }): TokenService {
    const instance = TokenService.getInstance();
    instance.cookies = new Cookies(req.cookies);
    return instance;
  }
}

export const tokenService = TokenService.getInstance();
