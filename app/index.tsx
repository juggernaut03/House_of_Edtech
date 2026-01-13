import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  PRIMARY,
  SUCCESS,
  WARNING,
  BACKGROUND_LIGHT,
  BACKGROUND_WHITE,
  BACKGROUND_DARK,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
  TEXT_TERTIARY,
  TEXT_MUTED,
  TEXT_WHITE,
  BUTTON_DESC,
} from '@/constants/Colors';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>House of EdTech Demo</Text>
          <Text style={styles.subtitle}>React Native + Expo</Text>
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>Features</Text>
          <View style={styles.featureItem}>
            <Text style={styles.featureBullet}>• </Text>
            <Text style={styles.featureText}>WebView Integration</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureBullet}>• </Text>
            <Text style={styles.featureText}>Push Notifications</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureBullet}>• </Text>
            <Text style={styles.featureText}>HLS Video Playback</Text>
          </View>
        </View>

        <View style={styles.buttonsSection}>
          <TouchableOpacity
            style={[styles.mainButton, styles.webviewButton]}
            onPress={() => router.push('/webview')}
          >
            <View style={styles.buttonRow}>
              <Ionicons name="phone-portrait-outline" size={22} color={TEXT_WHITE} style={styles.buttonIcon} />
              <Text style={styles.buttonLabel}>WebView + Notifications</Text>
            </View>
            <Text style={styles.buttonDesc}>Embed websites and send notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.mainButton, styles.videoButton]}
            onPress={() => router.push('/video-player')}
          >
            <View style={styles.buttonRow}>
              <Ionicons name="play-circle-outline" size={22} color={TEXT_WHITE} style={styles.buttonIcon} />
              <Text style={styles.buttonLabel}>Video Player</Text>
            </View>
            <Text style={styles.buttonDesc}>HLS video streaming with custom controls</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerSection}>
          <Text style={styles.footerText}>v1.0.0</Text>
          <Text style={styles.footerText}>Expo + React Native</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_LIGHT,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
    justifyContent: 'space-between',
  },
  headerSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: PRIMARY,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: TEXT_TERTIARY,
    fontWeight: '500',
  },
  featuresSection: {
    backgroundColor: BACKGROUND_WHITE,
    borderRadius: 12,
    padding: 20,
    marginVertical: 24,
    borderLeftWidth: 4,
    borderLeftColor: PRIMARY,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  featureBullet: {
    fontSize: 20,
    color: SUCCESS,
    marginRight: 8,
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: 15,
    color: TEXT_SECONDARY,
    flex: 1,
  },
  buttonsSection: {
    gap: 12,
  },
  mainButton: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    justifyContent: 'center',
    shadowColor: BACKGROUND_DARK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  buttonIcon: {
    marginRight: 10,
  },
  webviewButton: {
    backgroundColor: PRIMARY,
  },
  videoButton: {
    backgroundColor: PRIMARY,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_WHITE,
  },
  buttonDesc: {
    fontSize: 13,
    color: BUTTON_DESC,
    fontWeight: '400',
  },
  footerSection: {
    alignItems: 'center',
    marginTop: 16,
  },
  footerText: {
    fontSize: 12,
    color: TEXT_MUTED,
    fontWeight: '500',
    marginVertical: 2,
  },
});
