import { NextRequest, NextResponse } from 'next/server';
import { AxiosResponse } from 'axios';
import { api } from '@utils';
import { ErrorCommon } from '@types';
import { tokenService } from '@services';

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ILoginResponse {
  user: {
    id: number;
  };
  token: string;
}

export async function POST(request: NextRequest) {
  const body: ILoginRequest = await request.json();

  try {
    const response = await api.post<ILoginRequest, AxiosResponse<ILoginResponse & ErrorCommon>>(
      'auth/login',
      body
    );

    const jsonResponse = NextResponse.json(response.data);

    if (response.status !== 200 || (response.data.statusCode ?? 0) >= 400) return jsonResponse;

    tokenService.setToken(response.data.token);
    jsonResponse.cookies.set('token', response.data.token, {
      path: '/',
      maxAge: 604800,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return jsonResponse;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(error?.response?.data ?? {});
  }
}
