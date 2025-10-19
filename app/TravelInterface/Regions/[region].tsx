import React from 'react';
import { useLocalSearchParams, Redirect } from 'expo-router';

export default function RegionRouter() {
  const { region } = useLocalSearchParams();
  
  // Redirect to the specific region page
  return <Redirect href={`/regions/${region}`} />;
}