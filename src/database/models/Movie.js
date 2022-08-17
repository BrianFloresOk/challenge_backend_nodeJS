module.exports = (sequelize, DataTypes) => {
    const alias = "Movie"

    const cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        qualification: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        characters_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        }
    }

    const config = {
        tableName: "movies",
        timestamps: true,
        created_at: "created_at"
    }

    const Movie = sequelize.define(alias, cols, config)
    return Movie;
}