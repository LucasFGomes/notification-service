import { CancelNotificationUseCase } from '@application/useCases/CancelNotificationUseCase';
import { CountRecipientNotificationsUseCase } from '@application/useCases/CountRecipientNotificationsUseCase';
import { GetRecipientNotificationsUseCase } from '@application/useCases/GetRecipientNotificationsUseCase';
import { ReadNotificationUseCase } from '@application/useCases/ReadNotificationUseCase';
import { SendNotificationUseCase } from '@application/useCases/SendNotificationUseCase';
import { UnreadNotificationUseCase } from '@application/useCases/UnreadNotificationUseCase';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../viewModels/NotificationViewModel';

@Controller('/notifications')
export class NotificationsController {
  constructor(
    private readonly sendNotificationUseCase: SendNotificationUseCase,
    private readonly cancelNotificationUseCase: CancelNotificationUseCase,
    private readonly readNotificationUseCase: ReadNotificationUseCase,
    private readonly unreadNotificationUseCase: UnreadNotificationUseCase,
    private readonly countNotificationUseCase: CountRecipientNotificationsUseCase,
    private readonly getRecipientNotificationsUseCase: GetRecipientNotificationsUseCase,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotificationUseCase.execute({ notificationId: id });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countNotificationUseCase.execute({
      recipientId,
    });

    return { count };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } =
      await this.getRecipientNotificationsUseCase.execute({ recipientId });

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotificationUseCase.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotificationUseCase.execute({ notificationId: id });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotificationUseCase.execute({
      recipientId,
      content,
      category,
    });

    return { notification: NotificationViewModel.toHTTP(notification) };
  }
}
