import { DataTypes } from "sequelize";

export function defineFormularioManga(sequelize) {
    const FormularioManga = sequelize.define('formularioManga', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        formularioId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'formulario',
                key: 'id'
            }
        },
        mangaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'mangas',
                key: 'id'
            }
        }
    });
    return FormularioManga;
}
