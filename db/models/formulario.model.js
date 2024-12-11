import { DataTypes } from "sequelize";

export function defineFormularios(sequelize){
    const Formulario = sequelize.define('formulario', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        documento: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false 
        },
        telefono: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        confirmacionManga: {
            type: DataTypes.STRING,
            field: 'confirmacionmanga', 
            allowNull: false // Asegúrate de que este tipo sea adecuado
          }
    })

    Formulario.associate = (models) => {
        Formulario.belongsToMany(models.manga, {
            through: 'formularioManga',  // Nombre de la tabla intermedia
            foreignKey: 'formularioId', // Clave foránea que apunta a Formulario
            otherKey: 'mangaId'         // Clave foránea que apunta a Manga
        });
    };
    return Formulario;
}

