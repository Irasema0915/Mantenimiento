'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MantenimientosSchema extends Schema {
    up() {
        this.create('mantenimientos', (table) => {
            table.increments('id')
            table.integer('id_departamento').unsigned().references('id').inTable('departamentos')
            table.text('descripcion_servicio').notNullable().defaultTo('Describe el mantenimiento')
            table.string('area_atendida').notNullable()
            table.integer('id_user').unsigned().references('id').inTable('users')
            table.text('diagnostico').notNullable().defaultTo('Escribe cada punto')
            table.integer('id_insumos').unsigned().references('id').inTable('insumos')
            table.text('descripcion_terminado').notNullable().defaultTo('Haz las notas necesarias')
            table.text('recomendaciones').notNullable().defaultTo('Describe cada recomendacion')
            table.string('estatus').notNullable()
            table.string('autorizado').notNullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('mantenimientos')
    }
}

module.exports = MantenimientosSchema