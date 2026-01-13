import { render } from '@testing-library/react-native';
import * as React from 'react';
import { Text } from 'react-native';
import { ThemedView } from '../themed-view';

it('renders correctly', () => {
    const tree = render(
        <ThemedView>
            <Text>Snapshot test!</Text>
        </ThemedView>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
