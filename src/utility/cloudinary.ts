export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'Free Public Upload')

  try {
    const response = await fetch('https://api.cloudinary.com/v1_1/dvoy6ulm7/image/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to upload image')
    }

    const data = await response.json()
    return data.secure_url
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const deleteFromCloudinary = async (cloudinaryUrl: string | undefined) => {
  try {
    // Example URL:
    // https://res.cloudinary.com/dvoy6ulm7/image/upload/v1710000000/folder/image.jpg

    const url = new URL(cloudinaryUrl || '')

    // Extract part after /upload/
    let publicIdWithExt = url.pathname.split('/upload/')[1] || ''

    // Remove version (v123456/)
    publicIdWithExt = publicIdWithExt.replace(/^v\d+\//, '')

    // Remove file extension
    const publicId = publicIdWithExt.replace(/\.[^/.]+$/, '')

    const formData = new FormData()
    formData.append('public_id', publicId)

    // ⚠️ These must be added server-side
    formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY)
    formData.append('timestamp', Math.floor(Date.now() / 1000).toString())
    formData.append(
      'signature',
      await generateSignature(publicId), // see below
    )

    const response = await fetch('https://api.cloudinary.com/v1_1/dvoy6ulm7/image/destroy', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to delete image')
    }

    return await response.json()
  } catch (err) {
    console.error('Cloudinary delete error:', err)
    throw err
  }
}

const generateSignature = async (publicId: string) => {
  const timestamp = Math.floor(Date.now() / 1000)

  const stringToSign = `public_id=${publicId}&timestamp=${timestamp}`

  const encoder = new TextEncoder()
  const data = encoder.encode(stringToSign + import.meta.env.VITE_CLOUDINARY_API_SECRET)
  const hashBuffer = await crypto.subtle.digest('SHA-1', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')

  return hashHex
}
