import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Modal,
  FlatList,
  TextInput,
  Platform,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

// Ghana tourism destinations with coordinates
const ghanaDestinations = [
  {
    id: '1',
    name: 'Kakum National Park',
    type: 'Rainforest & Canopy Walk',
    region: 'Central',
    coordinates: {
      latitude: 5.3500,
      longitude: -1.3833,
    },
    image: require('../../assets/images/kakum-national-park.webp'),
    rating: 4.8,
    price: '$$',
    description: 'Experience the breathtaking canopy walkway through the rainforest.',
    highlights: ['Canopy Walkway', 'Rainforest Hiking', 'Bird Watching', 'Butterfly Sanctuary'],
    bestTime: 'Year-round',
    entryFee: '₵50-₵100'
  },
  {
    id: '2',
    name: 'Cape Coast Castle',
    type: 'Historical & Cultural',
    region: 'Central',
    coordinates: {
      latitude: 5.1036,
      longitude: -1.2417,
    },
    image: require('../../assets/images/ghana-1-1582298574.profileImage.2x-1536x884.webp'),
    rating: 4.9,
    price: '$',
    description: 'UNESCO World Heritage site with profound historical significance.',
    highlights: ['Historical Museum', 'Door of No Return', 'Guided Tours', 'Ocean Views'],
    bestTime: 'Year-round',
    entryFee: '₵30-₵60'
  },
  {
    id: '3',
    name: 'Mole National Park',
    type: 'Wildlife Safari',
    region: 'Savannah',
    coordinates: {
      latitude: 9.3000,
      longitude: -1.8500,
    },
    image: require('../../assets/images/closeup-shot-water-buffalo-eating-grass-sunlight.jpg'),
    rating: 4.6,
    price: '$$$',
    description: 'Ghana\'s largest wildlife refuge with diverse animal species.',
    highlights: ['Safari Drives', 'Elephant Watching', 'Bird Safari', 'Walking Tours'],
    bestTime: 'Nov-Apr',
    entryFee: '₵80-₵150'
  },
  {
    id: '4',
    name: 'Lake Volta',
    type: 'Adventure & Water Sports',
    region: 'Volta',
    coordinates: {
      latitude: 6.5000,
      longitude: 0.0000,
    },
    image: require('../../assets/images/man-paddling-wooden-canoe-full-plastic.jpg'),
    rating: 4.5,
    price: '$$',
    description: 'One of the world\'s largest man-made lakes with stunning scenery.',
    highlights: ['Boat Cruises', 'Fishing', 'Island Hopping', 'Water Sports'],
    bestTime: 'Year-round',
    entryFee: 'Free (Activities extra)'
  },
  {
    id: '5',
    name: 'Wli Waterfalls',
    type: 'Nature & Hiking',
    region: 'Volta',
    coordinates: {
      latitude: 7.1500,
      longitude: 0.6000,
    },
    image: require('../../assets/images/wli.jpg'),
    rating: 4.8,
    price: '$$',
    description: 'Highest waterfall in West Africa surrounded by beautiful nature.',
    highlights: ['Waterfall Viewing', 'Hiking Trails', 'Bird Watching', 'Nature Walks'],
    bestTime: 'Jun-Oct',
    entryFee: '₵40-₵80'
  },
  {
    id: '6',
    name: 'Larabanga Mosque',
    type: 'Ancient Architecture',
    region: 'Northern',
    coordinates: {
      latitude: 9.2167,
      longitude: -1.8500,
    },
    image: require('../../assets/images/larabanga.jpg'),
    rating: 4.5,
    price: '$',
    description: 'One of West Africa\'s oldest mosques with unique Sudanese architecture.',
    highlights: ['Historical Tours', 'Architecture', 'Cultural Experience', 'Photography'],
    bestTime: 'Year-round',
    entryFee: '₵20-₵40'
  },
  {
    id: '7',
    name: 'Busua Beach',
    type: 'Beach & Surfing',
    region: 'Western',
    coordinates: {
      latitude: 4.8000,
      longitude: -1.9500,
    },
    image: require('../../assets/images/beautiful-tropical-beach-sea-ocean-with-coconut-palm-tree-umbrella-chair-blue-sky.jpg'),
    rating: 4.6,
    price: '$$',
    description: 'Beautiful beach destination perfect for surfing and relaxation.',
    highlights: ['Surfing', 'Beach Relaxation', 'Local Cuisine', 'Sunset Views'],
    bestTime: 'Year-round',
    entryFee: 'Free'
  },
  {
    id: '8',
    name: 'Kumasi Cultural Center',
    type: 'Arts & Culture',
    region: 'Ashanti',
    coordinates: {
      latitude: 6.6833,
      longitude: -1.6167,
    },
    image: require('../../assets/images/National-Theatre-Accra.jpg'),
    rating: 4.3,
    price: '$',
    description: 'Heart of Ashanti culture with traditional arts and crafts.',
    highlights: ['Art Gallery', 'Craft Market', 'Cultural Shows', 'Traditional Weaving'],
    bestTime: 'Year-round',
    entryFee: '₵10-₵30'
  }
];

