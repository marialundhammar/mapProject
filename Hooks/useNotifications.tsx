import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Linking, Platform } from 'react-native';

export const useNotifications = () => {
  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('TOKEN', token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

  const handleNotification = (notification: Notifications.Notification) => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Look at that notification',
        body: "I'm so proud of myself!",
      },
      trigger: 4,
    });
  };

  const handleNotificationResponse = (
    response: Notifications.NotificationResponse
  ) => {
    const data: { url?: string } = response.notification.request.content.data;

    if (data?.url) Linking.openURL(data.url);
  };

  const sendNotificationOnBar = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Du verkar vara supernära en bar 🤪',
        body: 'Klicka upp appen och checka in på baren',
      },
      trigger: null,
    });
  };

  return {
    registerForPushNotificationsAsync,
    handleNotification,
    handleNotificationResponse,
    sendNotificationOnBar,
  };
};
