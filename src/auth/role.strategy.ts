import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    SetMetadata,
    Logger,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { ExtractJwt } from 'passport-jwt';
  import { JwtService } from '@nestjs/jwt';
  
  export const RolesGuard = (
    roleList: string[],
  ) => SetMetadata('rules', { roleList });
  
  interface Options {
    roleList: string[];
  }
  
  @Injectable()
  export class RolesGuardClass implements CanActivate {
    private readonly logger = new Logger(RolesGuardClass.name);
    /** RoleAccessStrategy */
  
    constructor(
      private readonly reflector: Reflector,
      private readonly jwtService: JwtService,
    ) { }
  
    /**
     * decryptToken - decrypt token structure
     * @param {ExecutionContext} context - guard context
     */
    decryptToken(
      context: ExecutionContext,
    ): any {
      const request = context.switchToHttp().getRequest();
      try {
        const getToken = ExtractJwt.fromAuthHeaderAsBearerToken();
        const token = getToken(request);

        const user = this.jwtService.decode(token);
  
        if (!user) {
          this.logger.log('Invalid Token')
          throw new HttpException(`Unauthorized`, HttpStatus.UNAUTHORIZED);
        }
  
        return user;
      } catch (error) {
        throw new HttpException(`Unauthorized`, HttpStatus.UNAUTHORIZED);
      }
    }
  
    /**
     * canActivate - role and decrypt token structure
     * @param {ExecutionContext} context - guard context
     * @returns {Promise<boolean>} - boolean endpoint access
     */
    async canActivate(
      context: ExecutionContext,
    ): Promise<boolean> {
      const options = this.reflector.get<Options>('rules', context.getHandler());
  
      if (!options) {
        return true;
      }
  
      const { user } = this.decryptToken(context);
      const request = context.switchToHttp().getRequest();
      request.user = user;

      const access = await this.validateUserRole(user.roles, options.roleList)
      
      return access 
    }

    async validateUserRole(roles: string[], roleList: string[]): Promise<boolean> {
      let access = false;
        for (const reqUserRole of roles) {
          if (roleList.includes(reqUserRole)) {
              access = true
              this.logger.log('User role is valid')
          }
        }
      return access;
    }
  }