const corsOptions = {
  // origin: 'http://localhost:3000', // Specify the allowed origin
  origin: process.env.ORIGIN, // Specify the allowed origin
  methods: process.env.METHODTH, // Specify the allowed HTTP methods
  credentials: JSON.parse(process.env.CREDENTIALS) , // Include cookies and HTTP authentication information with cross-origin requests
};

console.log(corsOptions)
module.exports = corsOptions