const PUBLIC_VAPID_KEY = 'BP0UmLKF6fdKx5e_kR1hCYOEuUh0c_iC9ZkMV37RJcz1WbYnzXOWdsRhI0zXkKUXQnZfnbMg7YPvfXOxrUHtbNU';


function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
 
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
 
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}


const subscription = async () => {

  // service worker
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/'
  })

  console.log('new service worker')

  const subs = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
  })

  await fetch('/subscription', {
    method: 'POST',
    body: JSON.stringify(subs),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(() => console.log('subscrito!'))
}

subscription();




