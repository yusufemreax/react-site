const express = require('express');
const app = express();
const port = 3001;
const sql = require('mssql');
const cors = require('cors');


app.use(cors({
    origin: 'http://localhost:3000', // İzin verilen alan adı
    credentials: true, // Çerezler ve kimlik bilgileri için
  }));
//const connectionString = "server=.;Database=ECOMMERCE;Trusted_Connection=Yes;Driver{SQL Server Native Client 11.0}";
const dbConfig = {
    server: 'DESKTOP-1VU8C8I',   // SQL Server'ın adı veya IP adresi
    database: 'ECOMMERCE',       // Bağlanılacak veritabanının adı
    user: 'sa',                  // Kullanıcı adı
    password: '123',             // Parola
    options: {
      encrypt: true,              // Eğer SSL/TLS kullanılıyorsa true olarak ayarlayın
      trustServerCertificate: true
    }
  };

sql.connect(dbConfig)
    .then(()=>{
        console.log('VERİTABANINA BAĞLANDI');
    })
    .catch((err)=>{
        console.log('VERİTABANINA BAĞLANIRKEN HATA: ',err);
    });

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('API Çalışıyor');
});

app.listen(port,()=>{
    console.log(`Sunucu '${port}'portunda çalışıyor`);
});

app.post('/login',(req,res) =>{
    const {username,password} = req.body;
    console.log(username + '-'+ password);
    const query = `SELECT * FROM USERS WHERE USERNAME = '${username}' AND PASSWORD = '${password}'`;
    sql.query(query)
        .then((result)=>{
            if(result.recordset.length > 0){
                res.status(200).json({success: true,message:'Giris Başarılı'});
            }else{
                res.status(401).json({success: false,message:'Giris Başarısız'});
            }
        })
        .catch((err)=>{
            console.error('SORGUDA HATA:',err);
            res.status(500).json({success: false,message:'Sunucu hatası'});
        });
});

app.post('/signIn',(req,res)=>{
    const {fullname,username,password,email} = req.body;
    const controlQuery = `SELECT * FROM USERS WHERE USERNAME = '${username}'`;
    sql.query(controlQuery)
        .then((result)=>{
            if(result.recordset.length > 0){
            
                res.status(401).json({success:false,message:'Aynı Username bulunuyor'});
            }else{
                const insertQuery = `INSERT INTO USERS (FULLNAME,USERNAME,PASSWORD,EMAIL) VALUES ('${fullname}','${username}','${password}','${email}')`;
                sql.query(insertQuery)
                    .then((insertResult)=>{
                        if(insertResult.rowsAffected > 0){
                            res.status(200).json({success:true,message:'Kayıt Başarılı'});
                        }else{
                            res.status(401).json({success:false,message:'Kayıt İşlemi Başarısız'});
                        }
                    })
                    .catch((insErr)=>{
                        console.error('KAYIT HATA:',insErr);
                        res.status(500).json({success: false,message:'Sunucu hatası'});
                    });
            }
        })
        .catch((err)=>{
            console.error('KAYIT KONTROL HATA:',err);
            res.status(500).json({success: false,message:'Sunucu hatası'});
        })
});