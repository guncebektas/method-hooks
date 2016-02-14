describe('after hooks handler', () => {
  it('takes an array of functions', () => {
    const callWithIncorrectHooks = () => {
      return MethodHooks({
        name: 'methodName', afterHooks: () => {}, run: () => {}
      })
    }

    const callWithCorrectHooks = () => {
      return MethodHooks({
        name: 'methodName', afterHooks: [() => {}], run: () => {}
      })
    }

    expect(callWithIncorrectHooks).toThrow()
    expect(callWithCorrectHooks).not.toThrow()
  })

  it('runs each function in the after hooks array', () => {
    const hooks = {
      first (){},
      second (){}
    }

    spyOn(hooks, 'first').and.callThrough()
    spyOn(hooks, 'second').and.callThrough()

    MethodHooks({
      name: 'methodName', afterHooks: [
        hooks.first, hooks.second
      ], run (){}
    }).run()

    expect(hooks.first).toHaveBeenCalled()
    expect(hooks.second).toHaveBeenCalled()
  })

  it('calls each after hook with the proper arguments', () => {
    const hooks = {
      first (args, returnValue, options){},
      second (args, returnValue, options){}
    }

    spyOn(hooks, 'first').and.callThrough()
    spyOn(hooks, 'second').and.callThrough()

    const args = 'testing'
    const returnValue = 'returned value: ' + args

    const options = {
      name: 'methodName',
      afterHooks: [
        hooks.first, hooks.second
      ],
      run (args){
        return 'returned value: ' + args
      }
    }

    MethodHooks(options).run(args)

    expect(hooks.first).toHaveBeenCalledWith(args, returnValue, options)
    expect(hooks.second).toHaveBeenCalledWith(args, returnValue, options)
  })
})

