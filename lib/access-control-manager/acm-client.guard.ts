import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import accessControlService from "../core/acm-core";

@Injectable()
export default class AcmClient implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>("isAcmPublic", context.getHandler());
    const IsService = this.reflector.get<boolean>("IsAcmService", context.getHandler());

    const IsDisable = this.reflector.get<boolean>("IsAcmDisable", context.getHandler());
    const IsHealth = this.reflector.get<boolean>("IsAcmHealth", context.getHandler());

    if (IsHealth) return true;

    const request = context.switchToHttp().getRequest();

    if (IsDisable != true || process.env.NODE_ENV != "development") {
      accessControlService.client(request);
    }
    if (isPublic) return true;
    if (IsService) return accessControlService.service(request);

    return accessControlService.auth(request);
  }
}
