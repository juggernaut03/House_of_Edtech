import { render } from '@testing-library/react-native';
import * as React from 'react';
import VideoPlayerScreen from '../video-player';

// Mock expo-video
jest.mock('expo-video', () => {
    const { View } = require('react-native');
    return {
        useVideoPlayer: jest.fn(() => ({
            play: jest.fn(),
            pause: jest.fn(),
            replace: jest.fn(),
            addListener: jest.fn(() => ({ remove: jest.fn() })),
            removeListener: jest.fn(),
            status: 'idle',
            playing: false,
            muted: false,
            duration: 100,
            currentTime: 0,
        })),
        VideoView: (props: any) => <View testID="video-view" {...props} />,
    };
});

// Mock expo hooks that expect an EventEmitter
jest.mock('expo', () => ({
    ...jest.requireActual('expo'),
    useEvent: jest.fn(() => ({ isPlaying: false, status: 'idle' })),
    useEventListener: jest.fn(),
}));

describe('VideoPlayerScreen', () => {
    it('renders correctly', () => {
        const { getByText } = render(<VideoPlayerScreen />);
        expect(getByText('HLS Video Player')).toBeTruthy();
    });
});
