var webPush = require('./node_modules/web-push');
 
const vapidKeys = {
   "publicKey": "BDjCDRQhfAHZqHPfuqLw7rpqNbtu7P9gKxBwClhRd0aC5qPHptSkWJW_tE9F4piu81PDosHJvktcoUPrV9Ja4sI",
   "privateKey": "5r6g_7rJpq-OKtqBARvGykSBCR23_-__iS2BWFsbH94"
};

webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/el8E-ftvC4E:APA91bE_9IDcfTUt2PLE6eBh6xMDFc5X5FYaBxFBJobUKIKQQgZ-s17yVOJFSohzXUn2RKRRPZdAGt2KW_0rFsPBetcXMNW8adwSvO8P0p6fT-YbUnxx4IMsRXBq3nK6RV4dr2Vw551s",
   "keys": {
       "p256dh": "BAELAha5B/LNWPCV7numPC7oJKeHAJ9xAIlknCzk+Rbu/G/y0acp/vlLX9uUO3X7H7eCo+DVHhuuYC2eMwq//aE=",
       "auth": "8adIgakh5HND87Kx+hrfjg=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '349444418317',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);