'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersSchema extends Schema {
    up() {
        this.create('users', (table) => {
            table.increments()
            table.string('nombre', 80).notNullable().unique()
            table.string('email', 254).notNullable().unique()
            table.string('password', 60).notNullable()
            table.string('apellido_materno').notNullable()
            table.string('apellido_paterno').notNullable()
            table.integer('id_rol').unsigned().references('id').inTable('roles')
            table.timestamps()
        })
    }

    down() {
        this.drop('users')
    }
}

module.exports = UsersSchema