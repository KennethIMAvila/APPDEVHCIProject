import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

const DashboardScreen = ({ navigation }) => {
    const temperature = 32.3;
    const humidity = 27;
    const lastUpdated = '2024-11-27 11:58:34';

    const chartData = {
        labels: ['05:00', '06:00', '07:00', '08:00', '09:00'], // time; at least 5
        datasets: [
            {
                data: [17.9, 23.9, 25.9, 28.1, 32.3], // the last 5 temperatures
                strokeWidth: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // temperature (white)
            },
            {
                data: [51, 47, 43, 36, 27], // the last 5 humidities
                strokeWidth: 2,
                color: (opacity = 1) => `rgba(102, 217, 255, ${opacity})`, // humidity (lght blue)
            },
        ],
    };

    const chartConfig = {
        backgroundGradientFrom: '#262438',
        backgroundGradientTo: '#262438',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        decimalPlaces: 1,
        propsForDots: {
            r: '5',
            strokeWidth: '2',
            stroke: '#fff',
        },
    };

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

            <Text style={styles.lastUpdated}>Data last updated: {lastUpdated}</Text>

            <View style={styles.chartContainer}>
                {/* chart legend -- */}
                <View style={styles.legendContainer}>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendColorBox, { backgroundColor: 'white' }]} />
                        <Text style={styles.legendText}>Temperature</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendColorBox, { backgroundColor: '#66D9FF' }]} />
                        <Text style={styles.legendText}>Humidity</Text>
                    </View>
                </View>
                <LineChart
                    data={chartData}
                    width={screenWidth - 40}
                    height={220}
                    yAxisLabel=""
                    yAxisInterval={1}
                    chartConfig={chartConfig}
                    withDots
                    withVerticalLabels
                />
                <Text style={styles.historyTitle}>History</Text>
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
    lastUpdated: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
        marginBottom: 20,
    },
    chartContainer: {
        backgroundColor: '#262438',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    historyTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#CCCCCC',
        marginTop: 10,
    },
    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    legendColorBox: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 5,
    },
    legendText: {
        color: '#CCCCCC',
        fontSize: 14,
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
