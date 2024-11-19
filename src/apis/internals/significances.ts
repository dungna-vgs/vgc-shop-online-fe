import { createAxiosInstanceServer } from '@/apis'
import { getStoreDomain } from '@/utils/server'
import { API_ENDPOINT } from '@/configs'
import { TTypeVGA } from '@/types/type'

type TSignificanceResponse = {
  data: TTypeVGA[]
}
export default async function getSignificances() {
  try {
    const [url] = getStoreDomain()
    if (url) {
      const instanceAxios = createAxiosInstanceServer(url)
      const res = await instanceAxios.get<TSignificanceResponse>(
        API_ENDPOINT.GET_SIGNIFICANCES
      )
      const { data } = res
      return data.data
    }
  } catch (error) {
    console.log(error)
  }
  return []
}
