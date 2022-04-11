#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re
import os
import os.path as path


DEBUG = __import__('sys').argv[-1] == '-v'
vars = {
    '$': '$',
    'BASE': '',
    'RND': f'{__import__("random").random():.6f}'
}
level = 0
cwd = path.dirname(path.abspath(__file__))
srcDir = path.join(cwd, 'src')
dstDir = path.join(cwd, 'build')


def debug(x):
    if DEBUG:
        print(x)
    return x


def processVar(content):
    for var in re.findall(r'(\$\$|[A-Z]+)', content):
        debug(f'replacing {"$"+var} with {vars.get(var)}')
        content = content.replace('$'+var, vars.get(var, ''))
    return content


def processLine(line):
    global vars
    prefix, cmd, content = re.match(
        r'^(\s*)\$([A-Z]+)\s+(.*)\s*$', line).groups()
    debug(f'executing {cmd}: {content}')
    if cmd == 'REQUIRE':
        process(processVar(content), True)
        return ''
    elif cmd == 'INCLUDE':
        return ''.join([prefix+line for line in process(processVar(content), True)])
    elif cmd == 'DEFINE':
        name, content = debug(content.split(maxsplit=1))
        vars[name] = processVar(content)
        return ''
    elif cmd == 'VAR':
        return prefix+processVar(content)+'\n'
    elif cmd == 'EVAL':
        return prefix+debug(eval(content))+'\n'
    elif cmd == 'EXEC':
        exec(content)
        return ''
    else:
        assert False, f'Unknown command: {cmd}'


def process(rel, including=False):
    global vars, level
    src = path.join(srcDir, rel)
    dst = path.join(dstDir, rel)
    lines = []
    try:
        with open(src) as f:
            lines = f.readlines()
    except OSError:
        print(f'Error reading {rel}')
        raise

    includeOnly = lines and lines[0].startswith('$INCLUDE_ONLY')
    noCopy = includeOnly and lines[0].split()[-1] == 'NOCOPY'
    if includeOnly and not including:
        return
    if includeOnly:
        lines = lines[1:]

    print(f'{"Including" if including else "Generating"} {rel} ...(lvl {level})')
    oldVars = vars.copy()
    vars['_file'] = rel
    level = level + 1
    ret = []
    for line in lines:
        if re.findall(r'^\s*\$[A-Z]+ ', line):
            line = processLine(line)
        ret.append(line)
    vars = oldVars
    level = level - 1

    if not noCopy:
        try:
            os.makedirs(path.dirname(dst), exist_ok=True)
            with open(dst, 'w') as f:
                f.writelines(ret)
        except OSError:
            print(f'Error writing {rel}')
            raise

    return ret


if __name__ == '__main__':
    os.system(path.join(cwd, 'indexer.py'))
    for root, dirs, files in os.walk(srcDir):
        for file in files:
            process(path.relpath(path.join(root, file), srcDir))
