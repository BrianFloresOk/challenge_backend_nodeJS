module.exports = (sequelize, DataTypes) => {
    const alias = "Genre"

    const cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        movies_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        }
    }

    const config = {
        tableName: "genres",
        timestamps: false
    }

    const Genre = sequelize.define(alias, cols, config)
    return Genre;
}