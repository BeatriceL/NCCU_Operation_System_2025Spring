let lastUpdated = null;
const taskList = [];
const TARGET_CARBON_EMISSION = 20; // 單位：kg

const chartInitialized = {
    weather: false,
    power: false,
    sensor: false,
    task: false,
    carbon: false,
};

// 通用開啟 modal 函數
function openModal(id) {
    document.getElementById(id).style.display = 'block';

    // 根據 id 初始化對應圖表（只執行一次）
    if (id === 'weatherModal' && !chartInitialized.weather) {
        initWeatherChart();
        chartInitialized.weather = true;
    } else if (id === 'powerModal' && !chartInitialized.power) {
        initPowerChart();
        chartInitialized.power = true;
    } else if (id === 'sensorModal' && !chartInitialized.sensor) {
        initSensorChart();
        chartInitialized.sensor = true;
    } else if (id === 'taskModal' && !chartInitialized.task) {
        initTaskChart();
        chartInitialized.task = true;
    } else if (id === 'carbonModal' && !chartInitialized.carbon) {
        initCarbonChart();
        chartInitialized.carbon = true;
    }
}

// 關閉 modal
function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

// 按下 ESC 關閉全部 modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => modal.style.display = 'none');
    }
});

// 點擊 modal 背景也可關閉
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', e => {
        if (e.target === modal) closeModal(modal.id);
    });
});

// 按鈕控制彈窗打開
function showWeatherChart() {
    openModal('weatherModal');
}
function showPowerChart() {
    openModal('powerModal');
}
function showSensorChart() {
    openModal('sensorModal');
}
function showTaskChart() {
    openModal('taskModal');
}
function showCarbonChart() {
    openModal('carbonModal');
}

// 以下為各圖表初始化範例（你可自訂資料與樣式）
function initWeatherChart() {
    new Chart(document.getElementById('weatherChart'), {
        type: 'line',
        data: {
            labels: ['12:00 AM', '6:00 AM', '12:00 PM', '6:00 PM', '12:00 AM'],
            datasets: [{
                label: 'Temperature (°C)',
                data: [23, 25, 28, 27, 24],
                borderWidth: 2,
                fill: false
            }]
        }
    });
}

function initPowerChart() {
    new Chart(document.getElementById('powerChart'), {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            datasets: [{
                label: 'Power Consumption (kWh)',
                data: [2.1, 2.3, 2.0, 1.9, 2.5],
                backgroundColor: 'rgba(75, 192, 192, 0.5)'
            }]
        }
    });
}

function initSensorChart() {
    new Chart(document.getElementById('sensorChart'), {
        type: 'line',
        data: {
            labels: ['A', 'B', 'C', 'D', 'E'],
            datasets: [{
                label: 'Temperature',
                data: [25, 29, 26, 28, 22],
                borderColor: 'orange',
                tension: 0.3
            }]
        }
    });
}

function initTaskChart() {
    const total = taskList.length;
    const completed = taskList.filter(task => task.status === 'completed').length;
    const pending = total - completed;

    // 更新右上角數字
    const chartCount = document.getElementById('taskChartCount');
    if (chartCount) {
        chartCount.textContent = `${completed} / ${total}`;
    }

    const ctx = document.getElementById('taskChart');

    // 若已存在 chart，先銷毀（避免 "Canvas is already in use" 錯誤）
    if (Chart.getChart(ctx)) {
        Chart.getChart(ctx).destroy();
    }

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Completed', 'Incomplete'],
            datasets: [{
                data: [completed, pending],
                backgroundColor: ['#10b981', '#f87171']
            }]
        }
    });
}


