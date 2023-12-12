// emailTemplates.js

function getPasswordResetEmailContent(user, resetlink) {
    return `
      <p>Dear ${user.firstname} ${user.lastname},</p>
      <p>We received a request to reset your password. Please click the following link to reset your password:</p>
      <p><a href="${resetlink}">${resetlink}</a></p>
      <p>If you did not request this password reset, you can safely ignore this email.</p>
      <p>Best regards,</p>
      <p>Your Application Team</p>
    `;
  }
  
  module.exports = {
    getPasswordResetEmailContent,
  };
  