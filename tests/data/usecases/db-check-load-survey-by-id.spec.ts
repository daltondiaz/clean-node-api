import { DbCheckSurveyById } from '@/data/usecases'
import { CheckSurveyByIdRepositorySpy } from '@/tests/data/mocks'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: DbCheckSurveyById
  checkSurveyByIdRepositorySpy: CheckSurveyByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkSurveyByIdRepositorySpy = new CheckSurveyByIdRepositorySpy()
  const sut = new DbCheckSurveyById(checkSurveyByIdRepositorySpy)
  return {
    sut,
    checkSurveyByIdRepositorySpy
  }
}

describe('DbLoadSurveyById', () => {
  let surveyId: string
  beforeEach(() => {
    surveyId = faker.datatype.uuid()
  })

  test('Should call CheckSurveysByIdRepository', async () => {
    const { sut, checkSurveyByIdRepositorySpy } = makeSut()
    await sut.checkById(surveyId)
    expect(checkSurveyByIdRepositorySpy.id).toEqual(surveyId)
  })

  test('Should return if CheckSurveysByIdRepository returns true', async () => {
    const { sut } = makeSut()
    const exists = await sut.checkById(surveyId)
    expect(exists).toEqual(true)
  })

  test('Should return if CheckSurveysByIdRepository returns false', async () => {
    const { sut, checkSurveyByIdRepositorySpy } = makeSut()
    checkSurveyByIdRepositorySpy.result = false
    const exists = await sut.checkById(surveyId)
    expect(exists).toEqual(false)
  })
  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, checkSurveyByIdRepositorySpy } = makeSut()
    jest.spyOn(checkSurveyByIdRepositorySpy, 'checkById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.checkById(surveyId)
    await expect(promise).rejects.toThrow()
  })
})
