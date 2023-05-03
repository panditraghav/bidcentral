const mongoose = require("mongoose");
// const User = require("../models/userModel");
// const UpdatedFields = require("../models/updatedFieldsModel");

exports.createDocument = (Model) => {
  return async (req, res) => {
    // Doing this way to avoid someone providing role='admin'
    // console.log(req.body);
    const body = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    // Create user from body
    const doc = await Model.create(body);

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      doc,
    });
  };
};

exports.getDocument = (Model) => {
  return async (req, res) => {
    // Taking the id from the parameter
    const id = req.params.id;

    // If user wants only limited information,
    // he should query those fields with the request
    // ex.
    // '/api/v1/users/:id?firstName=true,email=true

    let doc = await Model.findById(id);

    // Check if user wants any particular field
    if (Object.keys(req.query).length !== 0) {
      // Taking all the keys of req.query
      const fields = Object.keys(req.query);

      // New object to filter rest of the fields
      let outputDoc = {};

      // Filter all the fields apart from those mentioned
      fields.forEach((field) => {
        outputDoc[field] = doc[field];
      });

      // Updating the filtered user object
      doc = { ...outputDoc };
    }

    res.status(200).json({
      status: "success",
      user,
    });
  };
};

exports.getAllDocuments = (Model) => {
  return async (req, res) => {
    const docs = await Model.find();

    res.status(200).json({
      status: "sucess",
      results: docs.length,
      docs,
    });
  };
};

// exports.updateDocument = () => {
//   return async (req, res) => {
//     if (req.body.password || req.body.role) {
//       return res.status(400).json({
//         status: "fail",
//         message: "You cannot change these fields",
//       });
//     }

//     // Get the user before updating (passed in the 'protect' route);
//     const userPrev = req.user;

//     // Updating the 'updatedAt' field when user updates document
//     req.body.updatedAt = Date.now();

//     const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     // Save the changes into the updatedFields Collection
//     const fieldsUpdated = Object.keys(req.body);

//     // Remove 'updateAt' property
//     fieldsUpdated.pop();

//     // For each updated field, create a record in the collection.
//     fieldsUpdated.forEach(async (field) => {
//       await UpdatedFields.create({
//         userId: user._id,
//         fieldName: field,
//         fieldOldValue: userPrev[field],
//         fieldNewValue: user[field],
//       });
//     });

//     res.status(200).json({
//       status: "success",
//       updatedUser: user,
//     });
//   };
// };
