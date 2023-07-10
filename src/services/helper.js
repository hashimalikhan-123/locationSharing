import { Dimensions } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

const font = {
    bold: 'Poppins-Bold',
    regular: 'Poppins-Regular',
    semibold: 'Poppins-SemiBold',
    medium: 'Poppins-Medium',
    light: 'Poppins-Light',
}


const sHeight = getStatusBarHeight()
const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const wp = float => WIDTH * float / 100
const hp = float => HEIGHT * float / 100






export {
    wp,
    hp,
    font,
    sHeight,
}