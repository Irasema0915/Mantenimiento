'use strict'

const Departamento = use('App/Models/Departamento');
class DepartamentoController {

    async newDept({ request, response }) {
        try {
            const data = await request.all();
            const Dept = await new Departamento();

            Dept.descripcion = data.descripcion;

            if (await Dept.save()) {
                return response.status(200).json(Dept);
            }
        } catch (error) {
            return response.status(500).json({ message: "Error" });
        }
    }

    async getDepts({ response }) {
        try {
            const depts = await Departamento.query().select('*').fetch();

            return response.status(200).json(depts);
        } catch (error) {
            return response.status(500).json({ message: "Error" });
        }
    }

}

module.exports = DepartamentoController