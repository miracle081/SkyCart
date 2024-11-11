import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Theme } from './Theme';

export function AppBotton({ disabled, textStyle, onPress, children, style, textColor, buttonColor, icon }) {

    const styles = StyleSheet.create({
        btn: {
            // flex: 1,
            borderRadius: 30,
            backgroundColor: buttonColor || Theme.colors.primary,
            padding: 5,
        },
    });
    return (
        <TouchableOpacity disabled={disabled} activeOpacity={0.7} onPress={onPress} style={[styles.btn, style]}>
            {icon}
            <Text style={[{ color: textColor || "white", textAlign: "center", fontSize: 17, fontFamily: Theme.fonts.text600 }, textStyle]}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}

