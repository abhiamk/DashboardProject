export interface LoginRequest {
  email: string,
  password: string
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}


export interface FkLoginRequest {
  username: string,
  password: string,
  expiresInMins?: number
}
export interface FkLoginResponse {
  accessToken: string,
  refreshToken: string,
  id: number,
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  gender: string,
  image: string
}




