📝 Blogify

Blogify is a simple and responsive blogging platform built using Node.js, Express, MongoDB Atlas, and EJS templating. It allows users to create, view, and manage blog posts in an elegant and intuitive interface.

🚀 Features

- 🖊️ Create and publish blog posts  
- 📄 View individual blog posts  
- 🗂️ List all blog entries on the homepage  
- 🧼 Clean and minimal UI using EJS  
- 🌐 Deployed on Render
- 🔒 Secure connection to MongoDB Atlas with IP whitelisting  

🛠️ Tech Stack

Frontend --- EJS, HTML/CSS 
Backend --- Node.js, Express
Database --- MongoDB Atlas

📁 Folder Structure

Blogify/
├── views/ # EJS templates
│ ├── home.ejs
│ ├── post.ejs
│ └── compose.ejs
├── public/ # Static files (CSS, images)
├── models/ # Mongoose models
├── routes/ # Express routes
├── .env # Environment variables
├── server.js # Main server file
└── package.json

⚙️ Getting Started

Prerequisites
- Node.js and npm installed  
- MongoDB Atlas account  

🔧 Installation

1. Clone the repository:
   git clone https://github.com/Rohit9102/blogify.git
   cd blogify
2. npm install
3. Set up environment variables:
   PORT=8000
   MONGO_URI=your_mongodb_atlas_connection_string
   SECRET= your_secret_key
4. npm start

✅ Future Enhancements

✅ User authentication with sessions
📦 Rich text editor
🔍 Search and tags
📱 Responsive improvements

📜 License
This project is open-source and available under the MIT License.

🙋‍♂️ Author
Rohit 
🔗 GitHub: Rohit9102

