from _typeshed import FileDescriptorOrPath
from asyncio.events import AbstractEventLoop
from typing import Any

async def exists(path: FileDescriptorOrPath, *, loop: AbstractEventLoop | None = ..., executor: Any = ...) -> bool: ...
async def isfile(path: FileDescriptorOrPath, *, loop: AbstractEventLoop | None = ..., executor: Any = ...) -> bool: ...
async def isdir(s: FileDescriptorOrPath, *, loop: AbstractEventLoop | None = ..., executor: Any = ...) -> bool: ...
async def getsize(filename: FileDescriptorOrPath, *, loop: AbstractEventLoop | None = ..., executor: Any = ...) -> int: ...
async def getmtime(filename: FileDescriptorOrPath, *, loop: AbstractEventLoop | None = ..., executor: Any = ...) -> float: ...
async def getatime(filename: FileDescriptorOrPath, *, loop: AbstractEventLoop | None = ..., executor: Any = ...) -> float: ...
async def getctime(filename: FileDescriptorOrPath, *, loop: AbstractEventLoop | None = ..., executor: Any = ...) -> float: ...
async def samefile(
    f1: FileDescriptorOrPath, f2: FileDescriptorOrPath, *, loop: AbstractEventLoop | None = ..., executor: Any = ...
) -> bool: ...
async def sameopenfile(fp1: int, fp2: int, *, loop: AbstractEventLoop | None = ..., executor: Any = ...) -> bool: ...