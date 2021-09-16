import EatinButton from './EatinButton.vue';

export default {
  title: 'Components/Button',
  component: EatinButton,
  argTypes: {
    type: { control: { type: 'select', options: ['button', 'submit', 'reset', 'link'], default: 'button' } },
    onClick: {}
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { EatinButton },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<eatin-button v-bind="args" />',
});

const defaultLinkArgs = {
  href: "#",
  target: '_blank'
}

export const Default = Template.bind({});
Default.args = {
    text: 'Button',
    ...defaultLinkArgs
}

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  text: 'Button',
  ...defaultLinkArgs
}

export const Secondary = Template.bind({});
Secondary.args = {
  secondary: true,
  text: 'Button',
  ...defaultLinkArgs
}


export const Danger = Template.bind({});
Danger.args = {
    danger: true,
    text: 'Button',
    ...defaultLinkArgs
}

export const Flat = Template.bind({});
Flat.args = {
    flat: true,
    text: 'Button',
    ...defaultLinkArgs
}