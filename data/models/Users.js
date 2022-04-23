module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "users",
    {
      user_id: {
        type: DataTypes.STRING,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      message_time: {
        type: DataTypes.STRING,
        default: "N/A",
      },
      personal_role: {
        type: DataTypes.STRING,
        unique: true,
        default: "",
      },
    },
    { timestamps: false }
  );
};
