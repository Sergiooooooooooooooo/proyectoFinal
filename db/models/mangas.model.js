import { DataTypes } from "sequelize";

export function defineMangas(sequelize){
    const Manga = sequelize.define('manga', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        autor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genero: {
            type: DataTypes.STRING,
            allowNull: false
        },
        volumenes: {
            type: DataTypes.INTEGER,
            allowNull: false 
        },
        fechaPublicacion: {
            type: DataTypes.DATE,
            allowNull: false
        },
        sinopsis: {
            type: DataTypes.TEXT,
            allowNull: false 
        },
        calificacion: {
            type: DataTypes.DECIMAL(3, 2), 
            allowNull: false 
        },
        editorial: {
            type: DataTypes.STRING,
            allowNull: false
        },
        precio: { 
            type: DataTypes.DECIMAL(12, 2), 
            allowNull: false
        },
        imagen: {
            type: DataTypes.STRING,
            allowNull: false
        }
        
    })

    Manga.associate = (models) => {
        Manga.belongsToMany(models.Categoria, {
            through: 'MangaCategoria',       // Nombre de la tabla intermedia
            foreignKey: 'mangaId',           // Clave foránea que apunta a Manga en la tabla intermedia
            otherKey: 'CategoriumId'         // Clave foránea que apunta a Categoria en la tabla intermedia
        });
    };

    return Manga;
}
