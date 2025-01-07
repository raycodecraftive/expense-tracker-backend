import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


//This service will allow other parts of the app to interact with the database using Prisma.

@Injectable()
export class PrismaService extends PrismaClient{
    constructor() {
        super();
    }
}
