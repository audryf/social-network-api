const moment = require('moment');

const momentDate = (date) => {
 return moment(date).format('MMMM Do YYYY');
} 

module.exports = momentDate;