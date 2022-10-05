import { HttpResponse, HttpRequest } from '@/presentation/protocols'

export interface Controller {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
