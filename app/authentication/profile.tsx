import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Switch, Alert } from 'react-native';

export default function ProfileScreen() {
  const [preferences, setPreferences] = useState({
    // Travel Types
    adventure: true,
    cultural: false,
    beach: true,
    city: false,
    nature: true,
    
    // Budget Level
    budget: 'medium', // low, medium, high
    
    // Travel Style
    solo: false,
    couple: true,
    family: false,
    friends: true,
    
    // Activities
    hiking: true,
    shopping: false,
    dining: true,
    photography: true,
  });

  const togglePreference = (preference: string) => {
    setPreferences(prev => ({
      ...prev,
      [preference]: !prev[preference as keyof typeof prev]
    }));
  };

  const handleSave = () => {
    Alert.alert('Success', 'Preferences saved!');
    router.back();
  };

  const PreferenceToggle = ({ label, value, onToggle }: any) => (
    <View style={styles.preferenceItem}>
      <Text style={styles.preferenceLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#E2E8F0', true: '#4ECDC4' }}
        thumbColor={value ? '#FFFFFF' : '#FFFFFF'}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Travel Preferences</Text>
        <Text style={styles.subtitle}>Customize your travel experience</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Travel Types</Text>
        <PreferenceToggle 
          label="Adventure Travel" 
          value={preferences.adventure} 
          onToggle={() => togglePreference('adventure')} 
        />
        <PreferenceToggle 
          label="Cultural Experiences" 
          value={preferences.cultural} 
          onToggle={() => togglePreference('cultural')} 
        />
        <PreferenceToggle 
          label="Beach Vacations" 
          value={preferences.beach} 
          onToggle={() => togglePreference('beach')} 
        />
        <PreferenceToggle 
          label="City Exploration" 
          value={preferences.city} 
          onToggle={() => togglePreference('city')} 
        />
        <PreferenceToggle 
          label="Nature & Wildlife" 
          value={preferences.nature} 
          onToggle={() => togglePreference('nature')} 
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Travel Style</Text>
        <PreferenceToggle 
          label="Solo Travel" 
          value={preferences.solo} 
          onToggle={() => togglePreference('solo')} 
        />
        <PreferenceToggle 
          label="Couples Getaway" 
          value={preferences.couple} 
          onToggle={() => togglePreference('couple')} 
        />
        <PreferenceToggle 
          label="Family Vacation" 
          value={preferences.family} 
          onToggle={() => togglePreference('family')} 
        />
        <PreferenceToggle 
          label="Friends Trip" 
          value={preferences.friends} 
          onToggle={() => togglePreference('friends')} 
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activities</Text>
        <PreferenceToggle 
          label="Hiking & Trekking" 
          value={preferences.hiking} 
          onToggle={() => togglePreference('hiking')} 
        />
        <PreferenceToggle 
          label="Shopping" 
          value={preferences.shopping} 
          onToggle={() => togglePreference('shopping')} 
        />
        <PreferenceToggle 
          label="Fine Dining" 
          value={preferences.dining} 
          onToggle={() => togglePreference('dining')} 
        />
        <PreferenceToggle 
          label="Photography" 
          value={preferences.photography} 
          onToggle={() => togglePreference('photography')} 
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Budget Level</Text>
        <View style={styles.budgetContainer}>
          {['low', 'medium', 'high'].map((level) => (
            <TouchableOpacity
              key={level}
              style={[
                styles.budgetButton,
                preferences.budget === level && styles.budgetButtonActive
              ]}
              onPress={() => setPreferences(prev => ({ ...prev, budget: level }))}
            >
              <Text style={[
                styles.budgetText,
                preferences.budget === level && styles.budgetTextActive
              ]}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Preferences</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 16,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  preferenceLabel: {
    fontSize: 16,
    color: '#4A5568',
  },
  budgetContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  budgetButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F7FAFC',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  budgetButtonActive: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
  },
  budgetText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#718096',
  },
  budgetTextActive: {
    color: 'white',
  },
  saveButton: {
    backgroundColor: '#4ECDC4',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});