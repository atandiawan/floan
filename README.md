=======================================================================================================
API LOGGING-IN
Post('api/facebooklogin')

API GET USER INFORMATION (YANG SEDANG LOGIN) - CUMA BISA DIACCESS SETELAH LOGIN
Get ('api/profile')

API ADD TRANSACTION (INPUT: EMAIL YANG MENGHUTANG KE USER, AMOUNT)
POST ('api/add/:user_id')

API GET TRANSACTION ORANG YANG USER HUTANGI - CUMA BISA DIACCESS SETELAH LOGIN
Get ('/api/tagihan')

API GET TRANSACTION ORANG YANG HUTANG PADA USER - CUMA BISA DIACCESSS SETELAH LOGIN
Get('/api/masukan')

API MENGIRIM REQUEST LUNASI TRANSACTION
Get ('/api/lunasi/:transaction_id')

API APPROVE LUNASKAN TRANSACTION
POST ('/api/approve/:transaction_id')

API DELETE TRANSACTION DATA
POST ('/api/delete/:transaction_id')

API LOGOUT
POST ('/api/logout')
=========================================================================================================


{ _id: 57f638f475ce4d664630dde0,
  __v: 0,
  facebook:
   { id: '186061385167906',
     token: 'EAATngqew5B0BAAMQYwQ9y0eAhC7gOzj7g6dlZB3A82GdeoTvw5KhgFDSdee2Bf94gYCVY1pLoUTBiEAqetMskqwHCwPGKGE6tk1WbYqOSZALwM0Qax64FZCIZBuXmkPUSFGE9rmljo5WRqNONt0p2XqwWWyORxuSZBDRlSItGhAZDZD',
     firstname: 'Andrew',
     lastname: 'Tandiawan',
     email: 'bizpartnier.indonesia@gmail.com',
     photo: 'https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50/p50x50/10354686_10150004552801856_220367501106153455_n.jpg?oh=b1d33c3a4d6d57cbfe57dbee85ceef4b&oe=5873202F' } }
