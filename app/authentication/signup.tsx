import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AuthScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View style={styles.gradient} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Travel Companion</Text>
          <Text style={styles.subtitle}>Your journey begins here</Text>
        </View>
        
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Get Started</Text>
            <Text style={styles.cardSubtitle}>Create your account to continue</Text>
          </View>
          
          <View style={styles.buttonContainer}>
            {/* Email Sign Up */}
            <Link href="/authentication/signup" asChild>
              <TouchableOpacity style={[styles.button, styles.primaryButton]}>
                <Ionicons name="mail-outline" size={20} color="#FFFFFF" />
                <Text style={[styles.buttonText, styles.primaryButtonText]}>Continue with Email</Text>
              </TouchableOpacity>
            </Link>
            
            {/* Social Buttons Container */}
            <View style={styles.socialButtonsContainer}>
              {/* Google Sign Up */}
              <TouchableOpacity style={[styles.button, styles.socialButton]}>
                <Ionicons name="logo-google" size={18} color="#DB4437" />
                <Text style={[styles.buttonText, styles.socialButtonText]}>Google</Text>
              </TouchableOpacity>
              
              {/* Apple Sign Up */}
              <TouchableOpacity style={[styles.button, styles.socialButton]}>
                <Ionicons name="logo-apple" size={18} color="#000000" />
                <Text style={[styles.buttonText, styles.socialButtonText]}>Apple</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>
          
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <Link href="/authentication/signin" asChild>
              <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginLink}>Sign In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={styles.link}>Terms of Service</Text> and{' '}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: '#4ECDC4',
  },
  gradient: {
    flex: 1,
    backgroundColor: '#4ECDC4',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    paddingVertical: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#E2E8F0',
    textAlign: 'center',
    fontWeight: '400',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
  
    
  },
  primaryButton: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
    shadowColor: '#4ECDC4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#08080849',

  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
  socialButtonText: {
    color: '#334155',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  dividerText: {
    paddingHorizontal: 16,
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '500',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  loginText: {
    color: '#64748B',
    fontSize: 14,
  },
  loginButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  loginLink: {
    color: '#4ECDC4',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    paddingVertical: 16,
  },
  termsText: {
    color: '#64748B',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  link: {
    color: '#4ECDC4',
    fontWeight: '500',
  },
});