const regions = [
  { id: 'all', name: 'All Regions', count: ghanaDestinations.length },
  { id: 'central', name: 'Central', count: 2 },
  { id: 'savannah', name: 'Savannah', count: 1 },
  { id: 'volta', name: 'Volta', count: 2 },
  { id: 'northern', name: 'Northern', count: 1 },
  { id: 'western', name: 'Western', count: 1 },
  { id: 'ashanti', name: 'Ashanti', count: 1 },
];

const categories = [
  { id: 'all', name: 'All', icon: 'apps' },
  { id: 'nature', name: 'Nature', icon: 'leaf' },
  { id: 'cultural', name: 'Cultural', icon: 'business' },
  { id: 'adventure', name: 'Adventure', icon: 'trail-sign' },
  { id: 'beach', name: 'Beach', icon: 'beach' },
  { id: 'historical', name: 'Historical', icon: 'book' },
];

// Simple static map component using images or placeholders
type Destination = {
  id: string;
  name: string;
  type: string;
  region: string;
  coordinates: { latitude: number; longitude: number };
  image: any;
  rating: number;
  price: string;
  description: string;
  highlights: string[];
  bestTime: string;
  entryFee: string;
};

interface WebSafeMapProps {
  filteredDestinations: Destination[];
  selectedDestination: Destination | null;
  focusOnDestination: (destination: Destination) => void;
}

