import { DbAddSurvey } from '@/data/usecases'
import MockDate from 'mockdate'
import { mockAddSurveyParams } from '@/tests/domain/mocks'
import { AddSurveyRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbAddSurvey
  addSurveyRepositorySpy: AddSurveyRepositorySpy
}

const makeSut = (): SutTypes => {
  const addSurveyRepositorySpy = new AddSurveyRepositorySpy()
  const sut = new DbAddSurvey(addSurveyRepositorySpy)
  return {
    sut,
    addSurveyRepositorySpy
  }
}

describe('DbAddSurvey UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositorySpy } = makeSut()
    const surveyData = mockAddSurveyParams()
    await sut.add(surveyData)
    expect(addSurveyRepositorySpy.addSurveyRepositoryParams).toBe(surveyData)
  })

  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositorySpy } = makeSut()
    jest.spyOn(addSurveyRepositorySpy, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(mockAddSurveyParams())
    await expect(promise).rejects.toThrow()
  })
})
