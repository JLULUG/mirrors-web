#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re
import os
import os.path as path
badges = {
    'alpine': 1,
    'ubuntu': 1,
    'debian': 1,
    'manjaro': 1,
    'CTAN': 1,
}

cwd = path.join(path.dirname(path.abspath(__file__)), 'src')

if __name__ == '__main__':
    print('Generating docs index...')
    docs = {}
    for file in os.scandir(path.join(cwd, 'docs', '_posts')):
        if re.findall(r'^\S+\.[a-z]{2}\.md$', file.name):  # *.(en|zh).md
            docs.setdefault(file.name[-5:-3], {})  # init new lang
            docs[file.name[-5:-3]][file.name[:-6]] = 1  # enroll post
    for k in docs.keys():
        docs[k].pop('index', None)  # no indexing homepage
        docs[k] = {k: v for k, v in sorted(
            docs[k].items(), key=lambda item: item[0].lower())}  # sort Aa-Zz
    print(f'Found {sum([ len(x) for x in docs.values() ])} posts')
    print(f'Found {len(docs)} languages: {list(docs.keys())}')
    docs['_badges'] = badges
    print(f'Found {len(docs["_badges"])} badges')
    with open(path.join(cwd, 'docs', 'index.js'), 'w') as index:
        index.write('$INCLUDE_ONLY NOCOPY\n')
        index.write(f'const docs = {repr(docs)}\n')

    print('Generating news index...')
    news = []
    for file in os.scandir(path.join(cwd, 'news', '_posts')):
        if file.name.endswith('.md'):
            with open(file.path) as post:  # try finding the title
                for line in post.readlines():
                    if line.startswith('## '):
                        title = line[3:].strip()
                        break
                else:
                    print(f'Failed finding title in {file.name}')
                    continue
            news.append({
                'name': file.name[:-3],
                'text': title,
                'date': file.name[:10],
            })
    news.sort(reverse=True, key=lambda p: p["name"])
    print(f'Found {len(news)} posts')
    with open(path.join(cwd, 'news', 'index.js'), 'w') as index:
        index.write('$INCLUDE_ONLY NOCOPY\n')
        index.write(f'const news = {repr(news)}\n')
