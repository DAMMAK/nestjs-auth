export class UserResponse {
  username: string;
  status: string;
  accessToken: string;
  refreshToken: string;

  constructor(data: Partial<UserResponse>) {
    this.username = data.username;
    this.status = data.status || 'active';
    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
  }
}
