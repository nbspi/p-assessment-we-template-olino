
# Lou Geh Inventory

**Lou Geh Inventory** is a full-stack web application for managing suppliers, components, and products in an inventory system. It provides a **RESTful API** backend with user authentication and a lightweight front-end interface. This project was created as a Web Engineering assessment template (codename "Olino") and demonstrates typical CRUD operations with a relational database and JWT-based auth.

## Key Features

* **Supplier Management:** Create, list, update, and delete suppliers. Each supplier has a name and optional contact info. Suppliers can be linked to components they supply.
* **Component Management:** Create, list, update, and delete components. Each component has a name and optional description. Components can be associated with one or more suppliers (many-to-many relationship) and linked to products that use them.
* **Product Management:** Create, list, update, and delete products. Each product has a name, a unique product code, and a quantity on hand. Products can be composed of multiple components (many-to-many relationship).
* **User Authentication:** Users can sign up and sign in. Passwords are hashed (using bcrypt) and a JSON Web Token (JWT) is issued on sign-in. Protected API routes (for creating/updating/deleting data) require a valid JWT. The front-end interface hides edit forms and options unless the user is logged in.
* **RESTful API:** Provides JSON endpoints for all entities (suppliers, components, products) and auth. Uses Express.js and Sequelize to handle database operations and relationships. Validation is performed on inputs both on front-end (basic checks) and back-end (detailed validation middleware).
* **Front-End Interface:** A single-page application (SPA) interface built with **HTML, CSS, and Vanilla JavaScript** (ES6 modules). It dynamically updates lists of suppliers, components, and products and allows adding/editing data via forms. The front-end communicates with the backend API using the Fetch API.
* **Relationships & Constraints:** Demonstrates many-to-many relationships (suppliers <-> components, products <-> components) using an ORM, with referential integrity handled by Sequelize. Includes form validations and proper error handling on both client and server.

## Technologies Used

* **Backend:** Node.js with Express.js (REST API server), Sequelize (ORM for MySQL), MySQL database. Uses JWT (jsonwebtoken) for auth tokens and bcrypt for password hashing. Also includes middleware for auth protection and input validation utilities.
* **Frontend:** Standard HTML5/CSS3 and JavaScript (ES6). No front-end framework is used – instead, the project uses native JS modules to organize code (`import/export`). The development server is provided by **live-server** for quick static hosting and reload.
* **Environment & Tools:** Requires Node.js and MySQL. During development, **nodemon** is used for backend auto-reload, and **live-server** serves the front-end. The project is configured as an ES Module project (`"type": "module"` in package.json) to allow `import` syntax in Node.
* **Libraries:**
  * *Express* for routing and middleware.
  * *Sequelize* with *mysql2* for database integration.
  * *dotenv* for environment variable management.
  * *cors* to enable cross-origin requests (so the front-end on port 8080 can call the API on port 3000).
  * *jsonwebtoken* for creating and verifying JWTs.
  * *bcrypt* for securely hashing passwords.
  * Front-end uses no external JS libraries (all vanilla JS), but utilizes modern browser APIs (Fetch, LocalStorage, etc.).

## Folder Structure Overview

