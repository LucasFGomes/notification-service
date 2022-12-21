import { Notification } from '../../src/application/entities/Notification';
import { NotificationsRepository } from '../../src/application/repositories/NotificationsRepository';

export class NotificationsRepositoryInMemory
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }
}
