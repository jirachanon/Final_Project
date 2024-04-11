import {configureStore} from '@reduxjs/toolkit'
import slices from './components/slices';

export default configureStore({
    reducer: {
        slices: slices,
    },
});

