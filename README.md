# Campus Event Ticketing API

**Author:** Marchael Salomon  
**Subject:** Integrative Programming & Technology - ITPE101  
**Activity:** Laboratory Activity 9 - Designing and Building APIs using Express.js  

## 📝 Project Description
A RESTful API built with Node.js and Express.js that manages ticket sales for Campus Events. The API allows users to view, create, update, and delete event tickets. It uses an in-memory array to store data and includes strict validation to prevent negative prices or seat counts.

## 🛠️ Technologies Used
*   **Node.js** - Runtime environment
*   **Express.js** - Web framework for building the API
*   **Postman** - For API testing
*   **Render** - For cloud deployment

## 💻 Installation & Local Execution
To run this project locally, follow these steps:
1. Clone the repository: 
   `git clone https://github.com/YOUR_GITHUB_USERNAME/salomon-campus-ticketing-api.git`
2. Navigate to the project folder:
   `cd salomon-campus-ticketing-api`
3. Install the dependencies:
   `npm install`
4. Start the server:
   `node server.js`
5. The API will be accessible at `http://localhost:3000`

## 🔗 API Endpoints

| Operation | HTTP Method | Route | Purpose |
| :--- | :--- | :--- | :--- |
| **Read All** | `GET` | `/api/tickets` | Retrieves all event tickets |
| **Read One** | `GET` | `/api/tickets/:id` | Retrieves a specific ticket by ID |
| **Create** | `POST` | `/api/tickets` | Creates a new event ticket |
| **Update** | `PUT` | `/api/tickets/:id` | Updates an existing event ticket |
| **Delete** | `DELETE` | `/api/tickets/:id` | Deletes an event ticket |

## 📦 Example Request Body (POST / PUT)
When sending a `POST` or `PUT` request, ensure your Postman Body is set to **raw -> JSON** and use this format:

```json
{
  "eventName": "IT Week 2026",
  "location": "University Gym",
  "ticketPrice": 50,
  "seatsAvailable": 500
}