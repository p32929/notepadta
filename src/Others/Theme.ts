import {createTheme} from '@material-ui/core/styles';
import {red} from '@material-ui/core/colors';

// Create a theme instance.
export const theme = createTheme({
    palette: {
        primary: {
            main: '#0288D1',
        },
        secondary: {
            main: '#795548',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },
    overrides: {
        MuiTab: {
            root: {
                textTransform: 'none',
            }
        }
    }
});
