var mongoose = require('mongoose');


var expenseCategory = [
   "Expensive, but I get it",
   "Unnecessary and slightly ridiculous",
   "Are you F#@$!%@ kidding me?  Take it back!"
];

var relationship = [
   "wife",
   "husband",
   "boyfriend",
   "girlfriend",
   "son",
   "daughter"
];

var UserSchema = mongoose.Schema({
   email: String,
   password: String,
   relation: [RelationshipSchema]
});

var RelationshipSchema = mongoose.Schema({
   relationshipEmail: String,
   relationshipType: {type: String, enum: relationship, default: relationship[0]},
   threshold: {type: String, enum: expenseCategory, default: expenseCategory[0]},
   expenditure: [ExpenditureSchema]
});

var ExpenditureSchema = mongoose.Schema({
   amount: Number,
   expenditureDesc: String,
   expenditureDate: Date
});


exports.User = mongoose.model('User', UserSchema);
exports.Relationship = mongoose.model('Relationship', RelationshipSchema);
exports.Expenditure = mongoose.model('Expenditure', ExpenditureSchema);
exports.relationshipValues = relationship;
exports.expenseCategoryValues = expenseCategory;