'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
    return { greeting: 'Hello world in JSON' }
})

Route.post('register', 'UserController.register');
Route.post('login', 'UserController.login');

Route.group(() => {
    Route.get('userInfo', 'UserController.userInfo');
    Route.get('getRol', 'UserController.getRol');
    Route.delete('deleteAuth', 'UserController.deleteAuth');
    Route.post('newRol', 'UserController.newRol');

    Route.get('getDepts', 'DepartamentoController.getDepts');
    Route.post('newDept', 'DepartamentoController.newDept');

}).middleware(['auth']);