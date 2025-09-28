import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(30)).current;
  const router = useRouter();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();

    // Auto-navigate after 3 seconds (3000 milliseconds)
    const timer = setTimeout(() => {
      router.push('/authentication/signin');
    }, 3000);

    // Clean up the timer if component unmounts
    return () => clearTimeout(timer);
  }, [fadeAnim, slideUpAnim, router]);

  return (
    <View style={styles.container}>
      <View style={styles.whiteBackground} />
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      
      <Image 
        source={require('../../assets/images/img0.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideUpAnim }] }]}>
        
        <View style={styles.topLeftSection}>
          <Text style={styles.topNumber}>EXPLORE</Text>
          <Text style={styles.topText}>BEYOND LIMITS</Text>
        </View>

        <View style={styles.centerContent}>
          {/* Your Go button added back exactly as it was */}
          <Link href="/authentication/signin" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Go</Text>
            </TouchableOpacity>
          </Link>
        </View>

      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  whiteBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    zIndex: 1,
  },
  circle1: {
    position: 'absolute',
    top: -120,
    right: -50,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#07FFEEE4',
    opacity: 0.3,
    zIndex: 40,
  },
  circle2: {
    position: 'absolute',
    bottom: -120,
    left: -50,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#FCB40DF4',
    opacity: 0.3,
    zIndex: 20,
  },
  backgroundImage: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '95%',
    zIndex: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    zIndex: 40,
  },
  topLeftSection: {
    position: 'absolute',
    top: 60,
    left: 24,
    alignItems: 'flex-start',
  },
  topNumber: {
    fontSize: 40,
    fontWeight: '800',
    color: '#2D3748',
    marginTop: -20,
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  topText: {
    fontSize: 26,
    fontWeight: '500',
    color: '#4ECDC4',
    letterSpacing: 6,
    marginTop: 5,
    textTransform: 'uppercase',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  button: {
    backgroundColor: '#4ECDC4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 22,
    paddingHorizontal: 20,
    borderRadius: 360,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
    marginTop: 300,
    borderWidth: 2,
    borderColor: '#3BB4A9',
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});