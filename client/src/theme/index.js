import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#32105b',
        },
        background: {
            default: '#fdfdfd',
            paper: '#fdfdfd',
        },
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        backgroundColor: 'transparent', // Removes blue background when focused
                    },
                    '&.Mui-filled': {
                        backgroundColor: 'transparent', // Removes blue background when filled
                    },
                    '& input:-webkit-autofill': {
                        backgroundColor: 'transparent', // Handles autofill background
                        WebkitBoxShadow: '0 0 0 1000px #fdfdfd inset', // Match light theme background
                        WebkitTextFillColor: '#000', // Ensures autofill text is visible
                    },
                },
            },
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#872cf5',
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        backgroundColor: 'transparent', // Removes blue background when focused
                    },
                    '&.Mui-filled': {
                        backgroundColor: 'transparent', // Removes blue background when filled
                    },
                    '& input:-webkit-autofill': {
                        backgroundColor: 'transparent', // Handles autofill background
                        WebkitBoxShadow: '0 0 0 1000px #1e1e1e inset', // Match dark theme background
                        WebkitTextFillColor: '#fff', // Ensures autofill text is visible
                    },
                },
            },
        },
    },
});
