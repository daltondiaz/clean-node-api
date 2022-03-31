import { surveyPath, surveyResultPath, signupPath, loginPath } from './paths/'

export default {
  '/login': loginPath,
  '/signup': signupPath,
  '/surveys': surveyPath,
  '/surveys/{surveyId}/results': surveyResultPath
}
