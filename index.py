#!/usr/bin/env python3

import os
import re
import json

docs: dict[str, dict[str, int]] = {}
news: list[dict[str, str]]= []

os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'public'))


if __name__ == '__main__':
    print('Generating docs index...')
    for file in os.scandir('_docs'):
        if re.findall(r'^\S+\.[a-z]{2}\.md$', file.name):  # *.(en|zh).md
            docs.setdefault(file.name[-5:-3], {})  # init new lang
            docs[file.name[-5:-3]][file.name[:-6]] = 1  # enroll post
    for lang, docs_lang in docs.items():
        docs_lang.pop('index', None)  # no indexing homepage
        docs_lang = {
            k: v
            for k, v in sorted(
                docs_lang.items(),
                key=lambda item: item[0].lower()  # sort Aa-Zz
            )
        }
    print(f'Found {sum([ len(x) for x in docs.values() ])} posts')
    print(f'Found {len(docs)} languages: {list(docs.keys())}')
    with open('_docs/index.json', 'w', encoding='utf-8') as index:
        json.dump(docs, index)

    print('Generating news index...')
    for file in os.scandir('_news'):
        if re.findall(r'^\d{4}-\d{2}-\d{2}-\S+\.md$', file.name):  # YYYY-MM-DD-*.md
            with open(file.path, 'r', encoding='utf-8') as post:
                for line in post.readlines():  # try finding the title in markdown
                    if line.startswith('## '):
                        title = line[3:].strip()
                        break
                else:
                    title = file.name[-5:-3]  # or use file name
            news.append({
                'name': file.name[:-3],
                'text': title,
                'date': file.name[:10],
            })
    news.sort(reverse=True, key=lambda p: p['name'])
    print(f'Found {len(news)} posts')
    with open('_news/index.json', 'w', encoding='utf-8') as index:
        json.dump(news, index)
