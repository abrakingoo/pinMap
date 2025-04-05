# PinMap

PinMap is a location-based application where users can pin their locations on a map. The application allows users to view and share locations with others, along with their usernames. The application uses the Rails framework for the backend, Inertia.js for seamless page navigation, and React for the frontend with Leaflet.js for the map display.

## Features
    User Authentication: Users can register, log in, and log out. The pins are associated with the logged-in user.

    Map Integration: Display pins on a map, with each pin showing the user's username or "Anonymous" if not logged in.

    Location Pins: Users can add their locations with latitude and longitude.

    Anonymous Usage: Even without logging in, users can view.

## Technologies Used
    Ruby on Rails: The backend is built using Ruby on Rails, providing a RESTful API and handling user authentication and data persistence.

    Inertia.js: Inertia.js is used for creating a seamless, single-page application (SPA) experience while still using server-side routing.

    React.js: The frontend is powered by React, which dynamically renders the map and pins.

    Leaflet.js: Leaflet is used for rendering interactive maps on the frontend.

    PostgreSQL: Database used for storing user and pin data.

## Requirements
    Ruby version: 3.2.2

    Rails version: 7.x.x

    Node.js: 16.x or higher (for managing JavaScript dependencies)

    Yarn: For managing frontend dependencies

    PostgreSQL: Database server

## Setup and Installation
    To run the project locally:

1. #### Clone the repository:

    ```bash
    git clone https://github.com/abrakingoo/pinMap.git
    ```

2. #### Navigate into the project directory:

    ```bash
    cd pinMap
    ```
3. #### Install Ruby dependencies:

    ```bash
    bundle install
    ```
4. #### Install Node.js dependencies:

    ```bash
    yarn install
    ```
5. #### Set up the database:

    - Create the database:

        ```bash
        bin/rails db:create
        ```
    - Run database migrations:
            
        ```bash
            bin/rails db:migrate
         ```
    - Optionally, seed the database with default data:

        ```bash
            bin/rails db:seed
        ```

6. #### Start the Rails server:

    ```bash
    bin/rails server
    ```

7. #### Visit the app:

    Open your browser and go to http://localhost:3000.


## Database Configuration
The project uses PostgreSQL as the database. Make sure you have PostgreSQL installed and running locally, or configure it to use a different database if necessary.

- Database creation: The command bin/rails db:create creates the required database.

- Database initialization: After creating the database, run bin/rails db:migrate to apply all migrations and set up the schema.

## Running the Test Suite
To run the test suite:

1. Ensure you have the necessary test dependencies:

    ```bash
    bundle install --without production
    ```
2. Run the tests:

    ```bash
    bin/rails test
    ```
    You can also run specific tests, such as:

    ```bash
    bin/rails test test/models/pin_test.rb
    ````
## Services
This application does not require additional services like job queues, cache servers, or search engines at this point. However, if you plan to scale or add features that require background jobs or search functionality, you might need to integrate services like:

- Sidekiq (for background jobs)

- Redis (for caching)

- Elasticsearch (for search capabilities)

## Deployment Instructions
To deploy this application to a production environment, follow these steps:

1. #### Set up the server: You'll need a server running a production environment, like Heroku, AWS, or DigitalOcean.

2. #### Set environment variables: Ensure all sensitive credentials and keys are set in environment variables, such as SECRET_KEY_BASE for Rails.

3. #### Push to the repository:

    ```bash
    git push heroku master
    ```
4. #### Run database migrations:

    ```bash
    heroku run bin/rails db:migrate
    ```
5. #### Access the application:

    Once deployed, you can access your app through the provided URL (e.g., https://your-app.herokuapp.com).

## Contributing
1. Fork the repository

2. Create your feature branch (git checkout -b feature-name)

3. Commit your changes (git commit -am 'Add new feature')

4. Push to the branch (git push origin feature-name)

5. Create a new Pull Request

## License
This project is open-source and available under the MIT License.