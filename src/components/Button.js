import React from 'react'
import { ActivityIndicator, TouchableOpacity } from 'react-native'
import { font } from '../services/helper'
import colors from '../theme/colors'
import LatoText from './LatoText'

export default function Button({
    width = "50%", height = 45, backgroundColor = colors.primaryColor, borderWidth, borderColor, borderRadius = 8, text, textColor = colors.white, marginTop, marginBottom, onPress, alignSelf, loading, styles
}) {
    return (
        <TouchableOpacity {...{ onPress }}
            style={[styles,{ width, height, backgroundColor, borderRadius, justifyContent: "center", borderWidth, borderColor,  alignItems: "center", marginTop, marginBottom, alignSelf }]}
        >
            {
                loading ?
                    <ActivityIndicator size={"small"} color={colors.white} />
                    :
                    <LatoText {...{ text }} color={textColor} fontName={font.medium} fontSize={14} />
            }
        </TouchableOpacity>
    )
}
