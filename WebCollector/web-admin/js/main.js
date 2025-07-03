// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化图表
    initCharts();
    
    // 绑定刷新按钮事件
    document.getElementById('refreshBtn').addEventListener('click', function() {
        refreshData();
    });
    
    // 模拟数据更新（每10秒）
    setInterval(function() {
        updateRandomData();
    }, 10000);
});

// 初始化图表
function initCharts() {
    // URL趋势图表
    const urlTrendCtx = document.getElementById('urlTrendChart').getContext('2d');
    window.urlTrendChart = new Chart(urlTrendCtx, {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
            datasets: [{
                label: '爬取URL数',
                data: [120, 190, 300, 500, 800, 1234],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.1)',
                borderWidth: 2,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
    
    // 系统资源图表
    const resourceCtx = document.getElementById('resourceChart').getContext('2d');
    window.resourceChart = new Chart(resourceCtx, {
        type: 'line',
        data: {
            labels: ['1分钟前', '50秒前', '40秒前', '30秒前', '20秒前', '10秒前', '现在'],
            datasets: [
                {
                    label: 'CPU',
                    data: [30, 35, 40, 45, 42, 47, 45],
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.1)',
                    borderWidth: 2,
                    tension: 0.2
                },
                {
                    label: '内存',
                    data: [50, 55, 58, 62, 65, 60, 60],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.1)',
                    borderWidth: 2,
                    tension: 0.2
                },
                {
                    label: '线程',
                    data: [40, 45, 50, 55, 60, 58, 60],
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.1)',
                    borderWidth: 2,
                    tension: 0.2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        boxWidth: 12
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// 刷新数据
function refreshData() {
    // 显示加载动画（可以添加一个加载指示器）
    const refreshBtn = document.getElementById('refreshBtn');
    const originalContent = refreshBtn.innerHTML;
    refreshBtn.innerHTML = '<i class="bi bi-arrow-clockwise"></i> 加载中...';
    refreshBtn.disabled = true;
    
    // 模拟API请求延迟
    setTimeout(function() {
        // 更新数据
        updateRandomData();
        
        // 恢复按钮状态
        refreshBtn.innerHTML = originalContent;
        refreshBtn.disabled = false;
        
        // 显示通知（可以添加一个toast通知）
        showNotification('数据已刷新');
    }, 1000);
}

// 更新随机数据（模拟实时数据）
function updateRandomData() {
    // 更新状态卡片数据
    document.getElementById('activeCrawlers').textContent = getRandomInt(1, 5);
    document.getElementById('pendingTasks').textContent = getRandomInt(0, 8);
    document.getElementById('totalUrls').textContent = formatNumber(getRandomInt(10000, 20000));
    document.getElementById('todayUrls').textContent = formatNumber(getRandomInt(1000, 3000));
    
    // 更新系统资源数据
    const cpuUsage = getRandomInt(30, 70);
    const memoryUsage = getRandomInt(50, 80);
    const threadUsage = getRandomInt(20, 40) + '/50';
    const threadPercent = parseInt(threadUsage) * 2; // 转换为百分比
    
    document.getElementById('cpuUsage').textContent = cpuUsage + '%';
    document.getElementById('cpuProgressBar').style.width = cpuUsage + '%';
    
    document.getElementById('memoryUsage').textContent = memoryUsage + '%';
    document.getElementById('memoryProgressBar').style.width = memoryUsage + '%';
    
    document.getElementById('threadUsage').textContent = threadUsage;
    document.getElementById('threadProgressBar').style.width = threadPercent + '%';
    
    // 更新图表数据
    updateCharts(cpuUsage, memoryUsage, threadPercent);
}

// 更新图表数据
function updateCharts(cpu, memory, thread) {
    // 更新URL趋势图表
    const urlData = window.urlTrendChart.data.datasets[0].data;
    urlData.push(getRandomInt(urlData[urlData.length - 1] - 100, urlData[urlData.length - 1] + 200));
    urlData.shift();
    
    // 更新时间标签
    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ':' + 
                   now.getMinutes().toString().padStart(2, '0');
    
    const urlLabels = window.urlTrendChart.data.labels;
    urlLabels.push(timeStr);
    urlLabels.shift();
    
    window.urlTrendChart.update();
    
    // 更新系统资源图表
    const resourceData = window.resourceChart.data.datasets;
    
    // 更新CPU数据
    resourceData[0].data.push(cpu);
    resourceData[0].data.shift();
    
    // 更新内存数据
    resourceData[1].data.push(memory);
    resourceData[1].data.shift();
    
    // 更新线程数据
    resourceData[2].data.push(thread);
    resourceData[2].data.shift();
    
    window.resourceChart.update();
}

// 生成指定范围内的随机整数
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 格式化数字（添加千位分隔符）
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 显示通知
function showNotification(message) {
    // 这里可以实现一个简单的通知系统
    console.log('通知:', message);
    
    // 简单的通知实现（可以替换为更复杂的toast组件）
    const notification = document.createElement('div');
    notification.className = 'position-fixed top-0 end-0 p-3';
    notification.style.zIndex = '5';
    notification.innerHTML = `
        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">系统通知</strong>
                <small>刚刚</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // 3秒后自动移除
    setTimeout(function() {
        document.body.removeChild(notification);
    }, 3000);
}