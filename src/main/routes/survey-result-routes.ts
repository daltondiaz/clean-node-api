/* eslint-disable @typescript-eslint/no-misused-promises */
import { adaptRoute } from '@/main/adapters/express-routes-adapter'
import { auth } from '@/main/middlewares/auth'
import { Router } from 'express'
import { makeLoadSurveyResultController, makeSaveSurveyResultController } from '@/main/factories/controllers'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
  router.get('/surveys/:surveyId/results', auth, adaptRoute(makeLoadSurveyResultController()))
}
