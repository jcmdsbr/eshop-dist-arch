class TokenDto {
  constructor(public accessToken: string, public expiredAt: number) {}
}

export default TokenDto;
