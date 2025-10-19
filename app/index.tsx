import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(30)).current;
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const texts = ['AKWAABA', 'WOEZOR', 'OBAK3'];
  const typingSpeed = 150; // milliseconds per character
  const displayTime = 2000; // milliseconds to display complete text

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

    // Typing animation effect
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    
    interface TypeText {
      (text: string, index?: number): void;
    }

    const typeText: TypeText = (text: string, index = 0) => {
      if (index <= text.length) {
        setCurrentText(text.substring(0, index));
        timeoutId = setTimeout(() => typeText(text, index + 1), typingSpeed);
      } else {
        // After typing complete, wait then move to next text
        timeoutId = setTimeout(() => {
          setCurrentIndex((prevIndex: number) => (prevIndex + 1) % texts.length);
        }, displayTime);
      }
    };

    typeText(texts[currentIndex]);

    // Clean up timeout on unmount
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [fadeAnim, slideUpAnim, currentIndex]);

  // Auto-navigate after 8 seconds (increased to allow for text cycling)
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/authentication/signin');
    }, 8000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <View style={styles.whiteBackground} />
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      
      <Image 
        source={require('../assets/images/bgimg0.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideUpAnim }] }]}>
        
        <View style={styles.topLeftSection}>
          <Text style={styles.topNumber}>TOURLYF</Text>
          <Text style={styles.topText}>
            {currentText}
            <Text style={styles.cursor}>|</Text>
          </Text>
        </View>

        <View style={styles.centerContent}>
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
    backgroundColor: '#07FFEEFF',
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
    backgroundColor: '#FFB300FF',
    opacity: 0.3,
    zIndex: 20,
  },
  backgroundImage: {
    position: 'absolute',
    top: 250,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '80%',
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
    fontSize: 80,
    fontWeight: '800',
    color: '#2D3748',
    marginTop: -20,
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  topText: {
    fontSize: 66,
    fontWeight: '900',
    color: '#4ECDC4',
    letterSpacing: 6,
    marginTop: 5,
    textTransform: 'uppercase',
    minHeight: 35, // Ensure consistent height during animation
  },
  cursor: {
    color: '#4ECDC4',
    fontWeight: '300',
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