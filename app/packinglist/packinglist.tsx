// app/packing.tsx
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Professional packing list categories with comprehensive items
const packingCategories = [
  {
    id: '1',
    name: 'Clothing & Apparel',
    icon: 'shirt',
    color: '#4ECDC4',
    description: 'Essential clothing items for your trip',
    items: [
      { id: '1', name: 'T-shirts', quantity: 5, packed: false, essential: true },
      { id: '2', name: 'Long-sleeve shirts', quantity: 2, packed: false, essential: false },
      { id: '3', name: 'Shorts', quantity: 3, packed: false, essential: true },
      { id: '4', name: 'Long pants/trousers', quantity: 2, packed: false, essential: true },
      { id: '5', name: 'Underwear', quantity: 7, packed: false, essential: true },
      { id: '6', name: 'Socks', quantity: 7, packed: false, essential: true },
      { id: '7', name: 'Swimwear', quantity: 2, packed: false, essential: false },
      { id: '8', name: 'Sleepwear', quantity: 2, packed: false, essential: true },
      { id: '9', name: 'Light jacket', quantity: 1, packed: false, essential: true },
      { id: '10', name: 'Rain jacket', quantity: 1, packed: false, essential: false },
      { id: '11', name: 'Dress clothes', quantity: 1, packed: false, essential: false },
      { id: '12', name: 'Belt', quantity: 1, packed: false, essential: false },
    ]
  },
  {
    id: '2',
    name: 'Toiletries & Personal Care',
    icon: 'medical',
    color: '#FF6B6B',
    description: 'Personal hygiene and grooming essentials',
    items: [
      { id: '13', name: 'Toothbrush & toothpaste', quantity: 1, packed: false, essential: true },
      { id: '14', name: 'Shampoo & conditioner', quantity: 1, packed: false, essential: true },
      { id: '15', name: 'Body wash/soap', quantity: 1, packed: false, essential: true },
      { id: '16', name: 'Deodorant', quantity: 1, packed: false, essential: true },
      { id: '17', name: 'Sunscreen SPF 30+', quantity: 1, packed: false, essential: true },
      { id: '18', name: 'Insect repellent', quantity: 1, packed: false, essential: true },
      { id: '19', name: 'Lip balm', quantity: 1, packed: false, essential: false },
      { id: '20', name: 'Moisturizer', quantity: 1, packed: false, essential: false },
      { id: '21', name: 'Razor & shaving cream', quantity: 1, packed: false, essential: false },
      { id: '22', name: 'Hair brush/comb', quantity: 1, packed: false, essential: true },
      { id: '23', name: 'Nail clippers', quantity: 1, packed: false, essential: false },
      { id: '24', name: 'Feminine hygiene products', quantity: 1, packed: false, essential: false },
    ]
  },
  {
    id: '3',
    name: 'Electronics & Gadgets',
    icon: 'phone-portrait',
    color: '#45B7D1',
    description: 'Electronic devices and accessories',
    items: [
      { id: '25', name: 'Smartphone', quantity: 1, packed: false, essential: true },
      { id: '26', name: 'Phone charger', quantity: 1, packed: false, essential: true },
      { id: '27', name: 'Power bank', quantity: 1, packed: false, essential: true },
      { id: '28', name: 'Camera', quantity: 1, packed: false, essential: false },
      { id: '29', name: 'Headphones', quantity: 1, packed: false, essential: false },
      { id: '30', name: 'Universal travel adapter', quantity: 1, packed: false, essential: true },
      { id: '31', name: 'Portable speaker', quantity: 1, packed: false, essential: false },
      { id: '32', name: 'E-reader/Tablet', quantity: 1, packed: false, essential: false },
      { id: '33', name: 'Laptop & charger', quantity: 1, packed: false, essential: false },
    ]
  },
  {
    id: '4',
    name: 'Travel Documents',
    icon: 'document-text',
    color: '#96CEB4',
    description: 'Important documents and identification',
    items: [
      { id: '34', name: 'Passport', quantity: 1, packed: false, essential: true },
      { id: '35', name: 'Visa documents', quantity: 1, packed: false, essential: true },
      { id: '36', name: 'Driver\'s license/ID', quantity: 1, packed: false, essential: true },
      { id: '37', name: 'Flight tickets/boarding passes', quantity: 1, packed: false, essential: true },
      { id: '38', name: 'Hotel reservations', quantity: 1, packed: false, essential: true },
      { id: '39', name: 'Travel insurance documents', quantity: 1, packed: false, essential: true },
      { id: '40', name: 'Credit/debit cards', quantity: 2, packed: false, essential: true },
      { id: '41', name: 'Cash (local currency)', quantity: 1, packed: false, essential: true },
      { id: '42', name: 'Emergency contacts', quantity: 1, packed: false, essential: true },
      { id: '43', name: 'Vaccination records', quantity: 1, packed: false, essential: false },
    ]
  },
  {
    id: '5',
    name: 'Health & Medical',
    icon: 'medkit',
    color: '#FFA726',
    description: 'Medical supplies and health essentials',
    items: [
      { id: '44', name: 'Prescription medications', quantity: 1, packed: false, essential: true },
      { id: '45', name: 'First aid kit', quantity: 1, packed: false, essential: true },
      { id: '46', name: 'Pain relievers', quantity: 1, packed: false, essential: true },
      { id: '47', name: 'Antihistamines', quantity: 1, packed: false, essential: false },
      { id: '48', name: 'Antidiarrheal medication', quantity: 1, packed: false, essential: true },
      { id: '49', name: 'Motion sickness pills', quantity: 1, packed: false, essential: false },
      { id: '50', name: 'Bandages & antiseptic', quantity: 1, packed: false, essential: true },
      { id: '51', name: 'Hand sanitizer', quantity: 1, packed: false, essential: true },
      { id: '52', name: 'Face masks', quantity: 5, packed: false, essential: false },
      { id: '53', name: 'Vitamins', quantity: 1, packed: false, essential: false },
    ]
  },
  {
    id: '6',
    name: 'Accessories & Miscellaneous',
    icon: 'glasses',
    color: '#BA68C8',
    description: 'Additional travel accessories',
    items: [
      { id: '54', name: 'Sunglasses', quantity: 1, packed: false, essential: true },
      { id: '55', name: 'Hat/cap', quantity: 1, packed: false, essential: true },
      { id: '56', name: 'Day backpack', quantity: 1, packed: false, essential: true },
      { id: '57', name: 'Reusable water bottle', quantity: 1, packed: false, essential: true },
      { id: '58', name: 'Books/magazines', quantity: 2, packed: false, essential: false },
      { id: '59', name: 'Travel pillow', quantity: 1, packed: false, essential: false },
      { id: '60', name: 'Eye mask & ear plugs', quantity: 1, packed: false, essential: false },
      { id: '61', name: 'Travel locks', quantity: 2, packed: false, essential: false },
      { id: '62', name: 'Umbrella', quantity: 1, packed: false, essential: false },
      { id: '63', name: 'Reusable shopping bag', quantity: 1, packed: false, essential: false },
    ]
  }
];

