const fs = require("fs")
const { stdout,stdin, exit } = require("process")
const readline = require("readline")

const ae = readline.createInterface({
    input : stdin,
    output : stdout
})

let balance = 0;
let storage = []

landingPage();

function landingPage (){
    console.log("========Welcome To Ado Bank====== \n")
    if(!fs.existsSync("Penyimpanan.json")){
    console.log("Balance " + balance);
    console.log("Deposit")
    console.log("Withdraw")
    console.log("Exit")

         ae.question("Ingin ke menu mana? : ", (answare)=>{
        if(answare === "Deposit" || answare === "deposit"){
            Masuk();
        }else if(answare === "Withdraw" || answare === "withdraw"){
            Keluar()

        }else if(answare === "Exit" || answare === "exit"){
            Exit()
        }else{
            console.log("Tidak ada perihal yang anda ketik")
              landingPage()
        }

    })


    }else{
         fs.readFile("Penyimpanan.json", "utf8", (err, data) => {
    if (err) throw err;

    let obj = JSON.parse(data);   

    console.log("Balance " +obj[0].saldo);
    console.log("Deposit")
    console.log("Withdraw")
     console.log("Exit")

     ae.question("Ingin ke menu mana? : ", (answare)=>{
        if(answare === "Deposit" || answare === "deposit"){
            Masuk();
        }else if(answare === "Withdraw" || answare === "withdraw"){
            Keluar()

        }else if(answare === "Exit" || answare === "exit"){
            Exit()
        }else{
            console.log("Tidak ada perihal yang anda ketik")
            landingPage()
        }


    })
});
    }



   
}

function Masuk (){

    if(!fs.existsSync("Penyimpanan.json")){
     ae.question("Masukan angka yang ingin di Depo : ", (depo) =>{

                depo = Number(depo)

                let oj = {
                    saldo : depo
                }
                
                storage.push(oj)

                let is = JSON.stringify(storage)

                fs.writeFile("Penyimpanan.json" , is, (err)=>{
                    if (err) throw err;
                    landingPage()

                })
            })
    }else{
        ae.question("Masukan angka yang ingin di Depo : ", (answare) =>{
              fs.readFile("Penyimpanan.json", "utf-8", (err, Data) =>{
                    if (err) throw err;
                    let convert = Number(answare)
                    let obj = JSON.parse(Data)
                     obj[0].saldo += convert;


                    let simpan = JSON.stringify(obj, null, 2);

                    fs.writeFile("Penyimpanan.json", simpan, (err)=>{
                        if (err) throw err;
                        landingPage()
                    })
                })

        })

    }

}

function Keluar(){

    if(!fs.existsSync("Penyimpanan.json")){
        console.log("And miskin!, silakan coba lagi")
    }else{
        ae.question("Masukan angka yang ingin anda withdraw : " ,(wd) =>{
        let convert = Number(wd)
        fs.readFile("Penyimpanan.json", "utf-8",(err,data) =>{
            if (err) throw err
            let swith = JSON.parse(data)
            swith[0].saldo -= convert
            
            let simpan = JSON.stringify(swith, null, 2)
            
            fs.writeFile("Penyimpanan.json", simpan, (err) =>{
                if (err) throw err
                landingPage()
            })
        })
        
    })
    }
   
}

function Exit(){
    ae.close()
}