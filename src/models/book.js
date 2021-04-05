module.exports = (sequelize, DataTypes) => {
    const schema = {
      title: {
        allowNull: false,
        type: DataTypes.STRING,
        validation: {
          notNull: {
            args: [true],
            msg: 'Please provide the books title',
          },
          notEmpty: {
            args: [true],
            msg: 'The book title cannot be empty',
          },
        },
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
        validation: {
          notNull: {
            args: [true],
            msg: 'Please provide a book author',
          },
          notEmpty: {
            args: [true],
            msg: 'The Author cannot be empty',
          },
        },
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
        validation: {
          notNull: {
            args: [true],
            msg: 'Please provide a book genre',
          },
          notEmpty: {
            args: [true],
            msg: 'The genre cannot be empty',
          },
        },
      },
      ISBN: DataTypes.STRING,
    };
  
    return sequelize.define('Book', schema);
  };
