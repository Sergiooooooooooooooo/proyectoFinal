import { DataTypes } from "sequelize"; 

export function defineCategorias(sequelize) {
    const Categoria = sequelize.define('Categoria', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });

    Categoria.associate = (models) => {
        Categoria.belongsToMany(models.Manga, {
            through: 'MangaCategoria',       // Nombre de la tabla intermedia
            foreignKey: 'CategoriumId',      // Clave foránea que apunta a Categoria en la tabla intermedia
            otherKey: 'mangaId'              // Clave foránea que apunta a Manga en la tabla intermedia
        });
    };
    return Categoria;
};

