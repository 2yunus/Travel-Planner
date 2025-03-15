import { Timestamp } from "firebase/firestore";

export interface TripPropsFirebase {
  destination: string;
  traveler: number;
  startDate: Timestamp;
  endDate: Timestamp;
  totalDays: number;
  budget: number;
}

export interface DailyItinerary {
  title: string;
  schedule: Schedule[];
}

interface Schedule {
  activity: string;
  details: string;
  googleMapUrl: string;
  imageUrl: string | null;
  location: string;
  price: string;
  time: string;
}

export interface Flight {
  airline: string;
  arrivalAirport: string;
  arrivalTime: string;
  bookingUrl: string;
  departureAirport: string;
  departureTime: string;
  flightNumber: string;
  price: string;
}

export interface Hotel {
  name: string;
  address: string;
  description: string;
  geoCoordinates: [number, number];
  googleMapUrl: string;
  imageUrl: string;
  nearbyAttractions: NearbyAttraction[];
  price: string;
  rating: number;
}

interface NearbyAttraction {
  name: string;
  description: string;
  geoCoordinates: [number, number];
  googleMapUrl: string;
  imageUrl: string;
  price: string;
  travelTime: string;
}

interface UserTripDetail {
  flights: Flight[];
  hotels: Hotel[];
  dailyItinerary: DailyItinerary[];
}

export interface UserTripData {
  tripData: TripPropsFirebase;
  userEmail: string;
  tripDetails: UserTripDetail;
  id: string;
}
