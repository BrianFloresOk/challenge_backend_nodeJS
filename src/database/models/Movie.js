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
        genre_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(1000),
            allowNull: true
        }
    }

    const config = {
        tableName: "movies",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false
    }

    const Movie = sequelize.define(alias, cols, config)

    Movie.associate = (models) => {
        Movie.belongsTo(models.Genre, {
            as: "genre",
            foreignKey: "genre_id"
        })

        Movie.hasMany(models.Character, {
            as: "characters",
            foreignKey: "movies_id"
        })
    }


    return Movie;
}