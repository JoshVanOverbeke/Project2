module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      // Giving the Owner model a name of type STRING and password of type STRING
      name: DataTypes.STRING,
      password: DataTypes.STRING
    });
  
    User.associate = function(models) {
      // Associating Owner with Posts
      // When an Owner is deleted, also delete any associated Posts
      User.hasMany(models.Post, {
        onDelete: "cascade"
      });
    };
  
    return User;
  };
  