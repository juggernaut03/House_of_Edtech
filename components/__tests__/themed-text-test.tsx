import { render } from '@testing-library/react-native';
import * as React from 'react';
import { ThemedText } from '../themed-text';

it('renders correctly', () => {
    const tree = render(<ThemedText>Snapshot test!</ThemedText>).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders title type correctly', () => {
    const { getByText } = render(<ThemedText type="title">Title Text</ThemedText>);
    const textElement = getByText('Title Text');
    expect(textElement).toBeTruthy();
});
