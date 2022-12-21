import { Module } from '@nestjs/common';
import { NotificationsRepository } from 'src/application/repositories/NotificationsRepository';
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
