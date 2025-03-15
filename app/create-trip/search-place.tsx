import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CreateTripContext } from '@/context/CreateTripContext';
import Constants from 'expo-constants';

export default function SearchPlace() {
    const navigation = useNavigation();
    const router = useRouter();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: 'Search Place',
        });
    }, [navigation]);

    // ✅ Extract tripData and setTripData from context
    const { tripData, setTripData } = useContext(CreateTripContext) ?? {};

    if (!setTripData) {
        console.error("setTripData is missing! Ensure CreateTripProvider is wrapping the app.");
        return null; // Prevents rendering if context is not available
    }

    const setTripDetails = (data, details) => {
        setTripData((prevTripData) => ({
            ...prevTripData, // Preserve existing trip data
            location: { // Ensure consistency with ReviewTrip.tsx
                name: data.description,
                coordinates: details?.geometry.location, // { lat: ..., lng: ... }
                photoRef: details?.photos?.[0]?.photo_reference,
                url: details?.url,
            },
        }));
    
        console.log("Updated Trip Data:", tripData); // Debugging log
        router.push("/create-trip/select-traveler");
    };

    return (
        <View style={styles.page}>
            <GooglePlacesAutocomplete
                placeholder="Search Place"
                fetchDetails={true}
                minLength={2}
                debounce={300}
                styles={{
                    textInputContainer: {
                        borderWidth: 1,
                        borderRadius: 5,
                        marginTop: 25,
                        paddingTop: 5,
                    },
                }}
                onPress={setTripDetails} // ✅ Correct function call
                onFail={(error) => console.log("Google Places Error:", error)}
                query={{
                    key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
                    language: 'en',
                    components: 'country:us',
                }}
            />
            <TouchableOpacity onPress={() => router.push("/create-trip/select-traveler")} style={styles.button}>
                <Text style={styles.buttonText}>Start a New Trip</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        padding: 25,
        paddingTop: 100,
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    button: {
        backgroundColor: Colors.BLACK,
        padding: 15,
        borderRadius: 15,
        marginTop: 20,
        width: '70%',
        alignItems: 'center',
        elevation: 5,
    },
    buttonText: {
        fontSize: 17,
        fontFamily: 'outfit',
        color: Colors.WHITE,
    },
});
