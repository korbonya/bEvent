import { extendTheme } from "native-base";
export const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: '#e6eafe',
        100: '#b5bffc',
        200: '#8494fb',
        300: '#536af9',
        400: '#223ff7',
        500: '#0825dd',
        600: '#061dac',
        700: '#04157b',
        800: '#030c4a',
        900: '#010419',
      },
      coolGray: {
        50: '#F5F7FA',
        100: '#E4E7EB',
        200: '#CBD2D9',
        300: '#9AA5B1',
        400: '#7B8794',
        500: '#616E7C',
        600: '#52606D',
        700: '#3E4C59',
        800: '#323F4B',
        900: '#1F2933',
      },
      // Redefinig only one shade, rest of the color will remain same.
      amber: {
        400: '#d97706',
      },
    },
  });
