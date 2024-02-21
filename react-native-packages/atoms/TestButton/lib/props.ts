import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface TestButtonPropos {
    /**
     * Text to display inside the button
     */
    buttonText: string;
    /**
     * Variant of the button
     */
    variant?: 'primary' | 'secondary';
    /**
     * Icon to display on the left side of the button
     */
    leftIcon?: string;
    /**
     * Icon to display on the right side of the button
     */
    rightIcon?: string;
    /**
     * Function to call when the button is pressed
     */
    onPress: () => void;
    /**
     * Custom Styles for the button and icons
     */
    customStyle?: {
        /**
         * Custom style for the button
         */
        buttonStyle?: StyleProp<ViewStyle>;
        /**
         * Custom style for the text inside the button
         */
        buttonTextStyle?: StyleProp<TextStyle>;
        /**
         * Custom style for the left icon
         */
        leftIconStyle?: StyleProp<ImageStyle>;
        /**
         * Custom style for the right icon
         */
        rightIconStyle?: StyleProp<ImageStyle>;
    };
}
