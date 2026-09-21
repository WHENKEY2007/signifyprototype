@echo off
title Signify Public Cloudflare Tunnel
echo ========================================================
echo Starting Signify Public HTTPS Tunnel for Vercel/Web...
echo ========================================================
echo.
echo Forwarding public HTTPS traffic to http://localhost:7860...
echo Keep this window OPEN during your demo!
echo.
"%~dp0cloudflared.exe" tunnel --url http://localhost:7860
pause
