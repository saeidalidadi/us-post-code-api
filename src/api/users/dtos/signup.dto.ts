import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UserSignupDto {
  @IsString()
  @MinLength(5)
  @MaxLength(12)
  @Matches(/^[!@1234567890._]+$/)
  username: string;

  @IsString()
  @MinLength(5)
  @Matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)
  password: string;
}
