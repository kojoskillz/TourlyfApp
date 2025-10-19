import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  RefreshControl,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import local images
const localImages = {
  kakum: require('../../assets/images/kakum-national-park.webp'),
  capeCoast: require('../../assets/images/ghana-1-1582298574.profileImage.2x-1536x884.webp'),
  mole: require('../../assets/images/closeup-shot-water-buffalo-eating-grass-sunlight.jpg'),
  lakeVolta: require('../../assets/images/man-paddling-wooden-canoe-full-plastic.jpg'),
  akosombo: require('../../assets/images/akosombo dam.jpg'),
  nationalTheatre: require('../../assets/images/National-Theatre-Accra.jpg'),
  elmina: require('../../assets/images/elmina.webp'),
  wliWaterfalls: require('../../assets/images/wli.jpg'),
  larabanga: require('../../assets/images/larabanga.jpg'),
  busuaBeach: require('../../assets/images/beautiful-tropical-beach-sea-ocean-with-coconut-palm-tree-umbrella-chair-blue-sky.jpg'),
  centralTour: require('../../assets/images/central tour.jpg'),
  northernSafari: require('../../assets/images/buffalo-laying-ground-near-green-plants.jpg'),
  voltaExploration: require('../../assets/images/beautiful-scenery-andalusia-portugal-spain-border.jpg'),
};

// Ghana Regions Data
const ghanaRegions = [
  { id: '1', name: 'Greater Accra', capital: 'Accra', description: 'Capital region with urban attractions' },
  { id: '2', name: 'Ashanti', capital: 'Kumasi', description: 'Cultural heartland of Ghana' },
  { id: '3', name: 'Central', capital: 'Cape Coast', description: 'Historical castles and beaches' },
  { id: '4', name: 'Western', capital: 'Sekondi-Takoradi', description: 'Rainforests and natural resources' },
  { id: '5', name: 'Western North', capital: 'Sefwi Wiawso', description: 'Newest region with rich culture' },
  { id: '6', name: 'Eastern', capital: 'Koforidua', description: 'Waterfalls and mountainous landscapes' },
  { id: '7', name: 'Volta', capital: 'Ho', description: 'Beautiful landscapes and Wli Waterfalls' },
  { id: '8', name: 'Oti', capital: 'Dambai', description: 'Northern part of Volta region' },
  { id: '9', name: 'Northern', capital: 'Tamale', description: 'Larabanga Mosque and savanna' },
  { id: '10', name: 'North East', capital: 'Nalerigu', description: 'Mole National Park area' },
  { id: '11', name: 'Savannah', capital: 'Damongo', description: 'Wildlife and natural reserves' },
  { id: '12', name: 'Upper East', capital: 'Bolgatanga', description: 'Traditional crafts and culture' },
  { id: '13', name: 'Upper West', capital: 'Wa', description: 'Ancient mosques and traditions' },
  { id: '14', name: 'Bono', capital: 'Sunyani', description: 'Forest reserves and heritage sites' },
  { id: '15', name: 'Bono East', capital: 'Techiman', description: 'Agricultural heartland' },
  { id: '16', name: 'Ahafo', capital: 'Goaso', description: 'Cocoa and gold mining region' },
];

