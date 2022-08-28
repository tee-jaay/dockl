# String escape helper
import re


def string_escape(str):
    strEsc = re.sub(
        r'([\.\\\+\*\?\[\^\]\$\(\)\{\}\!\<\>\|\:\-])', r'\\\1', str)
    return strEsc
