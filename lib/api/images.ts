import api from './axios'

interface DogApiResponse {
  message: string[]
  status: 'success' | 'error'
}

export const imageService = {
  fetchImages: async (): Promise<string[]> => {
    const response = await api.get<DogApiResponse>('https://dog.ceo/api/breeds/image/random/5')
    if (response.data.status !== 'success') {
      throw new Error('Failed to load images')
    }
    return response.data.message
  },
}
