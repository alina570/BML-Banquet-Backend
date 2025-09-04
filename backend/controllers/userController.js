const User = require("../models/user");
const passport = require("passport");
const crypto = require("crypto");
const sendEmail = require("../sendEmail");

//signup
exports.signupUser = async (req, res) => {
    const { email,username, password } = req.body;

    try {
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser , (err)=>{
            if(err){
                res.status(401).json({ message: 'errro in login user after signup' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        }) 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//login
exports.loginUser = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
          console.error('Error during authentication:', err);
          return res.status(500).json({ message: 'An error occurred' });
        }
        if (!user) {
          console.log('Authentication failed:', info.message);
          return res.status(401).json({ message: info.message });
        }
    
        req.logIn(user, (err) => {
          if (err) {
            console.error('Failed to log in:', err);
            return res.status(500).json({ message: 'Failed to log in' });
          }
    
          // Successfully logged in
          console.log('Logged in user:', user);
          res.status(200).json({ message: 'Login successful', user });
        });
      })(req, res, next);
}


//logout
exports.logout = async(req,res)=>{
    req.logout(err => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json({ message: 'Logout successful' });
    });
}

//get user info
exports.getUser = async(req,res) => {
  try {
    if (req.isAuthenticated() && req.user) {
      return res.json({ user: req.user });
    }
    return res.status(401).json({ message: 'User is not logged in' });
  } catch (error) {
    console.error('Error in getUser:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

// Forgot Password - Generate Reset Token
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    const user = await User.findOne({ email });
    
    if (!user) {
      // For security reasons, don't reveal if email exists or not
      return res.status(200).json({ 
        message: 'If the email exists, a password reset link has been sent' 
      });
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Set token and expiration (1 hour)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    
    await user.save();
    
    // Send email with reset link
    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
    const emailSubject = 'Password Reset Request';
    const emailText = `You requested a password reset. Please click the following link to reset your password: ${resetLink}\n\nIf you didn't request this, please ignore this email.`;
    
    await sendEmail(user.email, emailSubject, emailText);
    
    res.status(200).json({ 
      message: 'If the email exists, a password reset link has been sent' 
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Reset Password - Validate Token and Update Password
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }
    
    // Find user with valid reset token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }
    
    // Set new password using Passport's method
    await user.setPassword(password);
    
    // Clear reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    
    await user.save();
    
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add this method to your userController.js
exports.getUserBookings = async (req, res) => {
  try {
    if (!req.isAuthenticated() || !req.user) {
      return res.status(401).json({ message: 'User is not logged in' });
    }

    const userId = req.user._id;
    
    // Import all models
    const Catering = require("../models/catering");
    const EventDecoration = require("../models/eventDecoration");
    const OnlineBooking = require("../models/onlineBooking");

    // Fetch all bookings for the user
    const [cateringBookings, decorationBookings, onlineBookings] = await Promise.all([
      Catering.find({ user: userId }),
      EventDecoration.find({ user: userId }),
      OnlineBooking.find({ user: userId })
    ]);

    res.json({
      catering: cateringBookings,
      decorations: decorationBookings,
      onlineBookings: onlineBookings
    });

  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
};


// Support Form - Send form data to email
exports.supportForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }
    
    // Create email content
    const emailSubject = `Support Request: ${subject}`;
    const emailText = `
      New Support Request Received:
      
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      
      Message:
      ${message}
      
      Received at: ${new Date().toLocaleString()}
    `;
    
    // Send email (assuming you have a sendEmail function)
    await sendEmail(
      process.env.SUPPORT_EMAIL || 'support@yourdomain.com', // Target support email
      emailSubject,
      emailText
    );
    
    // Optional: Send confirmation email to the user
    const userConfirmationSubject = 'We\'ve received your support request';
    const userConfirmationText = `
      Dear ${name},
      
      Thank you for contacting our support team. We've received your message and will get back to you as soon as possible.
      
      Your message:
      ${message}
      
      If you have any additional information to add to your request, please reply to this email.
      
      Best regards,
      Support Team
    `;
    
    await sendEmail(email, userConfirmationSubject, userConfirmationText);
    
    res.status(200).json({ message: 'Support request submitted successfully' });
  } catch (error) {
    console.error('Support form error:', error);
    res.status(500).json({ message: 'Server error while processing support request' });
  }
};