// Complete Ghana destinations data with tags for matching
const allDestinations = [
  {
    id: '1',
    name: 'Kakum National Park',
    type: 'Rainforest & Canopy Walk',
    image: localImages.kakum,
    rating: 4.8,
    price: '$$',
    match: 95,
    duration: '1 day',
    region: 'Central',
    tags: ['adventure', 'nature', 'hiking']
  },
  {
    id: '2',
    name: 'Cape Coast Castle',
    type: 'Historical & Cultural',
    image: localImages.capeCoast,
    rating: 4.9,
    price: '$',
    match: 92,
    duration: '1 day',
    region: 'Central',
    tags: ['cultural', 'historical']
  },
  {
    id: '3',
    name: 'Mole National Park',
    type: 'Wildlife Safari',
    image: localImages.mole,
    rating: 4.6,
    price: '$$$',
    match: 88,
    duration: '2-3 days',
    region: 'Savannah',
    tags: ['adventure', 'nature', 'wildlife']
  },
  {
    id: '4',
    name: 'Lake Volta',
    type: 'Adventure & Water Sports',
    image: localImages.lakeVolta,
    rating: 4.5,
    price: '$$',
    match: 85,
    duration: '2 days',
    region: 'Volta',
    tags: ['adventure', 'water', 'nature']
  },
  {
    id: '5',
    name: 'Akosombo Dam',
    type: 'Engineering Marvel',
    image: localImages.akosombo,
    rating: 4.4,
    price: '$',
    match: 82,
    duration: '1 day',
    region: 'Eastern',
    tags: ['cultural', 'engineering']
  },
  {
    id: '6',
    name: 'National Theatre',
    type: 'Arts & Culture',
    image: localImages.nationalTheatre,
    rating: 4.3,
    price: '$',
    match: 80,
    duration: 'Half day',
    region: 'Greater Accra',
    tags: ['cultural', 'city', 'arts']
  },
  {
    id: '7',
    name: 'Elmina Castle',
    type: 'Historical Heritage',
    image: localImages.elmina,
    rating: 4.7,
    price: '$',
    match: 90,
    duration: '1 day',
    region: 'Central',
    tags: ['cultural', 'historical', 'beach']
  },
  {
    id: '8',
    name: 'Wli Waterfalls',
    type: 'Nature & Hiking',
    image: localImages.wliWaterfalls,
    rating: 4.8,
    price: '$$',
    match: 93,
    duration: '1 day',
    region: 'Volta',
    tags: ['nature', 'hiking', 'adventure', 'photography']
  },
  {
    id: '9',
    name: 'Larabanga Mosque',
    type: 'Ancient Architecture',
    image: localImages.larabanga,
    rating: 4.5,
    price: '$',
    match: 87,
    duration: 'Half day',
    region: 'Northern',
    tags: ['cultural', 'historical', 'architecture']
  },
  {
    id: '10',
    name: 'Busua Beach',
    type: 'Beach & Surfing',
    image: localImages.busuaBeach,
    rating: 4.6,
    price: '$$',
    match: 89,
    duration: '1-2 days',
    region: 'Western',
    tags: ['beach', 'adventure', 'water', 'relaxation']
  },
  {
    id: '11',
    name: 'Aburi Botanical Gardens',
    type: 'Nature & Relaxation',
    image: localImages.akosombo, // Using existing image as placeholder
    rating: 4.4,
    price: '$',
    match: 84,
    duration: 'Half day',
    region: 'Eastern',
    tags: ['nature', 'relaxation', 'photography']
  },
  {
    id: '12',
    name: 'Kumasi Cultural Center',
    type: 'Arts & Crafts',
    image: localImages.nationalTheatre, // Using existing image as placeholder
    rating: 4.3,
    price: '$',
    match: 81,
    duration: 'Half day',
    region: 'Ashanti',
    tags: ['cultural', 'shopping', 'arts']
  },
  {
    id: '13',
    name: 'Ada Foah',
    type: 'Beach & River Resort',
    image: localImages.busuaBeach, // Using existing image as placeholder
    rating: 4.5,
    price: '$$',
    match: 86,
    duration: '1-2 days',
    region: 'Greater Accra',
    tags: ['beach', 'water', 'relaxation', 'dining']
  },
  {
    id: '14',
    name: 'Shai Hills Resource Reserve',
    type: 'Wildlife & Hiking',
    image: localImages.mole, // Using existing image as placeholder
    rating: 4.4,
    price: '$$',
    match: 83,
    duration: '1 day',
    region: 'Greater Accra',
    tags: ['nature', 'hiking', 'wildlife', 'adventure']
  }
];

const mockUpcomingTrips = [
  {
    id: '1',
    destination: 'Central Region Heritage Tour',
    date: 'Jun 15-18, 2024',
    image: localImages.centralTour,
    progress: 75
  },
  {
    id: '2',
    destination: 'Northern Safari Adventure',
    date: 'Aug 10-15, 2024',
    image: localImages.northernSafari,
    progress: 40
  },
  {
    id: '3',
    destination: 'Volta Region Exploration',
    date: 'Sep 5-7, 2024',
    image: localImages.voltaExploration,
    progress: 20
  }
];

