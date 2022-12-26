import { makeNotification } from '@test/factories/notification-factory';
import { NotificationsRepositoryInMemory } from '@test/repositories/NotificationsRepositoryInMemory';
import { NotificationNotFound } from './errors/NotificationNotFound';
import { ReadNotificationUseCase } from './ReadNotificationUseCase';

describe('Read Notification', () => {
  it('should to be able to read notification', async () => {
    const notificationsRepository = new NotificationsRepositoryInMemory();
    const readNotification = new ReadNotificationUseCase(
      notificationsRepository,
    );

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await readNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should to be able to read notification a non existing notification', () => {
    const notificationsRepository = new NotificationsRepositoryInMemory();
    const readNotification = new ReadNotificationUseCase(
      notificationsRepository,
    );

    expect(() => {
      return readNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
