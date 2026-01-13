import { render } from '@testing-library/react-native';
import * as React from 'react';
import { HelloWave } from '../hello-wave';

it('renders correctly', () => {
    const tree = render(<HelloWave />).toJSON();
    expect(tree).toMatchSnapshot();
});
