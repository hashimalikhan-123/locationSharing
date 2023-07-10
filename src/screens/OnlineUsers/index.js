import React, { useState, useEffect, useRef } from 'react'
import { Alert, Linking, PermissionsAndroid, Platform, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import Geolocation from 'react-native-geolocation-service';
import { getUsers } from '../../services/api'
import Header from '../../components/Header'
import FontAwesome from "react-native-vector-icons/FontAwesome"

export default function OnlineUsers(props) {
    const insets = useSafeAreaInsets()
    const [hasLocationPermission, setHasLocationPermission] = useState(false);
    const [position, setPosition] = useState(null);
    const [users, setUsers] = useState([]);
    const ref = useRef(null);

    useEffect(() => {
        const getOnlineUsers = async () => {
            let res = await getUsers()
            if (res?.success) {
                setUsers(res?.data)
            }
            else {
                Alert.alert('Something went wrong')
            }
        }
        getOnlineUsers()
        requestLocationPermission()
    }, []);
    useEffect(() => {
        if (hasLocationPermission) {
            fetchLocation()
        }
    }, [hasLocationPermission]);



    const requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            Geolocation.requestAuthorization('whenInUse')
                .then((result) => {
                    if (result === 'granted') {
                        setHasLocationPermission(true);
                    } else {
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
                console.warn(err);
            }
        }
    };
    const openAppSettings = () => {
        Linking.openSettings();
    };
    const fetchLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                let coards = {
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }
                setPosition(coards)
            },
            (error) => {
                console.log('Error getting location:', error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom, backgroundColor: 'white', }]}>
            <Header navigation={props.navigation} />

            <View style={{ flex: 1, width: '100%' }}>

                {
                    position ?
                        <MapView
                            showsMyLocationButton={false}
                            zoomEnabled={true}
                            style={{ width: "100%", flex: 1 }}
                            initialRegion={position}>
                            {position && (
                                <Marker
                                    coordinate={position}
                                    title="Current Location"
                                    description="Your current location"
                                >
                                    <FontAwesome name="map-marker" size={30} color="red" />
                                </Marker>
                            )}
                            {
                                users?.map((item, index) =>
                                    <Marker

                                        key={index}
                                        coordinate={{ latitude: item.latitude, longitude: item.longitude }}
                                        title={item?.userId}
                                        description="User details here"
                                    >
                                        <FontAwesome name="map-marker" size={30} color="red" />
                                    </Marker>
                                )
                            }
                        </MapView>
                        :
                        <View style={styles.map}>

                        </View>
                }

                {/* </ScrollView> */}
            </View>

            {/* <LatoText text={""} alignSelf={'center'}/> */}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
})