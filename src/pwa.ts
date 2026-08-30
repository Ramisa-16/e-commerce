if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('SW registered:', registration.scope)
        registration.addEventListener('updatefound', () => {
          const newSW = registration.installing
          if (!newSW) return
          newSW.addEventListener('statechange', () => {
            if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
              window.dispatchEvent(new CustomEvent('swUpdateAvailable'))
            }
          })
        })
      })
      .catch((error) => {
        console.log('SW registration failed:', error)
      })
  })
}