// Enhanced trip templates with specific items
const tripTemplates = [
  {
    id: 'beach',
    name: 'Beach Vacation',
    icon: 'beach',
    color: '#4ECDC4',
    description: 'Tropical getaway essentials',
    duration: 7
  },
  {
    id: 'city',
    name: 'City Break',
    icon: 'business',
    color: '#45B7D1',
    description: 'Urban exploration essentials',
    duration: 4
  },
  {
    id: 'adventure',
    name: 'Adventure Trip',
    icon: 'trail-sign',
    color: '#96CEB4',
    description: 'Outdoor and hiking gear',
    duration: 5
  },
  {
    id: 'business',
    name: 'Business Trip',
    icon: 'briefcase',
    color: '#FFA726',
    description: 'Professional and formal attire',
    duration: 3
  }
];

export default function PackingList() {
  const router = useRouter();
  const [packingList, setPackingList] = useState(packingCategories);
  const [selectedCategory, setSelectedCategory] = useState(packingCategories[0]);
  const [tripName, setTripName] = useState('My Ghana Adventure');
  const [tripDuration, setTripDuration] = useState(7);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('1');
  const [newItemCategory, setNewItemCategory] = useState(packingCategories[0].id);
  const [showEssentialsOnly, setShowEssentialsOnly] = useState(false);

  useEffect(() => {
    loadPackingList();
  }, []);

  const loadPackingList = async () => {
    try {
      const savedList = await AsyncStorage.getItem('userPackingList');
      if (savedList) {
        const parsedList = JSON.parse(savedList);
        setPackingList(parsedList);
        setSelectedCategory(parsedList[0]);
      }
    } catch (error) {
      console.error('Error loading packing list:', error);
    }
  };

  const savePackingList = async (list: any) => {
    try {
      await AsyncStorage.setItem('userPackingList', JSON.stringify(list));
    } catch (error) {
      console.error('Error saving packing list:', error);
    }
  };

  const toggleItemPacked = (categoryId: string, itemId: string) => {
    const updatedList = packingList.map(category => {
      if (category.id === categoryId) {
        const updatedItems = category.items.map(item => 
          item.id === itemId ? { ...item, packed: !item.packed } : item
        );
        return { ...category, items: updatedItems };
      }
      return category;
    });
    
    setPackingList(updatedList);
    savePackingList(updatedList);
  };

  const updateItemQuantity = (categoryId: string, itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedList = packingList.map(category => {
      if (category.id === categoryId) {
        const updatedItems = category.items.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        return { ...category, items: updatedItems };
      }
      return category;
    });
    
    setPackingList(updatedList);
    savePackingList(updatedList);
  };

  const addCustomItem = () => {
    if (!newItemName.trim()) {
      Alert.alert('Error', 'Please enter an item name');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      quantity: parseInt(newItemQuantity) || 1,
      packed: false,
      essential: false
    };

    console.log('Adding new item:', newItem);
    console.log('To category:', newItemCategory);

    const updatedList = packingList.map(category => {
      if (category.id === newItemCategory) {
        const newItems = [...category.items, newItem];
        console.log('Updated category items:', newItems);
        return { ...category, items: newItems };
      }
      return category;
    });

    console.log('Updated packing list:', updatedList);
    
    setPackingList(updatedList);
    savePackingList(updatedList);
    
    // Reset form and close modal
    setNewItemName('');
    setNewItemQuantity('1');
    setShowAddItemModal(false);
    
    // Show success message
    Alert.alert('Success', `"${newItem.name}" has been added to your packing list!`);
  };

  const deleteItem = (categoryId: string, itemId: string) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedList = packingList.map(category => {
              if (category.id === categoryId) {
                const updatedItems = category.items.filter(item => item.id !== itemId);
                return { ...category, items: updatedItems };
              }
              return category;
            });
            
            setPackingList(updatedList);
            savePackingList(updatedList);
            
            // Show confirmation
            const deletedItem = packingList
              .find(cat => cat.id === categoryId)
              ?.items.find(item => item.id === itemId);
              
            if (deletedItem) {
              Alert.alert('Deleted', `"${deletedItem.name}" has been removed from your list`);
            }
          }
        }
      ]
    );
  };

  const applyTemplate = (template: any) => {
    Alert.alert(
      'Apply Template',
      `Apply ${template.name} packing template? This will set trip duration to ${template.duration} days.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Apply',
          onPress: () => {
            setTripDuration(template.duration);
            setTripName(`My ${template.name}`);
            // Reset all items to unpacked
            const resetList = packingList.map(category => ({
              ...category,
              items: category.items.map(item => ({ ...item, packed: false }))
            }));
            setPackingList(resetList);
            savePackingList(resetList);
            setShowTemplateModal(false);
            Alert.alert('Template Applied', `${template.name} template has been applied successfully!`);
          }
        }
      ]
    );
  };

  const clearAllPacked = () => {
    const packedItems = packingList.flatMap(category => 
      category.items.filter(item => item.packed)
    ).length;

    if (packedItems === 0) {
      Alert.alert('No Packed Items', 'There are no packed items to clear.');
      return;
    }

    Alert.alert(
      'Clear Packed Items',
      `Remove ${packedItems} packed items from your list?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            const clearedList = packingList.map(category => ({
              ...category,
              items: category.items.filter(item => !item.packed)
            }));
            setPackingList(clearedList);
            savePackingList(clearedList);
            Alert.alert('Cleared', `${packedItems} packed items have been removed.`);
          }
        }
      ]
    );
  };

  const getProgress = () => {
    const totalItems = packingList.flatMap(category => category.items).length;
    const packedItems = packingList.flatMap(category => 
      category.items.filter(item => item.packed)
    ).length;
    
    return totalItems > 0 ? (packedItems / totalItems) * 100 : 0;
  };

  const getFilteredItems = () => {
    const category = packingList.find(cat => cat.id === selectedCategory.id);
    if (!category) return [];
    
    if (showEssentialsOnly) {
      return category.items.filter(item => item.essential);
    }
    return category.items;
  };

  const PackingItem = ({ item, categoryId }: { item: any, categoryId: string }) => (
    <View style={styles.itemCard}>
      <TouchableOpacity 
        style={styles.checkbox}
        onPress={() => toggleItemPacked(categoryId, item.id)}
      >
        <Ionicons 
          name={item.packed ? "checkbox" : "square-outline"} 
          size={24} 
          color={item.packed ? "#4ECDC4" : "#64748B"} 
        />
      </TouchableOpacity>
      
      <View style={styles.itemInfo}>
        <View style={styles.itemHeader}>
          <Text style={[styles.itemName, item.packed && styles.itemNamePacked]}>
            {item.name}
          </Text>
          {item.essential && (
            <View style={styles.essentialBadge}>
              <Ionicons name="star" size={12} color="#FFFFFF" />
              <Text style={styles.essentialText}>Essential</Text>
            </View>
          )}
        </View>
        <Text style={styles.categoryName}>{selectedCategory.name}</Text>
      </View>
      
      <View style={styles.quantityControls}>
        <TouchableOpacity 
          style={styles.quantityButton}
          onPress={() => updateItemQuantity(categoryId, item.id, item.quantity - 1)}
        >
          <Ionicons name="remove" size={16} color="#64748B" />
        </TouchableOpacity>
        
        <Text style={styles.quantityText}>{item.quantity}</Text>
        
        <TouchableOpacity 
          style={styles.quantityButton}
          onPress={() => updateItemQuantity(categoryId, item.id, item.quantity + 1)}
        >
          <Ionicons name="add" size={16} color="#64748B" />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => deleteItem(categoryId, item.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
      </TouchableOpacity>
    </View>
  );

  const CategoryPill = ({ category }: { category: any }) => (
    <TouchableOpacity
      style={[
        styles.categoryPill,
        selectedCategory.id === category.id && styles.categoryPillSelected,
        { borderColor: category.color }
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <View style={[styles.categoryIcon, { backgroundColor: `${category.color}15` }]}>
        <Ionicons 
          name={category.icon as any} 
          size={16} 
          color={selectedCategory.id === category.id ? "#FFFFFF" : category.color} 
        />
      </View>
      <Text style={[
        styles.categoryPillText,
        selectedCategory.id === category.id && styles.categoryPillTextSelected
      ]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Packing List</Text>
          <Text style={styles.headerSubtitle}>Stay organized for your trip</Text>
        </View>
        <TouchableOpacity 
          style={styles.templateButton}
          onPress={() => setShowTemplateModal(true)}
        >
          <Ionicons name="copy-outline" size={20} color="#4ECDC4" />
        </TouchableOpacity>
      </View>

      {/* Trip Info Card */}
      <View style={styles.tripInfoCard}>
        <View style={styles.tripInfoHeader}>
          <Ionicons name="location" size={20} color="#4ECDC4" />
          <Text style={styles.tripInfoTitle}>Trip Details</Text>
        </View>
        <View style={styles.tripInfoContent}>
          <View style={styles.tripNameContainer}>
            <Text style={styles.tripNameLabel}>Trip Name</Text>
            <TextInput
              style={styles.tripNameInput}
              value={tripName}
              onChangeText={setTripName}
              placeholder="Enter trip name"
            />
          </View>
          <View style={styles.durationContainer}>
            <Text style={styles.durationLabel}>Duration</Text>
            <View style={styles.durationInputContainer}>
              <TextInput
                style={styles.durationInput}
                value={tripDuration.toString()}
                onChangeText={(text) => setTripDuration(parseInt(text) || 1)}
                keyboardType="numeric"
              />
              <Text style={styles.durationUnit}>days</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Progress Section */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <View>
            <Text style={styles.progressTitle}>Packing Progress</Text>
            <Text style={styles.progressSubtitle}>
              {Math.round(getProgress())}% Complete • {packingList.flatMap(cat => cat.items.filter(item => item.packed)).length} of {packingList.flatMap(cat => cat.items).length} items packed
            </Text>
          </View>
          <View style={styles.progressPercentage}>
            <Text style={styles.progressPercentageText}>{Math.round(getProgress())}%</Text>
          </View>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${getProgress()}%` }
            ]} 
          />
        </View>
      </View>

      {/* Categories Navigation */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
        >
          {packingList.map((category) => (
            <CategoryPill key={category.id} category={category} />
          ))}
        </ScrollView>
      </View>

      {/* Packing Items Section */}
      <View style={styles.itemsSection}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>{selectedCategory.name}</Text>
            <Text style={styles.sectionSubtitle}>{selectedCategory.description}</Text>
          </View>
          <View style={styles.sectionActions}>
            <TouchableOpacity 
              style={[styles.filterButton, showEssentialsOnly && styles.filterButtonActive]}
              onPress={() => setShowEssentialsOnly(!showEssentialsOnly)}
            >
              <Ionicons 
                name="star" 
                size={16} 
                color={showEssentialsOnly ? "#FFFFFF" : "#4ECDC4"} 
              />
              <Text style={[styles.filterButtonText, showEssentialsOnly && styles.filterButtonTextActive]}>
                Essentials
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setShowAddItemModal(true)}
            >
              <Ionicons name="add" size={20} color="#FFFFFF" />
              <Text style={styles.addButtonText}>Add Item</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <FlatList
          data={getFilteredItems()}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PackingItem item={item} categoryId={selectedCategory.id} />
          )}
          showsVerticalScrollIndicator={false}
          style={styles.itemsList}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="cube-outline" size={48} color="#94A3B8" />
              <Text style={styles.emptyStateText}>
                {showEssentialsOnly ? 'No essential items' : 'No items in this category'}
              </Text>
              <Text style={styles.emptyStateSubtext}>
                {showEssentialsOnly 
                  ? 'All essential items are packed or none exist in this category' 
                  : 'Add items to get started with your packing list'
                }
              </Text>
            </View>
          }
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={clearAllPacked}
        >
          <Ionicons name="trash-outline" size={20} color="#64748B" />
          <Text style={styles.secondaryButtonText}>Clear Packed</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => {
            Alert.alert('Success', 'Your packing list has been saved and is ready for your trip!');
          }}
        >
          <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
          <Text style={styles.primaryButtonText}>Save & Complete</Text>
        </TouchableOpacity>
      </View>

      {/* Template Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showTemplateModal}
        onRequestClose={() => setShowTemplateModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose a Template</Text>
              <TouchableOpacity 
                onPress={() => setShowTemplateModal(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSubtitle}>Select a pre-made packing list template</Text>
            
            <FlatList
              data={tripTemplates}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.templateCard}
                  onPress={() => applyTemplate(item)}
                >
                  <View style={[styles.templateIcon, { backgroundColor: `${item.color}15` }]}>
                    <Ionicons name={item.icon as any} size={24} color={item.color} />
                  </View>
                  <View style={styles.templateInfo}>
                    <Text style={styles.templateName}>{item.name}</Text>
                    <Text style={styles.templateDescription}>{item.description}</Text>
                    <View style={styles.templateMeta}>
                      <Ionicons name="calendar" size={14} color="#64748B" />
                      <Text style={styles.templateDuration}>{item.duration} days</Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#64748B" />
                </TouchableOpacity>
              )}
              style={styles.templatesList}
            />
          </View>
        </View>
      </Modal>

      {/* Add Item Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAddItemModal}
        onRequestClose={() => setShowAddItemModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Item</Text>
              <TouchableOpacity 
                onPress={() => setShowAddItemModal(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.addItemForm}>
              <Text style={styles.inputLabel}>Item Name</Text>
              <TextInput
                style={styles.textInput}
                value={newItemName}
                onChangeText={setNewItemName}
                placeholder="Enter item name"
                placeholderTextColor="#94A3B8"
                autoFocus={true}
              />
              
              <Text style={styles.inputLabel}>Quantity</Text>
              <TextInput
                style={styles.textInput}
                value={newItemQuantity}
                onChangeText={setNewItemQuantity}
                placeholder="1"
                keyboardType="numeric"
                placeholderTextColor="#94A3B8"
              />
              
              <Text style={styles.inputLabel}>Category</Text>
              <View style={styles.categorySelect}>
                {packingList.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryOption,
                      newItemCategory === category.id && styles.categoryOptionSelected,
                      { borderColor: category.color }
                    ]}
                    onPress={() => setNewItemCategory(category.id)}
                  >
                    <Ionicons 
                      name={category.icon as any} 
                      size={16} 
                      color={newItemCategory === category.id ? "#FFFFFF" : category.color} 
                    />
                    <Text style={[
                      styles.categoryOptionText,
                      newItemCategory === category.id && styles.categoryOptionTextSelected
                    ]}>
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              <TouchableOpacity 
                style={[styles.submitButton, !newItemName.trim() && styles.submitButtonDisabled]}
                onPress={addCustomItem}
                disabled={!newItemName.trim()}
              >
                <Text style={styles.submitButtonText}>Add to Packing List</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ... (keep the same styles as before)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    padding: 4,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  templateButton: {
    padding: 4,
  },
  tripInfoCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  tripInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tripInfoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 8,
  },
  tripInfoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tripNameContainer: {
    flex: 2,
  },
  tripNameLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 4,
  },
  tripNameInput: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  durationContainer: {
    flex: 1,
    marginLeft: 16,
  },
  durationLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 4,
  },
  durationInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  durationInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    padding: 12,
    textAlign: 'center',
  },
  durationUnit: {
    fontSize: 14,
    color: '#64748B',
    paddingHorizontal: 12,
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  progressSubtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  progressPercentage: {
    backgroundColor: '#F0FDFA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  progressPercentageText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4ECDC4',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ECDC4',
    borderRadius: 4,
  },
  categoriesSection: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
  },
  categoriesScroll: {
    marginBottom: 8,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    gap: 8,
  },
  categoryPillSelected: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryPillText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  categoryPillTextSelected: {
    color: '#FFFFFF',
  },
  itemsSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  sectionActions: {
    alignItems: 'flex-end',
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4ECDC4',
    gap: 4,
  },
  filterButtonActive: {
    backgroundColor: '#4ECDC4',
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4ECDC4',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  itemsList: {
    flex: 1,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  checkbox: {
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '600',
    marginRight: 8,
  },
  itemNamePacked: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  essentialBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFA726',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 2,
  },
  essentialText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  categoryName: {
    fontSize: 12,
    color: '#64748B',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginHorizontal: 12,
  },
  quantityButton: {
    padding: 8,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    paddingHorizontal: 8,
    minWidth: 20,
    textAlign: 'center',
  },
  deleteButton: {
    padding: 4,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 12,
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  primaryButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4ECDC4',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#4ECDC4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  secondaryButtonText: {
    color: '#64748B',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#64748B',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  closeButton: {
    padding: 4,
  },
  templatesList: {
    paddingHorizontal: 20,
  },
  templateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  templateIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  templateInfo: {
    flex: 1,
  },
  templateName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  templateDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  templateMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  templateDuration: {
    fontSize: 12,
    color: '#64748B',
  },
  addItemForm: {
    padding: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
    marginTop: 16,
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1E293B',
  },
  categorySelect: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    gap: 6,
  },
  categoryOptionSelected: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
  },
  categoryOptionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  categoryOptionTextSelected: {
    color: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#4ECDC4',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#4ECDC4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    backgroundColor: '#94A3B8',
    shadowColor: 'transparent',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});