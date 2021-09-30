'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RolesSchema extends Schema {
    up() {
        this.create('roles', (table) => {
            table.increments('id')
            table.text('descripcion').notNullable().defaultTo('Describe el rol al que pertenece')
            table.integer('id_departamento').unsigned().references('id').inTable('departamentos')
            table.integer('id_permiso').unsigned().references('id').inTable('permisos')
            table.timestamps()
        })
    }

    down() {
        this.drop('roles')
    }
}

module.exports = RolesSchema