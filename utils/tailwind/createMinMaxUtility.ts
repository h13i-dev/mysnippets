import { tailwindConfig } from './config';
import { minmax } from './minmax';

// Helper function to parse minmax arguments
export const createMinMaxUtility =
  (property: string, screens: Record<string, string> = tailwindConfig.screens) =>
  (value: string) => {
    const args = value.split(',').map((arg: string) => arg.trim());

    // Validate required arguments
    if (!args[0] || !args[1]) {
      console.warn('Invalid minmax value. Format: min,max[,startBreakpoint,endBreakpoint]', value);
      return {};
    }

    // Validate optional arguments
    if (args[2]?.match(/['"]/) || args[3]?.match(/['"]/)) {
      console.warn('Invalid breakpoint value. Breakpoint should not contain quotes.', value);
      return {};
    }

    // Set default breakpoints if not provided
    const minValue = args[0];
    const maxValue = args[1];
    const startBreakpoint = args[2] || tailwindConfig.defaultBreakpoints.minBreakpoint;
    const endBreakpoint = args[3] || tailwindConfig.defaultBreakpoints.maxBreakpoint;
    const unit = args[4] || tailwindConfig.defaultUnit;

    return {
      [property]: `${minmax(minValue, maxValue, startBreakpoint, endBreakpoint, unit, screens)}`,
    };
  };
