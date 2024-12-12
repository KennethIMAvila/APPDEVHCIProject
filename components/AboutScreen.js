import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking, ScrollView, Modal} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const teamMembers = [
    {
        name: 'Erica Janne Damaso',
        role: 'Project Manager',
        image: 'https://via.placeholder.com/100',
        links: {
            email: 'mailto:damasoericajanne@gmail.com',
            github: 'https://github.com/gg2',
            twitter: 'https://twitter.com/gg2',
        },
        roledes: "This is the person that oversees timelines, resources, and budgets; ensures alignment with the team and effectively communicates to stakeholders.",
    },
    {
        name: 'Jerico Evangelista',
        role: 'UI/UX Designer',
        image: 'https://via.placeholder.com/100',
        links: {
            email: 'mailto:jerico@example.com',
            github: 'https://github.com/jerico',
            twitter: 'https://twitter.com/jerico',
        },
        roledes: "This is the person that designs an application's user interface and user experience to be user-friendly, nice-looking, and obvious in the flow of interaction with the incorporation of wireframes, prototypes, and visual designs.",
    },
    {
        name: 'Jameel Tutungan',
        role: 'Front-End Developer',
        image: 'https://via.placeholder.com/100',
        links: {
            email: 'mailto:gg.com',
            github: 'https://github.com/gg',
            twitter: 'https://twitter.com/gg',
        },
        roledes: 'This is the person that integrates the UI/UX design into the front end of the app. They work with languages and frameworks such as Swift, Kotlin, Flutter, or React Native to provide a responsive and interactive user interface.',
    },
    {
        name: 'Kenneth Ivan Avila',
        role: 'Back-End Developer',
        image: 'https://via.placeholder.com/100',
        links: {
            email: 'mailto:avilakennetivan@gmail.com',
            github: 'https://github.com/KennethIMAvila',
        },
        roledes: 'This is the person that is concerned with server-side logic, maintaining APIs, database interactions, and the functionality of an application that supports seamless and secure connectivity between the front end and the database.',
    },
    {
        name: 'Rene Boy Bravo',
        role: 'Quality Assurance',
        image: 'https://via.placeholder.com/100',
        links: {
            email: 'mailto:bravoreneboy@gmail.com',
            github: 'https://github.com/gg2',
            twitter: 'https://twitter.com/gg2',
        },
        roledes: 'This is the person that performs application testing to assess the quality, functionality, and performance of the app, with auditing for security vulnerabilities. They perform both manual and automated testing, ensure secure coding practices, and work towards maintaining the app according to data protection and cybersecurity standards.',
    },
    {
        name: 'Jomel Marino',
        role: 'Release Manager',
        image: 'https://via.placeholder.com/100',
        links: {
            email: 'mailto:gg2@example.com',
            github: 'https://github.com/gg2',
            twitter: 'https://twitter.com/gg2',
        },
        roledes: 'This is the person that is in charge of managing version control and integrating front-end and back-end codebases. They communicate with the team about versioning and the release schedule to ensure deployments are stable and that development workflow is predictable.',
    },
    {
        name: 'John Lee Arcilla',
        role: 'Database Administrator',
        image: 'https://via.placeholder.com/100',
        links: {
            email: 'mailto:gg2@example.com',
            github: 'https://github.com/gg2',
            twitter: 'https://twitter.com/gg2',
        },
        roledes: 'This is the person that is responsible for general database architecture, performance, and security. Guarantees data integrity and access by optimizing data storage and retrieval with a focus on reliability and efficiency. ',
    },
    {
        name: 'Lovely Regilisa',
        role: 'User Insights Specialist',
        image: 'https://via.placeholder.com/100',
        links: {
            email: 'mailto:regilisalovely@gmail.com',
            github: 'https://github.com/gg2',
            twitter: 'https://twitter.com/gg2',
        },
        roledes: "This is the person that merges consumer analysis and content strategy in making sure that app feature developments tune in with user expectations. They analyze market trends and users' feedback and develop in-app content that enhances the usability of the app, aligning it with user needs.",
    },
];


const AboutScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    

    const dashBtn = () => {
        navigation.navigate('DashboardScreen')
        navigation.reset({
          index: 0,
          routes: [{name: 'DashboardScreen'}],
        });
      }
    
      const aboutBtn = () => {
        navigation.navigate('AboutScreen')
        navigation.reset({
          index: 0,
          routes: [{name: 'AboutScreen'}],
        });
      }
    
      const logoutBtn = () => {
        navigation.navigate('WelcomeScreen')
        navigation.reset({
          index: 0,
          routes: [{name: 'WelcomeScreen'}],
        });
      }
    return (
        <View style={styles.container}>
            <View contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>About Us</Text>

                <Text style={styles.generalFunctionTitle}>General Function of the Application</Text>
                <Text style={styles.description}>
                    Our application is designed to provide accurate real-time temperature and humidity data,
                    ensuring users can monitor environmental conditions efficiently. With user-friendly features,
                    intuitive design, and reliable functionality, it caters to daily needs for tracking and managing
                    environmental information.
                </Text>

                <Text style={styles.teamTitle}>Team Specialization and Contributions</Text>
                <ScrollView style={styles.teamContainer} showsVerticalScrollIndicator={false}>
                {teamMembers.map((member, index) => (
                    <View key={index} style={styles.profileCard}>
                        <TouchableOpacity onPress={() => setModalVisible(member)}>
                        <Image source={{ uri: member.image }} style={styles.profileImage} />
                        <Text style={styles.profileName}>{member.name}</Text>
                        <Text style={styles.profileRole}>{member.role}</Text>
                        </TouchableOpacity>
                        <View style={styles.profileLinks}>
                            <TouchableOpacity onPress={() => openLink(member.links.email)}>
                            <Ionicons name="mail-outline" size={20} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => openLink(member.links.github)}>
                            <Ionicons name="logo-github" size={20} color="#fff" style={styles.iconSpacing} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => openLink(member.links.twitter)}>
                            <Ionicons name="logo-twitter" size={20} color="#fff" style={styles.iconSpacing} />
                            </TouchableOpacity>
                        </View>    
                        {modalVisible === member && (
                        <Modal visible={true} onRequestClose={() => setModalVisible(null)} transparent={true} animationType="fade">
                            <View style={styles.modalContainer}>
                            <Image source={{ uri: member.image }} style={styles.modalImage} />
                            <Text style={styles.modalName}>{member.name}</Text>
                            <Text style={styles.modalRole}>{member.role}</Text>
                            <Text style={styles.modalRoleDes}>{member.roledes}</Text>
                            </View>
                        </Modal>
                        )}
                    </View>
                    ))}
                </ScrollView>
            </View>


            {/* navbar */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={(dashBtn)}>
                    <Ionicons name="grid-outline" size={24} color="#888" />
                    <Text style={styles.navText}>Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={(aboutBtn)}>
                    <Ionicons name="information-circle-outline" size={24} color="#4A87F4" />
                    <Text style={[styles.navText, { color: '#4A87F4' }]}>About</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={(logoutBtn)}>
                    <Ionicons name="log-out-outline" size={24} color="#888" />
                    <Text style={styles.navText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const openLink = (url) => {
    // link redirector
    Linking.openURL(url).catch((err) => console.error("Couldn't load URL", err));
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#08051D',
        padding: 20,
    },
    scrollContainer: {
        paddingBottom: 60,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginTop: 20,
        marginBottom: 20,
    },
    generalFunctionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#CCCCCC',
        marginBottom: 10,
        marginLeft: 10,
    },
    teamTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#CCCCCC',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#CCCCCC',
        lineHeight: 22,
        marginBottom: 20,
        marginLeft: 10,
    },
    teamContainer: {
        marginTop: 20,
        height: "35%",
    },
    profileCard: {
        backgroundColor: '#262438',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal: 50,
        borderWidth: 2.5,
        borderColor: '#434064',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
        alignSelf: 'center',
    },
    profileName: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 4,
        textAlign: 'center',
    },
    profileRole: {
        fontSize: 14,
        color: '#CCCCCC',
        marginBottom: 14,
        textAlign: 'center',
    },
    profileLinks: {
        flexDirection: 'row',
    },
    iconSpacing: {
        marginLeft: 15,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',  
    },    
    modalContainer: {
        backgroundColor: '#262438',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        height: '85%',    
        width: '90%', 
        alignSelf: 'center',
        marginTop: '5%',
        borderWidth: 2.5,
        borderColor: '#434064',
    },
    modalImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
        alignSelf: 'center',            
    },  
    modalName: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 4,
        textAlign: 'center',
    },
    modalRole: {
        fontSize: 14,
        color: '#CCCCCC',
        marginBottom: 40,
        textAlign: 'center',
    },    
    modalRoleDes: {
        fontSize: 16,
        color: '#CCCCCC',
        textAlign: 'justify',
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

export default AboutScreen;
