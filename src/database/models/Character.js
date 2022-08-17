module.exports = (sequelize, DataTypes) => {
    const alias = "Character"

    const cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        weigth: {
            type: DataTypes.INTEGER(200),
            allowNull: true
        },
        image: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        history: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        movies_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    }

    const config = {
        tableName: "characters",
        timestamps: false
    }

    const Character = sequelize.define(alias, cols, config)
    return Character;
}