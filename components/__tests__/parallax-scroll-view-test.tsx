import { render } from '@testing-library/react-native';
import * as React from 'react';
import { Text, View } from 'react-native';
import ParallaxScrollView from '../parallax-scroll-view';

const MockHeader = () => <View testID="mock-header" />;

it('renders correctly', () => {
    const tree = render(
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#fff', dark: '#000' }}
            headerImage={<MockHeader />}
        >
            <Text>Content</Text>
        </ParallaxScrollView>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
