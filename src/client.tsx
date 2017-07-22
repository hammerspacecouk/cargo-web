import { h, render } from 'preact';
import App from './App';

// todo, cut the mustard test

const root = document.getElementById('root');
const target = document.getElementById('app');
render(<App name="Client" />, root, target);
