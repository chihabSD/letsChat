
var moment = require('moment'); // require
export const groupMessages = (messages) => {
  
        let newDirectory = Object.values(messages.reduce((acc, message) => {
          let formatedDate = moment(message.createdAt).format('YYYY-MM-DD')
          if (!acc[formatedDate]) acc[formatedDate] = {
              timeLine: formatedDate,
              originalDate: message.createdAt, 
              messages: []
          };
          acc[formatedDate].messages.push(message);
          return acc;
        }, {}))
        return newDirectory
}
