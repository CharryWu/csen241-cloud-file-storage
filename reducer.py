#!/usr/bin/env python
"""reducer.py"""
from operator import itemgetter
import sys
current_word, word = None, None
current_count = 0
for line in sys.stdin:
    line = line.strip()
    word, count = line.split('\t', 1)
    count = int(count)

    if word == current_word:
        current_count += count
    else:
        if current_word:
            print('%s\t%s' % (current_word, current_count))

        current_count = count
        current_word = word
    
#if current_word == word:
print('%s\t%s' % (current_word, current_count))