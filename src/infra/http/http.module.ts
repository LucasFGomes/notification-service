import { CancelNotificationUseCase } from '@application/useCases/CancelNotificationUseCase';
import { CountRecipientNotificationsUseCase } from '@application/useCases/CountRecipientNotificationsUseCase';
import { GetRecipientNotificationsUseCase } from '@application/useCases/GetRecipientNotificationsUseCase';
import { ReadNotificationUseCase } from '@application/useCases/ReadNotificationUseCase';
import { SendNotificationUseCase } from '@application/useCases/SendNotificationUseCase';
import { UnreadNotificationUseCase } from '@application/useCases/UnreadNotificationUseCase';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotificationUseCase,
    CancelNotificationUseCase,
    CountRecipientNotificationsUseCase,
    GetRecipientNotificationsUseCase,
    ReadNotificationUseCase,
    UnreadNotificationUseCase,
  ],
})
export class HttpModule {}
