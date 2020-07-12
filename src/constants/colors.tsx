/**
 * Receives a color string and returns a pre-assigned system color
 * @param color
 */

export const getButtonColor = (color : string): string => {
  switch (color) {
    case 'red':
      return 'rgb(190, 49, 35)';

    case 'orange':
      return 'rgb(212, 85, 21)';

    case 'yellow':
      return 'rgb(216, 178, 43)';

    case 'green':
      return 'rgb(32, 157, 7)';

    case 'blue':
      return 'rgb(30, 96, 213)';

    case 'purple':
      return 'rgb(148, 18, 185)';

    case 'turquoise':
      return 'rgb(39, 186, 165)';

    case 'gray':
      return 'rgb(100, 100, 100)';

    case 'pink':
      return 'rgb(213, 10, 138)';

    default:
      return color;
  }
}