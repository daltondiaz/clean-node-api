import 'module-alias/register'
import { MongoHelper } from '@/infra/db/mongodb'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`serve running at http://localhost:${env.port}`))
  })
  .catch(console.error)
