import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getDatabase, ref, onValue, update } from 'firebase/database'; 


const DashboardScreen = ({ navigation }) => {
    const [temperature, setTemperature] = useState(null); 
    const [humidity, setHumidity] = useState(null); 
    const [history, setHistory] = useState([]); 
    const [ledModalVisible, setLedModalVisible] = useState(false);
    const [ledStatus, setLedStatus] = useState(false);
    const [red, setRed] = useState(false); 
    const [green, setGreen] = useState(false); 
    const [blue, setBlue] = useState(false); 
    

    const db = getDatabase(); 
    const temperatureRef = ref(db, '/sensorReading/temp'); 
    const humidityRef = ref(db, '/sensorReading/humid'); 
    const ledRef = ref(db, '/LED');

    useEffect(() => {
        const temperatureListener = onValue(temperatureRef, (snapshot) => {
            const temp = snapshot.val();
            if (temp !== null) {
                setTemperature(temp);
            }
        });
    
        const humidityListener = onValue(humidityRef, (snapshot) => {
            const hum = snapshot.val();
            if (hum !== null) {
                setHumidity(hum);
            }
        });
    
        return () => {
            temperatureListener();
            humidityListener();
        };
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setHistory((prevHistory) => [
                ...prevHistory,
                { temperature, humidity, timestamp: new Date().toLocaleTimeString() }
            ]);
        }, 10000);
    
        return () => clearInterval(intervalId);
    }, [temperature, humidity]);

    const updateLED = (color, value) => {
        if (ledStatus) {
            // When toggle is on, control LEDs individually
            const newState = {};
            newState[color] = value ? 255 : 0;
            update(ref(db, '/LED'), newState);
    
            if (color === 'red') setRed(value);
            if (color === 'green') setGreen(value);
            if (color === 'blue') setBlue(value);
        } else {
            // When toggle is off, control LEDs one by one
            const newState = { red: 0, green: 0, blue: 0 };
            if (value) {
                newState[color] = 255;
            }
            update(ref(db, '/LED'), newState);
            setRed(newState.red === 255);
            setGreen(newState.green === 255);
            setBlue(newState.blue === 255);
        }
    };
    

    const handleLedToggle = (value) => {
        setLedStatus(value);
        if (!value) {
            // Turn off all LEDs when the toggle is turned off
            update(ref(db, '/LED'), { red: 0, green: 0, blue: 0 });
            setRed(false);
            setGreen(false);
            setBlue(false);
        }
    };

    const dashBtn = () => {
        navigation.navigate('DashboardScreen');
        navigation.reset({
          index: 0,
          routes: [{name: 'DashboardScreen'}],
        });
    }

    const aboutBtn = () => {
        navigation.navigate('AboutScreen');
        navigation.reset({
          index: 0,
          routes: [{name: 'AboutScreen'}],
        });
    }

    const logoutBtn = () => {
        navigation.navigate('WelcomeScreen');
        navigation.reset({
          index: 0,
          routes: [{name: 'WelcomeScreen'}],
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Temperature Sensor</Text>
            <View style={styles.Btncontainer}>
                <TouchableOpacity style={styles.controlBtn} 
                onPress={() => setLedModalVisible(true)} >
                    <Text style={styles.controlBtnText}>RGB Controller</Text>
                </TouchableOpacity>
            </View>
 
            {/* LED modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={ledModalVisible}
                onRequestClose={() => setLedModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>RGB Controller</Text>
                        <View style={styles.switchContainer}>
                            <Text style={styles.switchLabel}>Red</Text> 
                            <Switch 
                                value={red} 
                                onValueChange={(value) => updateLED('red', value)} 
                            /> 
                            <Text style={styles.switchLabel}>Green</Text> 
                            <Switch 
                                value={green} 
                                onValueChange={(value) => updateLED('green', value)} 
                            /> 
                            <Text style={styles.switchLabel}>Blue</Text> 
                            <Switch 
                                value={blue} 
                                onValueChange={(value) => updateLED('blue', value)} 
                            />
                            <Text style={styles.switchLabel}>RGB combinations: {ledStatus ? 'On' : 'Off'}</Text>
                            <Switch
                                value={ledStatus}
                                onValueChange={handleLedToggle}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setLedModalVisible(false)}
                        >
                            <Text style={styles.modalButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Stacked temp and humidity */}
            <View style={styles.dataContainer}>
                <View style={styles.dataItem}>
                    <Text style={styles.dataLabel}>Temperature</Text>
                    <View style={styles.dataValueContainer}>
                        <Text style={styles.dataValue}>{temperature}</Text>
                        <Text style={styles.dataUnit}>°C</Text>
                    </View>
                </View>
                <View style={styles.dataItem}>
                    <Text style={styles.dataLabel}>Humidity</Text>
                    <View style={styles.dataValueContainer}>
                        <Text style={styles.dataValue}>{humidity}</Text>
                        <Text style={styles.dataUnit}>%</Text>
                    </View>
                </View>
            </View>

            <View style={styles.historyContainer}>
                <Text style={styles.historyTitle}>History (every 10 seconds)</Text>
                <ScrollView style={styles.historyList} showsVerticalScrollIndicator={false}>
                    {history.slice(-5).map((entry, index) => (
                        <View key={index} style={styles.historyItem}>
                            <Text style={styles.historyText}>
                                {entry.timestamp}{'\n'}  
                                Temp:<Text style={{ color: 'lightblue' }}> {entry.temperature}°C</Text>{'\n'}         
                                Humidity: <Text style={{ color: 'lightgreen' }}> {entry.humidity}%</Text>
                            </Text>
                        </View>
                    ))}
                </ScrollView>
            </View>

            {/* Navbar */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={dashBtn}>
                    <Ionicons name="grid-outline" size={24} color="#4A87F4" />
                    <Text style={[styles.navText, { color: '#4A87F4' }]}>Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={aboutBtn}>
                    <Ionicons name="information-circle-outline" size={24} color="#888" />
                    <Text style={styles.navText}>About</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={logoutBtn}>
                    <Ionicons name="log-out-outline" size={24} color="#888" />
                    <Text style={styles.navText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#08051D',
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#CCCCCC',
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 20,
    },
    Btncontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    controlBtn: {
        backgroundColor: '#242090',
        padding: 5,
        borderRadius: 8,
        marginBottom: 20,
        width: '40%',
        marginLeft: '60%',
    },
    controlBtnText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#1A2B3C', // Dark blue modal background
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#87CEFA', // Light blue for title
        marginBottom: 20,
    },
    switchContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20,
    },
    switchLabel: {
        fontSize: 18,
        marginRight: 10,
        color: '#fff', // White switch label text
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#4A90E2',
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
    },
    dataContainer: {
        marginLeft: 10,
    },
    dataItem: {
        marginBottom: 15,
    },
    dataLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#888',
    },
    dataValueContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    dataValue: {
        fontSize: 60,
        fontWeight: 'normalize',
        color: 'white',
    },
    dataUnit: {
        fontSize: 28,
        color: 'white',
        marginLeft: 4,
        alignSelf: 'flex-start',
    },
    historyContainer: {
        backgroundColor: '#202438',
        padding: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        height: '35%',
    },
    historyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
        textAlign: 'center',
    },
    historyList: {
        maxHeight: 200,
    },
    historyItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    historyText: {
        fontSize: 16,
        color: '#fff', // White for history text
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#262438',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#333',
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        color: '#888',
        fontSize: 12,
        marginTop: 4,
    },
});

export default DashboardScreen;

