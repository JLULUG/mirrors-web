#!/usr/bin/env python3

import os
import re
import logging as log

# a very simple SSI renderer: only support several directives, doesn't
# handle qoutes the correct way, and maybe other problems

os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'public'))

CMD_SPLIT = r'(<!--# +(?:include|set|echo|if|else|endif)(?: +[a-z]+=".+?")* +-->)'
CMD_MATCH = r'<!--# +(include|set|echo|if|else|endif)((?: +[a-z]+=".+?")*) +-->'
PARAM_MATCH = r' ([a-z]+)="(.+?)"'


def render(file: str, level: int, var: dict[str, str]) -> str:
    log.info(f'Processing {file} (lvl {level})...')
    with open(file, 'r', encoding='utf-8') as f:
        tmpl = f.read()
    rendered = ''
    ifs = []
    for part in re.split(CMD_SPLIT, tmpl):
        matched = re.fullmatch(CMD_MATCH, part)
        if matched:
            cmd, param_str = matched.groups()
            params: dict[str, str] = { x[0]: x[1] for x in re.findall(PARAM_MATCH, param_str) }
            if cmd == 'include':
                if params['file'].startswith('/'):
                    rendered += render(params['file'][1:], level+1, var)
                else:
                    rendered += render(os.path.join(os.path.dirname(file), params['file']), level+1, var)
            elif cmd == 'set':
                var[params['var']] = params['value']
            elif cmd == 'echo':
                rendered += var.get(params['var'], '')
            elif cmd == 'if':
                expr = params['expr'].split(maxsplit=2)
                result = None
                if len(expr) and expr[0].startswith('$'):
                    left = var.get(expr[0][1:], '')
                    if len(expr) == 1:
                        result = bool(left)
                    elif len(expr) == 3:
                        right = expr[2].strip()
                        if expr[1] == '=':
                            result = bool(left == right)
                        elif expr[1] == '!=':
                            result = bool(left != right)
                if result is None:
                    raise ValueError('illegal expr')
                ifs.append(result)
            elif cmd == 'else':
                if ifs:
                    ifs[-1] = not ifs[-1]
                else:
                    raise ValueError('else without if')
            elif cmd == 'endif':
                if ifs:
                    ifs.pop()
                else:
                    raise ValueError('endif without if')
            else:
                raise ValueError(f'unknown command {cmd}')
        else:
            if not ifs or ifs[-1]:
                rendered += part
    return rendered


if __name__ == '__main__':
    log.basicConfig(level=log.INFO)
    for path, dirs, files in os.walk('.'):
        for file in files:
            if file.startswith('_') and file.endswith('.html'):
                template = os.path.join(path, file)
                rendered = os.path.join(path, file[1:])
                result = render(template, 0, {})
                log.info(f'Writing to {rendered}')
                if os.path.isfile(rendered):
                    os.chmod(rendered, 0o644)
                with open(rendered, 'w') as f:
                    f.write(result)
                os.chmod(rendered, 0o444)
