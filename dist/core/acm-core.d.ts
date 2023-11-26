import { Request } from "express";
declare const accessControlService: {
    auth: (req: any) => boolean;
    client: (req: Request) => boolean;
    service: (req: Request) => boolean;
};
export default accessControlService;
