import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Feather from "react-native-vector-icons/Feather"
import colors from '../theme/colors'

export default function Header({ navigation }) {

    return (
        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", backgroundColor: colors.white, }} >
            <View style={{ zIndex: 1, paddingLeft: 20, flexDirection: "row", alignItems: "center", }} >

                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Feather name="arrow-left" size={28} color={colors.black} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
