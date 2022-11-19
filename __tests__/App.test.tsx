import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from '../components/App';

describe('App', () => {

    it('Should render the google app', async () => {
        render(<App />)
        const googleApp = screen.getByTestId('google-docs-app');
        expect(googleApp).toBeInTheDocument();
    });
});
