# Amorattar - Luxury Fragrance E-commerce Platform

A modern e-commerce platform built with Next.js, TypeScript, and Tailwind CSS, specializing in perfumes, attars, and fragrances.

## 🚀 Features

- **Modern UI/UX**: Clean and responsive design with smooth animations
- **Product Catalog**:

  - Categorized products (Perfumes, Attars, Home Fragrances, etc.)
  - Advanced filtering and sorting options
  - Detailed product pages with multiple images
  - Volume selection
  - Color variants
  - Fragrance type indicators

- **Shopping Experience**:

  - Real-time cart management
  - Wishlist functionality
  - Product ratings and reviews
  - Price comparison and discounts
  - Stock status indicators

- **Admin Dashboard**:
  - Secure authentication system
  - Product management (CRUD operations)
  - Order management and tracking
  - User management
  - Sales analytics and reports
  - Inventory management
  - Category management
  - Discount and promotion management

## 🛠️ Tech Stack

- **Frontend**:

  - Next.js 14 (App Router)
  - TypeScript
  - Tailwind CSS
  - Shadcn UI Components
  - Framer Motion (Animations)
  - Redux Toolkit (State Management)

- **Backend**:

  - Next.js API Routes
  - MongoDB with Prisma ORM
  - JWT Authentication
  - Bcrypt for password hashing

- **Styling**:
  - Custom color scheme (#334958 as primary)
  - Responsive design
  - Custom fonts (Dancing Script, Integral CF)

## 📦 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── (user)/            # User-facing routes
│   └── (admin)/           # Admin dashboard routes
├── components/            # Reusable components
│   ├── common/           # Shared components
│   ├── layout/           # Layout components
│   ├── product-page/     # Product-specific components
│   ├── admin/            # Admin dashboard components
│   └── ui/               # UI components
├── lib/                  # Utility functions and hooks
├── styles/              # Global styles and fonts
└── types/               # TypeScript type definitions
```

## 🎨 Theme Colors

- Primary: `#334958` (Dark Blue)
- Accent: `#F9CB43` (Yellow)
- Text: Various shades of black with opacity
- Background: White with subtle patterns

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/SwapnilMk/amorattar.git
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` with your configuration values.

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Key Components

- **Product Cards**: Display product information with hover effects
- **Navigation**: Responsive navbar with dropdown menus
- **Cart System**: Real-time cart updates with quantity indicators
- **Filters**: Advanced product filtering system
- **Pagination**: Custom pagination with ellipsis for large datasets
- **Admin Dashboard**: Secure admin interface with comprehensive management tools

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, email mswapnil218@gmail.com or join our Slack channel.
