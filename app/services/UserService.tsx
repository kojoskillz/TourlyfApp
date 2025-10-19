// services/UserService.ts
export interface UserPreferences {
  // Travel Types
  adventure: boolean;
  cultural: boolean;
  beach: boolean;
  city: boolean;
  nature: boolean;
  
  // Budget Level
  budget: 'low' | 'medium' | 'high';
  
  // Travel Style
  solo: boolean;
  couple: boolean;
  family: boolean;
  friends: boolean;
  
  // Activities
  hiking: boolean;
  shopping: boolean;
  dining: boolean;
  photography: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

// Mock database using AsyncStorage simulation
class UserService {
  private currentUser: UserProfile | null = null;
  private storageKey = 'user_profile';

  // Initialize with mock data
  async initializeUser(): Promise<UserProfile> {
    const defaultPreferences: UserPreferences = {
      adventure: true,
      cultural: false,
      beach: true,
      city: false,
      nature: true,
      budget: 'medium',
      solo: false,
      couple: true,
      family: false,
      friends: true,
      hiking: true,
      shopping: false,
      dining: true,
      photography: true,
    };

    const user: UserProfile = {
      id: 'user_001',
      name: 'Travel Explorer',
      email: 'explorer@example.com',
      preferences: defaultPreferences,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.currentUser = user;
    
    // Simulate saving to AsyncStorage
    await this.saveToStorage(user);
    
    return user;
  }

  // Get user profile
  async getUserProfile(): Promise<UserProfile | null> {
    if (this.currentUser) {
      return this.currentUser;
    }

    // Simulate loading from storage
    try {
      const stored = await this.loadFromStorage();
      this.currentUser = stored;
      return stored;
    } catch (error) {
      console.log('No user profile found, creating new one...');
      return await this.initializeUser();
    }
  }

  // Update preferences
  async updatePreferences(preferences: Partial<UserPreferences>): Promise<UserProfile> {
    if (!this.currentUser) {
      throw new Error('No user profile found');
    }

    const updatedUser: UserProfile = {
      ...this.currentUser,
      preferences: {
        ...this.currentUser.preferences,
        ...preferences,
      },
      updatedAt: new Date(),
    };

    this.currentUser = updatedUser;
    
    // Simulate saving to storage
    await this.saveToStorage(updatedUser);
    
    return updatedUser;
  }

  // Mock storage methods
  private async saveToStorage(user: UserProfile): Promise<void> {
    // In a real app, this would be AsyncStorage.setItem()
    console.log('Saving user data:', user);
    // Simulate async operation
    return new Promise((resolve) => setTimeout(resolve, 100));
  }

  private async loadFromStorage(): Promise<UserProfile | null> {
    // In a real app, this would be AsyncStorage.getItem()
    // For now, return null to trigger initialization
    return new Promise((resolve) => setTimeout(() => resolve(null), 100));
  }

  // Clear user data (for testing)
  async clearUserData(): Promise<void> {
    this.currentUser = null;
    console.log('User data cleared');
    return new Promise((resolve) => setTimeout(resolve, 100));
  }
}

export const userService = new UserService();