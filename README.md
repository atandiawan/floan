=======================================================================================================
API LOGGING-IN
Post('/facebooklogin')

API GET USER INFORMATION (YANG SEDANG LOGIN) - CUMA BISA DIACCESS SETELAH LOGIN
Get ('/profile')

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
POST ('/logout')
=========================================================================================================
