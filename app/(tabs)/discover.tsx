import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Colors } from '@/constants/Colors'; // Ensure this is correct.

const Discover = () => {
    const [region, setRegion] = useState({
        latitude: 37.78825, // Default latitude
        longitude: -122.4324, // Default longitude
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const handlePlaceSelect = (data: any, details: any) => {
        const newRegion = {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };
        setRegion(newRegion); // Update region with selected place
    };

    return (
        <View style={styles.page}>
            <Text style={styles.header}>Profile</Text>
            
            {/* Google Places Autocomplete */}
            <GooglePlacesAutocomplete
                placeholder="Search for a place"
                onPress={handlePlaceSelect}
                query={{
                    key: process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY,  // Replace with your actual Google API key
                    language: 'en',
                }}
                debounce={200}
                fetchDetails={true}
                styles={{
                    container: styles.searchContainer,
                    textInput: styles.searchInput,
                    listView: styles.searchListView,
                }}
            />

            {/* MapView Component */}
            <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
                // mapType="satellite"
            >
                <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} title="Selected Location" />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        paddingTop: 100,
        padding: 25,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
    },
    searchContainer: {
        position: 'absolute',
        top: 50,
        left: 25,
        right: 25,
        zIndex: 1,
    },
    searchInput: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        paddingLeft: 10,
        backgroundColor: 'white',
        borderRadius: 20,
    },
    searchListView: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingTop: 5,
        maxHeight: 200,
    },
    map: {
        height: 300, // Adjust the map's height as needed
        width: '100%',
        marginTop: 80, // Add margin to avoid overlapping with search box
    },
});

export default Discover;