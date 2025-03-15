import { StyleSheet, Text, View, Image } from 'react-native';
import moment from 'moment';
import { Colors } from './../../constants/Colors';

// Define the structure of the trip object
interface Trip {
  tripData: string; // Assuming tripData is a JSON string
  tripPlan: {
    travel_plan: {
      destination: string;
    };
  };
  [key: string]: any; // Allow for other properties
}

// Define the props for the UserTripCard component
interface UserTripCardProps {
  trip: Trip;
}

const UserTripCard: React.FC<UserTripCardProps> = ({ trip }) => {
  const formatData = (data: string): any => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Error parsing data:', error);
      return null;
    }
  };

  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY;
  const tripData = formatData(trip?.tripData);
  const photoRef = tripData?.locationInfo?.photoRef;

  const imageUrl = photoRef && apiKey 
    ? `https://maps.googleapis.com/maps/api/place/photo?maxheight=400&photoreference=${photoRef}&key=${apiKey}`
    : null;

  return (
    <View style={styles.flexContainer}>
      {imageUrl ? (
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image} 
        />
      ) : (
        <Image 
          source={require('./../../assets/images/travel.jpg')} 
          style={styles.image} 
        />
      )}
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.paragraph}>
          {trip?.tripPlan?.travel_plan?.destination}
        </Text>
        <Text style={styles.smallPara}>
          {moment(tripData?.startDate).format("DD MMM YYYY")}
        </Text>
        <Text style={styles.smallPara}>
          Travelling: {tripData?.traveler?.title}
        </Text>
      </View>
    </View>
  );
};

export default UserTripCard;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  paragraph: {
    fontFamily: 'Outfit-Medium',
    fontSize: 18,
  },
  smallPara: {
    fontFamily: 'Outfit',
    fontSize: 14,
    color: Colors.GRAY,
  },
});