@echo off
setlocal enabledelayedexpansion

:loop
if "%~1"=="" goto end
if "%~1"=="-Command" (
    shift
    goto run
)
if "%~1"=="-c" (
    shift
    goto run
)
shift
goto loop

:run
set "CMD_ARGS="
:loop2
if "%~1"=="" goto do_run
set "CMD_ARGS=!CMD_ARGS! %1"
shift
goto loop2

:do_run
if defined CMD_ARGS set "CMD_ARGS=!CMD_ARGS:~1!"
cmd.exe /c !CMD_ARGS!
goto end_all

:end
cmd.exe /c %*

:end_all
