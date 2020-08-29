console.log('service worker')

self.addEventListener('push', e => {
  const data = e.data.json();
  console.log(data)
  //console.log('notification recibida')
  self.registration.showNotification(data.title, {
    body: data.message,
    icon: 'https://freeiconshop.com/wp-content/uploads/edd/notification-flat.png'
  })
})