function initCarbonChart() {
    new Chart(document.getElementById('carbonChart'), {
        type: 'radar',
        data: {
            labels: ['Hydroponic Area', 'LED', 'Irrigation', 'Equipment'],
            datasets: [{
                label: 'Carbon Emission Reduction Contribution',
                data: [30, 20, 15, 35],
                backgroundColor: 'rgba(34, 197, 94, 0.3)',
                borderColor: '#22c55e',
                borderWidth: 2
            }]
        }
    });
}
// 顯示區域詳情
function showZoneDetails(zone) {
    const modal = document.getElementById('zoneModal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');

    // 不同區域的詳細數據
    const zoneData = {
        'A': {
            name: 'Greenhouse A',
            status: 'Normal',
            data: {
                'Temperature': '25.3°C',
                'Humidity': '72%',
                'Soil Humidity': '85%',
                'CO₂ Concentration': '420 ppm',
                'Sunlight Intensity': '650 W/m²',
                'Air Pressure': '1013 hPa',
                'Crop Status': 'Good',
                'Pest and Disease Risk': 'Low'
            }
        },
        'B': {
            name: 'Greenhouse B',
            status: 'Warning',
            data: {
                'Temperature': '29.1°C',
                'Humidity': '58%',
                'Soil Humidity': '62%',
                'CO₂ Concentration': '380 ppm',
                'Sunlight Intensity': '720 W/m²',
                'Air Pressure': '1012 hPa',
                'Crop Status': 'Slightly Dry',
                'Pest and Disease Risk': 'Moderate'
            }
        },
        'C': {
            name: 'Greenhouse C',
            status: 'Normal',
            data: {
                'Temperature': '26.8°C',
                'Humidity': '75%',
                'Soil Humidity': '88%',
                'CO₂ Concentration': '410 ppm',
                'Sunlight Intensity': '680 W/m²',
                'Air Pressure': '1014 hPa',
                'Crop Status': 'Excellent',
                'Pest and Disease Risk': 'Low'
            }
        },
        'D': {
            name: 'Open Field Area D',
            status: 'Normal',
            data: {
                'Temperature': '28.5°C',
                'Humidity': '65%',
                'Soil Humidity': '70%',
                'Sunlight Intensity': '850 W/m²',
                'Wind Speed': '2.3 m/s',
                'Air Pressure': '1013 hPa',
                'Crop Status': 'Healthy',
                'Pest and Disease Risk': 'Low'
            }
        },
        'E': {
            name: 'Hydroponic Area E',
            status: 'Warning',
            data: {
                'Temperature': '22.1°C',
                'pH Value': '6.2',
                'EC Value': '1.8 ms/cm',
                'Dissolved Oxygen Level': '5.2 mg/L',
                'Nutrient Solution Concentration': '1200 ppm',
                'Water Level': '85%',
                'Crop Status': 'pH Low',
                'System Status': 'Needs Adjustment'
            }
        },
        'F': {
            name: 'Storage Area F',
            status: 'Normal',
            data: {
                'Temperature': '18.2°C',
                'Humidity': '45%',
                'Inventory Level': '85%',
                'Ventilation Status': 'Normal',
                'Door Lock Status': 'Locked',
                'Lighting': 'Automatic',
                'Environment': 'Suitable',
                'Safety Status': 'Normal'
            }
        }
    };

    const zone_info = zoneData[zone];
    title.textContent = `${zone_info.name} - Detailed Information`;

    let contentHTML = '';
    for (const [key, value] of Object.entries(zone_info.data)) {
        contentHTML += `
            <div class="sensor-item">
                <span style="font-weight: 500;">${key}:</span>
                <span style="color: #059669;">${value}</span>
            </div>
        `;
    }

    content.innerHTML = contentHTML;
    modal.style.display = 'block';
}
function showTaskModal() {
    const modal = document.getElementById('taskModalOverlay');
    modal.style.display = 'block';

    // 設定預設時間
    const now = new Date();
    const localTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    document.getElementById('startTime').value = localTime;

    const endTime = new Date(now.getTime() + 60 * 60 * 1000 - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    document.getElementById('endTime').value = endTime;
}
function closeTaskModal() {
    const modal = document.getElementById('taskModalOverlay');
    modal.style.display = 'none';

    // 清空表單
    document.getElementById('taskName').value = '';
    document.getElementById('taskType').value = '';
    document.getElementById('taskZone').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('powerConsumption').value = '';
    document.getElementById('autoRepeat').checked = false;
    document.getElementById('carbonOptimize').checked = false;
    document.getElementById('weatherAdapt').checked = false;
    document.getElementById('priorityMedium').checked = true;
}

function saveTask() {
    const taskName = document.getElementById('taskName').value;
    const taskType = document.getElementById('taskType').value;
    const taskZone = document.getElementById('taskZone').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const priority = document.querySelector('input[name="priority"]:checked').value;
    const powerConsumption = document.getElementById('powerConsumption').value;
    const description = document.getElementById('taskDescription').value;
    const autoRepeat = document.getElementById('autoRepeat').checked;
    const carbonOptimize = document.getElementById('carbonOptimize').checked;
    const weatherAdapt = document.getElementById('weatherAdapt').checked;

    if (!taskName || !taskType || !taskZone || !startTime || !endTime) {
        alert('⚠️ 請填寫所有必填欄位！');
        return;
    }

    if (new Date(startTime) >= new Date(endTime)) {
        alert('⚠️ 結束時間必須晚於開始時間！');
        return;
    }

    const newTask = {
        name: taskName,
        type: taskType,
        zone: taskZone,
        startTime: startTime,
        endTime: endTime,
        priority: priority,
        powerConsumption: parseFloat(powerConsumption) || 0,
        description: description,
        autoRepeat: autoRepeat,
        carbonOptimize: carbonOptimize,
        weatherAdapt: weatherAdapt,
        status: 'scheduled',
        createdAt: new Date().toISOString()
    };

    const saveBtn = document.querySelector('.btn-save');
    saveBtn.classList.add('success-animation');

    setTimeout(() => {
    saveBtn.classList.remove('success-animation');
    closeTaskModal();
    updateGanttChart(newTask);

    // ✅ 加入記憶體中的任務清單
    taskList.push(newTask);

    // ✅ 寫入 localStorage
    saveTasksToStorage();

    console.log("📥 任務加入記憶體：", taskList);
    alert(`✅ 任務新增成功！\n📋 ${taskName}`);
}, 600);
}

function saveTasksToStorage() {
  const uniqueMap = {};
  taskList.forEach(task => {
    const key = task.key || `${task.name}_${task.zone}_${task.startTime}`;
    uniqueMap[key] = task;
  });
  localStorage.setItem('taskList', JSON.stringify(Object.values(uniqueMap)));
}


// 更新甘特圖（新增任務到主畫面）
function updateGanttChart(newTask) {
    if (!newTask.key) {
        newTask.key = `${newTask.name}_${newTask.zone}_${newTask.startTime}`;
    }

    const ganttContainer = document.querySelector('.gantt-container');
    if (!ganttContainer) return;

    const key = newTask.key || `${newTask.name}_${newTask.zone}_${newTask.startTime}`;
    if (document.querySelector(`[data-task-key="${key}"]`)) {
        console.warn(`⚠️ 任務 ${key} 已渲染過，略過`);
        return;
    }

    const newRow = document.createElement('div');
    newRow.className = 'gantt-row';

    const taskTypeIcons = {
        'irrigation': '💧',
        'monitoring': '📡',
        'maintenance': '🔧',
        'harvesting': '🌾',
        'seeding': '🌱',
        'fertilizing': '🌿',
        'pest_control': '🐛',
        'climate_control': '🌡️'
    };

    const taskTypeClasses = {
        'irrigation': 'task-irrigation',
        'monitoring': 'task-monitoring',
        'maintenance': 'task-maintenance',
        'harvesting': 'task-harvesting',
        'seeding': 'task-monitoring',
        'fertilizing': 'task-monitoring',
        'pest_control': 'task-maintenance',
        'climate_control': 'task-irrigation'
    };

    const icon = taskTypeIcons[newTask.type] || '📋';
    const taskClass = taskTypeClasses[newTask.type] || 'task-monitoring';

    const startDate = new Date(newTask.startTime);
    const endDate = new Date(newTask.endTime);
    const startHour = startDate.getHours() + startDate.getMinutes() / 60;
    const endHour = endDate.getHours() + endDate.getMinutes() / 60;

    const leftPercent = Math.max(0, ((startHour - 6) / 12) * 100);
    const widthPercent = Math.min(100 - leftPercent, ((endHour - startHour) / 12) * 100);

    newRow.innerHTML = `
<div class="task-name">${icon} ${newTask.name}</div>
<div class="task-timeline">
    <div class="task-bar ${taskClass}"
         data-task-key="${key}"
         style="left: ${leftPercent}%; width: ${Math.max(5, widthPercent)}%; cursor: grab;">
    </div>
</div>
`;

    const headerElement = ganttContainer.querySelector('.gantt-header');
    if (headerElement && headerElement.nextSibling) {
        ganttContainer.insertBefore(newRow, headerElement.nextSibling);
    } else {
        ganttContainer.appendChild(newRow);
    }

    const newTaskBar = newRow.querySelector('.task-bar');
    if (!newTaskBar) return;

    // 懸停效果
    newTaskBar.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    });
    newTaskBar.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });

    // 點擊顯示詳情
    newTaskBar.addEventListener('click', function () {
        let optionsText = '';
        if (newTask.autoRepeat) optionsText += '\n• Repeat Task: Yes';
        if (newTask.carbonOptimize) optionsText += '\n• Carbon Emission Optimization: Activate';
        if (newTask.weatherAdapt) optionsText += '\n• Weather Adaptive: Activate';

        alert(`Task Details: ${newTask.name}
\n• Status: ${newTask.status || 'Scheduled'}
\n• Execution Time: ${new Date(newTask.startTime).toLocaleString()} - ${new Date(newTask.endTime).toLocaleString()}
\n• Power Consumption: ${newTask.powerConsumption} kWh
\n• Priority: ${newTask.priority}
\n• Description: ${newTask.description || 'None'}${optionsText}`);
    });

    // ✅ 拖曳功能（更新任務時間與儲存）
    let isDragging = false;
    let startX = 0;
    let initialLeft = 0;

    newTaskBar.addEventListener('mousedown', function (e) {
        isDragging = true;
        startX = e.clientX;
        initialLeft = parseFloat(this.style.left);
        this.style.cursor = 'grabbing';
        e.preventDefault();
    });

    document.addEventListener('mousemove', function (e) {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const containerWidth = ganttContainer.offsetWidth;
        const deltaPercent = (dx / containerWidth) * 100;
        let newLeft = initialLeft + deltaPercent;
        newLeft = Math.max(0, Math.min(100 - parseFloat(newTaskBar.style.width), newLeft));
        newTaskBar.style.left = `${newLeft}%`;
    });

    document.addEventListener('mouseup', function () {
        if (!isDragging) return;
        isDragging = false;
        newTaskBar.style.cursor = 'grab';

        const newStartHour = 6 + (parseFloat(newTaskBar.style.left) / 100) * 12;
        const durationHour = (parseFloat(newTaskBar.style.width) / 100) * 12;

        const baseDate = new Date(newTask.startTime);
        baseDate.setHours(0, 0, 0, 0);
        const newStart = new Date(baseDate);
        newStart.setHours(Math.floor(newStartHour), Math.round((newStartHour % 1) * 60));

        const newEnd = new Date(newStart);
        newEnd.setHours(newStart.getHours() + Math.floor(durationHour));
        newEnd.setMinutes(newStart.getMinutes() + Math.round((durationHour % 1) * 60));

        newTask.startTime = newStart.toISOString();
        newTask.endTime = newEnd.toISOString();

        // ✅ Automatic儲存
        saveTasksToStorage();
        console.log(`🕒 ${newTask.name} 拖移 → ${newStart.toLocaleTimeString()} ~ ${newEnd.toLocaleTimeString()}`);
    });

    updateTaskStats();
}

