const factory = require("./handlerFactory");
const User = require("../models/userModel");

// Reusing code from the handlerFactory file
exports.createUser = factory.createDocument(User);

exports.getUser = factory.getDocument(User);

exports.getAllUsers = factory.getAllDocuments(User);

// exports.updateUser = factory.updateDocument();
