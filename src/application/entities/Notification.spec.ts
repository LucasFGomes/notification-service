import { Content } from './Content';
import { Notification } from './Notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('test_content_valid'),
      category: 'social',
      recipientId: 'test_recipient_id',
    });

    expect(notification).toBeTruthy();
  });
});
