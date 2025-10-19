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

export default function BonoRegion() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bono Region</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Image source={require('../../../assets/images/ahafo-region.jpg')} style={styles.heroImage} />
        
        <View style={styles.content}>
          <Text style={styles.regionName}>Bono Region</Text>
          <Text style={styles.capital}>Capital: Sunyani</Text>
          <Text style={styles.description}>
            Forest reserves and cultural heritage sites
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>History</Text>
            <Text style={styles.sectionText}>
              The Bono Region is one of Ghana&lsquo;s newest regions, created in 2019 from the 
              Brong-Ahafo Region. The area has a rich history as part of the ancient Bono 
              Kingdom, one of the earliest Akan states. Sunyani has grown from a small 
              hunting ground to a major regional capital.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Culture & Traditions</Text>
            <Text style={styles.sectionText}>
              Rich Bono cultural traditions with festivals including the Kwafie festival. 
              Known for traditional kente weaving and wood carving. The region maintains 
              strong connections to forest conservation and traditional beliefs.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Major Attractions</Text>
            
            <View style={styles.attractionList}>
              <Text style={styles.attractionListTitle}>Notable Sites:</Text>
              <Text style={styles.attractionItem}>• Boabeng-Fiema Monkey Sanctuary</Text>
              <Text style={styles.attractionItem}>• Bui National Park</Text>
              <Text style={styles.attractionItem}>• Kintampo Waterfalls</Text>
              <Text style={styles.attractionItem}>• Fuller Falls</Text>
              <Text style={styles.attractionItem}>• Traditional Craft Villages</Text>
            </View>
          </View>

          <View style={styles.travelInfo}>
            <Text style={styles.sectionTitle}>Travel Information</Text>
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Ionicons name="calendar" size={20} color="#4ECDC4" />
                <Text style={styles.infoLabel}>Best Time to Visit</Text>
                <Text style={styles.infoValue}>All year round</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="thermometer" size={20} color="#4ECDC4" />
                <Text style={styles.infoLabel}>Climate</Text>
                <Text style={styles.infoValue}>Tropical forest</Text>
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