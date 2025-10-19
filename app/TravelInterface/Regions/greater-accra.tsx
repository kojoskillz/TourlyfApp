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

const regionImages = {
  accra: require('../../../assets/images/accra.jpg'),
  independence: require('../../../assets/images/independence-square.jpg'),
  labadi: require('../../../assets/images/labadi-beach.jpg'),
};

export default function GreaterAccraRegion() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Greater Accra Region</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Image source={regionImages.accra} style={styles.heroImage} />
        
        <View style={styles.content}>
          <Text style={styles.regionName}>Greater Accra Region</Text>
          <Text style={styles.capital}>Capital: Accra</Text>
          <Text style={styles.description}>
            Capital region with urban attractions and coastal beauty
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>History</Text>
            <Text style={styles.sectionText}>
              Greater Accra is the smallest but most densely populated region of Ghana. 
              It became the capital after the country gained independence in 1957. 
              The region has grown from a series of fishing villages to a bustling metropolitan area 
              and serves as the economic and administrative hub of Ghana. Accra was originally 
              inhabited by the Ga people and developed around Portuguese, Dutch, and British forts.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Culture & Traditions</Text>
            <Text style={styles.sectionText}>
              A melting pot of all Ghanaian cultures with strong Ga and Adangbe influences. 
              Known for its vibrant nightlife, contemporary arts scene, and traditional festivals 
              like Homowo. The region showcases a blend of modern urban life and rich cultural traditions. 
              Traditional drumming and dancing are integral to cultural celebrations.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Major Attractions</Text>
            
            <View style={styles.attractionCard}>
              <Image source={regionImages.independence} style={styles.attractionImage} />
              <View style={styles.attractionInfo}>
                <Text style={styles.attractionName}>Independence Square</Text>
                <Text style={styles.attractionDescription}>
                  Also known as Black Star Square, this is where Ghana&apos;s independence was declared in 1957.
                </Text>
              </View>
            </View>

            <View style={styles.attractionCard}>
              <Image source={regionImages.labadi} style={styles.attractionImage} />
              <View style={styles.attractionInfo}>
                <Text style={styles.attractionName}>Labadi Beach</Text>
                <Text style={styles.attractionDescription}>
                  Most popular beach in Accra, known for its lively atmosphere and weekend entertainment.
                </Text>
              </View>
            </View>

            <View style={styles.attractionList}>
              <Text style={styles.attractionListTitle}>Other Notable Sites:</Text>
              <Text style={styles.attractionItem}>• Kwame Nkrumah Mausoleum</Text>
              <Text style={styles.attractionItem}>• National Museum of Ghana</Text>
              <Text style={styles.attractionItem}>• Arts Center Market</Text>
              <Text style={styles.attractionItem}>• Osu Castle (Christiansborg Castle)</Text>
              <Text style={styles.attractionItem}>• Jamestown Lighthouse and Fishing Harbor</Text>
              <Text style={styles.attractionItem}>• Aburi Botanical Gardens</Text>
              <Text style={styles.attractionItem}>• Makola Market</Text>
            </View>
          </View>

          <View style={styles.travelInfo}>
            <Text style={styles.sectionTitle}>Travel Information</Text>
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Ionicons name="calendar" size={20} color="#4ECDC4" />
                <Text style={styles.infoLabel}>Best Time to Visit</Text>
                <Text style={styles.infoValue}>November to April</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="thermometer" size={20} color="#4ECDC4" />
                <Text style={styles.infoLabel}>Climate</Text>
                <Text style={styles.infoValue}>Tropical coastal</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
// Use the same styles as Savannah region
const styles = StyleSheet.create({
  // ... copy all the styles from the Savannah component
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
});