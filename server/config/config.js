// =============================================
// Puerto
// =============================================

process.env.PORT = process.env.PORT || 3000;

// =============================================
// Entorno
// =============================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =============================================
// Base de datos
// =============================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://amadoxxo:CVhfNHYaA3ZEgoDi@cluster0.1wpjh.mongodb.net/test';
}

process.env.URLDB = urlDB;