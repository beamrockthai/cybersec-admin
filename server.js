const express = require("express");
const {PrismaClient} = require("@prisma/client");
const bodyParser = require("body-parser");
const crypto = require("crypto-js");


const secretKey = 'mypass';



const app = express();
const prisma =  new PrismaClient()

app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req,res) =>{
    res.send('Thatchanon')
})

app.get('/user', async(req,res) => {
    const data = await prisma.user.findMany();

    data.map((row) => {
        console.log('row',row);
        row.password = crypto.AES.decrypt(row.password.toString(),secretKey).toString(crypto.enc.Utf8);
        return row;
    });







    const fainalData = data.map = (record =>{
        console.log('new' , record);
        delete record.password;
        return record;
        
    })
    res.json({
        message: "ok",data
    });
})



app.post('/user', async (req, res) => {
    try {
        const encode = await crypto.AES.encrypt(req.body.password,secretKey) 
        const response = await prisma.user.create({
            data: {
                username: req.body.username,
                password: encode.toString()
            }
        });
        res.json({ message: "เพิ่มข้อมูลสำเร็จ", response });
    } catch (error) {
        res.status(500).json({ message: "เกิดข้อผิดพลาด", error });
    }
});

// READ - ดึงข้อมูลผู้ใช้ทั้งหมด
app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "เกิดข้อผิดพลาด", error });
    }
});

// READ - ดึงข้อมูลผู้ใช้ตาม ID
app.get('/user/:id', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(req.params.id) }
        });
        if (!user) return res.status(404).json({ message: "ไม่พบผู้ใช้" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "เกิดข้อผิดพลาด", error });
    }
});

// UPDATE - แก้ไขข้อมูลผู้ใช้
app.put('/user/:id', async (req, res) => {
    try {
        const updatedUser = await prisma.user.update({
            where: { id: Number(req.params.id) },
            data: req.body
        });
        res.json({ message: "อัปเดตข้อมูลสำเร็จ", updatedUser });
    } catch (error) {
        res.status(500).json({ message: "เกิดข้อผิดพลาด", error });
    }
});

// DELETE - ลบผู้ใช้
app.delete('/user/:id', async (req, res) => {
    try {
        await prisma.user.delete({ where: { id: Number(req.params.id) } });
        res.json({ message: "ลบข้อมูลสำเร็จ" });
    } catch (error) {
        res.status(500).json({ message: "เกิดข้อผิดพลาด", error });
    }
});


app.get('/user/search', async(req,res) => {
    console.log(req);
    const data = await prisma.user.findMany();
    const fainalData = data.map = (record =>{
        console.log('new' , record);
        delete record.password;
        return record;
        
    })
    res.json({
        message: "ok",data
    });
})



app.listen(3000, () => {
    console.log("server is run 3000 By thatchanon");
});
