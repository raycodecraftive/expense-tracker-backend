import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return this.validateRequest(request);
  }

  validateRequest(
    request: any,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // token validation logic

    const header = request.headers.authorization;

    if (!header) {
      throw new UnauthorizedException('Authorization header is missing');
    }


    const token = header.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    const data = this.jwtService.verify(token);
    request.user = data.sub;

    return true;
  }
}
