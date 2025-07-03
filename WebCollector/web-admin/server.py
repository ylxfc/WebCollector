#!/usr/bin/env python3
"""
简单的HTTP服务器，用于提供WebCollector管理页面
"""

import http.server
import socketserver
import os

# 设置端口
PORT = 12000

# 设置处理程序
Handler = http.server.SimpleHTTPRequestHandler

# 确保工作目录正确
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# 创建服务器
with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
    print(f"服务器启动在 http://0.0.0.0:{PORT}")
    print(f"请访问 https://work-1-oxubiblguidojsxc.prod-runtime.all-hands.dev")
    # 启动服务器
    httpd.serve_forever()