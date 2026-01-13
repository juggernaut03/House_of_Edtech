import { fireEvent, render } from '@testing-library/react-native';
import * as React from 'react';
import HomeScreen from '../index';

// Mock expo-router
const mockPush = jest.fn();
jest.mock('expo-router', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

describe('HomeScreen', () => {
    it('renders correctly', () => {
        const { getByText } = render(<HomeScreen />);
        expect(getByText('House of EdTech Demo')).toBeTruthy();
        expect(getByText('React Native + Expo')).toBeTruthy();
    });

    it('navigates to webview on button press', () => {
        const { getByText } = render(<HomeScreen />);
        const button = getByText('WebView + Notifications');
        fireEvent.press(button);
        expect(mockPush).toHaveBeenCalledWith('/webview');
    });

    it('navigates to video player on button press', () => {
        const { getByText } = render(<HomeScreen />);
        const button = getByText('Video Player');
        fireEvent.press(button);
        expect(mockPush).toHaveBeenCalledWith('/video-player');
    });
});
