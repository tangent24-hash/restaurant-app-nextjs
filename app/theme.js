'use client';
import { createTheme } from '@mui/material/styles';

// const roboto = Roboto({
//   weight: ['300', '400', '500', '700'],
//   subsets: ['latin'],
//   display: 'swap',
// });

const theme = createTheme({
  typography: {
    fontFamily: ["Noto Serif Bengali", "serif"].join(","),
  },
});

export default theme;