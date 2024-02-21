import type { Preview } from "@storybook/react";
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport:{
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iPhone6',
    },
    /* backgrounds: {
      default: 'twitter',
      values: [
        {
          name: 'twitter',
          value: '#00aced',
        },
        {
          name: 'facebook',
          value: '#3b5998',
        },
      ],
    }, */
  },
};

export default preview;
