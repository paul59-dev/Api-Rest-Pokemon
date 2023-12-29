const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Le nom est déjà pris.'
            },
            validate: {
                notNull: { msg: 'Les points de vie ont une propriété requise' },
                notEmpty: { msg: 'Le nom ne dois pas etre vide.' }
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'Utilisez uniquement des nombres entiers pour les points de vie.' },
                notNull: { msg: 'Les points de vie ont une propriété requise.' },
                min: { 
                    args: [0],
                    msg: "Les points de vie ne peuvent etre inférieur à 0" 
                },
                max: { 
                    args: [999],
                    msg: "Les points de vie ne peuvent etre supérieur à 999" 
                }
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'Utilisez uniquement des nombres entiers pour les dégats.' },
                notNull: { msg: 'Les dégats ont une propriété requise.' },
                min: { 
                    args: [0],
                    msg: "Les points de vie ne peuvent etre inférieur à 0" 
                },
                max: { 
                    args: [99],
                    msg: "Les points de vie ne peuvent etre supérieur à 99" 
                }
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: { msg: 'Utilisez uniquement une URL pour la photos.' },
                notNull: { msg: 'La photos a une propriété requise.' }
            }
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',') // DB -> API Rest
            },
            set(types) {
                this.setDataValue('types', types.join()) // API Rest -> DB
            },
            validate: {
                // validate perso
                isTypesValid(value) {
                    if(!value) {
                        throw new Error('Un pokemon dois au moin avoir un type.')
                    }
                    if(value.split(',').length > 3) {
                        throw new Error('Un pokemon ne peux pas avoir plus de trois types.')
                    }
                    value.split(',').forEach(type => {
                        if(!validTypes.includes(type)) {
                            throw new Error(`Le type du pokemon doit appartenir à la liste suivante: ${validTypes}`)
                        }
                    })
                }
            }
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}