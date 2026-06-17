export function getAuthErrorMessage(error) {
  switch (error.code) {
    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/user-not-found":
      return "No account found with this email.";

    case "auth/wrong-password":
      return "Incorrect password. Please try again.";

    case "auth/email-already-in-use":
      return "This email is already registered.";

    case "auth/weak-password":
      return "Password should be at least 6 characters.";

    case "auth/too-many-requests":
      return "Too many attempts. Try again later.";

    case "auth/network-request-failed":
      return "Network error. Check your internet connection.";

    default:
      return "Something went wrong. Please try again.";
  }
}