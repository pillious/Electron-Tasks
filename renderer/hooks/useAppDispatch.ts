// More info: https://redux.js.org/usage/usage-with-typescript

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/index';

// Use throughout your app instead of plain `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