// 更新任務統計數字
function updateTaskStats() {
  const inProgress = taskList.filter(task => task.status === 'in_progress').length;
  const total = taskList.length;

  const taskStatusElement = document.querySelector('.task-icon')?.parentElement?.querySelector('div');
  if (taskStatusElement) {
    taskStatusElement.innerHTML = `
      <div style="font-size: 14px; font-weight: 600;">${inProgress} / ${total}</div>
      <div style="font-size: 12px; color: #6b7280;">Ongoing Tasks</div>
    `;
  }
}

// 模擬即時數據更新
function updateRealTimeData() {
    // 更新服務器負載數據
    const cpuElement = document.querySelector('.cpu-metric .metric-value');
    const ramElement = document.querySelector('.ram-metric .metric-value');
    const networkElement = document.querySelector('.network-metric .metric-value');
    const usersElement = document.querySelector('.users-metric .metric-value');

    if (cpuElement) {
        const newCpuValue = Math.floor(Math.random() * 30) + 35; // 35-65%
        cpuElement.textContent = newCpuValue + '%';
        cpuElement.style.color = newCpuValue > 70 ? '#ef4444' : '#3b82f6';
    }

    if (ramElement) {
        const newRamValue = Math.floor(Math.random() * 20) + 55; // 55-75%
        ramElement.textContent = newRamValue + '%';
        ramElement.style.color = newRamValue > 80 ? '#ef4444' : '#10b981';
    }

    if (networkElement) {
        const newNetworkValue = Math.floor(Math.random() * 40) + 15; // 15-55 Mbps
        networkElement.textContent = newNetworkValue + ' Mbps';
    }

    if (usersElement) {
        const newUsersValue = Math.floor(Math.random() * 5) + 6; // 6-10 users
        usersElement.textContent = newUsersValue;
    }

    // 更新時間戳記
    const refreshElements = document.querySelectorAll('.refresh-time');
    const now = new Date();
    const timeText = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} 更新`;
}

async function updateGreenhouseStatus() {
  try {
    const res = await fetch('./data/zone-status.json');
    const data = await res.json();

    const zones = document.querySelectorAll('.greenhouse-zone');
    zones.forEach(zone => {
      const zoneId = zone.querySelector('.zone-name')?.textContent.trim().slice(-1);
      const zoneData = data[zoneId];
      if (!zoneData) return;

      // Status點 class（ok / warning / error）
      const dot = zone.querySelector('.status-dot');
      dot.className = 'status-dot status-' + (zoneData.status || 'ok');

      // 更新顯示數值（依據每區的 .data-item 順序）
      const items = zone.querySelectorAll('.data-item span:last-child');
      const keys = Object.keys(zoneData.data);
      keys.forEach((key, index) => {
        if (items[index]) {
          items[index].textContent = zoneData.data[key];
        }
      });
    });

    lastUpdated = new Date();
    updateRefreshTimes();

  } catch (err) {
    console.error('🚨 zone-status.json 載入失敗:', err);
  }
}

async function loadTasksFromJSON() {
  const taskMap = {}; // 避免重複
  taskList.length = 0; // 清空舊任務

  try {
    const res = await fetch('./data/task-list.json');
    const tasksFromJson = await res.json();
    tasksFromJson.forEach(task => {
      const key = task.key || `${task.name}_${task.zone}_${task.startTime}`;
      if (!taskMap[key]) {
        taskMap[key] = task;
      }
    });
    console.log(`📦 JSON 載入 ${tasksFromJson.length} 筆`);
  } catch (err) {
    console.error('🚨 JSON 載入失敗:', err);
  }

  try {
    const local = localStorage.getItem('taskList');
    if (local) {
      const localTasks = JSON.parse(local);
      localTasks.forEach(task => {
        const key = `${task.name}_${task.zone}_${task.startTime}`;
        taskMap[key] = task;
      });
      console.log(`📂 合併 localStorage，總數 ${Object.keys(taskMap).length} 筆`);
    }
  } catch (err) {
    console.error('🚨 localStorage 載入失敗:', err);
  }

  Object.values(taskMap).forEach(task => {
    taskList.push(task);
    updateGanttChart(task);
  });
  updateTaskStats();
  initTaskChart();   
}

async function loadAllTasks() {
  const taskMap = {};
  taskList.length = 0;

  // 1. 清空畫面任務列
  document.querySelectorAll('.gantt-row:not(.gantt-header)').forEach(el => el.remove());

  // 2. 讀取 JSON 任務
  try {
    const res = await fetch('./data/task-list.json');
    const tasksFromJson = await res.json();
    tasksFromJson.forEach(task => {
      const key = task.key || `${task.name}_${task.zone}_${task.startTime}`;
      taskMap[key] = task;
    });
    console.log(`📦 JSON 載入 ${tasksFromJson.length} 筆`);
  } catch (err) {
    console.error('🚨 JSON 載入失敗:', err);
  }

  // 3. 合併 localStorage 任務
  try {
    const local = localStorage.getItem('taskList');
    if (local) {
      const localTasks = JSON.parse(local);
      localTasks.forEach(task => {
        const key = task.key || `${task.name}_${task.zone}_${task.startTime}`;
        taskMap[key] = task;
      });
      console.log(`📂 合併 localStorage：共 ${Object.keys(taskMap).length} 筆`);
    }
  } catch (err) {
    console.error('🚨 localStorage 載入失敗:', err);
  }

  // 4. 轉為陣列並載入
  Object.values(taskMap).forEach(task => {
    taskList.push(task);
    updateGanttChart(task);
  });

  console.log(`✅ 任務載入完成，共 ${taskList.length} 筆（已去重）`);
}

function exportTasksAsJSON() {
    const blob = new Blob([JSON.stringify(taskList, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'task-list-export.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log("✅ 任務已匯出為 JSON");
}

function updateRefreshTimes() {
  const elements = document.querySelectorAll('.refresh-time');
  if (!lastUpdated) return;

  const now = new Date();
  const diffMs = now - lastUpdated;
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);

  let label = '';
  if (diffMinutes < 1) {
    label = 'Just Updated';
  } else if (diffMinutes < 60) {
    label = `${diffMinutes} 分鐘前更新`;
  } else {
    const minutesPart = diffMinutes % 60;
    label = `${diffHours} 小時 ${minutesPart} 分鐘前更新`;
  }

  elements.forEach(el => {
    const titleText = el.closest('.dashboard-card')?.querySelector('.card-title')?.textContent || '';
    if (titleText.includes('系統負載監控')) {
      el.textContent = '即時更新';
    } else {
      el.textContent = label;
    }
  });
}

function loadTasksFromStorage() {
    const stored = localStorage.getItem('taskList');
    if (!stored) return;

    // 🔄 先清空畫面任務區
    document.querySelectorAll('.gantt-row:not(.gantt-header)').forEach(el => el.remove());
    
    const storedTasks = JSON.parse(stored);

    const uniqueMap = {}; // 用來去重 key
    storedTasks.forEach(task => {
        const key = task.key || `${task.name}_${task.zone}_${task.startTime}`;
        uniqueMap[key] = task;
    });

    taskList.length = 0; // 清空記憶體中的任務清單

    Object.values(uniqueMap).forEach(task => {
        taskList.push(task);         // 加入記憶體
        updateGanttChart(task);      // 顯示到甘特圖
    });

    console.log(`📂 已從本地載入 ${taskList.length} 筆任務（去重後）`);
}


function getTotalCarbonEmission(tasks) {
    return tasks.reduce((total, task) => {
        // 假設每 kWh 對應 0.5 kg CO₂ 排放
        const carbon = (task.powerConsumption || 0) * 0.5;
        return total + carbon;
    }, 0);
}

function updateCarbonStatusUI() {
    const totalCarbon = getTotalCarbonEmission(taskList);
    const target = TARGET_CARBON_EMISSION;
    const difference = target - totalCarbon;

    document.querySelector('.gauge-text').textContent = `${Math.min((totalCarbon / target) * 100, 100).toFixed(0)}%`;
    document.querySelector('.stat-item .stat-value:nth-child(1)').textContent = totalCarbon.toFixed(1);
    document.querySelector('.stat-item .stat-value:nth-child(2)').textContent = target.toFixed(1);
    
    const diffElement = document.querySelector('.stat-item .stat-value:nth-child(3)');
    if (diffElement) {
        diffElement.textContent = difference.toFixed(1);
        diffElement.style.color = difference < 0 ? '#dc2626' : '#059669';
    }
}

function suggestCarbonOptimization() {
    const suggestions = taskList.filter(t => (t.powerConsumption || 0) > 2.0).map(t => {
        return `🔌 ${t.name}：耗電 ${t.powerConsumption} kWh，Suggestion調整時間或避免重複執行`;
    });

    alert(`♻️ 高碳排任務Suggestion：\n\n${suggestions.join('\n') || '目前沒有高碳排任務'}`);
}

async function showZoneDetails(zoneId) {
  try {
    const res = await fetch('./data/zone-status.json');
    const data = await res.json();

    const zoneInfo = data[zoneId];
    if (!zoneInfo) {
      alert(`查無 ${zoneId} 區域資料`);
      return;
    }

    // 更新 modal 標題與內容
    document.getElementById('modalTitle').textContent = `${zoneInfo.name} - Detailed Information`;

    const content = document.getElementById('modalContent');
    let html = '';
    for (const [key, value] of Object.entries(zoneInfo.data)) {
      html += `
        <div class="sensor-item">
          <span style="font-weight: 500;">${key}:</span>
          <span style="color: #059669;">${value}</span>
        </div>
      `;
    }

    content.innerHTML = html;
    document.getElementById('zoneModal').style.display = 'block';

  } catch (err) {
    console.error('❌ 無法載入區域詳情 JSON:', err);
  }
}

async function optimizeSchedule() {
  try {
    const res = await fetch('./data/zone-status.json');
    const zoneData = await res.json();

    const optimizedTasks = taskList.map(task => {
      const zoneInfo = zoneData[task.zone];
      if (!zoneInfo) return task;

      const originalStart = new Date(task.startTime);
      const originalEnd = new Date(task.endTime);
      const durationMs = originalEnd - originalStart;

      let start = new Date(originalStart);

      // 🎯 天氣適應（高溫就早上）
      if (task.weatherAdapt && parseFloat(zoneInfo.data['Temperature']) > 28) {
        start.setHours(6, 0, 0, 0);
      }

      // 🎯 Carbon Emission Optimization（高耗電就避開午間）
      if (task.carbonOptimize && task.powerConsumption > 1.0) {
        if (start.getHours() >= 11 && start.getHours() <= 15) {
          start.setHours(9, 0, 0, 0);
        }
      }

      // 🎯 Pest and Disease Risk（風險高就提前）
      const risk = zoneInfo.data['Pest and Disease Risk'] || zoneInfo.status;
      if (task.type === 'pest_control' && (risk.includes('中') || risk === 'warning')) {
        start.setHours(6, 0, 0, 0);
      }

      // 更新時間
      const end = new Date(start.getTime() + durationMs);
      return {
        ...task,
        startTime: start.toISOString(),
        endTime: end.toISOString()
      };
    });

    // ✅ 套用優化後任務
    taskList.length = 0;
    document.querySelectorAll('.gantt-row:not(.gantt-header)').forEach(el => el.remove());

    optimizedTasks.forEach(task => {
      taskList.push(task);
      updateGanttChart(task);
    });

    saveTasksToStorage();
    console.log('✅ 任務排程已Automatic優化！');
    alert('📋 The task has been rescheduled automatically based on the weather and Pest and Disease Risk!');

  } catch (err) {
    console.error('🚨 優化任務失敗:', err);
    alert('❌ 排程優化失敗，請確認 zone-status.json 是否正確');
  }
}

async function updateCarbonStats() {
  try {
    const res = await fetch('./data/carbon-data.json');
    const data = await res.json();

    const percent = Math.round((data.today / data.goal) * 100);
    document.querySelector('.gauge-text').textContent = `${percent}%`;
    document.querySelector('.gauge-fill').style.width = `${percent}%`;

    document.querySelector('.carbon-today').textContent = data.today.toFixed(1);
    document.querySelector('.carbon-goal').textContent = data.goal.toFixed(1);
    document.querySelector('.carbon-diff').textContent = (data.today - data.yesterday).toFixed(1);
    document.querySelector('.carbon-days').textContent = `${data.daysMet} Days`;

    document.querySelector('.carbon-tip').innerHTML = `
      <div style="background:#dcfce7;padding:12px;border-radius:8px;text-align:center;width:100%;">
        <strong>💡 Suggestion：</strong>${data.suggestion}
      </div>`;
    document.querySelector('.carbon-trend').innerHTML = `
      <div style="background:#f0f9ff;padding:12px;border-radius:8px;text-align:center;width:100%;margin-top:8px;">
        <strong>📊 Trend Analysis：</strong>${data.trendText}
      </div>`;
  } catch (err) {
    console.error("🚨 碳排 JSON 載入失敗:", err);
  }
}

async function updateSystemStatus() {
  try {
    const res = await fetch('http://localhost:3001/api/system-status');
    const data = await res.json();

    document.querySelector('.cpu-metric .metric-value').textContent = `${data.cpu}%`;
    document.querySelector('.ram-metric .metric-value').textContent = `${data.ram}%`;
    document.querySelector('.users-metric .metric-value').textContent = data.users;
    document.querySelector('.network-metric .metric-value').textContent = `${data.network} Mbps`;

    document.querySelector('.cpu-metric .metric-value').style.color = data.cpu > 80 ? '#ef4444' : '#3b82f6';
    document.querySelector('.ram-metric .metric-value').style.color = data.ram > 80 ? '#ef4444' : '#10b981';
  } catch (err) {
    console.error("❌ 無法取得System Status資料", err);
  }
}

// 每 5 秒Automatic更新
setInterval(updateSystemStatus, 5000);
updateSystemStatus(); // 首次立即更新

// 初始化和定時更新
document.addEventListener('DOMContentLoaded', function () {
    // 每5秒更新服務器數據
    setInterval(updateRealTimeData, 5000);

    // 每30秒更新溫室Status
    setInterval(updateGreenhouseStatus, 30000);

    // 初始化彈出視窗關閉功能
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    console.log('🌱 智慧農場 OS 已啟動');
    console.log('📊 即時監控系統運行中...');
});



// 添加一些互動效果
document.addEventListener('DOMContentLoaded', function () {
    // 為甘特圖任務條添加懸停效果（移除點擊 alert）
    const taskBars = document.querySelectorAll('.task-bar');
    taskBars.forEach(bar => {
        bar.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        });

        bar.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
});
function switchWeatherView(period) {
    document.querySelectorAll('#weatherModal .control-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

function switchPowerView(period) {
    document.querySelectorAll('#powerModal .control-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

function showZoneDetail(zone) {
    // 什麼都不做
}

document.addEventListener('DOMContentLoaded', () => {
  updateGreenhouseStatus();
  setInterval(updateGreenhouseStatus, 30000);
  setInterval(updateRefreshTimes, 60000);
  // loadTasksFromJSON();
  loadAllTasks();
  updateCarbonStats();
});