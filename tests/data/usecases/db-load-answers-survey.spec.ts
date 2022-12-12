import { DbLoadAnswersBySurvey } from '@/data/usecases'
import { LoadAnswersBySurveyRepositorySpy } from '@/tests/data/mocks'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: DbLoadAnswersBySurvey
  loadAnswersBySurveyRepositorySpy: LoadAnswersBySurveyRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositorySpy = new LoadAnswersBySurveyRepositorySpy()
  const sut = new DbLoadAnswersBySurvey(loadSurveyByIdRepositorySpy)
  return {
    sut,
    loadAnswersBySurveyRepositorySpy: loadSurveyByIdRepositorySpy
  }
}

describe('DbLoadAnswersBySurvey', () => {
  let surveyId: string
  beforeEach(() => {
    surveyId = faker.datatype.uuid()
  })

  test('Should call LoadAnswersBySurvey', async () => {
    const { sut, loadAnswersBySurveyRepositorySpy: loadSurveyByIdRepositorySpy } = makeSut()
    await sut.loadAnswers(surveyId)
    expect(loadSurveyByIdRepositorySpy.id).toEqual(surveyId)
  })

  test('Should return answers on success', async () => {
    const { sut, loadAnswersBySurveyRepositorySpy: loadSurveyByIdRepositorySpy } = makeSut()
    const answers = await sut.loadAnswers(surveyId)
    expect(answers).toEqual([
      loadSurveyByIdRepositorySpy.result[0],
      loadSurveyByIdRepositorySpy.result[1]
    ])
  })

  test('Should return empty array if LoadAnswersBySurvey returns null', async () => {
    const { sut, loadAnswersBySurveyRepositorySpy: loadSurveyByIdRepositorySpy } = makeSut()
    loadSurveyByIdRepositorySpy.result = []
    const answers = await sut.loadAnswers(surveyId)
    expect(answers).toEqual([])
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadAnswersBySurveyRepositorySpy: loadSurveyByIdRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyByIdRepositorySpy, 'loadAnswers').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.loadAnswers(surveyId)
    await expect(promise).rejects.toThrow()
  })
})
