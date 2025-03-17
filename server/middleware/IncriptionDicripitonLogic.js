import crypto from 'crypto';

// Define the algorithm and password
const algorithm = 'aes-256-cbc';
const password = 'your-password';

// Generate key and iv from password
const key = crypto.scryptSync(password, 'salt', 32); // Key derived from password
const iv = crypto.randomBytes(16); // Random IV

// Function to encrypt data
export const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return {
        iv: iv.toString('hex'),
        content: encrypted
    };
};

// Function to decrypt data
export const decrypt = (hash) => {
    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(hash.iv, 'hex'));
    let decrypted = decipher.update(hash.content, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};



