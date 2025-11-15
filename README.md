# Social App

A modern social media application built with React, featuring user authentication, post creation, commenting system, and user profiles.

## 🚀 Features

- **User Authentication**: Secure login and registration system with JWT tokens
- **Post Management**: Create, view, and interact with posts
- **Comment System**: Add and manage comments on posts
- **User Profiles**: Personalized user profiles with profile picture upload
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Real-time Updates**: Efficient data fetching with React Query
- **Protected Routes**: Route protection for authenticated users
- **Form Validation**: Robust form handling with React Hook Form and Zod
- **Toast Notifications**: User-friendly feedback with React Hot Toast

## 🛠️ Tech Stack

### Frontend

- **React 19.1** - JavaScript library for building user interfaces
- **React Router DOM** - Declarative routing for React
- **Vite** - Next generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **Flowbite** - Component library for Tailwind CSS

### State Management & Data Fetching

- **React Context** - For global state management
- **TanStack Query (React Query)** - Powerful data synchronization for React
- **Axios** - Promise-based HTTP client

### Form Handling & Validation

- **React Hook Form** - Performant, flexible forms
- **Zod** - TypeScript-first schema validation
- **Hookform Resolvers** - Validation resolvers for React Hook Form

### UI & UX

- **FontAwesome** - Icon library
- **React Hot Toast** - Beautiful toast notifications
- **React Loading Indicators** - Loading components
- **React Loading Skeleton** - Skeleton loading screens

### Authentication

- **JWT Decode** - Decode JWT tokens in JavaScript

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ChangePassword/   # Password change functionality
│   ├── Comment/          # Comment display component
│   ├── CommentOptions/   # Comment actions (edit, delete)
│   ├── CreateComment/    # Comment creation form
│   ├── CreatePost/       # Post creation form
│   ├── Footer/           # Application footer
│   ├── GuestRoute/       # Route wrapper for non-authenticated users
│   ├── Home/             # Home page with posts feed
│   ├── Layout/           # Main layout wrapper
│   ├── Loading/          # Loading spinner component
│   ├── Login/            # Login form
│   ├── Navbar/           # Navigation bar
│   ├── Notfound/         # 404 error page
│   ├── PostDetails/      # Individual post view
│   ├── PostOptions/      # Post actions (edit, delete)
│   ├── Posts/            # Posts feed component
│   ├── Profile/          # User profile page
│   ├── ProtectedRoute/   # Route wrapper for authenticated users
│   ├── Register/         # Registration form
│   ├── uploadProfilePicture/ # Profile picture upload
│   └── UserPosts/        # User's posts display
├── context/              # React Context providers
│   └── UserContext.jsx   # User authentication context
├── assets/               # Static assets (images, icons)
├── App.jsx               # Main application component
├── App.css               # Global application styles
├── index.css             # Base styles and Tailwind imports
└── main.jsx              # Application entry point
```

## 🚦 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Hussein-123/Linked_Post.git
   cd social-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory and add your environment variables:

```env
VITE_API_BASE_URL=your_api_base_url
VITE_JWT_SECRET=your_jwt_secret
```

### Tailwind CSS

The project uses Tailwind CSS for styling. Configuration can be found in:

- `tailwind.config.js` (if present)
- Styles are imported in `src/index.css`

### ESLint Configuration

ESLint is configured in `eslint.config.js` with React-specific rules and best practices.

## 🎯 Component Architecture

### Authentication Flow

- **UserContext**: Manages authentication state globally
- **ProtectedRoute**: Wraps components that require authentication
- **GuestRoute**: Wraps components for non-authenticated users (login, register)

### Data Management

- **React Query**: Handles server state, caching, and synchronization
- **Axios**: HTTP client for API communication
- **Context API**: Manages global application state

### Form Handling

- **React Hook Form**: Efficient form state management
- **Zod**: Runtime type validation and schema definition
- **Hookform Resolvers**: Bridge between React Hook Form and Zod

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. Users register/login with credentials
2. Server returns a JWT token
3. Token is stored and used for subsequent API requests
4. Protected routes verify token validity

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Flowbite**: Pre-built components for common UI patterns
- **CSS Modules**: Scoped styling for individual components
- **FontAwesome**: Comprehensive icon library

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Hussein-123**

- GitHub: [@Hussein-123](https://github.com/Hussein-123)
- Project Repository: [Linked_Post](https://github.com/Hussein-123/Linked_Post)

## 🙏 Acknowledgments

- React community for the excellent ecosystem
- Tailwind CSS team for the amazing utility-first framework
- All contributors to the open-source libraries used in this project

---

**Happy Coding! 🚀**
