import type { Meta, StoryObj } from '@storybook/react';

import TextButton  from '../../../react-packages/atoms/TextButton/lib/TextButton';

const meta = {
    title: 'Components/Shared/Text Button',
    component: TextButton,
    parameters: {
        layout: 'centered',
        design: {
            type: "figma",
            url: "https://www.figma.com/file/YMZHj1JIgEtElc0v9QZQiH/Details-DT?node-id=2210%3A26668&mode=dev",
        },
    },
    tags: ['autodocs']
} satisfies Meta<typeof TextButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        text: 'Text Button',
        onClick:() => {},
buttonColor:'green',
fontSize: 12,
customClass:'hello'
    },
};