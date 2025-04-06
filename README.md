# PinMap

PinMap is a location-based application where users can pin their locations on a map. The application allows users to view and share locations with others, along with their usernames. The application uses the Rails framework for the backend, Inertia.js for seamless page navigation, and React for the frontend with Leaflet.js for the map display.

---

## Features

- **User Authentication**: Custom registration and login system (Devise not used). Users can register, log in, and log out. Pins are associated with the currently logged-in user.
- **Admin Panel**: Admin users can access a protected dashboard, view all registered users, and delete them if necessary.
- **Map Integration**: Display all user pins on an interactive Leaflet.js map. Each pin shows the user's username.
- **Location Pins**: Users can add their latitude and longitude through a geolocation-enabled interface.
- **Anonymous Usage**: Even without logging in, users can still view the map and pins (without interaction).
- **Role-based Redirection**: After login, admins are redirected to `/admin` and regular users to `/`.
- **Session Handling & Flash Messages**: Flash messages are sent with login/logout, error, or success status using Inertia.
- **Route Protection**: Admin routes are protected server-side, redirecting unauthorized or non-logged-in users.
- **Custom 404 Page**: Unrecognized routes are redirected to a friendly 404 error page.

---

## Technologies Used

- **Ruby on Rails**: Backend framework handling routing, sessions, user management, and database interaction.
- **Inertia.js**: Provides a smooth SPA-like experience while keeping server-side rendering.
- **React.js**: Used for dynamic components and frontend logic.
- **Leaflet.js**: Interactive map rendering.
- **PostgreSQL**: Primary database for users and pins.

---

## Requirements

- **Ruby version**: 3.2.2
- **Rails version**: 7.x.x
- **Node.js**: 16.x or higher
- **Yarn**: For managing frontend dependencies
- **PostgreSQL**: Database server

---

## Setup and Installation

To run the project locally:

### 1. Clone the repository:
```bash
git clone https://github.com/abrakingoo/pinMap.git
```

### 2. Navigate into the project directory:
```bash
cd pinMap
```

### 3. Install Ruby dependencies:
```bash
bundle install
```

### 4. Install Node.js dependencies:
```bash
yarn install
```

### 5. Set up the database:
```bash
bin/rails db:create
bin/rails db:migrate
bin/rails db:seed # optional
```

### 6. Start the Rails server:
```bash
bin/rails server
```

### 7. Visit the app:
Open your browser and go to http://localhost:3000

---

## Database Configuration

- **Database creation**: `bin/rails db:create`
- **Migrations**: `bin/rails db:migrate`
- **Seeding**: `bin/rails db:seed` (optional)

Make sure PostgreSQL is running locally or properly configured.

---

## Running the Test Suite

1. Install necessary dependencies:
```bash
bundle install --without production
```

2. Run all tests:
```bash
bin/rails test
```

3. Run specific tests:
```bash
bin/rails test test/models/pin_test.rb
```

---

## Services

Currently, no external services are required. If scaling:

- **Sidekiq**: Background job processing
- **Redis**: Caching
- **Elasticsearch**: Full-text search

---

## Deployment Instructions

1. Set up your production server (e.g., Heroku, AWS, Render, DigitalOcean).
2. Configure environment variables (e.g., `SECRET_KEY_BASE`).
3. Push to production branch:
```bash
git push heroku main
```
4. Run database migrations:
```bash
heroku run bin/rails db:migrate
```
5. Visit the live app via your hosting provider URL.

---

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push the branch: `git push origin feature-name`
5. Open a Pull Request

---

## License

This project is open-source and available under the [MIT License](LICENSE).

