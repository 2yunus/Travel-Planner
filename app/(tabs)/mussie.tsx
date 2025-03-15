import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { auth, db } from '@/configs/firebaseConfig';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default function Mussie() {
    const user = auth.currentUser;
    const [trips, setTrips] = useState<any[]>([]);

    // Fetch Trips from Firebase
    useEffect(() => {
        const fetchTrips = async () => {
            if (!user) return;

            try {
                const q = query(collection(db, 'userTrips'), where('userEmail', '==', user.email));
                const querySnapshot = await getDocs(q);
                const fetchedTrips = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setTrips(fetchedTrips);
            } catch (error) {
                console.error('Error fetching trips:', error);
                Alert.alert('Error', 'Failed to load trips.');
            }
        };

        fetchTrips();
    }, []);

    // Delete Trip
    const handleDeleteTrip = async (tripId: string) => {
        Alert.alert('Confirm', 'Are you sure you want to delete this trip?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await deleteDoc(doc(db, 'userTrips', tripId));
                        setTrips(trips.filter(trip => trip.id !== tripId));
                        Alert.alert('Deleted', 'Trip deleted successfully.');
                    } catch (error) {
                        console.error('Error deleting trip:', error);
                        Alert.alert('Error', 'Failed to delete trip.');
                    }
                }
            }
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Trips</Text>
            {trips.length === 0 ? (
                <Text style={styles.noTrips}>No trips found.</Text>
            ) : (
                <FlatList
                    data={trips}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.tripCard}>
                            <Image source={{ uri: item.tripData.location.photo }} style={styles.tripImage} />
                            <Text style={styles.tripTitle}>{item.tripData.location.name}</Text>
                            <Text style={styles.tripDetails}>Budget: {item.tripData.budget.title} {item.tripData.budget.icon}</Text>
                            <Text style={styles.tripDetails}>Travelers: {item.tripData.travelers.title} ({item.tripData.travelers.people}) {item.tripData.travelers.icon}</Text>
                            <Text style={styles.tripDetails}>Duration: {item.tripData.travelDuration.totalTravelDays} days ({item.tripData.travelDuration.startDate.toDate().toDateString()} - {item.tripData.travelDuration.endDate.toDate().toDateString()})</Text>

                            <Text style={styles.sectionTitle}>Daily Plan:</Text>
                            {item.tripPlan.dailyPlan.map((day: any, index: number) => (
                                <View key={index} style={styles.dayContainer}>
                                    <Text style={styles.dayTitle}>{day.day}</Text>
                                    {day.schedule.map((activity: any, i: number) => (
                                        <Text key={i} style={styles.activity}>• {activity.time} - {activity.activity} ({activity.location})</Text>
                                    ))}
                                </View>
                            ))}

                            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteTrip(item.id)}>
                                <Text style={styles.deleteButtonText}>Delete Trip</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    noTrips: {
        textAlign: 'center',
        fontSize: 18,
        color: '#888',
    },
    tripCard: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    tripImage: {
        width: '100%',
        height: 180,
        borderRadius: 10,
        marginBottom: 10,
    },
    tripTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    tripDetails: {
        fontSize: 16,
        color: '#555',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    dayContainer: {
        marginTop: 5,
    },
    dayTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007bff',
    },
    activity: {
        fontSize: 14,
        color: '#333',
    },
    deleteButton: {
        backgroundColor: '#ff4d4d',
        padding: 10,
        marginTop: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

