#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import sys
import fcntl
import signal
import os.path as path
from http.server import HTTPServer, SimpleHTTPRequestHandler

if len(sys.argv) < 2:
    sys.argv.append('8000')
cwd = path.dirname(path.abspath(__file__))


def handler(_=0, __=0):
    signal.signal(signal.SIGIO, signal.SIG_IGN)
    print('File change detected! Regenerating...')
    os.system(path.join(cwd, 'gen.py'))
    fcntl.fcntl(
        os.open(path.join(cwd, 'src'), os.O_RDONLY),
        fcntl.F_NOTIFY, fcntl.DN_MODIFY | fcntl.DN_CREATE | fcntl.DN_MULTISHOT
    )
    for root, dirs, files in os.walk(path.join(cwd, 'src')):
        for dir in dirs:
            fcntl.fcntl(
                os.open(path.join(root, dir), os.O_RDONLY),
                fcntl.F_NOTIFY, fcntl.DN_MODIFY | fcntl.DN_CREATE | fcntl.DN_MULTISHOT
            )
    signal.signal(signal.SIGIO, handler)


class HttpHanndler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=path.join(cwd, 'build'), **kwargs)


if __name__ == '__main__':
    handler()
    HTTPServer(('', int(sys.argv[1])), HttpHanndler).serve_forever()
