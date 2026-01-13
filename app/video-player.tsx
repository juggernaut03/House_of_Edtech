import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VideoView, useVideoPlayer } from 'expo-video';
import { useEvent, useEventListener } from 'expo';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  PRIMARY,
  WARNING,
  BACKGROUND_DARK,
  BACKGROUND_DARK_SECONDARY,
  BACKGROUND_DARK_TERTIARY,
  BACKGROUND_WHITE,
  BORDER_DARK,
  BORDER_LIGHT,
  TEXT_WHITE,
  TEXT_MUTED,
  TEXT_LIGHT_MUTED,
  VIDEO_PROGRESS_BAR,
  VIDEO_SELECTED_STREAM,
  VIDEO_CONTROL_BUTTON,
  VIDEO_LOADING_OVERLAY,
} from '@/constants/Colors';

// Video stream options
const VIDEO_STREAMS = [
  {
    id: 1,
    title: 'Mux Test Stream 1',
    url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  },
  {
    id: 2,
    title: 'Mux Test Stream 2',
    url: 'https://test-streams.mux.dev/vfc3d7972cchyn05/video.m3u8',
  },
  {
    id: 3,
    title: 'Big Buck Bunny',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.m3u8',
  },
];

export default function VideoPlayerScreen() {
  const router = useRouter();
  const [selectedStream, setSelectedStream] = useState(VIDEO_STREAMS[0]);

  // Use new expo-video API with timeUpdateEventInterval for progress updates
  const player = useVideoPlayer(selectedStream.url, (player) => {
    player.loop = false;
    player.timeUpdateEventInterval = 0.25; // Update every 250ms for smooth progress bar
  });

  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showStreamList, setShowStreamList] = useState(false);

  // Use native event listeners instead of polling - much more performant!

  // Track playing state via useEvent hook (reactive state from events)
  // The playingChange event payload has 'isPlaying' property
  const playingState = useEvent(player, 'playingChange', { isPlaying: player.playing });
  const isPlaying = playingState?.isPlaying ?? false;

  // Track status changes for loading state
  const statusState = useEvent(player, 'statusChange', { status: player.status });
  const isLoading = statusState?.status === 'loading' || statusState?.status === 'idle';

  // Listen for time updates (position changes) - fires based on timeUpdateEventInterval
  useEventListener(player, 'timeUpdate', ({ currentTime }) => {
    setPosition(Math.round(currentTime * 1000));
  });

  // Listen for source load to get duration
  useEventListener(player, 'sourceLoad', () => {
    if (player.duration !== undefined) {
      setDuration(Math.round(player.duration * 1000));
    }
  });

  const togglePlay = () => {
    if (player) {
      if (player.playing) {
        player.pause();
      } else {
        player.play();
      }
    }
  };

  const toggleMute = () => {
    if (player) {
      player.muted = !player.muted;
      setIsMuted(!isMuted);
    }
  };

  const skip = (seconds: number) => {
    if (player && player.currentTime !== undefined && player.duration !== undefined) {
      const newTime = Math.max(
        0,
        Math.min(player.currentTime + seconds, player.duration)
      );
      player.currentTime = newTime;
    }
  };

  // Switch to a different video stream
  const switchStream = (stream: typeof VIDEO_STREAMS[0]) => {
    setSelectedStream(stream);
    setShowStreamList(false);
    setPosition(0);
    setDuration(0);
    // Loading state will be determined by status event
  };

  const formatTime = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={TEXT_WHITE} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>HLS Video Player</Text>
          <Text style={styles.streamName}>{selectedStream.title}</Text>
        </View>
        <TouchableOpacity
          onPress={() => setShowStreamList(!showStreamList)}
          style={styles.streamButton}
        >
          <Text style={styles.streamButtonText}>📺</Text>
        </TouchableOpacity>
      </View>

      {/* Stream selector dropdown */}
      {showStreamList && (
        <View style={styles.streamListContainer}>
          {VIDEO_STREAMS.map((stream) => (
            <TouchableOpacity
              key={stream.id}
              style={[
                styles.streamItem,
                selectedStream.id === stream.id && styles.streamItemSelected,
              ]}
              onPress={() => switchStream(stream)}
            >
              <Text style={styles.streamItemText}>
                {selectedStream.id === stream.id ? '✓ ' : '○ '}
                {stream.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {Platform.OS === 'web' ? (
        <View style={styles.videoPlaceholder}>
          <Text style={styles.videoPlaceholderText}>🎬 Video Player</Text>
          <Text style={styles.videoPlaceholderSubText}>
            This feature works on iOS and Android
          </Text>
          <Text style={styles.videoPlaceholderSubText}>
            Use Expo Go app or mobile emulator
          </Text>
        </View>
      ) : (
        <View style={styles.videoContainer}>
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={TEXT_WHITE} />
            </View>
          )}
          <VideoView
            style={styles.video}
            player={player}
            contentFit="contain"
            allowsPictureInPicture
          />
        </View>
      )}

      {/* Stream info and mute control */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Current Stream: {selectedStream.title}</Text>
        <Text style={styles.infoText}>Status: {isPlaying ? 'Playing' : 'Paused'}</Text>
        <Text style={styles.infoText}>Available Streams: {VIDEO_STREAMS.length}</Text>

        {/* Mute toggle button */}
        <TouchableOpacity
          style={styles.muteButton}
          onPress={toggleMute}
        >
          <Ionicons
            name={isMuted ? 'volume-mute' : 'volume-high'}
            size={24}
            color={TEXT_WHITE}
          />
          <Text style={styles.muteButtonText}>
            {isMuted ? 'Unmute' : 'Mute'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_DARK,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: BACKGROUND_DARK_SECONDARY,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_DARK,
  },
  backButton: {
    paddingVertical: 8,
  },
  backButtonText: {
    color: PRIMARY,
    fontSize: 14,
    fontWeight: '600',
  },
  headerTitleContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: TEXT_WHITE,
  },
  streamName: {
    fontSize: 12,
    color: TEXT_MUTED,
    marginTop: 2,
  },
  streamButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: BACKGROUND_DARK_TERTIARY,
    borderRadius: 6,
  },
  streamButtonText: {
    fontSize: 18,
  },
  streamListContainer: {
    backgroundColor: BACKGROUND_DARK_TERTIARY,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_DARK,
    maxHeight: 200,
  },
  streamItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_DARK,
  },
  streamItemSelected: {
    backgroundColor: VIDEO_SELECTED_STREAM,
  },
  streamItemText: {
    color: TEXT_WHITE,
    fontSize: 14,
    fontWeight: '500',
  },
  videoContainer: {
    width: '100%',
    height: 300,
    backgroundColor: BACKGROUND_DARK,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  videoPlaceholder: {
    width: '100%',
    height: 300,
    backgroundColor: BACKGROUND_DARK_TERTIARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlaceholderText: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 16,
    color: TEXT_WHITE,
  },
  videoPlaceholderSubText: {
    fontSize: 14,
    color: TEXT_LIGHT_MUTED,
    marginVertical: 4,
    textAlign: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: VIDEO_LOADING_OVERLAY,
    zIndex: 10,
  },
  progressContainer: {
    height: 4,
    backgroundColor: BORDER_DARK,
    width: '100%',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: VIDEO_PROGRESS_BAR,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: BACKGROUND_DARK_SECONDARY,
  },
  timeText: {
    color: TEXT_WHITE,
    fontSize: 12,
    fontWeight: '500',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: BACKGROUND_DARK_SECONDARY,
    gap: 16,
  },
  controlButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: VIDEO_CONTROL_BUTTON,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 50,
  },
  playButton: {
    backgroundColor: PRIMARY,
    paddingHorizontal: 24,
  },
  controlButtonText: {
    color: TEXT_WHITE,
    fontSize: 12,
    fontWeight: '600',
  },
  playButtonText: {
    fontSize: 20,
  },
  infoContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_DARK_SECONDARY,
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: 'flex-start',
  },
  infoText: {
    color: TEXT_MUTED,
    fontSize: 14,
    marginVertical: 4,
  },
  muteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BACKGROUND_DARK_TERTIARY,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 16,
    alignSelf: 'flex-start',
    gap: 8,
  },
  muteButtonText: {
    color: TEXT_WHITE,
    fontSize: 14,
    fontWeight: '600',
  },
});