const quickActions = [
  // {
  //   id: '1',
  //   title: 'Plan New Trip',
  //   icon: 'add-circle',
  //   color: '#4ECDC4',
  //   action: () => router.push('/planning/wizard')
  // },
  {
    id: '2',
    title: 'Explore Ghana',
    icon: 'map',
    color: '#FF6B6B',
    action: () => router.push('/explore/explore')
  },
  // {
  //   id: '3',
  //   title: 'My Itineraries',
  //   icon: 'document-text',
  //   color: '#45B7D1',
  //   action: () => router.push('/itinerary')
  // },
  {
    id: '4',
    title: 'Packing List',
    icon: 'briefcase',
    color: '#96CEB4',
    action: () => router.push('/packinglist/packinglist')
  }
];

interface UserPreferences {
  adventure?: boolean;
  cultural?: boolean;
  beach?: boolean;
  city?: boolean;
  nature?: boolean;
  hiking?: boolean;
  shopping?: boolean;
  dining?: boolean;
  photography?: boolean;
}

interface Destination {
  id: string;
  name: string;
  type: string;
  image: any;
  rating: number;
  price: string;
  match: number;
  duration: string;
  region: string;
  tags: string[];
}

export default function TravelDashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState('Traveler');
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [personalizedRecommendations, setPersonalizedRecommendations] = useState<Destination[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    tripsPlanned: 3,
    destinationsVisited: 7,
    upcomingTrips: 3
  });
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [regionsModalVisible, setRegionsModalVisible] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    if (userPreferences) {
      generatePersonalizedRecommendations();
    }
  }, [userPreferences]);

  const loadUserData = async () => {
    try {
      // Load user name
      const savedName = await AsyncStorage.getItem('userName');
      if (savedName) {
        setUserName(savedName);
      } else {
        setUserName('Traveler');
      }

      // Load preferences
      const preferences = await AsyncStorage.getItem('userTravelPreferences');
      if (preferences) {
        const parsedPreferences = JSON.parse(preferences);
        setUserPreferences(parsedPreferences);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      setUserName('Traveler');
    }
  };

  const generatePersonalizedRecommendations = () => {
    if (!userPreferences) {
      // If no preferences, show all destinations
      setPersonalizedRecommendations(allDestinations.slice(0, 6));
      return;
    }

    // Calculate match scores for each destination based on user preferences
    const scoredDestinations = allDestinations.map(destination => {
      let matchScore = 0;
      let totalPossibleScore = 0;

      // Travel Types matching
      if (userPreferences.adventure && destination.tags.includes('adventure')) {
        matchScore += 25;
        totalPossibleScore += 25;
      }
      if (userPreferences.cultural && destination.tags.includes('cultural')) {
        matchScore += 25;
        totalPossibleScore += 25;
      }
      if (userPreferences.beach && destination.tags.includes('beach')) {
        matchScore += 25;
        totalPossibleScore += 25;
      }
      if (userPreferences.city && destination.tags.includes('city')) {
        matchScore += 25;
        totalPossibleScore += 25;
      }
      if (userPreferences.nature && destination.tags.includes('nature')) {
        matchScore += 25;
        totalPossibleScore += 25;
      }

      // Activities matching
      if (userPreferences.hiking && destination.tags.includes('hiking')) {
        matchScore += 15;
        totalPossibleScore += 15;
      }
      if (userPreferences.shopping && destination.tags.includes('shopping')) {
        matchScore += 15;
        totalPossibleScore += 15;
      }
      if (userPreferences.dining && destination.tags.includes('dining')) {
        matchScore += 15;
        totalPossibleScore += 15;
      }
      if (userPreferences.photography && destination.tags.includes('photography')) {
        matchScore += 15;
        totalPossibleScore += 15;
      }

      // Calculate percentage match
      const percentageMatch = totalPossibleScore > 0 
        ? Math.min(100, Math.round((matchScore / totalPossibleScore) * 100))
        : 60; // Default match if no preferences align

      return {
        ...destination,
        match: percentageMatch
      };
    });

    // Sort by match score (highest first) and take top 6
    const topRecommendations = scoredDestinations
      .sort((a, b) => b.match - a.match)
      .slice(0, 6);

    setPersonalizedRecommendations(topRecommendations);
  };

  const getRecommendationSubtitle = () => {
    if (!userPreferences) {
      return 'Popular destinations in Ghana';
    }

    const activePreferences = [];
    if (userPreferences.adventure) activePreferences.push('adventure');
    if (userPreferences.cultural) activePreferences.push('culture');
    if (userPreferences.beach) activePreferences.push('beach');
    if (userPreferences.nature) activePreferences.push('nature');
    if (userPreferences.hiking) activePreferences.push('hiking');
    if (userPreferences.photography) activePreferences.push('photography');

    if (activePreferences.length === 0) {
      return 'Based on your interests';
    }

    return `Perfect for ${activePreferences.slice(0, 2).join(' & ')} lovers`;
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadUserData();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleQuickAction = (action) => {
    action();
  };

const handleRegionSelect = (region) => {
  setSelectedRegion(region);
  setRegionsModalVisible(false);
  // Navigate to the specific region page using absolute path
  const regionPath = region.name.toLowerCase().replace(/\s+/g, '-');
  router.push(`/TravelInterface/Regions/${regionPath}`);
};

  const DestinationCard = ({ destination }) => (
    <TouchableOpacity 
      style={styles.destinationCard}
      onPress={() => router.push(`/destinations/${destination.id}`)}
    >
      <Image 
        source={destination.image} 
        style={styles.destinationImage}
        resizeMode="cover"
      />
      <View style={styles.destinationOverlay}>
        <View style={styles.matchBadge}>
          <Text style={styles.matchText}>{destination.match}% match</Text>
        </View>
        <View style={styles.destinationInfo}>
          <Text style={styles.destinationName}>{destination.name}</Text>
          <Text style={styles.destinationType}>{destination.type}</Text>
          <View style={styles.destinationMeta}>
            <Text style={styles.destinationMetaText}>{destination.duration}</Text>
            <Text style={styles.destinationMetaText}>•</Text>
            <Text style={styles.destinationMetaText}>{destination.price}</Text>
            <Text style={styles.destinationMetaText}>•</Text>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.destinationMetaText}>{destination.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const TripCard = ({ trip }) => (
    <TouchableOpacity style={styles.tripCard}>
      <Image source={trip.image} style={styles.tripImage} resizeMode="cover" />
      <View style={styles.tripContent}>
        <Text style={styles.tripDestination}>{trip.destination}</Text>
        <Text style={styles.tripDate}>{trip.date}</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${trip.progress}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{trip.progress}% planned</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const QuickActionButton = ({ action }) => (
    <TouchableOpacity 
      style={styles.quickAction}
      onPress={() => handleQuickAction(action.action)}
    >
      <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
        <Ionicons name={action.icon} size={24} color="#FFFFFF" />
      </View>
      <Text style={styles.actionText}>{action.title}</Text>
    </TouchableOpacity>
  );

  const RegionItem = ({ region }) => (
    <TouchableOpacity 
      style={styles.regionItem}
      onPress={() => handleRegionSelect(region)}
    >
      <View style={styles.regionItemContent}>
        <View style={styles.regionTextContainer}>
          <Text style={styles.regionName}>{region.name}</Text>
          <Text style={styles.regionCapital}>Capital: {region.capital}</Text>
          <Text style={styles.regionDescription}>{region.description}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#64748B" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Regions Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={regionsModalVisible}
        onRequestClose={() => setRegionsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select a Region</Text>
              <TouchableOpacity 
                onPress={() => setRegionsModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={ghanaRegions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <RegionItem region={item} />}
              showsVerticalScrollIndicator={false}
              style={styles.regionsList}
            />
          </View>
        </View>
      </Modal>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()}, {userName}! 👋</Text>
            <Text style={styles.subtitle}>Discover the beauty of Ghana</Text>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => router.push('/authentication/profile')}
          >
            <Ionicons name="person-circle" size={32} color="#4ECDC4" />
          </TouchableOpacity>
        </View>

        {/* Stats Overview */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.tripsPlanned}</Text>
            <Text style={styles.statLabel}>Trips Planned</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.destinationsVisited}</Text>
            <Text style={styles.statLabel}>Destinations</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.upcomingTrips}</Text>
            <Text style={styles.statLabel}>Upcoming</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <QuickActionButton key={action.id} action={action} />
            ))}
          </View>
        </View>

        {/* Upcoming Trips */}
        {mockUpcomingTrips.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming Trips</Text>
              <TouchableOpacity onPress={() => router.push('/trips')}>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScroll}
            >
              {mockUpcomingTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </ScrollView>
          </View>
        )}

        {/* Personalized Recommendations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended For You</Text>
            <Text style={styles.sectionSubtitle}>{getRecommendationSubtitle()}</Text>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            {personalizedRecommendations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </ScrollView>
        </View>

        {/* Regions Selection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Explore by Region</Text>
            <TouchableOpacity onPress={() => setRegionsModalVisible(true)}>
              <Text style={styles.seeAllText}>View All Regions</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.regionSelector}
            onPress={() => setRegionsModalVisible(true)}
          >
            <View style={styles.regionSelectorContent}>
              <Ionicons name="map-outline" size={24} color="#4ECDC4" />
              <View style={styles.regionSelectorText}>
                <Text style={styles.regionSelectorTitle}>
                  {selectedRegion ? `Exploring: ${selectedRegion.name}` : 'Choose a Region to Explore'}
                </Text>
                <Text style={styles.regionSelectorSubtitle}>
                  {selectedRegion ? selectedRegion.description : 'Select from 16 regions of Ghana'}
                </Text>
              </View>
              <Ionicons name="chevron-down" size={20} color="#64748B" />
            </View>
          </TouchableOpacity>

          {/* Quick Region Pills */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.regionPillsScroll}
          >
            {ghanaRegions.slice(0, 6).map((region) => (
              <TouchableOpacity
                key={region.id}
                style={[
                  styles.regionPill,
                  selectedRegion?.id === region.id && styles.regionPillSelected
                ]}
                onPress={() => handleRegionSelect(region)}
              >
                <Text style={[
                  styles.regionPillText,
                  selectedRegion?.id === region.id && styles.regionPillTextSelected
                ]}>
                  {region.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Ionicons name="heart" size={20} color="#4ECDC4" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>You liked Kakum National Park</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Ionicons name="create" size={20} color="#45B7D1" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>You updated Central Region itinerary</Text>
                <Text style={styles.activityTime}>1 day ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Ionicons name="camera" size={20} color="#FF6B6B" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Added photos from Cape Coast</Text>
                <Text style={styles.activityTime}>3 days ago</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ... (styles remain exactly the same)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 4,
  },
  profileButton: {
    padding: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4ECDC4',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    marginLeft: 52,
    marginBottom: 10,
    fontWeight: '700',
    color: '#1E293B',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  seeAllText: {
    fontSize: 14,
    color: '#4ECDC4',
    fontWeight: '600',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 10,
  },
  quickAction: {
    width: '48%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  horizontalScroll: {
    paddingLeft: 24,
  },
  destinationCard: {
    width: 280,
    height: 200,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  destinationImage: {
    width: '100%',
    height: '100%',
  },
  destinationOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  matchBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  matchText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  destinationInfo: {
    flex: 1,
  },
  destinationName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  destinationType: {
    color: '#E2E8F0',
    fontSize: 14,
    marginBottom: 8,
  },
  destinationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  destinationMetaText: {
    color: '#E2E8F0',
    fontSize: 12,
  },
  tripCard: {
    width: 300,
    marginRight: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  tripImage: {
    width: '100%',
    height: 120,
  },
  tripContent: {
    padding: 16,
  },
  tripDestination: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  tripDate: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ECDC4',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#64748B',
  },
  // Region Selector Styles
  regionSelector: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 12,
  },
  regionSelectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  regionSelectorText: {
    flex: 1,
  },
  regionSelectorTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  regionSelectorSubtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  regionPillsScroll: {
    paddingLeft: 24,
    marginBottom: 8,
  },
  regionPill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  regionPillSelected: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
  },
  regionPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  regionPillTextSelected: {
    color: '#FFFFFF',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  closeButton: {
    padding: 4,
  },
  regionsList: {
    paddingHorizontal: 20,
  },
  regionItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  regionItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  regionTextContainer: {
    flex: 1,
  },
  regionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  regionCapital: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 2,
  },
  regionDescription: {
    fontSize: 12,
    color: '#94A3B8',
  },
  activityList: {
    paddingHorizontal: 24,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0FDFA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#94A3B8',
  },
  spacer: {
    height: 20,
  },
});