module.exports = function (sequelize, DataTypes) {
  var Pets = sequelize.define("Pets", {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 140],
      },
    },
    img: {
      type: DataTypes.STRING,
    },
    alive: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
    hp: {
      type: DataTypes.INTEGER,
      defaultValue: 3,
    },
    hungry: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
    },
    sleepy: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
    },
    happy: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
    },
    lastFed: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
    lastSlept: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
    lastPlayed: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    }


  });

  Pets.associate = function (models) {
    models.Pets.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Pets;
};