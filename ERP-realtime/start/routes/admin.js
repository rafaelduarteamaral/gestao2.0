'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  /**
   *  Categories resource routes
   */
  Route.resource('categories', 'CategoryController')
    .apiOnly()
    .validator(
      new Map([
        [['categories.store'], ['Admin/StoreCategory']],
        [['categories.update'], ['Admin/StoreCategory']]
      ])
    )
  Route.get('categoriesFamilia/:id/:familiaId', 'CategoryController.showFamilia')

  /**
   * Products resource routes
   */
  Route.resource('products', 'ProductController').apiOnly()

  /**
   * Nota fiscal api only
   */
  Route.resource('notafiscal', 'NotaFiscalController').apiOnly()

  /**
   * Cfops Only
   */
  Route.resource('cfops', 'CfopController').apiOnly()

  /**
   * Ncm Only
   */
  Route.resource('ncms', 'NcmController').apiOnly()

  /**
   * Endereco api only
   */
  Route.resource('endereco', 'EnderecoController').apiOnly()
  Route.get('UserEndereco/:id', 'EnderecoController.showUserEndereco' )
  /**
   * Coupon Resource Routes
   */
  Route.resource('coupons', 'CouponController').apiOnly()

  /** 
   * Empresa Resource Routes 
   */
  Route.resource('empresas', 'EmpresaController').apiOnly()

  /**
   * Formas de pagamentos
   */
  Route.resource('formasPagamentos', 'FormaPagamentoController').apiOnly()

  /**
   * Seguimento de negocios
   */
  Route.resource('seguimentoNegocios', 'SeguimentoNegocioController').apiOnly()

  /**
   * Fabricantes
   */
  Route.resource('fabricantes', 'FabricanteController').apiOnly()

    /**
   * Bancos
   */
  Route.resource('Bancos', 'BancoController').apiOnly()

    /**
   * Unidades
   */
  Route.resource('unidades', 'UnidadeController').apiOnly()
  /**
   * Order Resource Routes
   */
  Route.post('orders/:id/discount', 'OrderController.applyDiscount')
  Route.delete('orders/:id/discount', 'OrderController.removeDiscount')
  Route.resource('orders', 'OrderController')
    .apiOnly()
    .validator(new Map([[['orders.store'], ['Admin/StoreOrder']]]))

  Route.post('orders/relatoriofinanceiro', 'OrderController.relatorioFinanceiro')

  /**
   * Image Resource Routes
   */
  Route.resource('images', 'ImageController').apiOnly()

  /**
   * User Resource Routes
   */
  Route.resource('users', 'UserController')
    .apiOnly()
    .validator(
      new Map([
        [['users.store'], ['Admin/StoreUser']],
        [['users.update'], ['Admin/StoreUser']]
      ])
    )

  /**
   * Dashboard Route
   */
  Route.get('dashboard', 'DashboardController.index').as('dashboard')
})
  .prefix('v1/admin')
  .namespace('Admin')
  .middleware(['auth', 'is:( admin || manager )'])
