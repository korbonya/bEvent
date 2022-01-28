import { extendTheme } from "native-base";
export const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: '#E6F6FF',
        100: '#BAE3FF',
        200: '#7CC4FA',
        300: '#47A3F3',
        400: '#2186EB',
        500: '#0967D2',
        600: '#0552B5',
        700: '#03449E',
        800: '#01337D',
        900: '#002159',
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
