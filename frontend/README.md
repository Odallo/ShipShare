---
title: # ShipShare Kenya Frontend

A modern, responsive web application for sharing shipping costs in Kenya.

## 📁 File Structure

```
frontend/
├── index.html          # Main HTML file with navigation and footer
├── app.js              # Main JavaScript application logic
├── styles.css           # Custom CSS styles and animations
├── pages/              # Individual page components
│   ├── browse.html     # Browse groups page
│   ├── dashboard.html  # User dashboard
│   ├── profile.html    # User profile page
│   └── ...            # Other pages
└── assets/             # Static assets (images, icons, etc.)
```

## 🚀 Getting Started

1. **Open the application:**
   ```bash
   # Serve the files with a local server
   python -m http.server 8080
   # or use Node.js
   npx serve .
   ```

2. **Access the app:**
   ```
   http://localhost:8080
   ```

## 🎯 Key Features

### ✅ **Implemented Features:**
- **Responsive Design** - Works on all devices
- **Real-time Filtering** - Dynamic group filtering
- **User Authentication** - Sign up/login with persistence
- **Browser Navigation** - Back/forward buttons work
- **Dark Mode** - Toggle light/dark themes
- **Mobile Menu** - Touch-friendly navigation
- **Live Updates** - Real-time shipment tracking

### 📱 **Pages Available:**
- **Landing** - Marketing homepage
- **Browse Groups** - Find and join shipping groups
- **Authentication** - Sign up/login forms
- **Dashboard** - User overview and stats
- **Profile** - Personal shipping history
- **Settings** - User preferences and notifications
- **Help/FAQ** - Support and documentation

## 🎨 **Styling System**

### **CSS Framework:**
- **Tailwind CSS** - Utility-first styling
- **Custom CSS** - Animations and components
- **Responsive Grid** - Mobile-first design

### **Color Palette:**
- **Primary:** Blue (#667eea, #3b82f6)
- **Secondary:** Green (#10b981, #065f46)
- **Accent:** Amber (#f59e0b, #d97706)
- **Neutral:** Gray scale for text and backgrounds

## 🔧 **JavaScript Architecture**

### **Core Features:**
- **Alpine.js** - Reactive data binding
- **Local Storage** - User data persistence
- **Hash Routing** - SPA navigation
- **Component System** - Modular page structure

### **Data Management:**
- **User Authentication** - Secure login/signup
- **Group Filtering** - Real-time search
- **Shipment Tracking** - Status updates
- **Settings Management** - User preferences

## 🇰🇪 **Kenyan Context**

### **Localization:**
- **Currency:** KES (Kenyan Shillings)
- **Locations:** Major Kenyan cities
- **Routes:** Popular shipping corridors
- **Payment:** M-Pesa integration ready

### **Content:**
- **Language:** English with local terms
- **Phone Format:** +254 XXX XXX XXX
- **Business Hours:** Kenyan time zones
- **Support:** Local contact information

## 📊 **Browser Support**

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers

## 🚀 **Development**

### **Local Development:**
```bash
# Start development server
python -m http.server 8080

# or with Node.js
npx serve -p 8080

# or with PHP
php -S localhost:8080
```

### **File Organization:**
- **Separation of Concerns** - HTML, CSS, JS separated
- **Component Structure** - Modular page components
- **Asset Management** - Organized static files
- **Clean Architecture** - Easy to maintain

## 🔒 **Security Features**

- **Input Validation** - Form sanitization
- **XSS Protection** - Safe data handling
- **Local Storage** - Secure user data
- **HTTPS Ready** - Production security

## 📱 **Mobile Features**

- **Touch Gestures** - Swipe navigation
- **Responsive Design** - All screen sizes
- **Mobile Menu** - Hamburger navigation
- **Fast Loading** - Optimized performance

## 🎯 **Next Steps**

### **Enhancements:**
- [ ] Backend API integration
- [ ] Real-time notifications
- [ ] Map visualization
- [ ] Advanced analytics
- [ ] Mobile app development

### **Deployment:**
- [ ] Production build setup
- [ ] CDN optimization
- [ ] SSL certificate
- [ ] Domain configuration

---

**🚢 ShipShare Kenya - Saving Kenyans money on shipping, one group at a time!**
