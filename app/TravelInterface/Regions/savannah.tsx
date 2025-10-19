import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Import images - you'll need to add these to your assets
const regionImages = {
  savannah: require('../../../assets/images/labadi-beach.jpg'),
  mole: require('../../../assets/images/labadi-beach.jpg'),
  larabanga: require('../../../assets/images/labadi-beach.jpg'),
};

export default function SavannahRegion() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Savannah Region</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <Image source={regionImages.savannah} style={styles.heroImage} />
        
        {/* Region Overview */}
        <View style={styles.content}>
          <Text style={styles.regionName}>Savannah Region</Text>
          <Text style={styles.capital}>Capital: Damongo</Text>
          <Text style={styles.description}>
            Wildlife and natural reserves in northern Ghana
          </Text>

          {/* History Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>History</Text>
            <Text style={styles.sectionText}>
              The Savannah Region is one of Ghana&lsquo;s newest regions, created in 2019 from the 
              western part of the former Northern Region. It has been inhabited for centuries 
              by Gonja people and was part of the ancient Gonja Kingdom. The region features 
              ancient trade routes and historical settlements that played important roles in 
              trans-Saharan trade. The area was known for its strategic location along trade 
              routes connecting the Sahel to the forest regions.
            </Text>
          </View>

          {/* Culture Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Culture & Traditions</Text>
            <Text style={styles.sectionText}>
              Rich in traditional festivals including the Damba and Fire festivals. Known for 
              traditional music, dance, and storytelling traditions. The region is home to 
              diverse ethnic groups including Gonja, Vagla, Tampulma, and Brifo peoples, each 
              with unique cultural practices. Traditional crafts include weaving, pottery, and 
              leather work. The Gonja people are known for their rich oral history and 
              traditional governance system.
            </Text>
          </View>

          {/* Major Attractions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Major Attractions</Text>
            
            <View style={styles.attractionCard}>
              <Image source={regionImages.mole} style={styles.attractionImage} />
              <View style={styles.attractionInfo}>
                <Text style={styles.attractionName}>Mole National Park</Text>
                <Text style={styles.attractionDescription}>
                  Ghana&#39;s largest wildlife refuge, home to elephants, antelopes, and over 300 bird species.
                </Text>
              </View>
            </View>

            <View style={styles.attractionCard}>
              <Image source={regionImages.larabanga} style={styles.attractionImage} />
              <View style={styles.attractionInfo}>
                <Text style={styles.attractionName}>Larabanga Mosque</Text>
                <Text style={styles.attractionDescription}>
                  One of West Africa&apos;s oldest mosques, built in the Sudanese architectural style.
                </Text>
              </View>
            </View>

            <View style={styles.attractionList}>
              <Text style={styles.attractionListTitle}>Other Notable Sites:</Text>
              <Text style={styles.attractionItem}>• Ancient Stone Settlements</Text>
              <Text style={styles.attractionItem}>• Traditional Weaving Villages</Text>
              <Text style={styles.attractionItem}>• Mognori Eco-Village</Text>
              <Text style={styles.attractionItem}>• Daboya Salt Pans</Text>
              <Text style={styles.attractionItem}>• Bui National Park</Text>
            </View>
          </View>

          {/* Travel Information */}
          <View style={styles.travelInfo}>
            <Text style={styles.sectionTitle}>Travel Information</Text>
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Ionicons name="calendar" size={20} color="#4ECDC4" />
                <Text style={styles.infoLabel}>Best Time to Visit</Text>
                <Text style={styles.infoValue}>November to March</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="thermometer" size={20} color="#4ECDC4" />
                <Text style={styles.infoLabel}>Climate</Text>
                <Text style={styles.infoValue}>Hot and dry</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="time" size={20} color="#4ECDC4" />
                <Text style={styles.infoLabel}>Dry Season</Text>
                <Text style={styles.infoValue}>Nov - Apr</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="rainy" size={20} color="#4ECDC4" />
                <Text style={styles.infoLabel}>Rainy Season</Text>
                <Text style={styles.infoValue}>May - Oct</Text>
              </View>
            </View>
          </View>

          {/* Cultural Events */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cultural Events & Festivals</Text>
            <View style={styles.eventList}>
              <View style={styles.eventItem}>
                <Text style={styles.eventName}>Damba Festival</Text>
                <Text style={styles.eventDescription}>
                  Celebrated by the Gonja people, featuring horse riding, drumming, and dancing.
                </Text>
              </View>
              <View style={styles.eventItem}>
                <Text style={styles.eventName}>Fire Festival</Text>
                <Text style={styles.eventDescription}>
                  Traditional festival marking the beginning of the hunting season.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  placeholder: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  heroImage: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  regionName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  capital: {
    fontSize: 18,
    color: '#64748B',
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 24,
    lineHeight: 22,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#475569',
  },
  attractionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  attractionImage: {
    width: '100%',
    height: 150,
  },
  attractionInfo: {
    padding: 16,
  },
  attractionName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  attractionDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  attractionList: {
    marginTop: 16,
  },
  attractionListTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  attractionItem: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 4,
    lineHeight: 20,
  },
  travelInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  infoValue: {
    fontSize: 14,
    color: '#1E293B',
    textAlign: 'center',
  },
  eventList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  eventItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  eventName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
});