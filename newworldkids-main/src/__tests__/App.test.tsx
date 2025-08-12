import { render, screen } from '@testing-library/react';
import App from '../src/App';

test('renders main app', () => {
  render(<App />);
  expect(screen.getByText(/new world kids/i)).toBeInTheDocument();
});
