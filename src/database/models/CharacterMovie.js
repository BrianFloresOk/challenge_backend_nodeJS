module.exports = (sequelize, DataTypes) => {
    const alias = "CharacterMovie"

    const cols = {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        character_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        movie_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    }

    const config = {
        tableName: "characters_movies",
        timestamps: false
    }

    const CharacterMovie = sequelize.define(alias, cols, config)

/*     CharacterMovie.associate = (models) => {
        CharacterMovie.hasMany(models.Character, {
            as: "characters",
            foreignKey: "characer_id"
        })

        CharacterMovie.hasMany(models.Movie, {
            as: "movies",
            foreignKey: "movie_id"
        })
    } */

    return CharacterMovie;
}