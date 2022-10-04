import { LogControllerDecorator } from './log-controller-decorator'
import { serverError, ok } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { mockAccountModel } from '@/domain/test'
import { faker } from '@faker-js/faker'
import { LogErrorRepositorySpy } from '@/tests/data/mocks'

export class ControllerSpy implements Controller {
  httpResponse = ok(mockAccountModel())
  httpRequest: HttpRequest
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.httpRequest = httpRequest
    return await Promise.resolve(this.httpResponse)
  }
}

const mockRequest = (): HttpRequest => {
  const password = faker.internet.password()
  return {
    body: {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password,
      passwordConfirmation: password
    }
  }
}

const mockServeError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

type SutTypes = {
  sut: LogControllerDecorator
  controllerSpy: ControllerSpy
  logErrorRepositorySpy: LogErrorRepositorySpy
}

const makeSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy()
  const logErrorRepositorySpy = new LogErrorRepositorySpy()
  const sut = new LogControllerDecorator(controllerSpy, logErrorRepositorySpy)
  return {
    sut,
    controllerSpy,
    logErrorRepositorySpy
  }
}

describe('LogController Decorator', () => {
  test('Should call controller handle ', async () => {
    const { sut, controllerSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(controllerSpy.httpRequest).toEqual(httpRequest)
  })

  test('Should return the same result of the controller', async () => {
    const { sut, controllerSpy } = makeSut()
    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(controllerSpy.httpResponse)
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerSpy, logErrorRepositorySpy } = makeSut()
    const serverError = mockServeError()
    controllerSpy.httpResponse = serverError
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(logErrorRepositorySpy.stack).toBe(serverError.body.stack)
  })
})
