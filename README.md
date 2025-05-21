# Sellfy - Modern E-commerce Platform
## Overview
Sellfy is a modern e-commerce platform built with React and TypeScript. It provides a comprehensive shopping experience with features like product browsing, cart management, wishlist functionality, and user profiles. The application uses Supabase as its backend service for data storage and retrieval.

## Features
- Product Management : Browse, search, and filter products by various criteria
- Shopping Cart : Add products to cart, update quantities, and checkout
- Wishlist : Save favorite products for later
- User Profiles : Manage user information and preferences
- Categories & Brands : Browse products by categories and brands
- Responsive Design : Mobile-friendly interface
- Theme Support : Light and dark mode
## Tech Stack
- Frontend Framework : React with TypeScript
- Build Tool : Vite
- UI Components : shadcn-ui with Radix UI primitives
- Styling : Tailwind CSS
- State Management : React Context API
- Data Fetching : TanStack React Query
- Backend/Database : Supabase
- Routing : React Router
- Form Handling : React Hook Form with Zod validation
## Project Structure
```
src/
├── components/      # UI components organized by feature
│   ├── brands/      # Brand-related components
│   ├── layout/      # Layout components (header, footer, etc.)
│   ├── products/    # Product-related components
│   ├── providers/   # Context providers
│   ├── search/      # Search functionality components
│   └── ui/          # Reusable UI components
├── config/          # Application configuration
├── contexts/        # React context providers
├── data/            # Mock data and constants
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and services
├── pages/           # Application pages/routes
├── services/        # API and business logic
└── types/           # TypeScript type definitions
```
## Prerequisites
- Node.js (Latest LTS version recommended)
- npm or bun package manager
- Supabase account (for backend functionality)
## Getting Started
1. Clone the repository
```
git clone <repository-url>
cd sellfy
```
2. Install dependencies
```
npm install
# or if using bun
bun install
```
3. Set up environment variables
```
cp .env.example .env
```
Edit the .env file and add your Supabase project URL and anonymous key:

```
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```
4. Start the development server
```
npm run dev
# or if using bun
bun dev
```
The application will be available at http://localhost:5173

## Available Scripts
- npm run dev - Start development server
- npm run build - Build for production
- npm run build:dev - Build for development
- npm run lint - Run ESLint
- npm run preview - Preview production build
## State Management
### Cart
The application uses a CartContext to manage the shopping cart state. Features include:

- Adding items to cart
- Removing items from cart
- Updating item quantities
- Calculating subtotals
- Persisting cart data in localStorage
### Wishlist
The WishlistContext manages the user's wishlist with features like:

- Adding products to wishlist
- Removing products from wishlist
- Checking if a product is in the wishlist
- Toggling wishlist status
- Persisting wishlist data in localStorage
## Data Management
The application uses Supabase as its backend service. The productService.ts file contains functions for fetching and manipulating product data.

## Styling
The application uses Tailwind CSS for styling with shadcn-ui components. It also supports theme switching between light and dark modes using next-themes.

## Contributing
1. Fork the repository
2. Create your feature branch ( git checkout -b feature/amazing-feature )
3. Commit your changes ( git commit -m 'Add some amazing feature' )
4. Push to the branch ( git push origin feature/amazing-feature )
5. Open a Pull Request
## License
This project is proprietary. All rights reserved.