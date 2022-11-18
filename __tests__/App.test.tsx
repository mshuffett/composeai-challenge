import { render, screen } from '@testing-library/react';
import App from '../components/App';

describe('PageContainer', () => {
    it('Should render components', async () => {
        render(<App />)
        const googleApp = screen.getByTestId('google-docs-app');
        expect(googleApp).not.toBeNull();
    });
});
