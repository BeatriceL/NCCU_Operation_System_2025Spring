const express = require('express');
const cors = require('cors');
const os = require('os');
const app = express();

app.use(cors()); // ✅ 開放所有來源（開發階段安全）

// 👉 你的 /api/system-status 路由
app.get('/api/system-status', (req, res) => {
    const cpuLoad = os.loadavg()[0];  // 1 分鐘平均
    const ramUsage = (1 - os.freemem() / os.totalmem()) * 100;
    const userCount = os.userInfo().username ? 1 : 0;  // 模擬使用者數量
    const networkSpeed = Math.floor(Math.random() * 50) + 10;  // 模擬 Mbps

    res.json({
        cpu: Math.round(cpuLoad * 100) / 100,
        ram: Math.round(ramUsage),
        users: userCount,
        network: networkSpeed
    });
});

// 啟動伺服器
app.listen(3001, () => {
    console.log('✅ 伺服器啟動：http://localhost:3001');
})