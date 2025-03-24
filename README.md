# NileApp - React Native Technical Assessment

## Tech Stack
- **Framework**: Expo + React Native (TypeScript)
- **State Management**: Redux Toolkit
- **Authentication**: Firebase Authentication (Email/Password)
- **API**: FakeStoreAPI (https://fakestoreapi.com)
- **Navigation**: Expo Router (Folder-based routing)
- **UI/UX**: Custom design (by me)

## Features Implemented
- **Authentication**
  - Sign In & Sign Up screens
  - Firebase Authentication for user management
- **Navigation**
  - Tab-based navigation with `Home`, `Search`, `Cart`, and `Profile`
  - **Cart screen for managing items**
- **Global State Management**
  - Used Redux for managing authentication, cart, and product state
- **Toast Notifications**
  - Custom toast implementation for user feedback
- **Cart Functionality**
  - Add to cart, increase/decrease quantity
  - Total cart price calculation
- **Product Details Page**
  - Fetches product details and allows adding items to the cart
- **Build & Deployment**
  - **Download APK**: [Expo Build Link](https://expo.dev/accounts/gabbykarry/projects/nileApp/builds/c4af3289-36f6-4aad-8b0e-ec1aac538d06)
  - **QR Code**: [Scan to Download](https://drive.google.com/file/d/1_5BKbJT1z-FeIDa2e2Lu6FY0OEsXakvG/view?usp=sharing)

## Debugging Challenge Solution

### **Buggy Code Issues**
- `useState` should have an initial state (`useState([])`) to prevent `.map()` errors.
- No error handling for failed API calls.
- No loading state, which could cause a blank screen before data loads.

### **Fixed Code**
```tsx
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const ProductList = () => {
  const [products, setProducts] = useState<{ id: number; title: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <Text>Loading products...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View>
      {products.map(product => (
        <Text key={product.id}>{product.title}</Text>
      ))}
    </View>
  );
};

export default ProductList;
```

My submission for the technical assessment. The main focus was implementing authentication, state management, and cart functionality efficiently using best practices.

