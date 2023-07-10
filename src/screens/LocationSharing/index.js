import React, { useState, useEffect } from 'react'
import { Alert, Linking, PermissionsAndroid, Platform, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '../../components/Button';
import Geolocation from 'react-native-geolocation-service';
import DeviceInfo from 'react-native-device-info';
import { addUser, checkUserByUserId, updateUserPositionById } from '../../services/api';
import firestore from '@react-native-firebase/firestore';
import AppLoader from '../../components/AppLoader';


export default function LocationSharing(props) {
    const insets = useSafeAreaInsets()
    const [hasLocationPermission, setHasLocationPermission] = useState(false);
    const [position, setPosition] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userExist, setUserExist] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUniqueId()
        requestLocationPermission()
    }, []);

    const getUniqueId = async () => {
        DeviceInfo.getUniqueId().then(async (uniqueId) => {
            let res = await checkUserByUserId(uniqueId)
            if (!res?.message) {
                setUserExist(res?.success)
            }
            setUserId(uniqueId)
        });
    }


    useEffect(() => {
        if (hasLocationPermission) {
            fetchLocation()
        }
    }, [hasLocationPermission]);


    const requestLocationPermission = async () => {
        setLoading(true)
        if (Platform.OS === 'ios') {
            Geolocation.requestAuthorization('whenInUse')
                .then((result) => {
                    if (result === 'granted') {
                        setHasLocationPermission(true);
                    } else {
                        setLoading(false)
                        Alert.alert(
                            'Alert',
                            "Permission to access location was denied. Please go to the app setting and allow location",
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () => { },
                                },
                                {
                                    text: 'Setting',
                                    onPress: () => openAppSettings(),
                                },
                            ]
                        )
                    }
                })
                .catch((error) => {
                    setLoading(false)
                    setHasLocationPermission(false);
                    console.log('Location permission error:', error);
                });
        }
        else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Device current location permission',
                        message:
                            'Allow app to get your current location',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    setHasLocationPermission(true);
                }
                else {
                    setLoading(false)
                    Alert.alert(
                        'Alert',
                        "Permission to access location was denied. Please go to the app setting and allow location",
                        [
                            {
                                text: 'Cancel',
                                onPress: () => { },
                            },
                            {
                                text: 'Setting',
                                onPress: () => openAppSettings(),
                            },
                        ]
                    )
                }

            } catch (err) {
                setLoading(false)
                console.warn(err);
            }
        }
    };


    const fetchLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                let coards = {
                    latitude: latitude,
                    longitude: longitude
                }
                setLoading(false)
                setPosition(coards)
            },
            (error) => {
                setLoading(false)
                console.log('Error getting location:', error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };
    const openAppSettings = () => {
        Linking.openSettings();
    };
    const shareLiveLocation = async () => {
        setLoading(true)
        if (hasLocationPermission) {
            let body = {
                userId: userId,
                latitude: position?.latitude,
                longitude: position?.longitude,
                // latitude: 31.4024893,
                // longitude: 73.0849342,
                createdAt: firestore.Timestamp.fromDate(new Date()),
                createdBy: userId,

            }
            if (userExist) {
                body.updatedBy = firestore.Timestamp.fromDate(new Date())
                let res = await updateUserPositionById(userId, body)
                if (res?.success) {
                    setLoading(false)
                    props.navigation.navigate('OnlineUsers')
                }
                else {
                    setLoading(false)
                    Alert.alert('Something went wrong')
                }
            }
            else {
                let res = await addUser(body)
                if (res?.success) {
                    setLoading(false)
                    props.navigation.navigate('OnlineUsers')
                }
                else {
                    setLoading(false)
                    Alert.alert('Something went wrong')
                }
            }
        }
        else {
            setLoading(false)
            Alert.alert(
                'Alert',
                "Please check your location in app setting is it enable or not.",
                [
                    {
                        text: 'Cancel',
                        onPress: () => { },
                    },
                    {
                        text: 'Setting',
                        onPress: () => openAppSettings(),
                    },
                ]
            )
        }
    };


    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom, backgroundColor: 'white' }]}>
            <Button onPress={shareLiveLocation} width='50%' text={"Share Live Location"} />
            <AppLoader visible={loading} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', alignItems: 'center'
    }
})