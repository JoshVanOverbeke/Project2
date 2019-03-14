module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      name: {
          type: DataTypes.STRING,
          validate:{
            len: [1, 140],
          },
      },
      password: {
        type: DataTypes.STRING,
        validate:{
            len: [8, 24],
        },
      },
  
    });
    User.associate = function(models) {
        models.User.hasMany(models.Pet);
    };

    return User;
  };