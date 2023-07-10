import React from "react";
import { Text, } from "react-native";
import { font } from "../services/helper";

export default ({
    lines, fontName, fontSize, color, alignSelf, backgroundColor, flex, width, height,
    marginVertical, marginHorizontal, marginTop, marginLeft, marginRight, marginBottom,
    padding, paddingTop, paddingLeft, paddingBottom, paddingRight, paddingHorizontal, paddingVertical,
    opacity, textAlign, textAlignVertical, text, fontWeight, onPress, lineHeight, textDecorationLine,
    style
}) => {

    return (
        <Text numberOfLines={lines}
            onPress={onPress}

            style={[{
                fontFamily: fontName || font.regular,
                fontSize: fontSize || 16,
                color: color || "#000",
                alignSelf,
                backgroundColor,
                flex,
                width, height,
                marginVertical, marginHorizontal,
                marginTop, marginLeft, marginRight, marginBottom,
                padding, paddingTop, paddingLeft, paddingBottom,
                paddingRight,
                paddingHorizontal, paddingVertical,
                opacity,
                textAlign, textAlignVertical,
               textDecorationLine,
                lineHeight
            }, style]}
        >
            {text}
        </Text >
    );
}