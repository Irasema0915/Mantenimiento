'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PermisosSchema extends Schema {
    up() {
        this.create('permisos', (table) => {
            table.increments('id')
            table.string('create').notNullable()
            table.string('update').notNullable()
            table.string('delete').notNullable()
            table.string('read').notNullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('permisos')
    }
}

module.exports = PermisosSchema