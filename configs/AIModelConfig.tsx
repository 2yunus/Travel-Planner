import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};


export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "\nGenerate Travel Plan for Location: New York USA, for 1 Days and 1 Night for Family with a Luxury budget with a Flight details, Flight Price with Booking url, Hotels options list with Hotel Name, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and Places to visit nearby with place Name, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for 1 days and 1 night with each day plan with best time to visit in JSON format." },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"flight\": {\n    \"details\": {\n      \"airline\": \"Delta Airlines\",\n      \"flightNumber\": \"DL1234\",\n      \"departureAirport\": \"JFK\",\n      \"arrivalAirport\": \"LAX\",\n      \"departureDate\": \"2024-03-15\",\n      \"departureTime\": \"10:00 AM\",\n      \"arrivalDate\": \"2024-03-15\",\n      \"arrivalTime\": \"1:00 PM\"\n    },\n    \"price\": {\n      \"amount\": \"500\",\n      \"currency\": \"USD\"\n    },\n    \"bookingUrl\": \"https://www.delta.com/booking\"\n  },\n  \"hotel\": [\n    {\n      \"name\": \"The Peninsula New York\",\n      \"address\": \"700 Fifth Avenue, New York, NY 10019\",\n      \"price\": \"1500\",\n      \"imageUrl\": \"https://www.peninsula.com/en/new-york/hotel/media/hero/hero-desktop.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 40.7580,\n        \"longitude\": -73.9855\n      },\n      \"rating\": 4.8,\n      \"description\": \"A luxurious hotel in Midtown Manhattan, known for its elegant rooms, exceptional dining, and stunning views.\"\n    },\n    {\n      \"name\": \"The Ritz-Carlton New York, Central Park\",\n      \"address\": \"50 Central Park South, New York, NY 10019\",\n      \"price\": \"1200\",\n      \"imageUrl\": \"https://www.ritzcarlton.com/en/hotels/new-york/central-park/images/hotel-overview/exterior-hotel-daytime.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 40.7649,\n        \"longitude\": -73.9777\n      },\n      \"rating\": 4.7,\n      \"description\": \"An iconic hotel overlooking Central Park, offering refined accommodations, world-class dining, and a prime location.\"\n    },\n    {\n      \"name\": \"The Four Seasons Hotel New York Downtown\",\n      \"address\": \"27 Barclay Street, New York, NY 10007\",\n      \"price\": \"1000\",\n      \"imageUrl\": \"https://www.fourseasons.com/newyorkdowntown/images/hotel-overview/exterior-hotel-daytime.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 40.7132,\n        \"longitude\": -74.0089\n      },\n      \"rating\": 4.6,\n      \"description\": \"A modern hotel with stunning views of the city skyline, featuring stylish rooms, rooftop bar, and exceptional service.\"\n    }\n  ],\n  \"placesToVisit\": [\n    {\n      \"name\": \"Top of the Rock\",\n      \"details\": \"Enjoy panoramic views of Manhattan from the observation deck at Rockefeller Center.\",\n      \"imageUrl\": \"https://www.rockefellercenter.com/sites/default/files/styles/article_large/public/2019-12/Top_of_the_Rock_Observation_Deck_Sunset.jpg?itok=6R958y2a\",\n      \"geoCoordinates\": {\n        \"latitude\": 40.7587,\n        \"longitude\": -73.9788\n      },\n      \"ticketPricing\": \"35 USD\",\n      \"timeToTravel\": \"2 hours\"\n    },\n    {\n      \"name\": \"Central Park\",\n      \"details\": \"Escape the hustle and bustle of the city in this vast green space. Take a stroll, picnic, or enjoy a horse-drawn carriage ride.\",\n      \"imageUrl\": \"https://www.centralparknyc.org/sites/default/files/images/home/hero/central-park-hero-image.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 40.7829,\n        \"longitude\": -73.9654\n      },\n      \"ticketPricing\": \"Free\",\n      \"timeToTravel\": \"3 hours\"\n    },\n    {\n      \"name\": \"Times Square\",\n      \"details\": \"Experience the iconic heart of New York City, known for its dazzling lights, Broadway theaters, and bustling energy.\",\n      \"imageUrl\": \"https://www.timeout.com/newyork/images/102695061/image.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 40.7580,\n        \"longitude\": -73.9855\n      },\n      \"ticketPricing\": \"Free\",\n      \"timeToTravel\": \"2 hours\"\n    },\n    {\n      \"name\": \"The Metropolitan Museum of Art\",\n      \"details\": \"Explore one of the world's largest and most comprehensive art museums, housing masterpieces from various eras and cultures.\",\n      \"imageUrl\": \"https://www.metmuseum.org/sites/default/files/styles/media_gallery_large/public/2017-04/170406-the-met-building-4000x2250.jpg?itok=b7u8U3xU\",\n      \"geoCoordinates\": {\n        \"latitude\": 40.7815,\n        \"longitude\": -73.9632\n      },\n      \"ticketPricing\": \"25 USD\",\n      \"timeToTravel\": \"3 hours\"\n    },\n    {\n      \"name\": \"The Empire State Building\",\n      \"details\": \"Ascend to the top of this iconic skyscraper for breathtaking views of the city from a different perspective.\",\n      \"imageUrl\": \"https://www.esbnyc.com/sites/default/files/images/page-header-images/esb-observation-deck-nighttime-view.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 40.7484,\n        \"longitude\": -73.9857\n      },\n      \"ticketPricing\": \"38 USD\",\n      \"timeToTravel\": \"2 hours\"\n    }\n  ],\n  \"dailyPlan\": [\n    {\n      \"day\": \"Day 1\",\n      \"schedule\": [\n        {\n          \"time\": \"10:00 AM\",\n          \"activity\": \"Check in to your hotel, The Peninsula New York.\",\n          \"location\": \"The Peninsula New York, 700 Fifth Avenue, New York, NY 10019\"\n        },\n        {\n          \"time\": \"11:00 AM\",\n          \"activity\": \"Visit Top of the Rock for panoramic views of the city.\",\n          \"location\": \"Top of the Rock, 30 Rockefeller Plaza, New York, NY 10112\"\n        },\n        {\n          \"time\": \"1:00 PM\",\n          \"activity\": \"Lunch at The Roof at Park South, a rooftop restaurant with stunning views.\",\n          \"location\": \"The Roof at Park South, 205 E 42nd St, New York, NY 10017\"\n        },\n        {\n          \"time\": \"2:00 PM\",\n          \"activity\": \"Explore Central Park, enjoy a stroll, or a picnic.\",\n          \"location\": \"Central Park, New York, NY\"\n        },\n        {\n          \"time\": \"5:00 PM\",\n          \"activity\": \"Visit the Metropolitan Museum of Art.\",\n          \"location\": \"The Metropolitan Museum of Art, 1000 5th Ave, New York, NY 10028\"\n        },\n        {\n          \"time\": \"7:00 PM\",\n          \"activity\": \"Enjoy dinner at The Clocktower, a stylish restaurant in Midtown.\",\n          \"location\": \"The Clocktower, 5 Madison Ave, New York, NY 10010\"\n        },\n        {\n          \"time\": \"8:00 PM\",\n          \"activity\": \"Experience the dazzling lights and energy of Times Square.\",\n          \"location\": \"Times Square, New York, NY\"\n        },\n        {\n          \"time\": \"10:00 PM\",\n          \"activity\": \"Return to your hotel for a relaxing evening.\",\n          \"location\": \"The Peninsula New York, 700 Fifth Avenue, New York, NY 10019\"\n        }\n      ]\n    },\n    {\n      \"day\": \"Day 2\",\n      \"schedule\": [\n        {\n          \"time\": \"9:00 AM\",\n          \"activity\": \"Enjoy breakfast at the hotel.\",\n          \"location\": \"The Peninsula New York, 700 Fifth Avenue, New York, NY 10019\"\n        },\n        {\n          \"time\": \"10:00 AM\",\n          \"activity\": \"Visit the Empire State Building for breathtaking views.\",\n          \"location\": \"The Empire State Building, 350 5th Ave, New York, NY 10118\"\n        },\n        {\n          \"time\": \"12:00 PM\",\n          \"activity\": \"Check out of your hotel.\",\n          \"location\": \"The Peninsula New York, 700 Fifth Avenue, New York, NY 10019\"\n        },\n        {\n          \"time\": \"1:00 PM\",\n          \"activity\": \"Enjoy a luxurious lunch at The Palm Court in The Plaza Hotel.\",\n          \"location\": \"The Palm Court, The Plaza Hotel, 5th Ave & Central Park S, New York, NY 10019\"\n        },\n        {\n          \"time\": \"2:00 PM\",\n          \"activity\": \"Head to the airport for your departure flight.\",\n          \"location\": \"JFK Airport, New York, NY\"\n        }\n      ]\n    }\n  ]\n}\n```\n\n**Please note:**\n\n* This is a sample plan and can be customized based on your family's interests and preferences. \n* Flight prices and hotel rates are subject to change. \n* You can find more specific information and booking options on the provided links. \n* Consider checking the official websites of attractions for current hours, ticket prices, and other details.\n* Allow for additional time for transportation between locations, especially in a busy city like New York. \n* It's a good idea to book flights and hotels in advance, especially during peak seasons.\n* Be sure to purchase tickets for attractions online in advance to save time and avoid lines. \n* Enjoy your trip to New York!\n" },
            ],
        },
    ],
});

