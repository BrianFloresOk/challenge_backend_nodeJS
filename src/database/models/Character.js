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
            type: DataTypes.INTEGER(100),
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
            type: DataTypes.STRING(1000),
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
    
    Character.associate = (models) => {
        Character.belongsToMany(models.Movie, {
            as: "movies",
            through: "characters_movies",
            foreignKey: "character_id",
            otherKey: "movie_id",
            timestamps: false
        })
    }
    
    return Character;
}