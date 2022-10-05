/* eslint-disable @typescript-eslint/no-misused-promises */
import { adaptRoute } from '@/main/adapters/express-routes-adapter'
import { makeAddSurveyController, makeLoadSurveysController } from '@/main/factories/controllers'
import { adminAuth } from '@/main/middlewares/admin-auth'
import { auth } from '@/main/middlewares/auth'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
