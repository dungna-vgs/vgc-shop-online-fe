import withPWAInit from '@ducanh2912/next-pwa'
function createRemotePatterns(URLString) {
  if (URLString && typeof URLString === 'string') {
    return URLString.split(',').map((url) => {
      const newURL = new URL(url.trim()) // Ensure the domain is trimmed of extra spaces
      return {
        protocol: newURL.protocol.split(':')[0], // Extract protocol without the colon
        hostname: newURL.hostname, // Extract hostname
        port: newURL.port || '', // If no port, return an empty string
        pathname: `${newURL.pathname}**` // Extract pathname (defaults to '/')
      }
    })
  }
  return undefined
}

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV !== 'development'
})

export default withPWA({
  reactStrictMode: true,
  images: {
    remotePatterns: createRemotePatterns(process.env.DOMAINS_IMAGE)
  },

  cleanDistDir: true,
  logging: false
})
