// ShipShare Kenya - Main Application JavaScript

function shipShareApp() {
    return {
        currentPage: 'landing',
        user: null,
        darkMode: false,
        mobileMenuOpen: false,
        profileTab: 'shipments',
        
        // Filter state
        filters: {
            from: 'All Locations',
            to: 'All Destinations', 
            type: 'All Types',
            status: 'All Status'
        },
        
        mockGroups: [
            {
                id: 1,
                destination: 'Mombasa',
                origin: 'Nairobi CBD',
                participants: 3,
                maxParticipants: 5,
                totalWeight: '45kg',
                savings: 'KES 2,400',
                deadline: '2 days',
                status: 'open',
                route: 'Nairobi → Mombasa (A109 Highway)',
                packageType: 'Electronics',
                weight: 45
            },
            {
                id: 2,
                destination: 'Kisumu',
                origin: 'Westlands, Nairobi',
                participants: 2,
                maxParticipants: 4,
                totalWeight: '28kg',
                savings: 'KES 1,800',
                deadline: '1 day',
                status: 'open',
                route: 'Nairobi → Kisumu (A104)',
                packageType: 'Documents',
                weight: 28
            },
            {
                id: 3,
                destination: 'Nakuru',
                origin: 'Nairobi CBD',
                participants: 4,
                maxParticipants: 4,
                totalWeight: '62kg',
                savings: 'KES 3,200',
                deadline: 'Closing today',
                status: 'closing',
                route: 'Nairobi → Nakuru (A104)',
                packageType: 'Clothing',
                weight: 62
            },
            {
                id: 4,
                destination: 'Eldoret',
                origin: 'Thika',
                participants: 1,
                maxParticipants: 3,
                totalWeight: '15kg',
                savings: 'KES 900',
                deadline: '3 days',
                status: 'open',
                route: 'Thika → Eldoret',
                packageType: 'Food Items',
                weight: 15
            },
            {
                id: 5,
                destination: 'Malindi',
                origin: 'Nakuru',
                participants: 2,
                maxParticipants: 4,
                totalWeight: '35kg',
                savings: 'KES 1,500',
                deadline: '2 days',
                status: 'open',
                route: 'Nakuru → Malindi',
                packageType: 'Electronics',
                weight: 35
            },
            {
                id: 6,
                destination: 'Kisumu',
                origin: 'Nairobi CBD',
                participants: 3,
                maxParticipants: 5,
                totalWeight: '55kg',
                savings: 'KES 2,800',
                deadline: '1 day',
                status: 'closing',
                route: 'Nairobi → Kisumu (A104)',
                packageType: 'Clothing',
                weight: 55
            }
        ],
        
        mockUsers: [], // This will store signed up users
        
        init() {
            // Check for saved dark mode preference
            if (localStorage.getItem('darkMode') === 'true') {
                this.darkMode = true;
                document.documentElement.classList.add('dark-mode');
            }
            
            // Load users from localStorage
            const savedUsers = localStorage.getItem('mockUsers');
            if (savedUsers) {
                this.mockUsers = JSON.parse(savedUsers);
            }
            
            // Check for saved user
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                this.user = JSON.parse(savedUser);
            }
            
            // Handle hash-based routing
            const handleHashChange = () => {
                const hash = window.location.hash.slice(1);
                if (hash && hash !== this.currentPage) {
                    this.currentPage = hash;
                    this.loadPageContent(hash);
                }
            };
            
            // Handle browser back/forward buttons
            const handlePopState = (event) => {
                const hash = window.location.hash.slice(1);
                this.currentPage = hash || 'landing';
                this.loadPageContent(this.currentPage);
            };
            
            // Set initial page from hash or default to landing
            const hash = window.location.hash.slice(1);
            this.currentPage = hash || 'landing';
            
            // Load initial page content
            this.loadPageContent(this.currentPage);
            
            handleHashChange();
            window.addEventListener('hashchange', handleHashChange);
            window.addEventListener('popstate', handlePopState);
            
            return () => {
                window.removeEventListener('hashchange', handleHashChange);
                window.removeEventListener('popstate', handlePopState);
            };
        },
        
        showPage(page) {
            this.currentPage = page;
            this.mobileMenuOpen = false;
            
            // Update URL hash for proper routing
            if (window.location.hash !== '#' + page) {
                window.location.hash = page;
            }
            
            // Load page content
            this.loadPageContent(page);
            
            // Scroll to top
            window.scrollTo(0, 0);
        },
        
        async loadPageContent(page) {
            const pageContent = document.getElementById('page-content');
            if (!pageContent) return;
            
            try {
                // Show loading state
                pageContent.innerHTML = '<div class="text-center py-12"><i class="fas fa-spinner fa-spin text-4xl text-blue-600"></i></div>';
                
                // Fetch page content
                const response = await fetch(`pages/${page}.html`);
                if (!response.ok) {
                    throw new Error(`Page ${page} not found`);
                }
                
                const html = await response.text();
                
                // Inject content with fade effect
                pageContent.style.opacity = '0';
                pageContent.innerHTML = html;
                
                // Trigger Alpine.js to reinitialize
                setTimeout(() => {
                    pageContent.style.opacity = '1';
                }, 50);
                
            } catch (error) {
                console.error('Error loading page:', error);
                // Fallback to landing page
                if (page !== 'landing') {
                    this.showPage('landing');
                } else {
                    pageContent.innerHTML = '<div class="text-center py-12"><h2 class="text-2xl font-bold text-gray-900">Page not found</h2></div>';
                }
            }
        },
        
        toggleDarkMode() {
            this.darkMode = !this.darkMode;
            if (this.darkMode) {
                document.documentElement.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'true');
            } else {
                document.documentElement.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'false');
            }
        },
        
        login(e) {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;
            
            // Find user in mockUsers array or localStorage
            let foundUser = this.mockUsers.find(user => user.email === email);
            
            // If not found in mockUsers, check if there's a saved user in localStorage
            if (!foundUser) {
                const savedUsers = localStorage.getItem('mockUsers');
                if (savedUsers) {
                    const users = JSON.parse(savedUsers);
                    foundUser = users.find(user => user.email === email);
                }
            }
            
            if (foundUser) {
                this.user = foundUser;
                localStorage.setItem('user', JSON.stringify(this.user));
                this.showPage('dashboard');
            } else {
                alert('No account found with this email. Please sign up first.');
            }
        },
        
        signup(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const newUser = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone') || '',
                password: formData.get('password')
            };
            
            // Check if user already exists
            const existingUser = this.mockUsers.find(user => user.email === newUser.email);
            if (existingUser) {
                alert('An account with this email already exists. Please log in.');
                return;
            }
            
            // Add to mockUsers array
            this.mockUsers.push(newUser);
            
            // Save to localStorage for persistence
            const savedUsers = localStorage.getItem('mockUsers');
            const users = savedUsers ? JSON.parse(savedUsers) : [];
            users.push(newUser);
            localStorage.setItem('mockUsers', JSON.stringify(users));
            
            // Set as current user
            this.user = newUser;
            localStorage.setItem('user', JSON.stringify(this.user));
            this.showPage('dashboard');
        },
        
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            this.showPage('landing');
        },
        
        submitContact(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            e.target.reset();
        },
        
        joinGroup(group) {
            alert(`Successfully joined group to ${group.destination}! You will save ${group.savings} on this shipment.`);
        },
        
        getFilteredGroups() {
            return this.mockGroups.filter(group => {
                let matches = true;
                
                // Filter by origin
                if (this.filters.from !== 'All Locations') {
                    matches = matches && group.origin === this.filters.from;
                }
                
                // Filter by destination
                if (this.filters.to !== 'All Destinations') {
                    matches = matches && group.destination === this.filters.to;
                }
                
                // Filter by package type
                if (this.filters.type !== 'All Types') {
                    matches = matches && group.packageType === this.filters.type;
                }
                
                // Filter by status
                if (this.filters.status !== 'All Status') {
                    if (this.filters.status === 'Filling Fast') {
                        matches = matches && (group.participants / group.maxParticipants) >= 0.6 && (group.participants / group.maxParticipants) < 1;
                    } else {
                        matches = matches && group.status === this.filters.status.toLowerCase();
                    }
                }
                
                return matches;
            });
        }
    };
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    new Alpine.Component('shipShareApp', shipShareApp);
});
