// app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from '../contexts/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <StatusBar style="auto" />
        
        {/* Index/Splash Screen */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        
        {/* Authentication Routes */}
        <Stack.Screen name="authentication/signin" options={{ headerShown: false }} />
        <Stack.Screen name="authentication/signup" options={{ headerShown: false }} />
        <Stack.Screen name="authentication/profile" options={{ headerShown: false }} />
        
        {/* Main App Routes */}
        <Stack.Screen name="TravelInterface/travelInterface" options={{ headerShown: false }} />
        
        {/* Explore Routes */}
        <Stack.Screen name="explore/explore" options={{ headerShown: false }} />
        
        {/* Planning Routes */}
        <Stack.Screen name="planning/wizard" options={{ headerShown: false }} />
        
        {/* Regions Routes */}
        <Stack.Screen 
          name="TravelInterface/Regions/[region]" 
          options={{ headerShown: false }} 
        />
        
        {/* Individual Region Routes (if they exist as separate files) */}
        <Stack.Screen name="TravelInterface/Regions/ahafo" options={{ headerShown: false }} />
        <Stack.Screen name="TravelInterface/Regions/ashanti" options={{ headerShown: false }} />
        <Stack.Screen name="TravelInterface/Regions/bono-east" options={{ headerShown: false }} />
        <Stack.Screen name="TravelInterface/Regions/bono" options={{ headerShown: false }} />
        <Stack.Screen name="TravelInterface/Regions/central" options={{ headerShown: false }} />
        <Stack.Screen name="TravelInterface/Regions/eastern" options={{ headerShown: false }} />
        <Stack.Screen name="TravelInterface/Regions/greater-accra" options={{ headerShown: false }} />
        <Stack.Screen name="TravelInterface/Regions/north-east" options={{ headerShown: false }} />
        <Stack.Screen name="TravelInterface/Regions/northern" options={{ headerShown: false }} />
        <Stack.Screen name="TravelInterface/Regions/oti" options={{ headerShown: false }} />
        <Stack.Screen name="TravelInterface/Regions/savannah" options={{ headerShown: false }} />
        <Stack.Screen name="TravelInterface/Regions/upper-east" options={{ headerShown: false }} />
        <Stack.Screen name="TravelInterface/Regions/upper-west" options={{ headerShown: false }} />
        <Stack.Screen name="TravelInterface/Regions/volta" options={{ headerShown: false }} />
        <Stack.Screen name="TravelInterface/Regions/western-north" options={{ headerShown: false }} />
        <Stack.Screen name="TravelInterface/Regions/western" options={{ headerShown: false }} />
        
        {/* Modal Route */}
        <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}