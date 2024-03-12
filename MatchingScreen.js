import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import * as Location from 'expo-location';

const MatchingScreen = ({ route }) => {
    const { name: initialName, description: initialDescription } = route.params;
    const [name, setName] = useState(initialName);
    const [description, setDescription] = useState(initialDescription);
    const [modalVisible, setModalVisible] = useState(false);
    const [ringModalVisible, setRingModalVisible] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [nearbyUsers, setNearbyUsers] = useState([]);
    const [location, setLocation] = useState(null);
    const [likesCount, setLikesCount] = useState(0);
    const [currentModalUser, setCurrentModalUser] = useState(null);
    // console.log(location);

    const handleRingPress = () => {

        fetch('http://206.12.45.58:3001/api/likeUsers', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: name,
                likeName: currentModalUser.name
            }),
        })
        .then(console.log)
            .then(() => setIsSuccess(true))
            .catch(console.error)

    };

    const closeRingModal = () => {
        setRingModalVisible(false);
    };
    const handleButtonPress = () => {
        setIsSuccess(true);
    };

    const handleHeartPress = (nearbyUser) => { return () => {
        setCurrentModalUser(nearbyUser);
        setModalVisible(true);
    };
    };

    // const handleHeart2Press = () => {
    //     setModalVisible(true);
    // };

    const closeModal = () => {
        setModalVisible(false);
        setIsSuccess(false);
    };

    // get location data of user every 2s
    useEffect(() => {
        async function getLocation() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
        }

        const interval = setInterval(() => getLocation(), 2000)
        return () => {
            clearInterval(interval);
        }
    }, []);


    // get nearby users and user's location every 2s

    useEffect(() => {
        // console.log("hello", location)
        if (!location?.latitude && !location?.longitude) {
            console.log('No location provided to getNearbyUsers request')
            return;
        }
        // console.log(JSON.stringify({
        //     name,
        //     latitude: location.latitude,
        //     longitude: location.longitude,
        // }));

        
        fetch('http://206.12.45.58:3001/api/nearbyUsers', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                latitude: location.latitude,
                longitude: location.longitude,
            }),
        })
            .then(result => result.json())
            .then(result => {
                console.log(result)
                setNearbyUsers(result.nearbyUsers)
                setLikesCount(result.likesCount)
            })
        //     // .then(console.log)
        //     .catch(console.error)

    }, [location])

    // console.log(nearbyUsers.length);
    return (
        <LinearGradient
            style={styles.container}
            colors={["#86F1F9", "#FDD0ED"]}
            start={{ x: 0.1, y: 0.1 }}
            end={{ x: 0.1, y: 1 }}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Love Alarm</Text>
                <View style={styles.animationContainer}>
                    <LottieView
                        source={require("./assets/whiteCircle.json")}
                        autoPlay
                        loop
                        style={styles.animation}
                    />

                    <View style={styles.heartsContainer}>
                        {
                            nearbyUsers?.filter(user => user.name !== name)
                            .map((nearbyUser) => (
                                <TouchableOpacity
                                    key={nearbyUser._id}
                                    style={styles.touchableHeart}
                                    onPress={handleHeartPress(nearbyUser)}
                                >
                                    <LottieView
                                        source={require("./assets/heart.json")}
                                        autoPlay
                                        loop
                                        style={styles.heartanimation}
                                    />
                                </TouchableOpacity>
                            ))
                        }

                    </View>


                    {/* <TouchableOpacity
                        style={styles.touchableHeart}
                        onPress={handleHeart1Press}
                    >
                        <LottieView
                            source={require("./assets/heart.json")}
                            autoPlay
                            loop
                            style={styles.heartanimation}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.touchableHeart}
                        onPress={handleHeart2Press}
                    >
                        <LottieView
                            source={require("./assets/heart.json")}
                            autoPlay
                            loop
                            style={styles.heartanimation2}
                        />
                    </TouchableOpacity> */}
                </View>

            </View>
            <View style={styles.textContainer}>

            <Text style={styles.text}>Someone within a 10-meter </Text>
                <Text style={styles.text}>radius rang your alarm </Text>
            </View>
            <View style={styles.numberContainer}>
                <Text style={styles.number}>{likesCount}</Text>
            </View>

            {/* Pop-up Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >

                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        
                        {isSuccess ? <Text style={styles.buttonText}>SUCCESS!</Text> : (
                            <>
                            <Text style={styles.textTitle}>"I am..."</Text>

                                <Text style={styles.modalText} numberOfLines={2}>
                                    Name: {currentModalUser?.name}
                                </Text>

                                <Text style={styles.modalText} numberOfLines={4}>
                                    Description: {currentModalUser?.description}
                                </Text>

                                <TouchableOpacity style={styles.button} onPress={handleRingPress}>
                                    <Text style={styles.buttonText} >RING</Text>
                                </TouchableOpacity>
                            </>
                        )}




                        <TouchableOpacity onPress={closeModal}>
                            <Text style={styles.closeButton} >Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Gill Sans',
        fontSize: 30,
        marginBottom: -80,
        color: 'white',
    },
    animationContainer: {
        position: 'relative',
        width: 400,
        height: 400,
        marginTop: 50,
        marginBottom: 50,
    },
    animation: {
        width: '100%',
        height: '100%',
    },

    heartanimation: {
        position: 'absolute',
        top: 200,
        left: 200,
        width: '15%',
        height: '20%',
    },
    heartanimation2: {
        position: 'absolute',
        top: 100,
        left: 130,
        width: '15%',
        height: '20%',
    },

    text: {
       
        fontFamily: 'Gill Sans',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    },

    number: {
        fontFamily: 'Gill Sans',
        fontSize: 40, // Adjusted font size
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 100,
    },
    textContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: '70%',
        left: '29%',
        transform: [{ translateX: -20 }, { translateY: -20 }], // Center the text
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalContent: {
        backgroundColor: 'pink',
        padding: 80,
        borderRadius: 200,
        alignItems: 'center',
        paddingBottom: 40, // Adjust as needed
    },

    modalText: {
        fontFamily: 'Gill Sans',
        color: 'white',
        fontSize: 18,

        marginBottom: 20,
    },
    button: {
        backgroundColor: '#F87B92',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },

    buttonText: {
        fontFamily: 'Gill Sans',
        color: 'white',
        fontWeight: 'bold',
    },

    textTitle: {
        fontFamily: 'Gill Sans',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
    },

    closeButton: {
        fontFamily: 'Gill Sans',
        fontSize: 16,
        color: 'white',
        marginTop: 40,
        fontWeight: 'bold',
    },
    touchableHeart: {
        // position: 'absolute',
        width: 320, // Adjust as needed
        height: 230, // Adjust as needed
        // top: 27, // Adjust as needed
        // left: 10, // Adjust as needed
    },
    heartsContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'top',
        left: -30,
        top: -300,
        // display: 'flex',
        // alignItems: 'center',
        //alignContent: 'center',
        // justifyContent: 'center',
        // flexDirection: 'row',
        // columnGap: -250,
        // // flexWrap: 'wrap'
    }
});

export default MatchingScreen;