@echo off
title Push Update ke GitHub - Fotonic
color 0b

echo ========================================================
echo           UPDATE PROYEK KE GITHUB (FOTONIC)
echo ========================================================
echo.

:INPUT
set /p commit_msg="Tulis apa yang di-update: "

if "%commit_msg%"=="" (
    echo [Peringatan] Pesan update tidak boleh kosong!
    goto INPUT
)

echo.
echo Menyiapkan file yang diubah...
git add .

echo Menyimpan perubahan (commit)...
git commit -m "%commit_msg%"

echo Menyinkronkan dengan GitHub (pull rebase)...
git pull --rebase origin main

echo Mengunggah ke GitHub (push)...
git push origin main

echo.
echo ========================================================
echo               UPDATE BERHASIL DIKIRIM!
echo ========================================================
echo.
pause
