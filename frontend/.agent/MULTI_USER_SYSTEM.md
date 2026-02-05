# Multi-User Account System

## Overview
The Shop Khata application now supports multiple user accounts with complete data segregation. Each user (identified by email) has their own separate:
- Inventory
- Transactions
- Customers
- Shop Profile
- Premium Status
- Settings

## How It Works

### User Database
All users are stored in `localStorage` under the key `shop_users` as an array:
```javascript
[
  {
    email: "user1@example.com",
    password: "password123",
    shopName: "User 1 Shop",
    isPremium: false
  },
  {
    email: "user2@example.com", 
    password: "password456",
    shopName: "User 2 Shop",
    isPremium: true
  }
]
```

### Data Segregation
Each user's data is stored with their email as a prefix:
- `inventory_user1@example.com` - User 1's inventory
- `transactions_user1@example.com` - User 1's transactions
- `customers_user1@example.com` - User 1's customers
- `profile_user1@example.com` - User 1's shop profile
- `isDataCleared_user1@example.com` - User 1's data cleared flag

### Current User Tracking
The currently logged-in user's email is stored in `localStorage` under `currentUserEmail`.

## Authentication Flow

### Signup (Free Account)
1. User fills signup form with email, password, shop name
2. System checks if email already exists
3. Creates new user in `shop_users` with `isPremium: false`
4. Redirects to login page

### Login
1. User enters email and password
2. System validates credentials against `shop_users`
3. Sets `currentUserEmail` in localStorage
4. Loads user-specific data (inventory, transactions, etc.)
5. Redirects to dashboard

### Premium Signup (Buy Now Flow)
1. User clicks "Buy Now" on landing page
2. Fills detailed form (owner name, shop name, email, password, phone, address)
3. Proceeds to payment page
4. After payment simulation:
   - Creates new user with `isPremium: true`
   - Automatically logs them in
   - Redirects to dashboard with premium features unlocked

### Logout
1. Clears `currentUserEmail` from localStorage
2. Clears all state data (inventory, transactions, etc.)
3. Redirects to landing page

## Testing the System

### Create Multiple Accounts
1. **Free Account**: 
   - Go to `/signup`
   - Email: `free@test.com`, Password: `123456`, Shop: "Free Shop"
   
2. **Premium Account**:
   - Go to landing page → Click "Buy Now"
   - Email: `premium@test.com`, Password: `123456`, Shop: "Premium Shop"
   - Complete payment flow

3. **Another Free Account**:
   - Logout
   - Go to `/signup`
   - Email: `another@test.com`, Password: `123456`, Shop: "Another Shop"

### Verify Data Segregation
1. Login as `free@test.com`
   - Add some inventory items
   - Create transactions
   - Note the data

2. Logout and login as `premium@test.com`
   - You should see completely different data
   - Premium features should be unlocked

3. Logout and login back as `free@test.com`
   - Your original data should still be there
   - Premium features should be locked

## Key Features

✅ **Complete Data Isolation**: Each user has their own separate data
✅ **Premium Status Per User**: Free and premium users can coexist
✅ **Persistent Sessions**: User stays logged in across page refreshes
✅ **Secure Logout**: Properly clears session and prevents data leakage
✅ **Default Inventory**: New users get 10 starter items
✅ **Premium Perks**: Premium users get bonus inventory items on upgrade

## Technical Implementation

### Context Provider (`ShopContext.jsx`)
- Manages authentication state
- Handles user data loading/saving
- Provides `login()`, `signup()`, `logout()` functions
- Automatically loads user-specific data on login

### Protected Routes
- Uses `ProtectedRoute` component that checks `isAuthenticated`
- Redirects to landing page if not authenticated

### Data Persistence
- All data saves are conditional on `currentUser` being set
- Uses email-prefixed keys for localStorage
- Automatic sync between state and localStorage

## Migration from Old System

The old system used global keys like `inventory`, `transactions`, `user`, etc. The new system:
- Uses `shop_users` array for user registry
- Uses `currentUserEmail` for session tracking
- Uses `{dataType}_{email}` pattern for user data

Old data will be ignored. Users need to create new accounts.
