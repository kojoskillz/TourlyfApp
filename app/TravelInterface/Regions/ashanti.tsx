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
  ashanti: require('../../../assets/images/ashanti-region.jpg'),
  kumasi: require('../../../assets/images/kumasi.jpg'),
  palace: require('../../../assets/images/manhyia-palace.jpg'),
};

export default function AshantiRegion() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ashanti Region</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Image source={regionImages.ashanti} style={styles.heroImage} />
        
        <View style={styles.content}>
          <Text style={styles.regionName}>Ashanti Region</Text>
          <Text style={styles.capital}>Capital: Kumasi</Text>
          <Text style={styles.description}>
            Cultural heartland of Ghana, home of the Ashanti Kingdom
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>History</Text>
            <Text style={styles.sectionText}>
              The Ashanti Empire was one of the most powerful states in Africa until the late 19th century. 
              Kumasi served as the empire&lsquo;s capital and remains the cultural center of the Ashanti people. 
              The region played a crucial role in the gold trade and resisted British colonization until 1901. 
              The Ashanti Kingdom was founded in the 17th century by Osei Tutu and remains one of Africa&apos;s 
              most influential traditional kingdoms.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Culture & Traditions</Text>
            <Text style={styles.sectionText}>
              Rich in traditional ceremonies, especially the Akwasidae festival held every six weeks. 
              Known for Kente cloth, gold weights, traditional wood carvings, and Adinkra symbols. 
              The region is the seat of the Asantehene (Ashanti King) and maintains strong royal traditions. 
              Ashanti culture is renowned for its elaborate festivals, royal regalia, and deep respect for ancestry.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Major Attractions</Text>
            
            <View style={styles.attractionCard}>
              <Image source={regionImages.palace} style={styles.attractionImage} />
              <View style={styles.attractionInfo}>
                <Text style={styles.attractionName}>Manhyia Palace Museum</Text>
                <Text style={styles.attractionDescription}>
                  Official residence of the Asantehene and museum showcasing Ashanti history and culture.
                </Text>
              </View>
            </View>

            <View style={styles.attractionCard}>
              <Image source={regionImages.kumasi} style={styles.attractionImage} />
              <View style={styles.attractionInfo}>
                <Text style={styles.attractionName}>Kejetia Market</Text>
                <Text style={styles.attractionDescription}>
                  Largest market in West Africa, offering everything from crafts to food and clothing.
                </Text>
              </View>
            </View>

            <View style={styles.attractionList}>
              <Text style={styles.attractionListTitle}>Other Notable Sites:</Text>
              <Text style={styles.attractionItem}>• Lake Bosomtwe (meteorite crater lake)</Text>
              <Text style={styles.attractionItem}>• Kumasi Fort and Military Museum</Text>
              <Text style={styles.attractionItem}>• Adanwomase Kente Weaving Village</Text>
              <Text style={styles.attractionItem}>• Bonwire Kente Village</Text>
              <Text style={styles.attractionItem}>• Okomfo Anokye Sword Site</Text>
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
                <Text style={styles.infoValue}>Tropical rainforest</Text>
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