@echo off
echo ========================================
echo 一键开营管家 (CampAgent) 启动脚本
echo ========================================
echo.

echo [1/3] 检查依赖...
if not exist "apps\web\node_modules" (
    echo 前端依赖不存在，正在安装...
    cd apps\web
    call npm install
    cd ..\..
)

if not exist "apps\server\node_modules" (
    echo 后端依赖不存在，正在安装...
    cd apps\server
    call npm install
    cd ..\..
)

echo.
echo [2/3] 启动后端服务器...
start "CampAgent Server" cmd /k "cd apps\server && npm run dev"

echo.
echo [3/3] 启动前端服务器...
timeout /t 3 /nobreak >nul
start "CampAgent Web" cmd /k "cd apps\web && npm run start"

echo.
echo ========================================
echo 启动完成！
echo 后端: http://localhost:3001
echo 前端: http://localhost:3000
echo ========================================
echo.
echo 按任意键退出此窗口（服务器将继续运行）
pause >nul
