import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import React from 'react';
import { TestButtonPropos } from './props';
import TestPackage from '@Frontend_Ui_Lib_App/TestPackage';
import { styles } from './styles';

const TestButton: React.FC<TestButtonPropos> = ({
    buttonText,
    variant = 'primary',
    onPress,
    customStyle
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.button,
                { backgroundColor: variant === 'primary' ? 'blue' : 'green' },
                customStyle?.buttonStyle
            ]}
        >
            <Text style={[styles.buttonText, customStyle?.buttonTextStyle]}>{buttonText}</Text>
            <TestPackage />
        </TouchableOpacity>
    );
};

export default TestButton;
