import React from 'react'
import { ActivityIndicator, Modal, View } from 'react-native'
import colors from '../theme/colors'

export default function AppLoader({visible}) {
    return (
        <Modal {...{ visible }} transparent={true} animationType="slide"  >
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.7)" }} >
                <ActivityIndicator size={"large"} color={colors.white} />
            </View>
        </Modal>
    )
}
