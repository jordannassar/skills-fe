export default async function validateRegister(email, password, confirmPassword, bio, name, yearBorn, image) {
  const emailRegex = /\S+@\S+\.\S+/; // Email regex pattern
  const sqlRegex = /(\b(union|select|insert|update|delete|from|where|drop table|show tables|--|;|#)\b)/i; // SQL injection regex pattern
  const imageFormats = ['image/jpeg', 'image/png', 'image/gif']; // Accepted image formats
  const maxImageSize = 10 * 1024 * 1024; // 10MB max image size

  if (!bio || !name || !yearBorn || !email || !password || !confirmPassword || !image) {
    return 'Please fill in all fields and choose an image';
  }

  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }

  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
    return 'Password must be at least 8 characters, 1 uppercase, 1 lowercase, 1 number';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }

  if (sqlRegex.test(email + password + bio + name + yearBorn + image)) {
    return 'Please do not use special characters or SQL keywords in any field';
  }

  if (bio.length > 200 || name.length > 50) {
    return 'Bio must be less than 200 characters and name must be less than 50 characters';
  }

  const currentYear = new Date().getFullYear();
  if (yearBorn < currentYear - 100 || yearBorn > currentYear - 10) {
    return 'Please enter a valid birth year between ' + (currentYear - 100) + ' and ' + (currentYear - 10);
  }

  return null;
}
