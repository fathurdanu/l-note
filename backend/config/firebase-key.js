const serviceAccount = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
}

module.exports = serviceAccount;


// const serviceAccount ={
//   "type": "service_account",
//   "project_id": "l-note-3634a",
//   "private_key_id": "d1d839a4668d8473dc23cd23f2098bbaa61d649f",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDKVWwHxwyCTtun\n5SMCG5pUdniIzc/OOMmR9OwgN/pTmmvtJ6vhAcgrcFrvjHAT73Ua3UdKuGmidECS\nQzRzuqP6X2RC5LMV/2zdH7BiVFbW9y1Zq0hkeAnO+dzNUospAE287f1pDj8wgwi5\n5wG6K+2WY8Zkw3RXmpIz8tOwTOQj9FvI7bwh+NghIU5S9Oza5mRIec7xvh4vIXzH\nzOu/s8NAwn6vXZPrg1b9nwVxuDKj7SS9YoT4NypOaw6tU8Jz9SsdgG3emeF+ksF1\nMfhYSks2tM28ovvq6HvvC2fMOHKnxf6tTBBlr9aGCt298BTOeQ9wdKSPN3N4g3UF\nERHDRyQPAgMBAAECggEAHtQUIT09VS9xvWumwV/2TE8+v01oj7nMUJ5aSfBthkZ9\nkkVcpWxxlNjKKjyiKQ9vrtevUJ23jqaa3g46VDXIXVIigyS4eq4P5sM4y0qhbqB7\nuvFjltdJW01rzKb6iBVBQvuaBGNE0n3smvKtKzIdQbBTHrA/LkfhZePmSDL3Adko\nPhW4ftTYbkYXsddHltihFrV4zsZ9IoOU3kPGszplwgUKtKGdtV/AeuPMcl5pvJwU\nY1vKX7J7fT7GOpwgq/J0wNuge5fjqJCw+mKvvKGeMMfit0PFlZAiKlpq4Wc0CZYa\nSE2dpPux4TVeEtS2/pn7wmomU1xTgshd0Z9/+G+lfQKBgQD/qBxkfPCuK9Ab860d\nMp2TdkDQo4Eg0Hu/xV8uDlHsk9UGkpbRSSD0p+O//w9kPQmJBG/j1dJ9t1ymfBaP\nHZkSsNVFC+Is1/m77n6ivUHjaPtRz4V5co1CJ6sNCG+Fl76PaNDTMc0C434I5Gtg\nBpHbtPoI89PMh/y2/p5WXTus8wKBgQDKmvrVhZeLv4roJ36jVxyOBxW96VkuGx0R\nzvIOKvoPRY0EMII/wb1V8tDwWpOts3wft48MdvYOzNyoomR05wo0g8iYU4w0q9Ga\nClSThiezQaQdlyQt3yfk64xeGirMJl5FZ4ev8HbiiFr8TNpGU+vOuXf/36uEMsns\nAXdlRazDdQKBgQC64gXXQymg+DAJrsgWNuDPYbshiNQky6IaXkokXZ1vZeVsB44t\n8NohXfTzbZyvtpqYyWCNWMmk0nvsy3qmJYm3CwLrlTNBeqN4yG9TwSs/9Ib6l8tH\nKwCtole8kDUNoA5RwNod+CKYAPopv+fp6wOGarX4A10I/0Mx9dCC62ZrFwKBgAs/\nKylrLwxs55MXjioXDdi8f/J436B1lNmGOV2b+SGb5MYUw0YyxQXeYsbU4FnGGt/P\n2rsAZ4xOxvj9esIaiTB9GEeMa74Iw6vfYu6FhfKndCrIVxPMzXQhtzsKDNIkVxtX\nMesMWC0fEJ3szjkVM4PYO9cSXX0LLLZTJoOSqJJ5AoGBAJvToQJa/Dvis1nmwnxI\nZ8gQip1FJfRX338Y/Fbhect5UdyaqPoCJWQuq7ESz19OANxgynJjTEoaapqZXOZ/\nFjIADlFlo3y8jjftTHoEWm7V3uY2tU/ff6tgSsgQCzT8GhpmgKns286A1heAekCc\nTEPTfyDy0xrNGm2KvH0rSccJ\n-----END PRIVATE KEY-----\n",
//   "client_email": "firebase-adminsdk-ddsx4@l-note-3634a.iam.gserviceaccount.com",
//   "client_id": "114345884282920407934",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ddsx4%40l-note-3634a.iam.gserviceaccount.com"
// }
