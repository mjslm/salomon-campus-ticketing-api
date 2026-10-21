const express = require('express');
const app = express();

// Enable JSON request-body parsing
app.use(express.json());

// In-memory array to store tickets
let tickets = [
    { id: 1, eventName: "IT Week 2026", location: "University Gym", ticketPrice: 50, seatsAvailable: 500 },
    { id: 2, eventName: "Acquaintance Party", location: "Covered Court", ticketPrice: 30, seatsAvailable: 250 }
];

let nextId = 3;

// Root route to verify deployment
app.get('/', (req, res) => {
    res.status(200).json({ message: "Campus Event Ticketing API is running!", status: "OK" });
});

// CRUD OPERATIONS

// A. Create - POST /api/tickets
app.post('/api/tickets', (req, res) => {
    const { eventName, location, ticketPrice, seatsAvailable } = req.body;

    // Validate required fields
    if (!eventName || !location || ticketPrice === undefined || seatsAvailable === undefined) {
        return res.status(400).json({ error: "Bad Request", message: "Please provide eventName, location, ticketPrice, and seatsAvailable." });
    }
    
    // Validate types (numbers must be positive)
    if (ticketPrice < 0 || seatsAvailable < 0) {
        return res.status(400).json({ error: "Bad Request", message: "Price and seats must be positive numbers." });
    }

    // Create new record with unique ID
    const newTicket = { id: nextId++, eventName, location, ticketPrice, seatsAvailable };
    tickets.push(newTicket);
    
    // Return created record
    res.status(201).json(newTicket);
});

// B. Read All - GET /api/tickets
app.get('/api/tickets', (req, res) => {
    res.status(200).json(tickets);
});

// B. Read One - GET /api/tickets/:id
app.get('/api/tickets/:id', (req, res) => {
    const ticketId = parseInt(req.params.id);
    const ticket = tickets.find(t => t.id === ticketId);

    // Error response if record does not exist
    if (!ticket) {
        return res.status(404).json({ error: "Not Found", message: `Ticket with ID ${ticketId} does not exist.` });
    }
    res.status(200).json(ticket);
});

// C. Update - PUT /api/tickets/:id
app.put('/api/tickets/:id', (req, res) => {
    const ticketId = parseInt(req.params.id);
    const ticketIndex = tickets.findIndex(t => t.id === ticketId);

    // Handle requests for nonexistent records
    if (ticketIndex === -1) {
        return res.status(404).json({ error: "Not Found", message: `Ticket with ID ${ticketId} does not exist.` });
    }

    const { eventName, location, ticketPrice, seatsAvailable } = req.body;

    // Validate submitted data
    if (!eventName || !location || ticketPrice === undefined || seatsAvailable === undefined) {
        return res.status(400).json({ error: "Bad Request", message: "Please provide eventName, location, ticketPrice, and seatsAvailable to update." });
    }

    // Update permitted fields
    tickets[ticketIndex] = { id: ticketId, eventName, location, ticketPrice, seatsAvailable };
    
    // Return updated record
    res.status(200).json(tickets[ticketIndex]);
});

// D. Delete - DELETE /api/tickets/:id
app.delete('/api/tickets/:id', (req, res) => {
    const ticketId = parseInt(req.params.id);
    const ticketIndex = tickets.findIndex(t => t.id === ticketId);

    // Handle requests for nonexistent records
    if (ticketIndex === -1) {
        return res.status(404).json({ error: "Not Found", message: `Ticket with ID ${ticketId} does not exist.` });
    }

    // Remove record
    tickets.splice(ticketIndex, 1);
    
    // Return meaningful success response
    res.status(200).json({ message: `Ticket with ID ${ticketId} successfully deleted.` });
});

// SERVER CONFIGURATION
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});