<pre class="overflow-visible!" data-start="3609" data-end="5808"><div class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary"><div class="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between h-9 bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary select-none rounded-t-[5px]">plaintext</div><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-sidebar-surface-primary text-token-text-secondary dark:bg-token-main-surface-secondary flex items-center rounded-sm px-2 font-sans text-xs"><button class="flex gap-1 items-center select-none px-4 py-1" aria-label="Copy"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-xs"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg>Copy</button><span class="" data-state="closed"><button class="flex items-center gap-1 px-4 py-1 select-none"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-xs"><path d="M2.5 5.5C4.3 5.2 5.2 4 5.5 2.5C5.8 4 6.7 5.2 8.5 5.5C6.7 5.8 5.8 7 5.5 8.5C5.2 7 4.3 5.8 2.5 5.5Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5.66282 16.5231L5.18413 19.3952C5.12203 19.7678 5.09098 19.9541 5.14876 20.0888C5.19933 20.2067 5.29328 20.3007 5.41118 20.3512C5.54589 20.409 5.73218 20.378 6.10476 20.3159L8.97693 19.8372C9.72813 19.712 10.1037 19.6494 10.4542 19.521C10.7652 19.407 11.0608 19.2549 11.3343 19.068C11.6425 18.8575 11.9118 18.5882 12.4503 18.0497L20 10.5C21.3807 9.11929 21.3807 6.88071 20 5.5C18.6193 4.11929 16.3807 4.11929 15 5.5L7.45026 13.0497C6.91175 13.5882 6.6425 13.8575 6.43197 14.1657C6.24513 14.4392 6.09299 14.7348 5.97903 15.0458C5.85062 15.3963 5.78802 15.7719 5.66282 16.5231Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.5 7L18.5 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Edit</button></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-plaintext"><span><span>p-assessment-we-template-olino/
├── my-rest-api/           # Backend (Node/Express) code
│   ├── app.js             # Entry point for the Express server
│   ├── config/
│   │   └── db.js          # Database connection setup (Sequelize initialization)
│   ├── controllers/       # Route handlers for each resource (CRUD logic)
│   │   ├── supplierController.js
│   │   ├── componentController.js
│   │   ├── productController.js
│   │   └── authController.js
│   ├── models/            # Sequelize models definitions for database tables
│   │   ├── supplier.js
│   │   ├── component.js
│   │   ├── product.js
│   │   ├── user.js
│   │   └── index.js       # Imports all models, defines relations, exports Sequelize instance
│   ├── routes/            # Express route definitions mapping URLs to controller methods
│   │   ├── supplierRoutes.js
│   │   ├── componentRoutes.js
│   │   ├── productRoutes.js
│   │   └── authRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT authentication check for protected routes
│   ├── utils/
│   │   └── validation.js   # Request body validation functions for suppliers, components, products
│   ├── package.json        # Node dependencies and scripts for the API
│   └── ... (other files like .gitignore, etc.)
└── my-front-end-app/      # Front-end application (static files served by live-server)
    ├── index.html         # Main SPA page listing suppliers, components, products
    ├── signin.html        # Login page
    ├── signup.html        # Registration page
    ├── css/
    │   └── style.css      # Basic styling for the app
    ├── js/                # Front-end JS modules
    │   ├── main.js        # Entry JS module, initializes sections and auth state
    │   ├── supplier.js    # Handles Supplier section UI & interactions
    │   ├── component.js   # Handles Component section UI & interactions
    │   ├── product.js     # Handles Product section UI & interactions
    │   ├── signup.js      # Handles sign-up form submission
    │   └── signin.js      # Handles sign-in form submission
    ├── package.json       # Dev dependency (live-server) and script for front-end
    └── ... (other static assets if any)
</span></span></code></div></div></pre>

