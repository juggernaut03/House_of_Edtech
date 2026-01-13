import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  PRIMARY,
  SUCCESS,
  WARNING,
  BACKGROUND_LIGHT,
  BACKGROUND_WHITE,
  BACKGROUND_GRAY,
  BORDER_LIGHT,
  TEXT_PRIMARY,
  TEXT_TERTIARY,
  TEXT_WHITE,
  BUTTON_DESC_MUTED,
} from '@/constants/Colors';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function WebViewScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [webviewLoading, setWebviewLoading] = useState(true);
  const [notificationSent, setNotificationSent] = useState(false); // Track if notification already sent
  const [buttonsHidden, setButtonsHidden] = useState(false); // Toggle for hiding/showing buttons

  // Request notification permissions and set up notification listener
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Notification permissions are required to use this feature.'
        );
      }
    };

    requestPermissions();

    // Listen for notification responses (when user taps notification)
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data;

        // Deep link to video player if notification indicates it
        if (data.navigateTo === 'video-player') {
          router.push('/video-player');
        }
      }
    );

    return () => subscription.remove();
  }, [router]);

  // Enhanced notification with optional navigation data
  // Uses setTimeout for reliable delay triggering
  const triggerNotification = async (
    title: string,
    body: string,
    delay: number = 3000,
    navigateTo?: string
  ) => {
    try {
      setLoading(true);

      // Show confirmation alert
      Alert.alert(
        'Success',
        `Notification "${title}" will appear in ${delay / 1000} seconds...`
      );

      // Use setTimeout to delay the notification
      setTimeout(async () => {
        try {
          await Notifications.scheduleNotificationAsync({
            content: {
              title,
              body,
              sound: true,
              badge: 1,
              data: {
                navigateTo: navigateTo || undefined,
              },
            },
            trigger: null, // Trigger immediately after delay
          });
        } catch (error) {
          console.error('Notification error:', error);
        }
      }, delay);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert(
        'Error',
        'Failed to schedule notification: ' + (error as Error).message
      );
    }
  };

  // BONUS: Send notification when WebView finishes loading (only once!)
  const handleLoadWebView = async () => {
    setWebviewLoading(false);

    // Only send notification if not already sent
    if (!notificationSent) {
      setNotificationSent(true);

      // Schedule a background notification when content loads (1 second delay)
      setTimeout(async () => {
        try {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: 'Web Content Loaded',
              body: 'Wikipedia page loaded successfully!',
              sound: true,
              data: {},
            },
            trigger: null, // Trigger immediately after delay
          });
        } catch (error) {
          console.error('Failed to send load notification:', error);
        }
      }, 1000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>WebView + Notifications</Text>
        <View style={styles.headerSpacer} />
      </View>

      {Platform.OS === 'web' ? (
        <View style={styles.webPlaceholder}>
          <Text style={styles.webPlaceholderText}>📱 WebView</Text>
          <Text style={styles.webPlaceholderSubText}>
            This feature works on iOS and Android
          </Text>
          <Text style={styles.webPlaceholderSubText}>
            Use Expo Go app or mobile emulator
          </Text>
        </View>
      ) : (
        <>
          {webviewLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={PRIMARY} />
            </View>
          )}

          <WebView
            source={{ uri: 'https://houseofedtech.in/' }}
            style={styles.webview}
            onLoad={() => {
              setWebviewLoading(false);
              handleLoadWebView();
            }}
            onLoadEnd={() => {
              setWebviewLoading(false);
              handleLoadWebView();
            }}
            onLoadStart={() => setWebviewLoading(true)}
            onError={(error) => {
              console.log('WebView error:', error);
              setWebviewLoading(false);
            }}
            startInLoadingState={true}
            scalesPageToFit={true}
            bounces={true}
            scrollEnabled={true}
            useWebKit={true}
            allowsBackForwardNavigationGestures={true}
            decelerationRate="normal"
            javaScriptEnabled={true}
            javaScriptCanOpenWindowsAutomatically={true}
            domStorageEnabled={true}
            cacheEnabled={true}
            cacheMode="LOAD_DEFAULT"
            mixedContentMode="always"
            renderLoading={() => (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={PRIMARY} />
              </View>
            )}
          />
        </>
      )}

      {/* Toggle bar to show/hide buttons */}
      <TouchableOpacity
        style={styles.toggleBar}
        onPress={() => setButtonsHidden(!buttonsHidden)}
        activeOpacity={0.7}
      >
        <View style={styles.toggleHandle} />
        <View style={styles.toggleContent}>
          <Ionicons
            name={buttonsHidden ? 'chevron-up' : 'chevron-down'}
            size={14}
            color={TEXT_TERTIARY}
          />
          <Text style={styles.toggleText}>
            {buttonsHidden ? 'Show Controls' : 'Hide Controls'}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Collapsible button container */}
      {!buttonsHidden && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.successButton]}
            onPress={() => triggerNotification('Welcome!', 'Thanks for using our app!', 2000)}
            disabled={loading}
          >
            <View style={styles.buttonContent}>
              <Ionicons name="notifications" size={20} color={TEXT_WHITE} style={styles.buttonIcon} />
              <Text style={styles.buttonText}>
                {loading ? 'Sending...' : 'Send Notification 1'}
              </Text>
            </View>
            <Text style={styles.buttonDesc}>2 second delay</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.infoButton]}
            onPress={() =>
              triggerNotification(
                'New Content Available',
                "Don't forget to watch the video!",
                4000,
                'video-player' // Deep link to video player when tapped
              )
            }
            disabled={loading}
          >
            <View style={styles.buttonContent}>
              <Ionicons name="time" size={20} color={TEXT_WHITE} style={styles.buttonIcon} />
              <Text style={styles.buttonText}>
                {loading ? 'Sending...' : 'Send Notification 2'}
              </Text>
            </View>
            <Text style={styles.buttonDesc}>4 second delay + link to video</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => router.push('/video-player')}
          >
            <View style={styles.buttonContent}>
              <Ionicons name="play-circle" size={20} color={TEXT_WHITE} style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Go to Video Player</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_LIGHT,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: BACKGROUND_WHITE,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_LIGHT,
  },
  backButton: {
    padding: 4,
  },
  headerSpacer: {
    width: 32,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: TEXT_PRIMARY,
    textAlign: 'center',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND_WHITE,
  },
  webPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND_GRAY,
  },
  webPlaceholderText: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 16,
    color: TEXT_PRIMARY,
  },
  webPlaceholderSubText: {
    fontSize: 14,
    color: TEXT_TERTIARY,
    marginVertical: 4,
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: BACKGROUND_WHITE,
    padding: 12,
    gap: 10,
  },
  toggleBar: {
    backgroundColor: BACKGROUND_WHITE,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: BORDER_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleHandle: {
    width: 40,
    height: 4,
    backgroundColor: BORDER_LIGHT,
    borderRadius: 2,
    marginBottom: 6,
  },
  toggleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  toggleText: {
    fontSize: 12,
    color: TEXT_TERTIARY,
    fontWeight: '500',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  buttonIcon: {
    marginRight: 8,
  },
  primaryButton: {
    backgroundColor: PRIMARY,
  },
  successButton: {
    backgroundColor: PRIMARY,
  },
  infoButton: {
    backgroundColor: PRIMARY,
  },
  buttonText: {
    color: TEXT_WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDesc: {
    color: BUTTON_DESC_MUTED,
    fontSize: 12,
    fontWeight: '400',
  },
});
