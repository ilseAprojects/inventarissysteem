(README description genereated by AI)

# Inventaris Systeem

A simple inventory management system built with Vue 3, TypeScript, and Vite.

## 📝 Description

This application allows you to track products in an inventory. Create, edit, and view product information through a  Vue 3 interface powered by the Composition API and `<script setup>` syntax.

## 🚀 Getting Started

### Prerequisites

- Node.js (≥ 16)
- npm or yarn

### Installation

```bash
# clone the repo (if you haven't already)
git clone https://github.com/ilseAprojects/inventarissysteem.git
cd inventarissysteem

# install dependencies
npm install
# or
# yarn install
```

### Development

Start the development server with hot reloading:

```bash
npm run dev
# or
# yarn dev
```

Then open http://localhost:5173 (or the port shown) in your browser.

### Building for Production

```bash
npm run build
# or
# yarn build
```

The compiled files will be placed in the `dist` folder.

## 📁 Project Structure

```
src/
  ├─ assets/
  ├─ components/      (reusable Vue components)
  ├─ pages/           (route views: Create, Edit, Order, Overview)
  ├─ router/          (Vue Router setup)
  └─ store/           (Pinia inventory store)

public/              (static assets)
```

## ✅ Usage

- **Overview** lists all products.
- **Create** lets you add a new product.
- **Edit** modifies existing products.
- **Order** handles ordering logic (if applicable).

## 📜 License

This project is open source and MIT licensed.

