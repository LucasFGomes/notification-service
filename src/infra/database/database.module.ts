import { NotificationsRepository } from '@application/repositories/NotificationsRepository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { NotificationsRepositoryPrisma } from './prisma/repositories/NotificationsRepositoryPrisma';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: NotificationsRepositoryPrisma,
    },
  ],
  exports: [NotificationsRepository],
})
export class DatabaseModule {}
