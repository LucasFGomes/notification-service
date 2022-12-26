import { NotificationsRepositoryInMemory } from '@test/repositories/NotificationsRepositoryInMemory';
import { SendNotificationUseCase } from './SendNotificationUseCase';

describe('Send Notification', () => {
  it('should to be able to send notification', async () => {
    const notificationsRepository = new NotificationsRepositoryInMemory();
    const sendNotification = new SendNotificationUseCase(
      notificationsRepository,
    );

    const { notification } = await sendNotification.execute({
      recipientId: 'example_recipient_id',
      category: 'social',
      content: 'example_content',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
