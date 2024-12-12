import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Switch } from 'react-native';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getDatabase, ref, onValue, update } from 'firebase/database'; 

const screenWidth = Dimensions.get('window').width;

const DashboardScreen = ({ navigation }) => {
    const [temperature, setTemperature] = useState(null); 
    const [humidity, setHumidity] = useState(null); 
    const [history, setHistory] = useState([]); 

    const db = getDatabase(); 
    const temperatureRef = ref(db, '/sensorReading/temp'); 
    const humidityRef = ref(db, '/sensorReading/humid'); 

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

            {/* stacjked temp and humidity */}
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

            {/* navbar */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={() => { }}>
                    <Ionicons name="grid-outline" size={24} color="#4A87F4" />
                    <Text style={[styles.navText, { color: '#4A87F4' }]}>Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('AboutScreen')}>
                    <Ionicons name="information-circle-outline" size={24} color="#888" />
                    <Text style={styles.navText}>About</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('WelcomeScreen')}>
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
        marginBottom: 40,
        marginTop: 20,
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
