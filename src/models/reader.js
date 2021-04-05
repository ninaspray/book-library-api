module.exports = (sequelize, DataTypes) => {
  const schema = {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: [true],
          msg: 'Please use a valid email address',
        },
        notNull: {
          args: [true],
          msg: 'Email cannot be empty',
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: 'Name cannot be empty',
        },
        notNull: {
          args: [true],
          msg: 'We need a name',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: 'Password cannot be empty',
        },
        isLessThan8Characters(value) {
          if (value.length < 8)
            throw new Error('Password needs to be longer than 8 characters');
        },
      },
    },
  };

  return sequelize.define('Reader', schema);
};


// module.exports = (sequelize, DataTypes) => {
//   const schema = {
//     email: {type: DataTypes.STRING,
//     allowNull: false,
//       validate: {
//       isEmail: {
//         args: [true],
//         msg: 'Please use a valid email address'}
//     }},
//     name: {type: DataTypes.STRING,
//       allowNull: false,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notNull: {
//           args: [true],
//           msg: 'Password cannot be empty',
//         },
//         isLessThan8Characters(value) {
//           if (value.length < 8)
//             throw new Error('Password needs to be longer than 8 characters');
//         },
//       },
//     },
//   };

//   return sequelize.define('Reader', schema);
// };


// password: {type: DataTypes.STRING,
//   allowNull: false,
//   validate: {
//     notNull: {
//       args: [true],
//       msg: 'Password cannot be empty',
//     },
//     // len: {
//     //   args: [8, 25],
//       // msg: "Password must be greater than 8 characters"
//       isLessThan8Chars(value) {
//         if (value.length < 8)
//         throw new Error("Password must be greater than 8 characters");
//       }
//     },
//   },  
// };