const WebSafeMap: React.FC<WebSafeMapProps> = ({ filteredDestinations, selectedDestination, focusOnDestination }) => {
  return (
    <View style={styles.webMapPlaceholder}>
      <Ionicons name="map-outline" size={64} color="#94A3B8" />
      <Text style={styles.webMapTitle}>Explore Ghana Destinations</Text>
      <Text style={styles.webMapDescription}>
        Discover amazing places across Ghana{'\n'}
        Use filters to find your perfect destination
      </Text>
      
      {/* Quick destination buttons */}
      <View style={styles.quickDestinations}>
        {filteredDestinations.slice(0, 4).map((destination) => (
          <TouchableOpacity
            key={destination.id}
            style={[
              styles.quickDestinationButton,
              selectedDestination?.id === destination.id && styles.quickDestinationButtonSelected
            ]}
            onPress={() => focusOnDestination(destination)}
          >
            <Ionicons name="location" size={16} color="#4ECDC4" />
            <Text style={styles.quickDestinationText}>{destination.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.webMapButton}
        onPress={() => {
          // Open Google Maps with Ghana view
          const url = `https://www.google.com/maps/search/?api=1&query=Ghana+tourist+destinations`;
          if (Platform.OS === 'web') {
            window.open(url, '_blank');
          } else {
            Linking.openURL(url);
          }
        }}
      >
        <Ionicons name="open-outline" size={16} color="#FFFFFF" />
        <Text style={styles.webMapButtonText}>Open in Google Maps</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function ExploreGhana() {
  const router = useRouter();
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('list'); // Always use list view on web
  const [userPreferences, setUserPreferences] = useState(null);

  React.useEffect(() => {
    loadUserPreferences();
  }, []);

  const loadUserPreferences = async () => {
    try {
      const preferences = await AsyncStorage.getItem('userTravelPreferences');
      if (preferences) {
        setUserPreferences(JSON.parse(preferences));
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  };

  const filteredDestinations = ghanaDestinations.filter(destination => {
    const matchesRegion = selectedRegion === 'all' || 
      destination.region.toLowerCase() === selectedRegion;
    
    const matchesSearch = searchQuery === '' || 
      destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.region.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
      destination.type.toLowerCase().includes(selectedCategory);

    return matchesRegion && matchesSearch && matchesCategory;
  });

  const focusOnDestination = (destination) => {
    setSelectedDestination(destination);
  };

  const openInMaps = (destination: Destination): void => {
    const { latitude, longitude } = destination.coordinates;
    const url: string = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    
    if (Platform.OS === 'web') {
      window.open(url, '_blank');
    } else {
      Linking.openURL(url);
    }
  };

  const DestinationCard = ({ destination }) => (
    <TouchableOpacity 
      style={styles.destinationCard}
      onPress={() => focusOnDestination(destination)}
    >
      <Image source={destination.image} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{destination.name}</Text>
        <Text style={styles.cardSubtitle}>{destination.type}</Text>
        <View style={styles.cardMeta}>
          <Ionicons name="location" size={14} color="#64748B" />
          <Text style={styles.cardLocation}>{destination.region}</Text>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.cardRating}>{destination.rating}</Text>
          <Text style={styles.cardPrice}>{destination.price}</Text>
        </View>
        <TouchableOpacity 
          style={styles.mapButton}
          onPress={() => openInMaps(destination)}
        >
          <Ionicons name="navigate" size={14} color="#4ECDC4" />
          <Text style={styles.mapButtonText}>Open in Maps</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const DestinationDetail = ({ destination }) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!selectedDestination}
      onRequestClose={() => setSelectedDestination(null)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView>
            <Image source={destination.image} style={styles.modalImage} />
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleContainer}>
                <Text style={styles.modalTitle}>{destination.name}</Text>
                <Text style={styles.modalSubtitle}>{destination.type}</Text>
                <View style={styles.modalMeta}>
                  <Ionicons name="location" size={14} color="#64748B" />
                  <Text style={styles.modalLocation}>{destination.region}</Text>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.modalRating}>{destination.rating}</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setSelectedDestination(null)}
              >
                <Ionicons name="close" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.sectionTitle}>About</Text>
              <Text style={styles.description}>{destination.description}</Text>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.sectionTitle}>Highlights</Text>
              <View style={styles.highlightsContainer}>
                {destination.highlights.map((highlight, index) => (
                  <View key={index} style={styles.highlightTag}>
                    <Ionicons name="checkmark-circle" size={16} color="#4ECDC4" />
                    <Text style={styles.highlightText}>{highlight}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Ionicons name="calendar" size={20} color="#4ECDC4" />
                <View>
                  <Text style={styles.infoLabel}>Best Time to Visit</Text>
                  <Text style={styles.infoValue}>{destination.bestTime}</Text>
                </View>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="cash" size={20} color="#4ECDC4" />
                <View>
                  <Text style={styles.infoLabel}>Entry Fee</Text>
                  <Text style={styles.infoValue}>{destination.entryFee}</Text>
                </View>
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={() => openInMaps(destination)}
              >
                <Ionicons name="navigate" size={20} color="#4ECDC4" />
                <Text style={styles.secondaryButtonText}>Open in Maps</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.planTripButton}
                onPress={() => {
                  setSelectedDestination(null);
                  router.push('/packinglist/packinglist');
                }}
              >
                <Ionicons name="add-circle" size={20} color="#FFFFFF" />
                <Text style={styles.planTripText}>Plan Trip</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Explore Ghana</Text>
        <View style={styles.viewToggle}>
          {/* View toggle removed for web compatibility */}
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#64748B" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search destinations, regions..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#94A3B8"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#64748B" />
          </TouchableOpacity>
        )}
      </View>

      {/* Categories Section */}
      <View style={styles.filterSection}>
        <Text style={styles.filterSectionTitle}>Categories</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryPill,
                selectedCategory === category.id && styles.categoryPillSelected
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Ionicons 
                name={category.icon} 
                size={16} 
                color={selectedCategory === category.id ? "#FFFFFF" : "#4ECDC4"} 
              />
              <Text style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextSelected
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Regions Section */}
      <View style={styles.filterSection}>
        <Text style={styles.filterSectionTitle}>Regions</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.regionsScroll}
          contentContainerStyle={styles.regionsContent}
        >
          {regions.map((region) => (
            <TouchableOpacity
              key={region.id}
              style={[
                styles.regionPill,
                selectedRegion === region.id && styles.regionPillSelected
              ]}
              onPress={() => setSelectedRegion(region.id)}
            >
              <Text style={[
                styles.regionText,
                selectedRegion === region.id && styles.regionTextSelected
              ]}>
                {region.name} ({region.count})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''} found
        </Text>
      </View>

      {/* Map View - Simplified for web */}
      {viewMode === 'map' && (
        <View style={styles.mapContainer}>
          <WebSafeMap
            filteredDestinations={filteredDestinations}
            selectedDestination={selectedDestination}
            focusOnDestination={focusOnDestination}
          />
        </View>
      )}

      {/* List View - Default */}
      <FlatList
        data={filteredDestinations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DestinationCard destination={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={64} color="#94A3B8" />
            <Text style={styles.emptyStateTitle}>No destinations found</Text>
            <Text style={styles.emptyStateText}>
              Try adjusting your search or filters
            </Text>
          </View>
        }
      />

      {/* Destination Detail Modal */}
      {selectedDestination && (
        <DestinationDetail destination={selectedDestination} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
  },
  viewToggle: {
    padding: 4,
    opacity: 0, // Hide view toggle on web
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  filterSection: {
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  categoriesScroll: {
    marginBottom: 0,
  },
  categoriesContent: {
    paddingRight: 20,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryPillSelected: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
    shadowColor: '#4ECDC4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  categoryTextSelected: {
    color: '#FFFFFF',
  },
  regionsScroll: {
    marginBottom: 0,
  },
  regionsContent: {
    paddingRight: 20,
  },
  regionPill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  regionPillSelected: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
    shadowColor: '#4ECDC4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  regionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  regionTextSelected: {
    color: '#FFFFFF',
  },
  resultsContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  resultsText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  mapContainer: {
    flex: 1,
  },
  webMapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E2E8F0',
    padding: 20,
    minHeight: 300,
  },
  webMapTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  webMapDescription: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  quickDestinations: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  quickDestinationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  quickDestinationButtonSelected: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
  },
  quickDestinationText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  webMapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  webMapButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    padding: 20,
    paddingTop: 0,
  },
  destinationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  cardLocation: {
    fontSize: 12,
    color: '#64748B',
  },
  cardRating: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: -4,
  },
  cardPrice: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 'auto',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
  },
  mapButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4ECDC4',
  },
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
  },
  modalImage: {
    width: '100%',
    height: 200,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitleContainer: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 8,
  },
  modalMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalLocation: {
    fontSize: 14,
    color: '#64748B',
  },
  modalRating: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: -4,
  },
  closeButton: {
    padding: 4,
    marginLeft: 12,
  },
  modalSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 24,
  },
  highlightsContainer: {
    gap: 8,
  },
  highlightTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  highlightText: {
    fontSize: 14,
    color: '#374151',
  },
  infoGrid: {
    flexDirection: 'row',
    padding: 20,
    gap: 16,
  },
  infoItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  modalActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  secondaryButtonText: {
    color: '#4ECDC4',
    fontSize: 16,
    fontWeight: '600',
  },
  planTripButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4ECDC4',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  planTripText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
});