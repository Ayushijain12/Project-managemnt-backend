const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
})


app.post("/signup", (req, res) => {

    if (!req.body.username || !req.body.email || !req.body.password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const checkEmailSql = "SELECT * FROM login WHERE email = ?";
    db.query(checkEmailSql, [req.body.email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length > 0) {
            return res.status(200).json({ error: 'Email already exists' });
        }

        const sql = "INSERT INTO login (`name`, `email`, `password`, `department`, `mobile`, `companyname`) VALUES (?)";
        const values = [
            req.body.username,
            req.body.email,
            req.body.password,
            req.body.department,
            req.body.mobile,
            req.body.companyname
        ];
        db.query(sql, [values], (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            return res.status(200).json({ message: 'Register successful', data: data, status: 200 });
        });
    });
});


app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const sql = 'SELECT * FROM login WHERE `email` = ? AND `password` = ?';
    const values = [email, password];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(200).json({ error: 'Invalid email or password' });
        }

        return res.status(200).json({ message: 'Login successful', data: results, status: 200 });
    });
})


app.post("/forget-password", (req, res) => {
    const { email } = req.body;

    // Check for required fields
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    // Check if the email exists in the database
    const checkEmailSql = "SELECT * FROM login WHERE email = ?";
    db.query(checkEmailSql, [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(200).json({ error: 'Email not found' });
        }

        // Generate OTP or handle password reset logic here
        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpExpiry = Date.now() + 300000; // 5 minutes

        const updateOtpSql = 'UPDATE login SET otp = ?, otpExpiry = ? WHERE email = ?';
        db.query(updateOtpSql, [otp, otpExpiry, email], (err, data) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            // You may want to send the OTP to the user's email here
            return res.status(200).json({ message: 'OTP sent to email', otp: otp, status: 200 });
        });
    });
});


app.post("/verify-otp", (req, res) => {
    const { email, otp } = req.body;

    // Check for required fields
    if (!email || !otp) {
        return res.status(400).json({ error: 'Email and OTP are required' });
    }

    // Check if the email and OTP exist in the database
    const checkOtpSql = "SELECT otp, otpExpiry FROM login WHERE email = ?";
    db.query(checkOtpSql, [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(200).json({ error: 'Email not found' });
        }

        const { otp: storedOtp, otpExpiry } = results[0];

        // Check if OTP is correct and not expired
        if (storedOtp !== otp) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        if (Date.now() > otpExpiry) {
            return res.status(200).json({ error: 'OTP has expired' });
        }

        // OTP is valid, proceed with password reset or other actions
        // For example, you might clear the OTP and otpExpiry after successful verification
        const clearOtpSql = 'UPDATE login SET otp = NULL, otpExpiry = NULL WHERE email = ?';
        db.query(clearOtpSql, [email], (err) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            return res.status(200).json({ message: 'OTP verified successfully', status: 200 });
        });
    });
});



app.post("/change-password", (req, res) => {
    const { email, newPassword } = req.body;

    // Check if required fields are present
    if (!email || !newPassword) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if the user exists
    const checkUserSql = "SELECT * FROM login WHERE email = ?";
    db.query(checkUserSql, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the password
        const updatePasswordSql = "UPDATE login SET password = ? WHERE email = ?";
        db.query(updatePasswordSql, [newPassword, email], (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            return res.status(200).json({ message: 'Password changed successfully', status: 200 });
        });
    });
});




app.post('/projects', (req, res) => {
    const { project_name, project_number, area, address, due_date, contact, manager, staff } = req.body;

    if (!project_name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    const sql = 'INSERT INTO projects (project_name, project_number, area, address, due_date, contact, manager, staff) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [project_name, project_number, area, address, due_date, contact, manager, staff];
    
    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(201).json({ message: 'Project created', id: result.insertId, status : 200 });
    });
});


app.get('/projects/lists', (req, res) => {
    const sql = 'SELECT * FROM projects';

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json(results);
    });
});

app.get('/projects-id/:id', (req, res) => {
    const { id } = req.params;

    // Ensure the ID is a valid number
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    const sql = 'SELECT * FROM projects WHERE id = ?';
    const values = [id];

    db.query(sql, values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        res.status(200).json(results[0]);
    });
});


app.put('/edit-projects/:id', (req, res) => {
    const { id } = req.params;
    const { project_name, project_number, area, address, due_date, contact, manager, staff } = req.body;

    if (!project_name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    const sql = `
        UPDATE projects
        SET project_name = ?, project_number = ?, area = ?, address = ?, due_date = ?, contact = ?, manager = ?, staff = ?
        WHERE id = ?
    `;
    const values = [project_name, project_number, area, address, due_date, contact, manager,staff, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        res.status(200).json({ message: 'Restaurant updated successfully', status : 200 });
    });
});


app.delete('/delete-projects/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM projects WHERE id = ?';
    const values = [id];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        res.status(200).json({ message: 'Restaurant deleted successfully' });
    });
});


app.get('/estimate/lists', (req, res) => {
    const sql = 'SELECT * FROM estimations';

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json(results);
    });
});



app.listen(8081, () => {
    console.log("listening");
})