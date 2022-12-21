import { Content } from './Content';

describe('Notification content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('TEST_CONTENT');

    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification content with length less than 5 characters', () => {
    expect(() => new Content('TEST')).toThrow();
  });

  it('should not be able to create a notification content with length more than 240 characters', () => {
    expect(() => new Content('TEST'.repeat(241))).toThrow();
  });
});
