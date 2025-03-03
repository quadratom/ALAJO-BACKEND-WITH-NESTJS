import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) return false;

    try {
      const token = authHeader.split(' ')[1]; // Extract token
      const decoded = this.jwtService.verify(token, {secret: process.env.JWT_SECRET});
      request.user = decoded; // Attach user to request
      request.userId = decoded?.userId
      return true;
    } catch(e) {
      return false;
    }
  }
}
