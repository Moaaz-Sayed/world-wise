# 🌍 WorldWise

**WorldWise** is a React-based travel tracking app that allows users to mark and document places they've visited on an interactive map.

---

## ✨ Project Idea

After logging in, users can click any location on the map and fill in details such as:

- 🏙️ City name  
- 📅 Date of visit  
- 📝 Personal notes

Visited locations are saved and displayed in a well-organized interface.

---

## 🧩 Features

- Interactive map using [Leaflet](https://leafletjs.com/) and [React Leaflet](https://react-leaflet.js.org/)
- Add a location by clicking on the map
- Store visit details (city, date, notes)
- Delete any saved location
- View a list of visited cities and countries (with no country repetition)
- Navigate between pages with [React Router](https://reactrouter.com/)

---

## 🛠️ Tech Stack

- React + Vite
- React Router
- Leaflet + React Leaflet
- React DatePicker
- JSON Server (mock backend)

---

## 🧪 Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/Moaaz-Sayed/world-wise.git
# 2. Navigate into the project directory
cd worldwise

# 3. Install dependencies
npm install

# 4. Start the mock backend server
npm run server

# 5. Start the development server
npm run dev
```
## 📁 Data Structure
All city data is stored in:
data/cities.json

## ⚠️ Notes
The project uses JSON Server as a mock API during development.

There is no real backend or database; all data is stored locally during runtime.
```
```
## 🙋‍♂️ Author
Moaaz Sayed
https://github.com/Moaaz-Sayed
```
```
## 📌 Disclaimer

This project was mainly focused on practicing and improving my React skills.

Design and responsiveness were not a priority at this stage, so the layout may not be fully optimized for mobile devices.

The goal was to build a functional and interactive map-based app using React, React Router, and Leaflet.

```
```
## 📄 License
This is an educational project and can be used for personal or learning purposes. 
```