* **my-rest-api/** – Contains all server-side code. The entry `app.js` sets up Express, connects to the MySQL database via Sequelize, and defines routes for each resource (suppliers, components, products, auth). Controllers implement the business logic (database queries via models). Models define the database tables and relationships. Utility and middleware modules provide extra functionality (validation and auth token verification).
* **my-front-end-app/** – Contains the client-side application. The HTML files define the structure of the pages (main app page and auth pages). The JavaScript modules handle dynamic behavior: fetching data from the API and updating the DOM, submitting forms, and managing auth tokens. Styling is provided by a simple CSS file. The front-end is a single-page app for the main inventory interface (with sections for suppliers, components, products) and uses separate pages for Sign In/Sign Up.

## Setup Instructions

**Prerequisites:** Make sure you have **Node.js** (v14+ recommended) and **MySQL** installed on your system. If you prefer an easy setup on Windows, you can use **XAMPP** to run MySQL (and Apache, though Apache is not needed for this project). On XAMPP, start the MySQL service. Alternatively, use a standalone MySQL server and ensure it’s running.

 **1. Clone the repository:** If you haven’t already, clone this repo to your local machine. Then open a terminal in the project directory.

<pre class="overflow-visible!" data-start="7257" data-end="7379"><div class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary"><div class="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between h-9 bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary select-none rounded-t-[5px]">bash</div><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-sidebar-surface-primary text-token-text-secondary dark:bg-token-main-surface-secondary flex items-center rounded-sm px-2 font-sans text-xs"><button class="flex gap-1 items-center select-none px-4 py-1" aria-label="Copy"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-xs"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg>Copy</button><span class="" data-state="closed"><button class="flex items-center gap-1 px-4 py-1 select-none"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-xs"><path d="M2.5 5.5C4.3 5.2 5.2 4 5.5 2.5C5.8 4 6.7 5.2 8.5 5.5C6.7 5.8 5.8 7 5.5 8.5C5.2 7 4.3 5.8 2.5 5.5Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5.66282 16.5231L5.18413 19.3952C5.12203 19.7678 5.09098 19.9541 5.14876 20.0888C5.19933 20.2067 5.29328 20.3007 5.41118 20.3512C5.54589 20.409 5.73218 20.378 6.10476 20.3159L8.97693 19.8372C9.72813 19.712 10.1037 19.6494 10.4542 19.521C10.7652 19.407 11.0608 19.2549 11.3343 19.068C11.6425 18.8575 11.9118 18.5882 12.4503 18.0497L20 10.5C21.3807 9.11929 21.3807 6.88071 20 5.5C18.6193 4.11929 16.3807 4.11929 15 5.5L7.45026 13.0497C6.91175 13.5882 6.6425 13.8575 6.43197 14.1657C6.24513 14.4392 6.09299 14.7348 5.97903 15.0458C5.85062 15.3963 5.78802 15.7719 5.66282 16.5231Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.5 7L18.5 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Edit</button></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>git </span><span>clone</span><span> https://github.com/TenshinAkuma/p-assessment-we-template-olino.git
</span><span>cd</span><span> p-assessment-we-template-olino
</span></span></code></div></div></pre>

**2. Create a MySQL Database:** Using your MySQL client (command line, MySQL Workbench, or phpMyAdmin if using XAMPP), create a new database for this project. For example, you might create a database named  **`inventory_db`** :

<pre class="overflow-visible!" data-start="7608" data-end="7648"><div class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary"><div class="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between h-9 bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary select-none rounded-t-[5px]">sql</div><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-sidebar-surface-primary text-token-text-secondary dark:bg-token-main-surface-secondary flex items-center rounded-sm px-2 font-sans text-xs"><button class="flex gap-1 items-center select-none px-4 py-1" aria-label="Copy"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-xs"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg>Copy</button><span class="" data-state="closed"><button class="flex items-center gap-1 px-4 py-1 select-none"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-xs"><path d="M2.5 5.5C4.3 5.2 5.2 4 5.5 2.5C5.8 4 6.7 5.2 8.5 5.5C6.7 5.8 5.8 7 5.5 8.5C5.2 7 4.3 5.8 2.5 5.5Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5.66282 16.5231L5.18413 19.3952C5.12203 19.7678 5.09098 19.9541 5.14876 20.0888C5.19933 20.2067 5.29328 20.3007 5.41118 20.3512C5.54589 20.409 5.73218 20.378 6.10476 20.3159L8.97693 19.8372C9.72813 19.712 10.1037 19.6494 10.4542 19.521C10.7652 19.407 11.0608 19.2549 11.3343 19.068C11.6425 18.8575 11.9118 18.5882 12.4503 18.0497L20 10.5C21.3807 9.11929 21.3807 6.88071 20 5.5C18.6193 4.11929 16.3807 4.11929 15 5.5L7.45026 13.0497C6.91175 13.5882 6.6425 13.8575 6.43197 14.1657C6.24513 14.4392 6.09299 14.7348 5.97903 15.0458C5.85062 15.3963 5.78802 15.7719 5.66282 16.5231Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.5 7L18.5 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Edit</button></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-sql"><span><span>CREATE</span><span> DATABASE inventory_db;
</span></span></code></div></div></pre>

You can use any name for the database – just remember it for the next step. Also, ensure you have MySQL user credentials (e.g., username and password) that have access to this database. If using XAMPP’s MySQL, the default user is “root” with no password (empty password).

 **3. Configure Environment Variables:** The backend requires certain environment variables to connect to the database and handle authentication. Create a file named **`.env`** inside the **`my-rest-api/`** directory (same folder as app.js). In this file, define the following variables:

* `DB_HOST` – MySQL host (e.g. `localhost` for local MySQL).
* `DB_PORT` – MySQL port (usually `3306` by default).
* `DB_NAME` – Name of the MySQL database you created (e.g. `inventory_db`).
* `DB_USER` – MySQL username (e.g. `root` or your DB user).
* `DB_PASS` – MySQL password (for XAMPP default, this might be empty or `root` with no password).
* `JWT_SECRET` – A secret key for signing JWT tokens (use a random string; e.g. `myjwtsecret123`).
* `JWT_EXPIRES_IN` – Token expiration time (e.g. `1h` for 1 hour, `2h` for 2 hours, etc.). This defines how long a login stays valid.

Optional: You can also set `PORT` to customize the backend server port. By default it uses `3000`.

 For example, your **my-rest-api/.env** might look like:

<pre class="overflow-visible!" data-start="8953" data-end="9224"><div class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary"><div class="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between h-9 bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary select-none rounded-t-[5px]">dotenv</div><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-sidebar-surface-primary text-token-text-secondary dark:bg-token-main-surface-secondary flex items-center rounded-sm px-2 font-sans text-xs"><button class="flex gap-1 items-center select-none px-4 py-1" aria-label="Copy"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-xs"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg>Copy</button><span class="" data-state="closed"><button class="flex items-center gap-1 px-4 py-1 select-none"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-xs"><path d="M2.5 5.5C4.3 5.2 5.2 4 5.5 2.5C5.8 4 6.7 5.2 8.5 5.5C6.7 5.8 5.8 7 5.5 8.5C5.2 7 4.3 5.8 2.5 5.5Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5.66282 16.5231L5.18413 19.3952C5.12203 19.7678 5.09098 19.9541 5.14876 20.0888C5.19933 20.2067 5.29328 20.3007 5.41118 20.3512C5.54589 20.409 5.73218 20.378 6.10476 20.3159L8.97693 19.8372C9.72813 19.712 10.1037 19.6494 10.4542 19.521C10.7652 19.407 11.0608 19.2549 11.3343 19.068C11.6425 18.8575 11.9118 18.5882 12.4503 18.0497L20 10.5C21.3807 9.11929 21.3807 6.88071 20 5.5C18.6193 4.11929 16.3807 4.11929 15 5.5L7.45026 13.0497C6.91175 13.5882 6.6425 13.8575 6.43197 14.1657C6.24513 14.4392 6.09299 14.7348 5.97903 15.0458C5.85062 15.3963 5.78802 15.7719 5.66282 16.5231Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.5 7L18.5 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Edit</button></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-dotenv"><span>DB_HOST=localhost
DB_PORT=3306
DB_NAME=inventory_db
DB_USER=root
DB_PASS=          # (leave blank if no password for root, or put your password)
JWT_SECRET=someSuperSecretKey123
JWT_EXPIRES_IN=1h
# PORT=3000      # (optional, only if you want a custom port)
</span></code></div></div></pre>

**4. Install Dependencies:**

* **Backend dependencies:** Navigate to the **my-rest-api** folder and install Node dependencies:

  <pre class="overflow-visible!" data-start="9358" data-end="9402"><div class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary"><div class="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between h-9 bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary select-none rounded-t-[5px]">bash</div><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-sidebar-surface-primary text-token-text-secondary dark:bg-token-main-surface-secondary flex items-center rounded-sm px-2 font-sans text-xs"><button class="flex gap-1 items-center select-none px-4 py-1" aria-label="Copy"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-xs"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg>Copy</button><span class="" data-state="closed"><button class="flex items-center gap-1 px-4 py-1 select-none"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-xs"><path d="M2.5 5.5C4.3 5.2 5.2 4 5.5 2.5C5.8 4 6.7 5.2 8.5 5.5C6.7 5.8 5.8 7 5.5 8.5C5.2 7 4.3 5.8 2.5 5.5Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5.66282 16.5231L5.18413 19.3952C5.12203 19.7678 5.09098 19.9541 5.14876 20.0888C5.19933 20.2067 5.29328 20.3007 5.41118 20.3512C5.54589 20.409 5.73218 20.378 6.10476 20.3159L8.97693 19.8372C9.72813 19.712 10.1037 19.6494 10.4542 19.521C10.7652 19.407 11.0608 19.2549 11.3343 19.068C11.6425 18.8575 11.9118 18.5882 12.4503 18.0497L20 10.5C21.3807 9.11929 21.3807 6.88071 20 5.5C18.6193 4.11929 16.3807 4.11929 15 5.5L7.45026 13.0497C6.91175 13.5882 6.6425 13.8575 6.43197 14.1657C6.24513 14.4392 6.09299 14.7348 5.97903 15.0458C5.85062 15.3963 5.78802 15.7719 5.66282 16.5231Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.5 7L18.5 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Edit</button></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>cd</span><span> my-rest-api
  npm install
  </span></span></code></div></div></pre>

  This installs Express, Sequelize, etc., as listed in `package.json`.
* **Frontend dependencies:** Navigate to **my-front-end-app** folder and install the dev dependency for the front-end:

  <pre class="overflow-visible!" data-start="9598" data-end="9650"><div class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary"><div class="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between h-9 bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary select-none rounded-t-[5px]">bash</div><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-sidebar-surface-primary text-token-text-secondary dark:bg-token-main-surface-secondary flex items-center rounded-sm px-2 font-sans text-xs"><button class="flex gap-1 items-center select-none px-4 py-1" aria-label="Copy"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-xs"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg>Copy</button><span class="" data-state="closed"><button class="flex items-center gap-1 px-4 py-1 select-none"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-xs"><path d="M2.5 5.5C4.3 5.2 5.2 4 5.5 2.5C5.8 4 6.7 5.2 8.5 5.5C6.7 5.8 5.8 7 5.5 8.5C5.2 7 4.3 5.8 2.5 5.5Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5.66282 16.5231L5.18413 19.3952C5.12203 19.7678 5.09098 19.9541 5.14876 20.0888C5.19933 20.2067 5.29328 20.3007 5.41118 20.3512C5.54589 20.409 5.73218 20.378 6.10476 20.3159L8.97693 19.8372C9.72813 19.712 10.1037 19.6494 10.4542 19.521C10.7652 19.407 11.0608 19.2549 11.3343 19.068C11.6425 18.8575 11.9118 18.5882 12.4503 18.0497L20 10.5C21.3807 9.11929 21.3807 6.88071 20 5.5C18.6193 4.11929 16.3807 4.11929 15 5.5L7.45026 13.0497C6.91175 13.5882 6.6425 13.8575 6.43197 14.1657C6.24513 14.4392 6.09299 14.7348 5.97903 15.0458C5.85062 15.3963 5.78802 15.7719 5.66282 16.5231Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.5 7L18.5 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Edit</button></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>cd</span><span> ../my-front-end-app
  npm install
  </span></span></code></div></div></pre>

  The front-end doesn’t use a framework, but we use **live-server** (installed here as a dev dependency) to serve the files for development. This command will install `live-server` locally.

**5. Database Prep:** The first time you run the backend, Sequelize will automatically create the tables defined by the models (since we call `sequelize.sync()` on startup). You do **not** need to run any migrations manually. Just ensure the database specified in your .env exists and is empty. The app will create tables for Suppliers, Components, Products, Users, and the join tables for relationships.

 Now you’re ready to run the application.

## API Run Instructions (Backend)

To start the backend API server:

1. Open a terminal and make sure you’re in the **`my-rest-api`** directory (and that you have created the `.env` as described).
2. If the dependencies are installed, start the server. You can use the provided npm scripts:
   * For a one-time start:

     <pre class="overflow-visible!" data-start="10620" data-end="10653"><div class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary"><div class="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between h-9 bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary select-none rounded-t-[5px]">bash</div><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-sidebar-surface-primary text-token-text-secondary dark:bg-token-main-surface-secondary flex items-center rounded-sm px-2 font-sans text-xs"><button class="flex gap-1 items-center select-none px-4 py-1" aria-label="Copy"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-xs"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg>Copy</button><span class="" data-state="closed"><button class="flex items-center gap-1 px-4 py-1 select-none"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-xs"><path d="M2.5 5.5C4.3 5.2 5.2 4 5.5 2.5C5.8 4 6.7 5.2 8.5 5.5C6.7 5.8 5.8 7 5.5 8.5C5.2 7 4.3 5.8 2.5 5.5Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5.66282 16.5231L5.18413 19.3952C5.12203 19.7678 5.09098 19.9541 5.14876 20.0888C5.19933 20.2067 5.29328 20.3007 5.41118 20.3512C5.54589 20.409 5.73218 20.378 6.10476 20.3159L8.97693 19.8372C9.72813 19.712 10.1037 19.6494 10.4542 19.521C10.7652 19.407 11.0608 19.2549 11.3343 19.068C11.6425 18.8575 11.9118 18.5882 12.4503 18.0497L20 10.5C21.3807 9.11929 21.3807 6.88071 20 5.5C18.6193 4.11929 16.3807 4.11929 15 5.5L7.45026 13.0497C6.91175 13.5882 6.6425 13.8575 6.43197 14.1657C6.24513 14.4392 6.09299 14.7348 5.97903 15.0458C5.85062 15.3963 5.78802 15.7719 5.66282 16.5231Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.5 7L18.5 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Edit</button></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>npm start
     </span></span></code></div></div></pre>

     This will run the server using Node (executing `app.js`).
   * For development with auto-reloading (if you have **nodemon** installed via npm):

     <pre class="overflow-visible!" data-start="10810" data-end="10845"><div class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary"><div class="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between h-9 bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary select-none rounded-t-[5px]">bash</div><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-sidebar-surface-primary text-token-text-secondary dark:bg-token-main-surface-secondary flex items-center rounded-sm px-2 font-sans text-xs"><button class="flex gap-1 items-center select-none px-4 py-1" aria-label="Copy"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-xs"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg>Copy</button><span class="" data-state="closed"><button class="flex items-center gap-1 px-4 py-1 select-none"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-xs"><path d="M2.5 5.5C4.3 5.2 5.2 4 5.5 2.5C5.8 4 6.7 5.2 8.5 5.5C6.7 5.8 5.8 7 5.5 8.5C5.2 7 4.3 5.8 2.5 5.5Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5.66282 16.5231L5.18413 19.3952C5.12203 19.7678 5.09098 19.9541 5.14876 20.0888C5.19933 20.2067 5.29328 20.3007 5.41118 20.3512C5.54589 20.409 5.73218 20.378 6.10476 20.3159L8.97693 19.8372C9.72813 19.712 10.1037 19.6494 10.4542 19.521C10.7652 19.407 11.0608 19.2549 11.3343 19.068C11.6425 18.8575 11.9118 18.5882 12.4503 18.0497L20 10.5C21.3807 9.11929 21.3807 6.88071 20 5.5C18.6193 4.11929 16.3807 4.11929 15 5.5L7.45026 13.0497C6.91175 13.5882 6.6425 13.8575 6.43197 14.1657C6.24513 14.4392 6.09299 14.7348 5.97903 15.0458C5.85062 15.3963 5.78802 15.7719 5.66282 16.5231Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.5 7L18.5 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Edit</button></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>npm run dev
     </span></span></code></div></div></pre>

     This uses nodemon to watch for file changes and restart automatically.
3. The server should start on **http://localhost:3000** (unless you set a different PORT in `.env`). You should see a console message like “🚀 Server running at http://localhost:3000” if successful.
4. The first run will also initialize the database tables. Check your MySQL database – you should see tables named `Suppliers`, `Components`, `Products`, `Users`, and the join tables `SupplierComponent` and `ProductComponent`.

The API is now running. You can test it using a tool like Postman or curl. For example, a GET request to `http://localhost:3000/suppliers` should return an empty list (unless you’ve added data).

 **Note:** If the API cannot connect to the database, it will log an error. Ensure your MySQL is running and the .env credentials are correct. With XAMPP, verify that MySQL service is active. If you encounter a connection refused error, check `DB_HOST` and `DB_PORT` in .env (for XAMPP on Windows, `DB_HOST` might be `127.0.0.1` and ensure port is `3306`).

## Front-End Run Instructions (Client)

Once the backend is running, you can launch the front-end to interact with the API:

1. Open a new terminal window (you can keep the API running in the other terminal) and navigate to the **`my-front-end-app`** directory.
2. Make sure dependencies were installed (`npm install` as done in setup). Then start the development server for the front-end:

   <pre class="overflow-visible!" data-start="12295" data-end="12324"><div class="contain-inline-size rounded-md border-[0.5px] border-token-border-medium relative bg-token-sidebar-surface-primary"><div class="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between h-9 bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary select-none rounded-t-[5px]">bash</div><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-sidebar-surface-primary text-token-text-secondary dark:bg-token-main-surface-secondary flex items-center rounded-sm px-2 font-sans text-xs"><button class="flex gap-1 items-center select-none px-4 py-1" aria-label="Copy"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-xs"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z" fill="currentColor"></path></svg>Copy</button><span class="" data-state="closed"><button class="flex items-center gap-1 px-4 py-1 select-none"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-xs"><path d="M2.5 5.5C4.3 5.2 5.2 4 5.5 2.5C5.8 4 6.7 5.2 8.5 5.5C6.7 5.8 5.8 7 5.5 8.5C5.2 7 4.3 5.8 2.5 5.5Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5.66282 16.5231L5.18413 19.3952C5.12203 19.7678 5.09098 19.9541 5.14876 20.0888C5.19933 20.2067 5.29328 20.3007 5.41118 20.3512C5.54589 20.409 5.73218 20.378 6.10476 20.3159L8.97693 19.8372C9.72813 19.712 10.1037 19.6494 10.4542 19.521C10.7652 19.407 11.0608 19.2549 11.3343 19.068C11.6425 18.8575 11.9118 18.5882 12.4503 18.0497L20 10.5C21.3807 9.11929 21.3807 6.88071 20 5.5C18.6193 4.11929 16.3807 4.11929 15 5.5L7.45026 13.0497C6.91175 13.5882 6.6425 13.8575 6.43197 14.1657C6.24513 14.4392 6.09299 14.7348 5.97903 15.0458C5.85062 15.3963 5.78802 15.7719 5.66282 16.5231Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.5 7L18.5 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Edit</button></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>npm run dev
   </span></span></code></div></div></pre>

   This command uses **live-server** to serve the static files in `my-front-end-app`. It will automatically open a browser window (or tab) pointing to the front-end. By default, it opens at **http://127.0.0.1:8080** (or http://localhost:8080).
3. In the browser, you should see the **Lou Geh Inventory** interface. Initially, it will show sections for Suppliers, Components, Products with “Loading ...” placeholders (which will update once data is fetched).
4. Because you have no data yet and you are not signed in, you will see:

   * The Suppliers, Components, Products lists likely showing “... list is empty” messages (since the database is empty).
   * The forms for adding new items might be hidden when not authenticated. You’ll see **Sign Up** / **Sign In** links at the top.
5. To use the app, first click **Sign Up** (or go to http://localhost:8080/signup.html) and create a user account. Then, after successful signup, use **Sign In** to login. Once signed in, the front-end will store your JWT token and show the forms for adding suppliers/components/products.
6. Now you can add some suppliers, components, and products:

   * Add a supplier or two via the form in the Suppliers section (enter a name and optional contact info, click "Add Supplier"). The list will update with the new supplier.
   * Add components by entering a name/description and selecting one or more suppliers from the dropdown (hold Ctrl/Cmd to select multiple suppliers). Click "Add Component" to save.
   * Add products by entering name, code, quantity, and selecting components from the dropdown.
   * The lists will update dynamically after each addition. You can also **Delete** or **Edit** entries using the buttons that appear next to each item (these buttons only appear when you are logged in).
7. The front-end communicates with the API at `localhost:3000`. If you changed the API port or host, you might need to adjust the URLs in the front-end JS files (they are currently hard-coded to `http://localhost:3000/...`).

**Tip:** The front-end is simple and uses fetch for API calls. You can open the browser’s developer console to see any error messages or logs (`console.error` from the front-end scripts) if something isn’t working (e.g., network errors if the API isn’t reachable).

## Environment Variable Configuration

As mentioned, the backend is configured via environment variables in  **my-rest-api/.env** . Here is a summary of each required variable:

* **DB_HOST:** The hostname of your MySQL server. For a local setup this is usually `localhost` (or `127.0.0.1`).
* **DB_PORT:** The MySQL server port (default is `3306`).
* **DB_NAME:** The name of the database to use (e.g., `inventory_db`). The app will create tables inside this DB.
* **DB_USER:** The MySQL username with access to the database. (e.g., `root` for local dev).
* **DB_PASS:** The password for the MySQL user. (Empty string if none, or the actual password).
* **JWT_SECRET:** A secret key used to sign JWT tokens. **Choose a strong, random string for this in production.** (In development, a simple string is fine, but keep it secret.)
* **JWT_EXPIRES_IN:** Token expiration time, e.g., `1h` for 1 hour, `30m` for 30 minutes, `2h` for 2 hours, etc. After this duration, issued JWTs will expire and the user will need to log in again.
* **PORT:** (Optional) The port for the Express server. Default is 3000 if not specified.

Make sure these are set before starting the backend. The front-end does **not** use a .env file; if needed, configure API URLs directly in the JS or ensure the backend runs at the expected address.

## Example API Endpoints

The following are the main API endpoints provided by the backend (all paths are prefixed to `http://<server>:3000` by default):

* **Authentication:**
  * `POST /auth/signup` – Register a new user. Expects JSON body `{"email": "...", "password": "..."}`. Returns 201 Created on success (or error if email exists or invalid data).
  * `POST /auth/signin` – Log in with email and password. Expects JSON body `{"email": "...", "password": "..."}`. Returns a JWT token and expiry (e.g. `{ token: "...", expiresIn: "1h" }`) if credentials are correct. Use this token for subsequent requests.
* **Suppliers:**
  * `GET /suppliers` – Retrieve all suppliers (with associated components). **Public** (no auth required) – anyone can view the list.
  * `POST /suppliers` – Create a new supplier. **Protected** – requires a valid `Authorization: Bearer <token>` header. JSON body should contain at least `{"name": "...", "contact_info": "..."}`. Returns the created supplier object.
  * `PUT /suppliers/:id` – Update a supplier’s details (e.g., name or contact info).  **Protected** . JSON body can include `name` and/or `contact_info`. Returns the updated supplier or 404 if not found.
  * `DELETE /suppliers/:id` – Delete a supplier by ID.  **Protected** . Returns a success message or 404 if not found.
* **Components:**
  * `GET /components` – Retrieve all components (with associated suppliers and products). Public access.
  * `POST /components` – Create a new component.  **Protected** . JSON should include `{"name": "...", "description": "...", "supplierIds": [ ... ]}` where `supplierIds` is an array of supplier IDs to associate with this component. Returns the created component.
  * `PUT /components/:id` – Update a component’s name/description.  **Protected** . JSON can include `name` and `description`. (Association changes are handled via the product endpoints or new component creation.)
  * `DELETE /components/:id` – Delete a component.  **Protected** .
* **Products:**
  * `GET /products` – Retrieve all products (with their components). Public access.
  * `POST /products` – Create a new product.  **Protected** . JSON should include `{"name": "...", "product_code": "...", "quantity_on_hand": <number>, "componentIds": [ ... ]}`. The `componentIds` array specifies which components make up this product (must include at least one component). The server will create the product and set up the many-to-many association in a single transaction.
  * `PUT /products/:id` – Update a product’s details **and** its component associations.  **Protected** . JSON can include `name`, `product_code`, `quantity_on_hand`, and an optional `componentIds` array. If `componentIds` is provided, the product’s components will be updated to match that list.
  * `DELETE /products/:id` – Delete a product.  **Protected** .

**Note:** When not authenticated (no token or an invalid token), **POST/PUT/DELETE** routes will respond with HTTP 401 Unauthorized. The front-end handles this by hiding those actions when you’re not signed in. When authenticated, include the JWT token in the `Authorization` header as `Bearer <token>` (the front-end does this automatically via the `authHeaders()` helper in JS).



## Discussions

* [System Entity-Relationship Diagram and Data Flow Diagram](https://github.com/TenshinAkuma/p-assessment-we-template-olino/discussions/34)
* [Product Use Case](https://github.com/TenshinAkuma/p-assessment-we-template-olino/discussions/36)
* [Component Use Case](https://github.com/TenshinAkuma/p-assessment-we-template-olino/discussions/37)
* [Supplier Use Case](https://github.com/TenshinAkuma/p-assessment-we-template-olino/discussions/38)
