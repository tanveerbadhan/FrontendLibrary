import type { Meta, StoryObj } from '@storybook/react';
import { MyButton } from './MyButton';

const meta = {
  title: 'Components/Shared/MyButton',
  component: MyButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs']
} satisfies Meta<typeof MyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {
  args: {
    onPress: () => {},
    text: 'My Button Stories'
  },
};

/* import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MyButton } from "./MyButton";

export default {
  title: "components/MyButton",
  component: MyButton,
} as ComponentMeta<typeof MyButton>;

export const Basic: ComponentStory<typeof MyButton> = (args) => (
  <MyButton {...args} />
);

Basic.args = {
  text: "Hello World",
  color: "purple",
}; */